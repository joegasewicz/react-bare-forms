import {default as React, ReactElement, useContext} from "react";

import {
    getFieldValueType,
    getMetadataNameType,
} from "../core/_helpers";
import {
    FormContext,
    IFormContext, IRadioGroupParentContext,
    TypeFormMetadata,
} from "../form";
import {
    FIELD_NAMES,
} from "../elements";
import {IValidation} from "../validators";
import {FormElementValidators} from "../core/_components";



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
    validate: () => Array<IValidation>;
    doValidation: (value: any) => Array<IValidation>;
}

/** @internal */
export function _genericFormGroup<T extends any>(props: T, children: any) {
    return (
        <div className="form-group">
            {props.labelText && <label>{props.labelText}</label>}
            {children}
            {props.hint && <small className="form-text text-muted">{props.hint}</small>}
        </div>
    );
}

/** @internal */
export abstract class AbstractField<PropsType extends any> {
    public type: FIELD_NAMES;
    public props: PropsType;
    public parent?: string;
    public _metadata?: TypeFormMetadata;
    public _bare?: boolean;
    public context?: IFormContext;
    public parentName?: string;

    protected constructor(props: PropsType, type: FIELD_NAMES) {
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
        this.metadata = this.context.metadata[getMetadataNameType(this.type)];
        this.metadata.init(this.props.name, this.type);
        this.bare = Boolean(this.context.bare);
    }

    protected getProps(): PropsType {
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
       for(let index in this.props.validators) {
           validation = [
               ...validation,
               this.props.validators[index](value, this.context),
           ];
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
        this.metadata.update(value, validation);
        return validation;
    }

    public getFieldValue(props: PropsType): any {
        let type = getFieldValueType(this.type);
        return this.props[type];
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
}
