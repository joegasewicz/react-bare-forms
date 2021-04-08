import * as React from "react";
import {
    areFieldsEqual,
    createFileRef,
    getFileFromRef,
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
    isChecked,
    isEmailValid,
    isFieldEmpty,
    isFile,
    isRadioChecked,
    DatePickerField, isValidDate,
} from "../src";


interface IProps{}

const myFileRef = createFileRef();
const myFileRef2 = createFileRef();

interface IState{

    formData: {
        username: string;
        age: number;
        password: string;
        confirmPassword: string;
        email: string;
        about: string;
        terms: boolean;
        radio1: boolean;
        radio2: boolean;
        radio3: boolean;
        fruitChoice: string;
        myFileTest?: any;
        date?: any;
    }
}

export function FPForm() {
    const state = {age: 0, password: "", radio1: false, radio2: true, radio3: false, date: "" }

    const [fpState, fpSetState] = React.useState(state);

    const fromDate = new Date("2021-04-01");
    const toDate = new Date("2021-04-10");
    return <>
        <h2>Form with hooks</h2>
        <Form
            state={fpState}
            context={fpSetState}
            bare={false}
            autoComplete="off"
            callback={() => console.log("Form submitted!")}>

            <p>Hello</p>
            <DatePickerField
                value={fpState.date}
                name="date"
                validators={[isValidDate([fromDate, toDate])]}
            />

            <TextInputField
                value={fpState.age}
                name="age"
                hint="Enter your age"
                labeltext="Age"
                validators={[isFieldEmpty(2)]} />

            <PasswordField
                name="password"
                value={fpState.password}
                labeltext="Password"
                validators={[isFieldEmpty(2)]}
            />

            <RadioGroup name="group1">
                <RadioField
                    name="radio1"
                    checked={state.radio1}
                    hint="Click to agree"
                    labeltext="Radio 1"
                />
                <RadioField
                    name="radio2"
                    checked={state.radio2}
                    hint="Click to agree"
                    labeltext="Radio 2"
                    validators={[isRadioChecked()]}
                />

                <RadioField
                    name="radio3"
                    checked={state.radio3}
                    hint="Click to agree"
                    labeltext="Radio 3"
                />
                </RadioGroup>
                    
            <SubmitButton>Submit Form</SubmitButton>
            <br />
            <FormConsumer>
                {(context: any) => {
                    // this.setState({...context});
                    return <div className="container"><code><var>metadata</var>: {JSON.stringify(context.metadata)}</code></div>;
                }}
            </FormConsumer>
            <br/>
            <br/>
                <FormConsumer>
                    {(context: any) => {
                        // this.setState({...context});
                        return <div className="container"><code><var>state</var>: {JSON.stringify(context.state)}</code></div>;
                    }}
                </FormConsumer>
        </Form>
    </>;
}


export class Main extends React.Component<IProps, IState> {


    state = {
        formData: {
          username: "",
            age: 0,
            password: "",
            confirmPassword: "",
            email: "",
            about: "",
            terms: false,
            radio1: false,
            radio2: true,
            radio3: false,
            fruitChoice: "",
            myFileTest: getFileFromRef(myFileRef),
            myFileTest2: getFileFromRef(myFileRef2),
        }

    };

    public render(): React.ReactElement {
        return (
            <>
                <h2>Form with Class Component</h2>
                            <Form
                                state={this.state}
                                formKey="formData"
                                context={this}
                                autoComplete="off"
                                callback={() => console.log("Form submitted ----> ", getFileFromRef(myFileRef))}>

                                <TextInputField
                                    value={this.state.formData.age}
                                    name="age"
                                    hint="Enter your age"
                                    labeltext="Age"
                                    validators={[isFieldEmpty(2)]}
                                />

                               <TextInputField
                                    value={this.state.formData.username}
                                    name="username"
                                    hint="Enter your username"
                                    labeltext="Username"
                                    validators={[isFieldEmpty(5)]}
                                />

                                <PasswordField
                                    name="password"
                                    value={this.state.formData.password}
                                    labeltext="Password"
                                />

                                <PasswordField
                                    name="confirmPassword"
                                    value={this.state.formData.confirmPassword}
                                    hint="Password must match"
                                    labeltext="Confirm Password"
                                    validators={[areFieldsEqual("password")]}
                                />

                               <EmailField
                                    name="email"
                                    value={this.state.formData.email}
                                    hint="Your email"
                                    labeltext="Please enter your email"
                                    validators={[isEmailValid()]}
                                />

                                <TextAreaField
                                    name="about"
                                    value={this.state.formData.about}
                                    hint="Your email"
                                    labeltext="Must be at least 20 characters"
                                    validators={[isFieldEmpty(20)]}
                                />

                                <CheckBoxField
                                    name="terms"
                                    checked={this.state.formData.terms}
                                    hint="Click to agree"
                                    labeltext="Agree to terms & conditions"
                                    validators={[isChecked()]}
                                />

                                <SelectField
                                    size="lg"
                                    value={this.state.formData.fruitChoice}
                                    name="fruitChoice"
                                    objectkey="id"
                                    objectvalue="fruit"
                                    options={[{id: 1, fruit: "banana"}, {id: 2, fruit: "apple"}]}
                                />

                                <FileField
                                    ref={myFileRef}
                                    hint="Must be a file"
                                    labeltext="Upload your file"
                                    name="myFileTest"
                                />
                                <FileField
                                    ref={myFileRef2}
                                    hint="Must be a file"
                                    labeltext="Upload your file"
                                    name="myFileTest"
                                />

                                <RadioGroup name="group1">
                                    <RadioField
                                        name="radio1"
                                        checked={this.state.formData.radio1}
                                        hint="Click to agree"
                                        labeltext="Agree to terms & conditions"

                                    />

                                    <RadioField
                                        name="radio2"
                                        checked={this.state.formData.radio2}
                                        hint="Click to agree"
                                        labeltext="Agree to terms & conditions"
                                        validators={[isRadioChecked()]}
                                    />

                                    <RadioField
                                        name="radio3"
                                        checked={this.state.formData.radio3}
                                        hint="Click to agree"
                                        labeltext="Agree to terms & conditions"
                                    />
                                </RadioGroup>



                                <SubmitButton>Submit Form</SubmitButton>


                                <FormConsumer>
                                    {(context: any) => {
                                        // this.setState({...context});
                                        return <div className="container"><code><var>state</var>: {JSON.stringify(context.state)}</code></div>;
                                    }}
                                </FormConsumer>
                                <br />
                                <br />
                                <FormConsumer>
                                    {(context: any) => {
                                        // this.setState({...context});
                                        return <div className="container"><code><var>RADIO GROUP METADATA</var>: {JSON.stringify(context.metadata.radioGroups)}</code></div>;
                                    }}
                                </FormConsumer>
                                <br />
                                <br />
                                <FormConsumer>
                                    {(context: any) => {
                                        // this.setState({...context});
                                        return <div className="container"><code><var>Radio Group</var>: {JSON.stringify(context.metadata.radioGroup)}</code></div>;
                                    }}
                                </FormConsumer>
                            </Form>

              
                        <br />
                        <div className="container">
                            <code><var>State</var>: {JSON.stringify(this.state)}</code>
                        </div>
        </>
    );
    }
}

