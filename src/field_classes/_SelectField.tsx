import {default as React} from "react";

import {_genericFormGroup, AbstractField, IAbstractField} from "./_AbstractField";
import {FIELD_NAMES, IField, ISelectField, TypeSelectCssSizeName} from "../elements";


/** @internal */
export class SelectField<T extends IField & ISelectField> extends AbstractField<T> implements IAbstractField<T> {

    constructor(type: FIELD_NAMES, props: T) {
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

    private _getOptions(options: Array<any> = []) {
        if(this.props.objectKey && this.props.objectValue) {
            return options.map((optVal: string, i: number) => {
                return <option value={optVal[this.props.objectKey as any]} key={i}
                >{optVal[this.props.objectValue as any]}</option>
            })
        } else {
            return options.map((optVal: string, i: number) => {
                return <option value={optVal} key={i}>{optVal}</option>
            });
        }

    }

    public getField() {
        const {options = [], size = "default"} = this.props;

        return () => {
            return (
                <select
                    onChange={(e) => (this.context as any).updateParentState(e, this.props.name)}
                    name={this.props.name}
                    className={AbstractField.mergeDefaultCssWithProps(this.getSelectCssName((this.props as any).size), this.props.className, (this.context as any).bare)}
                >
                    {this._getOptions(options)}
                </select>
            );
        }
    }

    private getSelectCssName(name: TypeSelectCssSizeName) {
        if(name === "default") {
            return "form-control"
        } else {
            return `form-control form-control-${name}`;
        }
    }
}
