import {ChangeEvent, default as React, MouseEventHandler, ReactElement} from "react";

import {FIELD_NAMES, IField} from "../elements";
import {_genericFormGroup, AbstractField, IAbstractField} from "./_AbstractField";


/** @internal */
export class QueryField<T extends IField<HTMLInputElement>> extends AbstractField<T> implements IAbstractField<T> {
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

    private handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        (this.context as any).updateParentState(e, this.props.name);
    }

    private handleOnClick = (e: any, value: string) => {
        (this.context as any).updateParentState(e, this.props.name, value);
    }

    public getField() {
        const queryResults = (this.props as any).queryresults || [];
        return () => {
            return (
                <>
                    <input
                        {...this.props}
                        type={this.type}
                        value={this.getStatePositionFromFormKey()[this.props.name]|| ""}
                        name={this.props.name}
                        onChange={this.handleOnChange}
                        className={AbstractField.mergeDefaultCssWithProps("form-control", this.props.className, this.bare)}
                    />
                    <ul className="list-group">
                        {queryResults.map((result: any, i: number) => {
                            return <li key={i} onClick={e => this.handleOnClick(e, result.name)} className="list-group-item">{result.name}</li>
                        })}
                    </ul>
                </>
            )
        }
    }
}
