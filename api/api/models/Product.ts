/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type Product = {
    id: number;
    name: string;
    description: string;
    image: string;
    quantity: number;
    category: string;
    fat: number;
    carbohydrates: number;
    protein: number;
    weight: number;
    price: string;
    expirationDate: string;
    user: User;
    userId: number;
    createdAt: string;
    updatedAt: string;
}
