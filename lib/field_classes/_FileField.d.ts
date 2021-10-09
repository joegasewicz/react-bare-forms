import { ChangeEvent, default as React } from "react";
import { AbstractField, IAbstractField } from "./_AbstractField";
import { FIELD_NAMES, IField } from "../elements";
import { IFile } from "../core/index";
/**
 * @internal
 * The main difference of this class is that the onChange event is used only
 * to carry out the validation (which is set manually in FileField._updateFieldValidation).
 */
export declare class FileField<T extends IField<HTMLInputElement>> extends AbstractField<T> implements IAbstractField<T> {
    _file?: IFile | null;
    constructor(type: FIELD_NAMES, props: T & IField<HTMLInputElement>);
    get file(): IFile | null;
    set file(val: IFile | null);
    create(): JSX.Element;
    formGroup(children: any): React.ReactElement;
    handleOnChange: (e: ChangeEvent<HTMLInputElement>) => void;
    private setSizeStyles;
    getField(): () => JSX.Element;
    private _updateFieldValidation;
    /**
     * @internal
     * @param _
     * @description This overrides the same behaviour in the parentName class.
     */
    getFieldValue(_: unknown): any;
}
