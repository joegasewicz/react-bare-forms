import {Form, FormConsumer} from "./form";
import {
    CheckBoxField,
    EmailField, FileField,
    PasswordField, RadioField, RadioGroup,
    SelectField,
    SubmitButton,
    TextAreaField,
    TextInputField
} from "./elements";
import {areFieldsEqual, isChecked, isEmailValid, isFieldEmpty, isFile, isRadioChecked} from "./validators";
import {createFileRef, getFileFromRef} from "./uncrontrolled";




export {
    // Uncontrolled
    createFileRef,
    getFileFromRef,
    // Validators
    areFieldsEqual,
    isChecked,
    isEmailValid,
    isFieldEmpty,
    isFile,
    isRadioChecked,
    // Form Components
    FormConsumer,
    Form,
    SubmitButton,
    TextInputField,
    EmailField,
    PasswordField,
    TextAreaField,
    CheckBoxField,
    SelectField,
    FileField,
    RadioField,
    RadioGroup,
}
