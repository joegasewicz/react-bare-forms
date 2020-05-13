//=================================================================
// PRIVATE CLASSES TO CREATE METADATA OBJECTS
//  1. AbstractMetadata
//  2. Metadata
//  3. MetadataGroup
//
//  IMPORTANT: Objects that implement AbstractMetadata DO NOT care about the IFormContext.
//  IMPORTANT: Metadata objects only care about their own IMetadata state type (see METADATA_NAMES).
//  IMPORTANT: Children objects of MetadataGroup care about their parent & their own state type only.
import {
    IInputFieldMetadata,
    METADATA_NAMES, TypeFormMetadata, TypeInputMetadata,
} from "../../form";
import {IValidation} from "../../validators";

/** @internal **/
interface IMetadata<T> {
    readonly state: any;
    readonly updateState: Function;
    readonly type: string;
    readonly parentName?: string;
    readonly name: string;
    defaultState: {};
    init: () => void;
    update: (props: T, validation: Array<IValidation>) => void;
}

/** @internal **/
export abstract class AbstractMetadata<T> implements IMetadata<T> {
    public readonly state: T;
    public readonly updateState: Function;
    public readonly type: METADATA_NAMES;
    public readonly parentName?: string;
    public _name: string;
    public abstract defaultState: T;

    protected constructor(state: T, updateState: Function, type: METADATA_NAMES) {
        this.state = state;
        this.updateState = updateState;
        this.type = type;
    }

    get name() {
        return this._name;
    }

    set name(val: string) {
        this._name = val;
    }

    abstract init(): void

    abstract update(props: T, validation: Array<IValidation>): void;

}

/** @internal **/
export class Metadata<T extends TypeFormMetadata, U extends keyof T> extends AbstractMetadata<T> {
    public defaultState: T;

    constructor(state: T, updateState: Function, type: METADATA_NAMES) {
       super(state, updateState, type);
    }

    public init(): void {
        if(!this.state) {
            this.updateState(this.defaultState);
        }
    }

    public update(value: any, validation: Array<IValidation>): void {
        if(this.state && this.name && !(this.name in this.state) ||
            value !== this.state[this.name as U]) {
            let state = {
                ...this.state,
                [this.name]: {
                    validation,
                    value: value,
                    isTouched: false,
                },
            };
            this.updateState(state);
        }
    }
}

/** @internal **/
export class MetadataGroup<T> extends AbstractMetadata<T> {
    public defaultState = {} as T;
    public readonly parentName: string;

    constructor(state: T, updateState: Function, type: METADATA_NAMES) {
        super(state, updateState, type);
    }

    public init(): void {
        if(!this.state) {
            this.updateState(this.defaultState);
        }
    }

    public update(props: T, validation: Array<IValidation>): void {

    }
}
