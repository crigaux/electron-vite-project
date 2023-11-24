// tslint:disable
/**
 * Api documentation
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 0.1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import { HttpMethods, QueryConfig, ResponseBody, ResponseText } from 'redux-query';
import * as runtime from '../runtime';
import {
    AgencySerializerPost,
    AgencySerializerPostFromJSON,
    AgencySerializerPostToJSON,
    AgencySerializerRead,
    AgencySerializerReadFromJSON,
    AgencySerializerReadToJSON,
} from '../models';

export interface AgenciesCreateAgencyRequest {
    agencySerializerPost: AgencySerializerPost;
}

export interface AgenciesDeleteAgencyRequest {
    id: number;
}

export interface AgenciesGetAgenciesByFilterRequest {
    city?: string;
    zipcode?: string;
}

export interface AgenciesGetAgencyByIdRequest {
    id: number;
}

export interface AgenciesGetAllAgenciesRequest {
    expanded?: boolean;
}

export interface AgenciesUpdateAgencyRequest {
    id: number;
    body?: object;
}


/**
 * Create a new agency
 */
function agenciesCreateAgencyRaw<T>(requestParameters: AgenciesCreateAgencyRequest, requestConfig: runtime.TypedQueryConfig<T, AgencySerializerRead> = {}): QueryConfig<T> {
    if (requestParameters.agencySerializerPost === null || requestParameters.agencySerializerPost === undefined) {
        throw new runtime.RequiredError('agencySerializerPost','Required parameter requestParameters.agencySerializerPost was null or undefined when calling agenciesCreateAgency.');
    }

    let queryParameters = null;


    const headerParameters : runtime.HttpHeaders = {};

    headerParameters['Content-Type'] = 'application/json';


    const { meta = {} } = requestConfig;

    meta.authType = ['bearer'];
    const config: QueryConfig<T> = {
        url: `${runtime.Configuration.basePath}/agencies`,
        meta,
        update: requestConfig.update,
        queryKey: requestConfig.queryKey,
        optimisticUpdate: requestConfig.optimisticUpdate,
        force: requestConfig.force,
        rollback: requestConfig.rollback,
        options: {
            method: 'POST',
            headers: headerParameters,
        },
        body: queryParameters || AgencySerializerPostToJSON(requestParameters.agencySerializerPost),
    };

    const { transform: requestTransform } = requestConfig;
    if (requestTransform) {
        config.transform = (body: ResponseBody, text: ResponseBody) => requestTransform(AgencySerializerReadFromJSON(body), text);
    }

    return config;
}

/**
* Create a new agency
*/
export function agenciesCreateAgency<T>(requestParameters: AgenciesCreateAgencyRequest, requestConfig?: runtime.TypedQueryConfig<T, AgencySerializerRead>): QueryConfig<T> {
    return agenciesCreateAgencyRaw(requestParameters, requestConfig);
}

/**
 * Delete a agency by its id
 */
function agenciesDeleteAgencyRaw<T>(requestParameters: AgenciesDeleteAgencyRequest, requestConfig: runtime.TypedQueryConfig<T, void> = {}): QueryConfig<T> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
        throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling agenciesDeleteAgency.');
    }

    let queryParameters = null;


    const headerParameters : runtime.HttpHeaders = {};


    const { meta = {} } = requestConfig;

    meta.authType = ['bearer'];
    const config: QueryConfig<T> = {
        url: `${runtime.Configuration.basePath}/agencies/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
        meta,
        update: requestConfig.update,
        queryKey: requestConfig.queryKey,
        optimisticUpdate: requestConfig.optimisticUpdate,
        force: requestConfig.force,
        rollback: requestConfig.rollback,
        options: {
            method: 'DELETE',
            headers: headerParameters,
        },
        body: queryParameters,
    };

    const { transform: requestTransform } = requestConfig;
    if (requestTransform) {
    }

    return config;
}

/**
* Delete a agency by its id
*/
export function agenciesDeleteAgency<T>(requestParameters: AgenciesDeleteAgencyRequest, requestConfig?: runtime.TypedQueryConfig<T, void>): QueryConfig<T> {
    return agenciesDeleteAgencyRaw(requestParameters, requestConfig);
}

/**
 * Return a list of agencies by filter
 */
function agenciesGetAgenciesByFilterRaw<T>(requestParameters: AgenciesGetAgenciesByFilterRequest, requestConfig: runtime.TypedQueryConfig<T, Array<AgencySerializerRead>> = {}): QueryConfig<T> {
    let queryParameters = null;

    queryParameters = {};


    if (requestParameters.city !== undefined) {
        queryParameters['city'] = requestParameters.city;
    }


    if (requestParameters.zipcode !== undefined) {
        queryParameters['zipcode'] = requestParameters.zipcode;
    }

    const headerParameters : runtime.HttpHeaders = {};


    const { meta = {} } = requestConfig;

    meta.authType = ['bearer'];
    const config: QueryConfig<T> = {
        url: `${runtime.Configuration.basePath}/agencies/agency_filter`,
        meta,
        update: requestConfig.update,
        queryKey: requestConfig.queryKey,
        optimisticUpdate: requestConfig.optimisticUpdate,
        force: requestConfig.force,
        rollback: requestConfig.rollback,
        options: {
            method: 'GET',
            headers: headerParameters,
        },
        body: queryParameters,
    };

    const { transform: requestTransform } = requestConfig;
    if (requestTransform) {
        config.transform = (body: ResponseBody, text: ResponseBody) => requestTransform(body.map(AgencySerializerReadFromJSON), text);
    }

    return config;
}

/**
* Return a list of agencies by filter
*/
export function agenciesGetAgenciesByFilter<T>(requestParameters: AgenciesGetAgenciesByFilterRequest, requestConfig?: runtime.TypedQueryConfig<T, Array<AgencySerializerRead>>): QueryConfig<T> {
    return agenciesGetAgenciesByFilterRaw(requestParameters, requestConfig);
}

/**
 * Return a agency by his id
 */
function agenciesGetAgencyByIdRaw<T>(requestParameters: AgenciesGetAgencyByIdRequest, requestConfig: runtime.TypedQueryConfig<T, AgencySerializerRead> = {}): QueryConfig<T> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
        throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling agenciesGetAgencyById.');
    }

    let queryParameters = null;


    const headerParameters : runtime.HttpHeaders = {};


    const { meta = {} } = requestConfig;

    meta.authType = ['bearer'];
    const config: QueryConfig<T> = {
        url: `${runtime.Configuration.basePath}/agencies/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
        meta,
        update: requestConfig.update,
        queryKey: requestConfig.queryKey,
        optimisticUpdate: requestConfig.optimisticUpdate,
        force: requestConfig.force,
        rollback: requestConfig.rollback,
        options: {
            method: 'GET',
            headers: headerParameters,
        },
        body: queryParameters,
    };

    const { transform: requestTransform } = requestConfig;
    if (requestTransform) {
        config.transform = (body: ResponseBody, text: ResponseBody) => requestTransform(AgencySerializerReadFromJSON(body), text);
    }

    return config;
}

/**
* Return a agency by his id
*/
export function agenciesGetAgencyById<T>(requestParameters: AgenciesGetAgencyByIdRequest, requestConfig?: runtime.TypedQueryConfig<T, AgencySerializerRead>): QueryConfig<T> {
    return agenciesGetAgencyByIdRaw(requestParameters, requestConfig);
}

/**
 * Return a list of all agencies
 */
function agenciesGetAllAgenciesRaw<T>(requestParameters: AgenciesGetAllAgenciesRequest, requestConfig: runtime.TypedQueryConfig<T, Array<AgencySerializerRead>> = {}): QueryConfig<T> {
    let queryParameters = null;

    queryParameters = {};


    if (requestParameters.expanded !== undefined) {
        queryParameters['expanded'] = requestParameters.expanded;
    }

    const headerParameters : runtime.HttpHeaders = {};


    const { meta = {} } = requestConfig;

    meta.authType = ['bearer'];
    const config: QueryConfig<T> = {
        url: `${runtime.Configuration.basePath}/agencies`,
        meta,
        update: requestConfig.update,
        queryKey: requestConfig.queryKey,
        optimisticUpdate: requestConfig.optimisticUpdate,
        force: requestConfig.force,
        rollback: requestConfig.rollback,
        options: {
            method: 'GET',
            headers: headerParameters,
        },
        body: queryParameters,
    };

    const { transform: requestTransform } = requestConfig;
    if (requestTransform) {
        config.transform = (body: ResponseBody, text: ResponseBody) => requestTransform(body.map(AgencySerializerReadFromJSON), text);
    }

    return config;
}

/**
* Return a list of all agencies
*/
export function agenciesGetAllAgencies<T>(requestParameters: AgenciesGetAllAgenciesRequest, requestConfig?: runtime.TypedQueryConfig<T, Array<AgencySerializerRead>>): QueryConfig<T> {
    return agenciesGetAllAgenciesRaw(requestParameters, requestConfig);
}

/**
 * Update a agency by its id
 */
function agenciesUpdateAgencyRaw<T>(requestParameters: AgenciesUpdateAgencyRequest, requestConfig: runtime.TypedQueryConfig<T, AgencySerializerRead> = {}): QueryConfig<T> {
    if (requestParameters.id === null || requestParameters.id === undefined) {
        throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling agenciesUpdateAgency.');
    }

    let queryParameters = null;


    const headerParameters : runtime.HttpHeaders = {};

    headerParameters['Content-Type'] = 'application/json';


    const { meta = {} } = requestConfig;

    meta.authType = ['bearer'];
    const config: QueryConfig<T> = {
        url: `${runtime.Configuration.basePath}/agencies/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
        meta,
        update: requestConfig.update,
        queryKey: requestConfig.queryKey,
        optimisticUpdate: requestConfig.optimisticUpdate,
        force: requestConfig.force,
        rollback: requestConfig.rollback,
        options: {
            method: 'PUT',
            headers: headerParameters,
        },
        body: queryParameters || requestParameters.body as any,
    };

    const { transform: requestTransform } = requestConfig;
    if (requestTransform) {
        config.transform = (body: ResponseBody, text: ResponseBody) => requestTransform(AgencySerializerReadFromJSON(body), text);
    }

    return config;
}

/**
* Update a agency by its id
*/
export function agenciesUpdateAgency<T>(requestParameters: AgenciesUpdateAgencyRequest, requestConfig?: runtime.TypedQueryConfig<T, AgencySerializerRead>): QueryConfig<T> {
    return agenciesUpdateAgencyRaw(requestParameters, requestConfig);
}
