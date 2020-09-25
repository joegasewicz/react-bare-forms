import { METADATA_NAMES } from "../form";
import { IValidation } from "../validators";
import { FIELD_NAMES } from "../elements";
/** @internal **/
export interface IMetadata<T> {
    state: {
        [k: string]: T;
    };
    readonly updateState: Function;
    readonly metaType: string;
    fieldType: FIELD_NAMES;
    parentName?: string;
    readonly name: string;
    defaultState: {};
    init: (name: string, fieldType: FIELD_NAMES) => void;
    update: (props: any, validation: Array<IValidation>) => void;
}
/** @internal **/
export declare abstract class AbstractMetadata<T> implements IMetadata<T> {
    state: {
        [k: string]: T;
    };
    readonly updateState: Function;
    readonly metaType: METADATA_NAMES;
    parentName?: string;
    private _fieldType?;
    private _name?;
    abstract defaultState: T;
    protected constructor(state: {
        [k: string]: T;
    }, updateState: Function, metaType: METADATA_NAMES);
    get name(): string;
    set name(val: string);
    get fieldType(): FIELD_NAMES;
    set fieldType(val: FIELD_NAMES);
    abstract init(name: string, fieldType: FIELD_NAMES): void;
    abstract update(props: any, validation: Array<IValidation>): void;
    isFieldTouched(): boolean;
}
