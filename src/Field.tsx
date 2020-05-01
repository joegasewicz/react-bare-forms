import {FormConsumer, IFormContext} from "./form";
import {FormElementValidators, FormGroup, mergeDefaultCssWithProps} from "./_helpers";
import {default as React, ReactElement} from "react";
import {IField, ITextAreaField} from "./form-elements";

interface IFormGroup {
    children: any;
    labelText?: string;
    hint?: string;
}

interface IFieldClass<T> {
    create: (context: IFormContext) => ReactElement<T>;
    type?: string;
    props: T;
}

/**
 * @internal
 * @param props
 * @param children
 * @private
 */
function _genericFormGroup<T extends any>(props: T, children: any) {
    return (
        <div className="form-group">
            {props.labelText && <label>{props.labelText}</label>}
            {children}
            {props.hint && <small className="form-text text-muted">{props.hint}</small>}
        </div>
    );
}

abstract class Field<PropsType extends any> {

    type?: string;

    props: PropsType;

    constructor(props: PropsType, type?: string) {
        this.type = type;
        this.props = props;
    }

    public createField(fieldCallback: Function) {
        return (
            <FormConsumer>
                {(context: IFormContext) => {
                    const _validate = this.props.validators ?
                        <FormElementValidators validators={this.props.validators} name={this.props.name} /> :
                        null;
                    if(context.bare) {
                        return (<>{fieldCallback(context)}{_validate}</>);
                    } else {
                        return(<>{this.formGroup(fieldCallback(context))}{ _validate}</>);
                    }
                }}
            </FormConsumer>
        );
    }

    public abstract formGroup(children: any): ReactElement;

    public abstract getField(): (context: IFormContext) => ReactElement;

    static mergeDefaultCssWithProps(defaultValue: string, cssProps: any, bare: boolean): string {
        let cssStr = "";
        if(!bare) {
            cssStr += `${defaultValue} `;
        }
        if (cssProps) {
            cssStr += `${cssProps}`;
        }
        return cssStr;
    }

}


export class InputField<T extends any> extends Field<T> implements IFieldClass<T> {

    constructor(type: string, props: T) {
        super(props, type);
        this.type = type;
        this.props = props;
    }

    public create() {
        return this.createField(this.getField());
    }


    public formGroup(children: any): ReactElement {
        return _genericFormGroup<T>(this.props, children);
    }

    public getField() {
        return (context: IFormContext) => {
            return <input
                type={this.type}
                value={(context as any)[this.props.name]}
                onChange={(e) => context.updateParentState(e, this.props.name)}
                name={this.props.name}
                className={Field.mergeDefaultCssWithProps("form-control", this.props.className, context.bare)}
            />;
        }
    }

}


export class CheckBoxField<T extends any> extends Field<T> implements IFieldClass<T> {

    constructor(type: string, props: T) {
        super(props, type);
        this.type = type;
        this.props = props;
    }

    public create() {
        return this.createField(this.getField());
    }


    public formGroup(children: any): ReactElement {
        return (
            <div className="form-group form-check">
                {this.props.children}
                {this.props.labelText && <label className="form-check-label">{this.props.labelText}</label>}
                {this.props.hint && <small className="form-text text-muted">{this.props.hint}</small>}
            </div>
        );
    }

    public getField() {
        return (context: IFormContext) => {
            return <input
                type={this.type}
                value={(context as any)[this.props.name]}
                onChange={(e) => context.updateParentState(e, this.props.name)}
                name={this.props.name}
                className={Field.mergeDefaultCssWithProps("form-check-input", this.props.className, context.bare)}
            />;
        }
    }

}


export class TextAreaField<T extends any> extends Field<T> implements IFieldClass<T> {

    constructor(props: T) {
        super(props);
        this.props = props;
    }

    public create() {
        return this.createField(this.getField());
    }


    public formGroup(children: any): ReactElement {
        return _genericFormGroup<T>(this.props, children);
    }

    public getField() {
        const {rows = 5} = this.props;
        return (context: IFormContext) => {
            return (
                <textarea
                    className={mergeDefaultCssWithProps("form-control", this.props.className, context.bare)}
                    rows={rows}
                    value={(context as any)[this.props.name] }
                    onChange={(e) => context.updateParentState(e, this.props.name)}
                    name={this.props.name}
                />
            );

        }
    }

}

// class CheckBox extends Field implements IFieldClass {
//     constructor(type: string, props: IField) {
//         super(type, props);
//         this.type = type;
//         this.props = props;
//     }
//
//     public create() {
//         return this.createField(this.getField());
//     }
// }


// class Radio extends Field implements IFieldClass {
//
// }
//
// class Select extends Field implements IFieldClass {
//
// }
//
// class Submit extends Field implements IFieldClass {
//
// }
