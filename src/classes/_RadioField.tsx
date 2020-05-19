import {default as React, useContext} from "react";
import {AbstractField, IAbstractField} from "./_AbstractField";
import {FIELD_NAMES, IRadioGroupProps} from "../elements";
import {IFormContext, IRadioGroupParentContext, RadioGroupContext} from "../form";
import {updateRadioGroupStateFromPassedInContext} from "../core/_handlers";



/** @internal */
export class RadioField<T extends any> extends AbstractField<T> implements IAbstractField<T> {
    public _parentName?: string;
    constructor(type: FIELD_NAMES, props: T) {
        super(props, type);
        this.type = type;
        this.props = props;
    }

    get parentName(): string|undefined {
        return this._parentName;
    }

    set parentName(val: string|undefined) {
        this._parentName = val;
    }

    public create() {
        return this.createField(this.getField());
    }

    public formGroup(children: any): React.ReactElement {
        return (
            <div className="form-group form-check">
                {children}
                {this.props.labelText && <label className="form-check-label">{this.props.labelText}</label>}
                {this.props.hint && <small className="form-text text-muted">{this.props.hint}</small>}
            </div>
        );
    }

    public getField() {
        const radioContext: IRadioGroupParentContext = useContext(RadioGroupContext) as any;
        this.parentName = (radioContext  as any).parent.name;



        const test = (e: React.ChangeEvent<any>) => {
            let event: React.ChangeEvent<HTMLFormElement> = this.overrideEvent(e, e.target.value);
            console.log("Radiocontext----->", radioContext);
            (this.context as any).updateRadioGroupStateFromPassedInContext(event, this.props.name, radioContext);
        };

        return () => {
            return <input
                type={this.type}
                checked={(this.context as IFormContext).state[this.props.name] || false}
                name={this.props.name}
                onChange={e => test(e)}
                className={AbstractField.mergeDefaultCssWithProps("form-check-input", this.props.className, (this.context as any).bare)}
            />
        }
    }
}
