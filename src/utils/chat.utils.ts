import { Env } from '@/env';
import axios from 'axios';
import { lotsSchema } from '@/models/lots.model';
import ChatHistoryDao from '@/models/chatHistory.dao';
import Joi from 'joi';

const chat_endpoint = "/api/chat/message";
const findPlace_endpoint = "/api/map/findPlace";
const auth_endpoint = "/api/inrix/auth";
const lots_endpoint = "/api/inrix/lots";
const incident_endpoint = "/api/inrix/incident";
const fleks_endpoint = "/api/ml/predict";

export const handleChat = async (uuid: string, history: ChatHistoryDao) => { 
    const res = await requestChat(uuid, history);
    history = history.addAndClone({ role: 'assistant', content: res.message });

    if (res.request) { 
        switch (res.request_type) {
            case 'findPlace':
                return findPlace(uuid, res, history);
            case 'confirmation':
                return confirmation(uuid, res, history);
            default:
                console.log("invalid request type: " + res.request_type);
        }
    }

    return history;
}

export const confirmation = async (uuid: string, res: ChatResponse, history: ChatHistoryDao) => {
    const authUrl = `${Env.BACKEND_URL}${auth_endpoint}`;
    const _ = await axios.get(authUrl, {
        params: {
            appId: Env.INRIX_APP_ID,
            hashToken: Env.INRIX_APP_KEY
        }
    });

    const lotsApiUrl = `${Env.BACKEND_URL}${lots_endpoint}`;
    const point: string = res.data.location.latitude + '|' + res.data.location.longitude;

    const lotsResult = await axios.get(lotsApiUrl, {
        params: {
            point: point,
            radius: 500
        }
    });

    const { error, value } = lotsSchema.validate(lotsResult.data);
    if (error) {
        console.log("error retriving lots data: " + error.message);
    }

    const incident_apiUrl = `${Env.BACKEND_URL}${incident_endpoint}`;
    for (let i = 0; i < value.length; i++) {
        const inc_res = await axios.get(incident_apiUrl, {
                params: {
                    point: point,
                    radius: 10
                }
        });
        const { construction, events, congestion, hazards } = inc_res.data;
        const post_data = {
            pct: value[i].pct,
            probability: value[i].probability,
            available: value[i].available,
            distance: value[i].distance,
            price: value[i].price,
            stars: value[i].stars,
            construction: construction,
            events: events,
            congestion: congestion,
            hazards: hazards
        }
        const fleks_apiUrl = `${Env.BACKEND_URL}${fleks_endpoint}`;
        const fleks_result = await axios.post(fleks_apiUrl, post_data);
        const prediction = fleks_result.data.prediction;
        value[i].prediction = prediction;
    }

    const message = {
        role: 'system',
        content: Env.RECOMMENDATION_PROMPT + JSON.stringify(value)
    }
    history = history.addAndClone(message);
    const chat_res = await requestChat(uuid, history);
    return history.addAndClone({ role: 'assistant', content: chat_res.message });
}

const findPlace = async (uuid: string, res: ChatResponse, history: ChatHistoryDao) => { 
    const apiUrl = `${Env.BACKEND_URL}${findPlace_endpoint}?text=${res.data.destination}`;
    const result = await axios.get(apiUrl);
    const message = {
        role: 'system',
        content: Env.FIND_PLACE_PROMPT + JSON.stringify(result.data)
    }

    history = history.addAndClone(message);
    console.log(history);
    const chat_res = await requestChat(uuid, history);
    return history.addAndClone({ role: 'assistant', content: chat_res.message });
}

export interface ChatResponse {
    request: boolean;
    request_type: string | null;
    data: any;
    message: string;
}

const chatResponseSchema = Joi.object({
    request: Joi.boolean().required(),
    request_type: Joi.string().allow(null).required(),
    data: Joi.any().optional(),
    message: Joi.string().required()
});

const requestChat = async (uuid: string, history: ChatHistoryDao) => {
    const apiUrl = `${Env.BACKEND_URL}${chat_endpoint}`;
    const data = {
        "uuid": uuid,
        "messages": history.getHistory()
    }
    const result = await axios.post(apiUrl, data);
    const parsed = JSON.parse(result.data) as ChatResponse;
    return parsed
}