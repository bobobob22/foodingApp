/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { User } from './User';

export type Task = {
    id: number;
    title: string;
    description: string;
    status: Task.status;
    user: User;
    userId: number;
    createdAt: string;
}

export namespace Task {

    export enum status {
        OPEN = 'OPEN',
        IN_PROGRESS = 'IN_PROGRESS',
        DONE = 'DONE',
    }


}
