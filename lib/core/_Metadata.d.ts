import { IFieldValidation, METADATA_NAMES } from "../form";
import { IValidation } from "../validators";
import { FIELD_NAMES } from "../elements";
import { AbstractMetadata } from "./_AbstractMetadata";
/** @internal **/
export declare class Metadata<T extends IFieldValidation> extends AbstractMetadata<T> {
    defaultState: any;
    constructor(state: {
        [k: string]: T;
    }, updateState: Function, type: METADATA_NAMES);
    init(name: string, fieldType: FIELD_NAMES): void;
    update(value: any, validation: Array<IValidation>): void;
}
