import {ChangeEvent, default as React, ReactElement} from "react";

import {FormContext, IFormContext, TypeCursorPositionState} from "../form";
import {FIELD_NAMES, IField} from "../elements";
import {_genericFormGroup, AbstractField, IAbstractField} from "./_AbstractField";
import {isChar, isNonChar} from "../core/_helpers";


/** @internal */
export class InputField<T extends IField<HTMLInputElement>> extends AbstractField<T> implements IAbstractField<T> {
    constructor(type: FIELD_NAMES, props: T) {
        super(props, type);
        this.type = type;
        this.props = props;
    }

    public create() {
        return this.createField(this.getField());
    }

    public formGroup(children: any): ReactElement {
        return _genericFormGroup<T>(this.props, children);
    }


    private handleOnChange = (e: ChangeEvent<HTMLInputElement>, cursorPositions: TypeCursorPositionState, updateCursorPositionState: any) => {
        updateCursorPositionState(this.props.name, e.target.selectionStart as number);
        (this.context as any).updateParentState(e, this.props.name);
    }

    public getField() {
        return () => <FormContext.Consumer>
            {({ cursorPositions, updateCursorPositionState }: IFormContext) => {
               return <input
                {...this.props}
                type={this.type}
                value={this.getStatePositionFromFormKey()[this.props.name]|| ""}
                onChange={(e) => this.handleOnChange(e, cursorPositions, updateCursorPositionState)}
                onKeyUp={(e) => {
                    if (this.type !== FIELD_NAMES.EMAIL && isChar(e.keyCode)) {
                        e.currentTarget.selectionStart = cursorPositions[this.props.name].cursorPosition;
                        e.currentTarget.selectionEnd = cursorPositions[this.props.name].cursorPosition;
                    }
                }}
                name={this.props.name}
                className={AbstractField.mergeDefaultCssWithProps("form-control", this.props.className, this.bare)}
                />
            }}
        </FormContext.Consumer>;
    }
}
