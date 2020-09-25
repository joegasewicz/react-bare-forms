import { default as React } from "react";
import { AbstractField, IAbstractField } from "./_AbstractField";
import { FIELD_NAMES, IRadioField } from "../elements";
import { IRadioGroupParentContext } from "../form";
import { IValidation } from "../validators";
export declare type TypeMetadataRadioGroupValue = {
    value: boolean;
    parentName: string;
    name: string;
};
/** @internal */
export declare class RadioField<T extends IRadioField> extends AbstractField<T> implements IAbstractField<T> {
    private _parentName?;
    props: any;
    type: any;
    radioContext?: IRadioGroupParentContext;
    constructor(type: FIELD_NAMES, props: T);
    get parentName(): string | undefined;
    set parentName(val: string | undefined);
    create(): JSX.Element;
    formGroup(children: any): React.ReactElement;
    getField(): () => JSX.Element;
    handleOnChange: (e: React.ChangeEvent<any>, radioContext: IRadioGroupParentContext) => void;
    validate(): Array<IValidation>;
}
