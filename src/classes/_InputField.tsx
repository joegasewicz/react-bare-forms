import {Context, default as React, ReactElement, useContext} from "react";

import {
    getMetadataNameType,
} from "../core/_helpers";
import {
    FormContext,
    IFormContext,
    METADATA_NAMES,
    TypeFormMetadata,
} from "../form";
import {
    FIELD_NAMES,
} from "../elements";
import {IValidation} from "../validators";
import {FormElementValidators} from "../core/_components";
import {_genericFormGroup, AbstractField, IAbstractField} from "./_AbstractField";


/** @internal */
export class InputField<T extends any> extends AbstractField<T> implements IAbstractField<T> {

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

        return (context: IFormContext) => {
            return <>{<input
                type={this.type}
                value={this.context.state[this.props.name as T]|| ""}
                onChange={(e) => this.context.updateParentState(e, this.props.name)}
                name={this.props.name}
                className={AbstractField.mergeDefaultCssWithProps("form-control", this.props.className, this.bare)}
            />}</>;
        }
    }
}
