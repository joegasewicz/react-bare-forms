import {default as React, ReactElement} from "react";
import {_genericFormGroup, AbstractField, IAbstractField} from "./_AbstractField";
import {IFormContext} from "../form";
import {FIELD_NAMES} from "../elements";
import {mergeDefaultCssWithProps} from "../core/_helpers";



/** @internal */
export class CheckBoxField<T extends any> extends AbstractField<T> implements IAbstractField<T> {

    constructor(type: FIELD_NAMES, props: T) {
        super(props, type);
        this.type = type;
        this.props = props;
    }

    public create() {
        return this.createField(this.getField());
    }

    public formGroup(children: any): React.ReactElement {
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
                onChange={(e) => (context as any).updateParentState(this.overrideEvent(e, context.state[this.props.name]), this.props.name)}
                name={this.props.name}
                className={AbstractField.mergeDefaultCssWithProps("form-check-input", this.props.className, (context as any).bare)}
            />;
        }
    }
}

/** @internal */
export class TextAreaField<T extends any> extends AbstractField<T> implements IAbstractField<T> {
    constructor(type: FIELD_NAMES, props: T) {
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
        const {rows = 5} = this.props;
        return (context: IFormContext) => {
            return (
                <textarea
                    className={mergeDefaultCssWithProps("form-control", this.props.className, (context as any).bare)}
                    rows={rows}
                    value={context.state[this.props.name] || ""}
                    onChange={(e) => (context as any).updateParentState(e, this.props.name)}
                    name={this.props.name}
                />
            );
        }
    }
}
