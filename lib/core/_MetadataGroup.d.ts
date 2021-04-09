import { METADATA_NAMES } from "../form";
import { IValidation } from "../validators";
import { FIELD_NAMES } from "../elements";
import { AbstractMetadata } from "./_AbstractMetadata";
import { TypeMetadataRadioGroupValue } from "../field_classes/_RadioField";
/** @internal **/
export declare class MetadataGroup<T> extends AbstractMetadata<T> {
    defaultState: T;
    parentName?: string;
    constructor(state: {
        [k: string]: T;
    }, updateState: Function, type: METADATA_NAMES);
    init(name: string, fieldType: FIELD_NAMES): void;
    /**
     * @internal
     * @param current
     * @param validation
     * @param isTouched {Boolean} - Set this to false on init
     * @private
     */
    private _createGroupState;
    /** @internal */
    update(current: TypeMetadataRadioGroupValue, validation: Array<IValidation>): void;
    isFieldTouched(): boolean;
}
