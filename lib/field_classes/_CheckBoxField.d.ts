import { default as React } from "react";
import { AbstractField, IAbstractField } from "./_AbstractField";
import { FIELD_NAMES, IFieldBase } from "../elements";
/** @internal */
export declare class CheckBoxField<T extends IFieldBase> extends AbstractField<T> implements IAbstractField<T> {
    constructor(type: FIELD_NAMES, props: T);
    create(): JSX.Element;
    formGroup(children: any): React.ReactElement;
    getField(): () => JSX.Element;
}
