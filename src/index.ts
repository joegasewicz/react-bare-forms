import {Form, FormConsumer} from "./form";
import {
    CheckBoxField,
    EmailField,
    FileField,
    ICheckBoxField,
    IEmailField,
    IField,
    IPasswordField,
    IRadioField, ISelectField,
    ITextAreaField,
    ITextInputField,
    IDatePicker,
    IQueryField,
    PasswordField,
    RadioField,
    RadioGroup,
    SelectField,
    SubmitButton,
    TextAreaField,
    TextInputField,
    DatePickerField,
    QueryInputField,
} from "./elements";
import {
    areFieldsEqual,
    customValidator,
    isChecked,
    isEmailValid,
    isFieldEmpty,
    isFile,
    isRadioChecked,
    isValidDate,
} from "./validators";
import {createFileRef, getFileFromRef} from "./uncrontrolled";


export {
    // Uncontrolled
    createFileRef,
    getFileFromRef,
    // Validators
    areFieldsEqual,
    customValidator,
    isChecked,
    isEmailValid,
    isFieldEmpty,
    isFile,
    isRadioChecked,
    isValidDate,
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
    DatePickerField,
    QueryInputField,
};
export type {
    // Interfaces
    ICheckBoxField,
    IEmailField,
    IField,
    IPasswordField,
    IRadioField,
    ITextAreaField,
    ITextInputField,
    ISelectField,
    IDatePicker,
    IQueryField,
};

