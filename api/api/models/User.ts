/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Task } from './Task';

export type User = {
    id: number;
    username: string;
    password: string;
    salt: string;
    tasks: Array<Task>;
}
