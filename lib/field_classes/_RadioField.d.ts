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
    /**
     * @internal
     * @param props
     * @description This is so that both class components & hook based
     * components get updated. See https://github.com/joegasewicz/react-bare-forms/issues/100.
     * The AbstractField's getFieldValue implementation differs because the value of
     * the form element can be derived directly from props.
     */
    getFieldValue(props: T): any;
    validate(): Array<IValidation>;
}
