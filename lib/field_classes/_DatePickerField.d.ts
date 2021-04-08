import { default as React } from "react";
import { AbstractField } from "./index";
import { FIELD_NAMES, IDatePicker } from "../elements";
import 'react-day-picker/lib/style.css';
export declare class DatePickerField<T extends IDatePicker> extends AbstractField<T> implements AbstractField<T> {
    constructor(type: FIELD_NAMES, props: T & IDatePicker);
    create(): JSX.Element;
    formGroup(children: any): React.ReactElement;
    private onHandleChange;
    getField(): () => JSX.Element;
}
