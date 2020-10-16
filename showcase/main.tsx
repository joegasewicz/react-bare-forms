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
    isRadioChecked
} from "../src/index";

interface IProps{}

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
    }
}

export function FPForm() {
    const state = { age: 0, password: "" }

    const [fpState, fpSetState] = React.useState(state);
    return <>
        <Form
            state={fpState}
            context={fpSetState}
            bare={false}
            autoComplete="off"
            callback={() => console.log("Form submitted!")}>

            <TextInputField
                value={fpState.age}
                name="age"
                hint="Enter your age"
                labelText="Age"
                validators={[isFieldEmpty(2)]} />

            <PasswordField
                name="password"
                value={fpState.password}
                labelText="Password"
                validators={[isFieldEmpty(2)]}
            />
                    
            <SubmitButton>Submit Form</SubmitButton>
            <br />
            <FormConsumer>
                {(context: any) => {
                    // this.setState({...context});
                    return <div className="container"><code><var>metadata</var>: {JSON.stringify(context.metadata)}</code></div>;
                }}
            </FormConsumer>
        </Form>
    </>;
}


export class Main extends React.Component<IProps, IState> {


    myFileRef = createFileRef();

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
        }

    };

    public render(): React.ReactElement {
        return (
            <>
                            <Form
                                state={this.state}
                                formKey="formData"
                                context={this}
                                autoComplete="off"
                                callback={() => console.log("Form submitted ----> ", getFileFromRef(this.myFileRef))}>

                                <TextInputField
                                    value={this.state.formData.age}
                                    name="age"
                                    hint="Enter your age"
                                    labelText="Age"
                                    validators={[isFieldEmpty(2)]}
                                />

                               <TextInputField
                                    value={this.state.formData.username}
                                    name="username"
                                    hint="Enter your username"
                                    labelText="Username"
                                    validators={[isFieldEmpty(5)]}
                                />

                                <PasswordField
                                    name="password"
                                    value={this.state.formData.password}
                                    labelText="Password"
                                />

                                <PasswordField
                                    name="confirmPassword"
                                    value={this.state.formData.confirmPassword}
                                    hint="Password must match"
                                    labelText="Confirm Password"
                                    validators={[areFieldsEqual("password")]}
                                />

                               <EmailField
                                    name="email"
                                    value={this.state.formData.email}
                                    hint="Your email"
                                    labelText="Please enter your email"
                                    validators={[isEmailValid()]}
                                />

                                <TextAreaField
                                    name="about"
                                    value={this.state.formData.about}
                                    hint="Your email"
                                    labelText="Must be at least 20 characters"
                                    validators={[isFieldEmpty(20)]}
                                /> 

                                <CheckBoxField
                                    name="terms"
                                    checked={this.state.formData.terms}
                                    hint="Click to agree"
                                    labelText="Agree to terms & conditions"
                                    validators={[isChecked()]}
                                />

                                <SelectField
                                    size="lg"
                                    value={this.state.formData.fruitChoice}
                                    name="fruitChoice"
                                    objectKey="id"
                                    objectValue="fruit"
                                    options={[{id: 1, fruit: "banana"}, {id: 2, fruit: "apple"}]}
                                />

                                <FileField
                                    ref={this.myFileRef}
                                    hint="Must be a file"
                                    labelText="Upload your file"
                                    name="myFileTest"
                                    validators={[isFile()]}
                                />

                                <RadioGroup name="group1">
                                    <RadioField
                                        name="radio1"
                                        checked={this.state.formData.radio1}
                                        hint="Click to agree"
                                        labelText="Agree to terms & conditions"

                                    />

                                    <RadioField
                                        name="radio2"
                                        checked={this.state.formData.radio2}
                                        hint="Click to agree"
                                        labelText="Agree to terms & conditions"
                                        validators={[isRadioChecked()]}
                                    />

                                    <RadioField
                                        name="radio3"
                                        checked={this.state.formData.radio3}
                                        hint="Click to agree"
                                        labelText="Agree to terms & conditions"
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
                                        return <div className="container"><code><var>metadata</var>: {JSON.stringify(context.metadata.radioGroups)}</code></div>;
                                    }}
                                </FormConsumer>
                                <br />
                                <br />
                                <FormConsumer>
                                    {(context: any) => {
                                        // this.setState({...context});
                                        return <div className="container"><code><var>metadata</var>: {JSON.stringify(context.metadata)}</code></div>;
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

