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

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface RoleSerializerRead
 */
export interface RoleSerializerRead  {
    /**
     * 
     * @type {number}
     * @memberof RoleSerializerRead
     */
    role_id?: number;
    /**
     * 
     * @type {string}
     * @memberof RoleSerializerRead
     */
    name?: string;
    /**
     * 
     * @type {number}
     * @memberof RoleSerializerRead
     */
    permission_id?: number;
}

export function RoleSerializerReadFromJSON(json: any): RoleSerializerRead {
    return {
        'role_id': !exists(json, 'role_id') ? undefined : json['role_id'],
        'name': !exists(json, 'name') ? undefined : json['name'],
        'permission_id': !exists(json, 'permission_id') ? undefined : json['permission_id'],
    };
}

export function RoleSerializerReadToJSON(value?: RoleSerializerRead): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'role_id': value.role_id,
        'name': value.name,
        'permission_id': value.permission_id,
    };
}

