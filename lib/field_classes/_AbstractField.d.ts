import { default as React, ReactElement } from "react";
import { FIELD_NAMES, IField } from "../elements";
import { IValidation } from "../validators";
import { IFormContext, TypeFormMetadata } from "../form";
/**
 * @internal
 * @child class InputField class has a *file* member
 */
export interface IAbstractField<T> {
    create: (context: IFormContext) => ReactElement<T>;
    type: string;
    props: T;
    metadata: TypeFormMetadata;
    bare: boolean;
    overrideEvent: (e: any, value: any) => React.ChangeEvent<any>;
    getFieldValue: (props: any) => any;
    validate: () => Array<IValidation>;
    doValidation: (value: any) => Array<IValidation>;
}
/** @internal */
export declare function _genericFormGroup<T extends IField>(props: T, children: any): JSX.Element;
/** @internal */
export declare abstract class AbstractField<T extends IField> {
    type: FIELD_NAMES;
    props: T;
    parent?: string;
    _metadata?: TypeFormMetadata;
    _bare?: boolean;
    context?: IFormContext;
    parentName?: string;
    protected constructor(props: T, type: FIELD_NAMES);
    get bare(): boolean;
    set bare(val: boolean);
    get metadata(): TypeFormMetadata;
    set metadata(val: TypeFormMetadata);
    private init;
    protected getProps(): T;
    createField(fieldCallback: Function): JSX.Element;
    doValidation(value: any): Array<IValidation>;
    /**
     * @internal
     * @description Normally, this method will be called from this super class. But it is public as
     * there are some edge cases where it needs to be called by a child class that extends AbstractField.
     */
    validate(): Array<IValidation>;
    /**
     * @internal
     * @param props
     * @description This is overridden in the RadioField sub class
     */
    getFieldValue(props: T): any;
    abstract formGroup(children: any): ReactElement;
    abstract getField(): (context: IFormContext) => ReactElement;
    static mergeDefaultCssWithProps(defaultValue: string, cssProps: any, bare: boolean): string;
    overrideEvent(e: any, value: any): React.ChangeEvent<any>;
    getStatePositionFromFormKey(): {
        [key: string]: any;
    };
}
