import {IRadioGroupParentContext, METADATA_NAMES} from "../form";
import {IValidation} from "../validators";
import {getFieldValueType} from "../core/_helpers";
import {FIELD_NAMES} from "../elements";
import {AbstractMetadata} from "./_AbstractMetadata";
import {TypeMetadataRadioGroupValue} from "./_RadioField";


/** @internal **/
export class MetadataGroup<T> extends AbstractMetadata<T> {
    public defaultState = {} as T;
    public readonly parentName?: string;

    constructor(state: {[k: string]: T}, updateState: Function, type: METADATA_NAMES) {
        super(state, updateState, type);
    }

    public init(name: string, fieldType: FIELD_NAMES): void {
        this.name = name;
        this.fieldType = fieldType;
    }

    private _createGroupState(current: TypeMetadataRadioGroupValue, validation: Array<IValidation>, isTouched=true): IRadioGroupParentContext {
        return {
            ...this.state,
            [current.parentName]: {
                ...this.state[current.parentName],
                [this.name]: {
                    parent: current.parentName,
                    name: this.name,
                    validation: validation || [],
                    isTouched,
                    fieldValues: {
                        type: getFieldValueType(this.fieldType),
                        value: current.value,
                    },
                },
            },
        };
    }

    public update(current: TypeMetadataRadioGroupValue, validation: Array<IValidation>): void {
        let state = {};
        if(!this.state[current.parentName]) {
            state = this._createGroupState(current, validation, false);
            this.updateState(state);
        } else if(this.state[current.parentName] && !(this.name in this.state[current.parentName])) {
            // For readability - keep this coercion & the next, separate please
            state = this._createGroupState(current, validation);
            this.updateState(state);
        } else if((this.state[current.parentName] as any)[this.name] &&
            (this.state[current.parentName] as any)[this.name].fieldValues.value !== current.value) {
            state = this._createGroupState(current, validation);
            this.updateState(state);
        }
    }
}
