import { ReactElement } from "react";
import { AbstractField, IAbstractField } from "./_AbstractField";
import { FIELD_NAMES, ITextAreaField } from "../elements";
/** @internal */
export declare class TextAreaField<T extends ITextAreaField> extends AbstractField<T> implements IAbstractField<T> {
    constructor(type: FIELD_NAMES, props: T & ITextAreaField);
    create(): JSX.Element;
    formGroup(children: any): ReactElement;
    getField(): () => JSX.Element;
}
