import { default as React } from "react";
import { AbstractField } from "./index";
import { FIELD_NAMES, IDatePicker } from "../elements";

import {_genericFormGroup} from "./_AbstractField";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

export class DatePickerField<T extends IDatePicker> extends AbstractField<T> implements AbstractField<T> {
    constructor(type: FIELD_NAMES, props: T & IDatePicker) {
        super(props, type);
        this.type = type;
        this.props = props;
    }

    public create() {
        return this.createField(this.getField());
    }

    public formGroup(children: any): React.ReactElement {
        return _genericFormGroup<T>(this.props, children);
    }

    private onHandleChange(date: Date | undefined): void {
        (this.context as any).updateParentState(null, this.props.name, date);
    }


    public getField() {
        return () => {
            return (
                    <DayPickerInput
                        dayPickerProps={{
                            className: this.props.datePickerClassNames ? this.props.datePickerClassNames : "",
                        }}
                        style={{width: "100%"}}
                        inputProps={{
                           style: {display: "block"},
                           className: "form-control"
                       }}
                       onDayChange={day => this.onHandleChange(day)}
                       value={this.getStatePositionFromFormKey()[this.props.name]|| ""}
                    />
            );
        }
    }
}