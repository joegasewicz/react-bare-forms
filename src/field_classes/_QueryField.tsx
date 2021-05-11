import {ChangeEvent, default as React, ReactElement} from "react";

import {FIELD_NAMES, IField, IQueryField} from "../elements";
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
                        autocomplete="off"
                        onChange={this.handleOnChange}
                        className={AbstractField.mergeDefaultCssWithProps("form-control", this.props.className, this.bare)}
                    />
                    <ul className={`${this.bare ? "": "list-group"}`}>
                        {queryResults.map((result: any, i: number) => {
                            return <li
                                key={i}
                                onClick={e => this.handleOnClick(e, result[(this.props as unknown as IQueryField).objectkey])}
                                className={`${this.bare ? "": "list-group-item"}`}>{result[(this.props as unknown as IQueryField).objectkey]}</li>
                        })}
                    </ul>
                </>
            )
        }
    }
}
