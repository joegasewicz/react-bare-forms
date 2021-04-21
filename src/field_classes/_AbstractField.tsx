import {default as React, ReactElement, useContext, useEffect} from "react";


import {FIELD_NAMES, IField, IFieldBase} from "../elements";
import {IValidation} from "../validators";
import {
    FormElementValidators,
    getFieldValueType,
    getMetadataNameType,
} from "../core/index";
import {
    FormContext,
    IFormContext, TypeFieldValueTypes,
    TypeFormMetadata,
} from "../form";


/**
 * @internal
 * @child class InputField class has a *file* member
 */
export interface IAbstractField<T> {
    create: (context: IFormContext) => ReactElement<T>;
    type: string;
    props: T;
    metadata: TypeFormMetadata;
    bare: boolean;
    overrideEvent: (e: any, value: any) => React.ChangeEvent<any>;
    getFieldValue: (props: any) => any
    validate?: () => Array<IValidation>;
    doValidation: (value: any) => Array<IValidation>;
}

/** @internal */
export function _genericFormGroup<T extends IFieldBase>(props: T, children: any) {
    return (
        <div className="form-group">
            {props.labeltext && <label>{props.labeltext}</label>}
            {children}
            {props.hint && <small className="form-text text-muted">{props.hint}</small>}
        </div>
    );
}

/** @internal */
export abstract class AbstractField<T extends IFieldBase> {
    public type: FIELD_NAMES;
    public props: T;
    public parent?: string;
    public _metadata?: TypeFormMetadata;
    public _bare?: boolean;
    public context?: IFormContext;
    private _parentName?: string | undefined;

    public get parentName(): string | undefined {
        return this._parentName;
    }
    public set parentName(value: string | undefined) {
        this._parentName = value;
    }

    protected constructor(props: T, type: FIELD_NAMES) {
        this.type = type;
        this.props = props;
        this.init();
    }

    get bare() {
        return Boolean(this._bare);
    }

    set bare(val: boolean) {
        this._bare = val;
    }

    get metadata() {
        return (this._metadata as TypeFormMetadata);
    }

    set metadata(val: TypeFormMetadata) {
        this._metadata = val;
    }

    private init(): void {
        this.context = useContext<IFormContext>(FormContext);
        // this.stateFromFormKey =
        this.metadata = this.context.metadata[getMetadataNameType(this.type)];
        this.metadata.init(this.props.name, this.type);
        this.bare = Boolean(this.context.bare);
    }

    protected getProps(): T {
        return this.props;
    }

    public createField(fieldCallback: Function) {
        const _validate = this.props.validators || this.parentName ?
            <FormElementValidators
                isTouched={this.metadata.isFieldTouched()}
                results={this.validate()}
                name={this.props.name}
                type={getMetadataNameType(this.type)}
                parent={this.parent}
            /> :
            null;

        if (this.bare) {
            return (<>{fieldCallback(this.metadata.state)}{_validate}</>);
        } else {
            return (<>{this.formGroup(fieldCallback(this.metadata.state))}{_validate}</>);
        }
    }

   public doValidation(value: any): Array<IValidation> {
       let validation: Array<IValidation> = [];
       // Carry out the validation
       if (this.props.validators) {
           for(let validate of this.props.validators) {
               validation = [
                   ...validation,
                   validate(value, this.context),
               ];
           }
       }

       return validation;
   }

    /**
     * @internal
     * @description Normally, this method will be called from this super class. But it is public as
     * there are some edge cases where it needs to be called by a child class that extends AbstractField.
     */
    public validate(): Array<IValidation> {
        let value = this.getFieldValue(this.props);
        // Carry out the validation
        let validation = this.doValidation(value);
        // Update the metadata type state
        this.metadata.update(value, validation, this.props.name);
        return validation;
    }

    /**
     * @internal
     * @param props
     * @description This is overridden in the RadioField sub class
     */
    public getFieldValue(props: T): any {
        let type = getFieldValueType(this.type);
        return (this.props as T & TypeFieldValueTypes)[type as any];
    }

    public abstract formGroup(children: any): ReactElement;

    public abstract getField(): (context: IFormContext) => ReactElement;

    static mergeDefaultCssWithProps(defaultValue: string, cssProps: any, bare: boolean): string {
        let cssStr = "";
        if (!bare) {
            cssStr += `${defaultValue} `;
        }
        if (cssProps) {
            cssStr += `${cssProps}`;
        }
        return cssStr;
    }

    public overrideEvent(e: any, value: any): React.ChangeEvent<any> {
        return {
            ...e,
            target: {
                ...e.target,
                value: !value,
            }
        }
    }

    public getStatePositionFromFormKey(): {[key: string]: any} {
        if (this.context?.formKey) {
            return this.context.state[this.context.formKey];
        }
        return this.context?.state;
    }

}
