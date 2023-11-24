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
 * @interface MailsConfirmAccountMailRequest
 */
export interface MailsConfirmAccountMailRequest  {
    /**
     * 
     * @type {number}
     * @memberof MailsConfirmAccountMailRequest
     */
    id?: number;
}

export function MailsConfirmAccountMailRequestFromJSON(json: any): MailsConfirmAccountMailRequest {
    return {
        'id': !exists(json, 'id') ? undefined : json['id'],
    };
}

export function MailsConfirmAccountMailRequestToJSON(value?: MailsConfirmAccountMailRequest): any {
    if (value === undefined) {
        return undefined;
    }
    return {
        'id': value.id,
    };
}

