/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AuthCredentialsDto } from '../models/AuthCredentialsDto';
import type { CreateDishDto } from '../models/CreateDishDto';
import type { CreateProductDto } from '../models/CreateProductDto';
import type { CreateTaskDto } from '../models/CreateTaskDto';
import type { Dish } from '../models/Dish';
import type { Product } from '../models/Product';
import type { Task } from '../models/Task';
import { request as __request } from '../core/request';

export class Service {

    /**
     * @param status
     * @param search
     * @returns Task
     * @throws ApiError
     */
    public static async tasksControllerGetTasks(
        status: 'OPEN' | 'IN_PROGRESS' | 'DONE',
        search: string,
    ): Promise<Array<Task>> {
        const result = await __request({
            method: 'GET',
            path: `/tasks`,
            query: {
                'status': status,
                'search': search,
            },
            errors: {
                401: `Not auth`,
            },
        });
        return result.body;
    }

    /**
     * @param requestBody
     * @returns Task
     * @throws ApiError
     */
    public static async tasksControllerCreateTask(
        requestBody: CreateTaskDto,
    ): Promise<Task> {
        const result = await __request({
            method: 'POST',
            path: `/tasks`,
            body: requestBody,
            errors: {
                401: `Not auth`,
            },
        });
        return result.body;
    }

    /**
     * @param id
     * @returns Task
     * @throws ApiError
     */
    public static async tasksControllerGetTaskById(
        id: number,
    ): Promise<Task> {
        const result = await __request({
            method: 'GET',
            path: `/tasks/${id}`,
            errors: {
                401: `Not auth`,
            },
        });
        return result.body;
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static async tasksControllerDeleteTask(
        id: number,
    ): Promise<any> {
        const result = await __request({
            method: 'DELETE',
            path: `/tasks/${id}`,
            errors: {
                401: `Not auth`,
            },
        });
        return result.body;
    }

    /**
     * @param id
     * @returns Task
     * @throws ApiError
     */
    public static async tasksControllerUpdateTaskStatus(
        id: number,
    ): Promise<Task> {
        const result = await __request({
            method: 'PATCH',
            path: `/tasks/${id}/status`,
            errors: {
                401: `Not auth`,
            },
        });
        return result.body;
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static async authControllerSignUp(
        requestBody: AuthCredentialsDto,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/auth/signup`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @param requestBody
     * @returns any
     * @throws ApiError
     */
    public static async authControllerSignIn(
        requestBody: AuthCredentialsDto,
    ): Promise<any> {
        const result = await __request({
            method: 'POST',
            path: `/auth/signin`,
            body: requestBody,
        });
        return result.body;
    }

    /**
     * @returns Product
     * @throws ApiError
     */
    public static async productControllerGetTasks(): Promise<Array<Product>> {
        const result = await __request({
            method: 'GET',
            path: `/product`,
            errors: {
                401: `Not auth`,
            },
        });
        return result.body;
    }

    /**
     * @param requestBody
     * @returns Product
     * @throws ApiError
     */
    public static async productControllerCreateTask(
        requestBody: CreateProductDto,
    ): Promise<Product> {
        const result = await __request({
            method: 'POST',
            path: `/product`,
            body: requestBody,
            errors: {
                401: `Not auth`,
            },
        });
        return result.body;
    }

    /**
     * @returns Dish
     * @throws ApiError
     */
    public static async dishControllerGetProducts(): Promise<Array<Dish>> {
        const result = await __request({
            method: 'GET',
            path: `/dish`,
            errors: {
                401: `Not auth`,
            },
        });
        return result.body;
    }

    /**
     * @param requestBody
     * @returns Dish
     * @throws ApiError
     */
    public static async dishControllerCreateTask(
        requestBody: CreateDishDto,
    ): Promise<Dish> {
        const result = await __request({
            method: 'POST',
            path: `/dish`,
            body: requestBody,
            errors: {
                401: `Not auth`,
            },
        });
        return result.body;
    }

}