import {Context, default as React, ReactElement} from "react";

import {IFormContext} from "../form";
import {FIELD_NAMES, IField} from "../elements";
import {_genericFormGroup, AbstractField, IAbstractField} from "./_AbstractField";


/** @internal */
export class InputField<T extends IField> extends AbstractField<T> implements IAbstractField<T> {

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
        return () => <>{<input
            {...this.props}
            type={this.type}
            value={this.getStatePositionFromFormKey()[this.props.name]|| ""}
            onChange={(e) => (this.context as any).updateParentState(e, this.props.name)}
            name={this.props.name}
            className={AbstractField.mergeDefaultCssWithProps("form-control", this.props.className, this.bare)}
        />}</>;
    }
}
