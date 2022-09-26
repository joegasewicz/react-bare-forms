import { default as React } from "react";
import { AbstractField } from "./index";
import { FIELD_NAMES, IDatePicker } from "../elements";

import {_genericFormGroup} from "./_AbstractField";
import {DayPicker} from "react-day-picker";
import "react-day-picker/src/style.css";

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

    private onHandleChange = (date: Date | undefined): void => {
        if (date) {
              (this.context as any).updateParentState(null, this.props.name, date);
        }
    }


    public getField() {
        return () => {
            return (
                    <DayPicker
                       mode="single"
                       onSelect={(day: any) => this.onHandleChange(day)}
                       selected={this.getStatePositionFromFormKey()[this.props.name]|| ""}
                    />
            );
        }
    }
}