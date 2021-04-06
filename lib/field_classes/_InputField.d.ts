import { ReactElement } from "react";
import { FIELD_NAMES, IField } from "../elements";
import { AbstractField, IAbstractField } from "./_AbstractField";
/** @internal */
export declare class InputField<T extends IField<HTMLInputElement>> extends AbstractField<T> implements IAbstractField<T> {
    constructor(type: FIELD_NAMES, props: T);
    create(): JSX.Element;
    formGroup(children: any): ReactElement;
    private handleOnChange;
    getField(): () => JSX.Element;
}
