import {default as React, ReactElement} from "react";
import {_genericFormGroup, AbstractField, IAbstractField} from "./_AbstractField";
import {FIELD_NAMES} from "../elements";
import {IFormContext} from "../form";
import {mergeDefaultCssWithProps} from "../core/index";

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
        return () => {
            return (
                <textarea
                    className={mergeDefaultCssWithProps("form-control", this.props.className, (this.context as any).bare)}
                    rows={rows}
                    value={(this.context as IFormContext).state[this.props.name] || ""}
                    onChange={(e) => (this.context as any).updateParentState(e, this.props.name)}
                    name={this.props.name}
                />
            );
        }
    }
}
