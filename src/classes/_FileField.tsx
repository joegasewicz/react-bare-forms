import {default as React} from "react";
import {_genericFormGroup, AbstractField, IAbstractField} from "./_AbstractField";
import {FIELD_NAMES} from "../elements";
import {createFileObject, IFile} from "../core/_file";
import {IFormContext} from "../form";
import {getFieldValueType} from "../core/_helpers";


/**
 * @internal
 * The main difference of this class is that the onChange event is used only
 * to carry out the validation (which is set manually in FileField._updateFieldValidation).
 * This then updates the *files* metadata state only. See src/uncrontrolled.ts
 */
export class FileField<T extends any> extends AbstractField<T> implements IAbstractField<T> {

    _file?: IFile|null;

    constructor(type: FIELD_NAMES, props: T) {
        super(props, type);
        this.type = type;
        this.props = props;
    }

    get file() {
        return this._file as IFile|null;
    }

    set file(val: IFile|null) {
        this._file = val;
    }

    public create() {
        return this.createField(this.getField());
    }

    public formGroup(children: any): React.ReactElement {
        return _genericFormGroup<T>(this.props, children);
    }

    public getField() {
        return () => <>{<input
            ref={this.props.ref}
            type={this.type}
            onChange={this._updateFieldValidation.bind(this)}
            className={AbstractField.mergeDefaultCssWithProps("form-control-file", this.props.className, (this.context as any).bare)}
        />}</>;
    }

    private _updateFieldValidation = (): void => {
        this.file = createFileObject(this.props.ref);
        if(typeof this.file !== "undefined") {
            this.metadata.update(this.file, (this.context as IFormContext).metadata.files.state[this.props.name].validation);
        }
    };

    /**
     * @internal
     * @param _
     * @description This overrides the same behaviour in the parent class.
     */
    public getFieldValue(_: unknown): any {
        if(this.props.ref.current) {
            return createFileObject(this.props.ref);
        }
        return null;
    }
}
