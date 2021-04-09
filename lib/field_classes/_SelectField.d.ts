import { default as React } from "react";
import { AbstractField, IAbstractField } from "./_AbstractField";
import { FIELD_NAMES, IFieldBase, ISelectField } from "../elements";
/** @internal */
export declare class SelectField<T extends IFieldBase & ISelectField> extends AbstractField<T> implements IAbstractField<T> {
    constructor(type: FIELD_NAMES, props: T);
    create(): JSX.Element;
    formGroup(children: any): React.ReactElement;
    private _getOptions;
    getField(): () => JSX.Element;
    private getSelectCssName;
}
