import {default as React} from "react";
import {AbstractField, IAbstractField} from "./_AbstractField";
import {IFormContext} from "../form";
import {FIELD_NAMES, IField, IFieldBase} from "../elements";



/** @internal */
export class CheckBoxField<T extends IFieldBase> extends AbstractField<T> implements IAbstractField<T> {

    constructor(type: FIELD_NAMES, props: T) {
        super(props, type);
        this.type = type;
        this.props = props;
    }

    public create() {
        return this.createField(this.getField());
    }

    public formGroup(children: any): React.ReactElement {
        return (
            <div className="form-group form-check">
                {children}
                {this.props.labeltext && <label className="form-check-label">{this.props.labeltext}</label>}
                {this.props.hint && <small className="form-text text-muted">{this.props.hint}</small>}
            </div>
        );
    }

    public getField() {
        return () => (<>{<input
                {...this.props}
                type={this.type}
                checked={this.getStatePositionFromFormKey()[this.props.name] || false}
                onChange={(e) => (this.context as any).updateParentState(this.overrideEvent(e, this.getStatePositionFromFormKey()[this.props.name]), this.props.name)}
                name={this.props.name}
                className={AbstractField.mergeDefaultCssWithProps("form-check-input", this.props.className, (this.context as any).bare)}
        />}</>);
    }
}

