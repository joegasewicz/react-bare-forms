import { default as React } from "react";
import { AbstractField, IAbstractField } from "./_AbstractField";
import { FIELD_NAMES, IField, ISelectField } from "../elements";
/** @internal */
export declare class SelectField<T extends IField & ISelectField> extends AbstractField<T> implements IAbstractField<T> {
    constructor(type: FIELD_NAMES, props: T);
    create(): JSX.Element;
    formGroup(children: any): React.ReactElement;
    private _getOptions;
    getField(): () => JSX.Element;
    private getSelectCssName;
}
