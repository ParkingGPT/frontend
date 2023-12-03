import Joi from 'joi';

export interface LotItem {
    pct: number;
    probability: number;
    available: number;
    distance: number;
    price: number;
    stars: number;
    prediction: number;
}

export type Lots = LotItem[];

export const lotsSchema = Joi.array().items(
    Joi.object().keys({
        pct: Joi.number().required(),
        probability: Joi.number().required(),
        available: Joi.number().required(),
        distance: Joi.number().required(),
        price: Joi.number().required(),
        stars: Joi.number().required(),
        prediction: Joi.number().optional()
    })
);