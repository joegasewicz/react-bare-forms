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
    // Context API
    FormConsumer,
    // Form Components
    CheckBoxField,
    EmailField,
    FileField,
    Form,
    PasswordField,
    RadioField,
    RadioGroup,
    SubmitButton,
    TextAreaField,
    TextInputField,
    SelectField,
}
