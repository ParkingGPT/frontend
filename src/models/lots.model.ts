import Joi from 'joi';

export interface LotItem {
    name: string;
    address: BuildingAddress;
    pct: number;
    probability: number;
    available: number;
    distance: number;
    costIndex: number;
    reviewScore: number;
    prediction: number;
}

export type Lots = LotItem[];

export const lotsSchema = Joi.array().items(
    Joi.object().keys({
        name: Joi.string().required(),
        address: Joi.object().keys({
            street: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required(),
            postal: Joi.string().required(),
            country: Joi.string().required(),
            type: Joi.string().required()
        }).required().unknown(true),
        pct: Joi.number().required(),
        probability: Joi.number().required(),
        available: Joi.number().required(),
        distance: Joi.number().required(),
        price: Joi.number().required(),
        stars: Joi.number().required(),
        prediction: Joi.number().optional()
    })
);

interface BuildingAddress {
    street: string;
    city: string;
    state: string;
    postal: string;
    country: string;
    type: string;
}