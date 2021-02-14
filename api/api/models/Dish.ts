/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type Dish = {
    id: number;
    name: string;
    description: string;
    category: string;
    time: number;
    difficulty: number;
    user: User;
    userId: number;
    createdAt: string;
    updatedAt: string;
}
