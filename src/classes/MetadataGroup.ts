import {IFieldValidation, METADATA_NAMES} from "../form";
import {IValidation} from "../validators";
import {getFieldValueType} from "../core/_helpers";
import {FIELD_NAMES} from "../elements";
import {AbstractMetadata} from "./_AbstractMetadata";


/** @internal **/
export class MetadataGroup<T> extends AbstractMetadata<T> {
    public defaultState = {} as T;
    public readonly parentName: string;

    constructor(state: {[k: string]: T}, updateState: Function, type: METADATA_NAMES) {
        super(state, updateState, type);
    }

    public init(name: string, fieldType: FIELD_NAMES): void {
        this.name = name;
        this.fieldType = fieldType;
    }

    public update(props: any, validation: Array<IValidation>): void {

    }
}
