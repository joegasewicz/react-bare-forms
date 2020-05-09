import {FormContext, IFormContext} from "./form";
import {FormElementValidators, mergeDefaultCssWithProps} from "./_helpers";
import {ChangeEvent, default as React, ReactElement, useContext, useEffect} from "react";
import {
    IFileField,
    RadioGroupContext,
    TypeSelectCssSizeName
} from "./elements";
import {shouldUpdateRadioGroupContext} from "./_context_updaters";

interface IFieldClass<T> {
    create: (context: IFormContext) => ReactElement<T>;
    type: string;
    props: T;
}

/** @internal */
function _genericFormGroup<T extends any>(props: T, children: any) {
    return (
        <div className="form-group">
            {props.labelText && <label>{props.labelText}</label>}
            {children}
            {props.hint && <small className="form-text text-muted">{props.hint}</small>}
        </div>
    );
}

/** @internal */
abstract class _field<PropsType extends any> {

    type: string;

    props: PropsType;

    protected constructor(props: PropsType, type?: string) {
        this.type = type;
        this.props = props;
    }

    public createField(fieldCallback: Function) {
        const context: IFormContext = useContext(FormContext);
        const _validate = this.props.validators ?
            <FormElementValidators
                validators={this.props.validators}
                name={this.props.name}
                value={this.props.value}
                type="inputs"
            /> :
            null;
        if(context.bare) {
            return (<>{fieldCallback(context)}{_validate}</>);
        } else {
            return(<>{this.formGroup(fieldCallback(context))}{ _validate}</>);
        }
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

    public overrideEvent(e: any, value: any) {
        return {
            ...e,
            target: {
                ...e.target,
                value: !value,
            }
        }
    }

}

/** @internal */
export class InputField<T extends any> extends _field<T> implements IFieldClass<T> {

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
                value={context.state[this.props.name] || ""}
                onChange={(e) => context.updateParentState(e, this.props.name)}
                name={this.props.name}
                className={_field.mergeDefaultCssWithProps("form-control", this.props.className, context.bare)}
            />;
        }
    }

}

/** @internal */
export class CheckBoxField<T extends any> extends _field<T> implements IFieldClass<T> {

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
                {children}
                {this.props.labelText && <label className="form-check-label">{this.props.labelText}</label>}
                {this.props.hint && <small className="form-text text-muted">{this.props.hint}</small>}
            </div>
        );
    }

    public getField() {
        return (context: IFormContext) => {
            return <input
                type={this.type}
                checked={context.state[this.props.name] || false}
                onChange={(e) => context.updateParentState(this.overrideEvent(e, context.state[this.props.name]), this.props.name)}
                name={this.props.name}
                className={_field.mergeDefaultCssWithProps("form-check-input", this.props.className, context.bare)}
            />;
        }
    }
}

/** @internal */
export class TextAreaField<T extends any> extends _field<T> implements IFieldClass<T> {

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
                    value={context.state[this.props.name] || ""}
                    onChange={(e) => context.updateParentState(e, this.props.name)}
                    name={this.props.name}
                />
            );
        }
    }
}

/** @internal */
export class RadioField<T extends any> extends _field<T> implements IFieldClass<T> {

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
                {children}
                {this.props.labelText && <label className="form-check-label">{this.props.labelText}</label>}
                {this.props.hint && <small className="form-text text-muted">{this.props.hint}</small>}
            </div>
        );
    }

    public getField() {
        const radioContext: any = useContext(RadioGroupContext); // TODO - any
        return (context: IFormContext) => {
        const updateContexts = (e: React.ChangeEvent<any>, context: IFormContext) => {
            context.updateRadioGroupStateFromPassedInContext(
                this.overrideEvent(e, context.state[this.props.name]),
                this.props.name,
                radioGroup,
            );
            if(shouldUpdateRadioGroupContext(radioContext.children, context, radioContext.parent.name)) {
                useEffect(() => {
                    context.updateRadioGroupMetadata(radioContext.parent.name, radioContext.children);
                }, [radioContext]);

            }
        };
        const radioGroup = context.metadata.fieldGroups[radioContext.parent.name];
        return <input
            type={this.type}
            checked={context.state[this.props.name] || false}
            name={this.props.name}
            className={_field.mergeDefaultCssWithProps("form-check-input", this.props.className, context.bare)}
        />

        }
    }

}

/** @internal */
export class SelectField<T extends any> extends _field<T> implements IFieldClass<T> {

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
        const {options = [], size = "default"} = this.props;
        return (context: IFormContext) => {

            return (
                <select
                    onChange={(e) => context.updateParentState(e, this.props.name)}
                    name={this.props.name}
                    className={_field.mergeDefaultCssWithProps(this.getSelectCssName(this.props.size), this.props.className, context.bare)}
                >
                    {options.map((optVal: string, i: number) => {
                        return <option value={optVal} key={i}>{optVal}</option>
                    })}
                </select>
            );
        }
    }

    private getSelectCssName(name: TypeSelectCssSizeName) {
        if(name === "default") {
            return "form-control"
        } else {
            return `form-control form-control-${name}`;
        }
    }
}

/** @internal */
export class FileField<T extends any> extends _field<T> implements IFieldClass<T> {

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
        return (context: IFormContext) =>
            (<input
                ref={this.props.ref}
                type="file"
                className={_field.mergeDefaultCssWithProps("form-control-file", this.props.className, context.bare)}
            />);
    }
}
