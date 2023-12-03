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
const chat_history = new ChatHistoryDao();

type RequestType = 'findPlace' | 'confirmation' | 'null';

export const initSession = async (uuid: string) => { 
    const apiUrl = `${Env.BACKEND_URL}${chat_endpoint}`;
    chat_history.addMessage({ role: 'system', content: Env.INIT_PROMPT });

    const data = {
        "uuid": uuid,
        "messages": chat_history.getHistory()
    }

    const result = await axios.post(apiUrl, data);
    return result.data;
}

export const handleChat = async (uuid: string, message: string) => { 
    const apiUrl = `${Env.BACKEND_URL}${chat_endpoint}`;
    chat_history.addMessage({ role: 'user', content: message });
    const data = {
        "uuid": uuid,
        "messages": chat_history.getHistory(),
    }
    const result = await axios.post(apiUrl, data);
    return parseResponse(result.data);
}

export const parseResponse = async (res: string) => { 
    const parsed = JSON.parse(res) as ChatResponse;
    if (parsed.request === false)
        return res;
    switch (parsed.request_type) { 
        case 'findPlace':
            return findPlace(parsed);
        case 'confirmation':
            return confirmation(parsed);
        default:
            return parsed.message;
    }

}

export const confirmation = async (res: ChatResponse) => {
    console.log("confirmation!!")
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
        throw new Error(error.message);
    }

    console.log(value);
    const incident_apiUrl = `${Env.BACKEND_URL}${incident_endpoint}`;
    for (let i = 0; i < value.length; i++) {
        const inc_res = await axios.get(incident_apiUrl, {
                params: {
                    point: point,
                    radius: 100
                }
        });
        const { construction, events, cogestion, hazards } = inc_res.data;
        const post_data = {
            pct: value[i].pct,
            probability: value[i].probability,
            available: value[i].available,
            distance: value[i].distance,
            price: value[i].price,
            stars: value[i].stars,
            construction: construction,
            events: events,
            cogestion: cogestion,
            hazards: hazards
        }
        console.log(post_data);
        const fleks_apiUrl = `${Env.BACKEND_URL}${fleks_endpoint}`;
        const fleks_result = await axios.post(fleks_apiUrl, post_data);
        const prediction = fleks_result.data.prediction;
        value[i].prediction = prediction;
    }

    const message = {
        role: 'system',
        content: Env.RECOMMENDATION_PROMPT + JSON.stringify(value)
    }
    const chat_apiUrl = `${Env.BACKEND_URL}${chat_endpoint}`;
    chat_history.addMessage(message);
    const data = {
        "uuid": "1",
        "messages": chat_history.getHistory()
    }
    const chat_result = await axios.post(chat_apiUrl, data);
    return chat_result.data.message;
    // const chat_res = chatResponseSchema.validate(chat_result.data);
    // if (chat_res.error) {
    //     throw new Error(chat_res.error.message);
    // }
    // return chat_res.value.message;
}

const findPlace = async (res: ChatResponse) => { 
    console.log("findPlace!!")
    const apiUrl = `${Env.BACKEND_URL}${findPlace_endpoint}?text=${res.data.destination}`;
    const result = await axios.get(apiUrl);
    const message = {
        role: 'system',
        content: Env.FIND_PLACE_PROMPT + JSON.stringify(result.data)
    }

    const chat_apiUrl = `${Env.BACKEND_URL}${chat_endpoint}`;
    chat_history.addMessage(message);
    const data = {
        "uuid": "1",
        "messages": chat_history.getHistory()
    }

    const chat_result = await axios.post(chat_apiUrl, data);
    return chat_result.data.message;
    // const chat_res = chatResponseSchema.validate(chat_result.data);
    // if (chat_res.error) {
    //     throw new Error(chat_res.error.message);
    // }
    // return chat_res.value.message;
}

interface ChatResponse {
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

