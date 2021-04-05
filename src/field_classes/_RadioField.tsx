import {default as React, useContext} from "react";
import {AbstractField, IAbstractField} from "./_AbstractField";
import {FIELD_NAMES, IRadioField} from "../elements";
import {IFormContext, IRadioGroupParentContext, RadioGroupContext, TypeFieldValueTypes} from "../form";
import {IValidation} from "../validators";
import {getFieldValueType} from "../core";

export type TypeMetadataRadioGroupValue = { value: boolean, parentName: string, name: string };

/** @internal */
export class RadioField<T extends IRadioField> extends AbstractField<T> implements IAbstractField<T> {
    private __parentName?: string;
    public props: any;
    public type: any;
    public radioContext?: IRadioGroupParentContext; // TODO if more groups are required then make this abstract

    constructor(type: FIELD_NAMES, props: T) {
        super(props, type);
        this.props = props;
        this.type = type;
        this.radioContext = useContext(RadioGroupContext) as any;
        if(this.radioContext && this.radioContext.parent) {
            this.parentName = this.radioContext.parent.name;
            this.metadata.parentName = this.parentName;
        }
    }

    get parentName(): string|undefined {
        return this.__parentName;
    }

    set parentName(val: string|undefined) {
        this.__parentName = val;
    }

    public create() {
        return this.createField(this.getField());
    }

    public formGroup(children: any): React.ReactElement {
        return (
            <div className="form-group form-check">
                {children}
                {this.props.labeltext && <label className="form-check-label">{this.props.labelText}</label>}
                {this.props.hint && <small className="form-text text-muted">{this.props.hint}</small>}
            </div>
        );
    }

    public getField() {
        return () => {
            return <input
                {...this.props}
                type={this.type}
                checked={this.getStatePositionFromFormKey()[this.props.name] || false}
                name={this.props.name}
                onChange={e => this.handleOnChange(e, (this.radioContext as IRadioGroupParentContext))}
                className={AbstractField.mergeDefaultCssWithProps("form-check-input", this.props.className, (this.context as any).bare)}
            />
        }
    }

    handleOnChange = (e: React.ChangeEvent<any>, radioContext: IRadioGroupParentContext) => {
        let event: React.ChangeEvent<HTMLFormElement> = this.overrideEvent(e, e.target.value);
        (this.context as any).updateRadioGroupStateFromPassedInContext(event, this.props.name, radioContext);
    };

    /**
     * @internal
     * @param props
     * @description This is so that both class components & hook based
     * components get updated. See https://github.com/joegasewicz/react-bare-forms/issues/100.
     * The AbstractField's getFieldValue implementation differs because the value of
     * the form element can be derived directly from props.
     */
    public getFieldValue(props: T): any {
        const formKey = this.context?.formKey;
        if (formKey) {
            return this.context?.state[formKey][this.props.name] || false;
        }
        return this.context?.state[this.props.name] || false;
    }

    public validate(): Array<IValidation> {
        let value = this.getFieldValue(this.props);
        // Carry out the validation
        let validation = this.doValidation(value);
        // Update the metadata type state
        this.metadata.update({ value, parentName: this.parentName, name: this.props.name} as TypeMetadataRadioGroupValue, validation);
        return validation;
    }

}
