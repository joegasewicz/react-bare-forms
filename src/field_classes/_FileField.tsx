import {default as React} from "react";
import {_genericFormGroup, AbstractField, IAbstractField} from "./_AbstractField";
import {FIELD_NAMES, IField, IFileField} from "../elements";
import {createFileObject, IFile} from "../core/index";


/**
 * @internal
 * The main difference of this class is that the onChange event is used only
 * to carry out the validation (which is set manually in FileField._updateFieldValidation).
 */
export class FileField<T extends IField> extends AbstractField<T> implements IAbstractField<T> {

    _file?: IFile|null;

    constructor(type: FIELD_NAMES, props: T & IFileField) {
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
            {...this.props}
            ref={(this.props as any).ref}
            type={this.type}
            onChange={this._updateFieldValidation.bind(this)}
            className={AbstractField.mergeDefaultCssWithProps("form-control-file", this.props.className, (this.context as any).bare)}
        />}</>;
    }

    private _updateFieldValidation = (): void => {
        this.file = createFileObject((this.props as any).ref);
        if(typeof this.file !== "undefined") {
            this.validate();
        }
    };

    /**
     * @internal
     * @param _
     * @description This overrides the same behaviour in the parentName class.
     */
    public getFieldValue(_: unknown): any {
        if((this.props as T & IFileField).ref.current) {
            return createFileObject((this.props as T & IFileField).ref);
        }
        return null;
    }
}
