import * as React from "react";
import {FormConsumer, Form} from "../src/form";
import {
    // CheckBoxField,
    EmailField,
    // FileField,
    // PasswordField,
    // RadioField, RadioGroup, SelectField,
    // TextAreaField,
    TextInputField
} from "../src/elements";
import {isEmailValid, isFieldEmpty} from "../src/validators";
import {SubmitButton} from "../src/submit_button";
import {createFileRef, getFileFromRef} from "../src/uncrontrolled";
import {areFieldsEqual} from "../src/validators";
import {doc} from "prettier";


interface IProps{}

interface IState{
    username: string;
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


export class Main extends React.Component<IProps, IState> {


    myFileRef = createFileRef();

    state = {
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        about: "",
        terms: false,
        radio1: true,
        radio2: false,
        radio3: false,
        fruitChoice: "",
    };

    public render(): React.ReactElement {
        return (
            <>
            <div>
                <h1>React Bare Forms Showcase</h1>
                <div>
                    <div className="container">
                        <div className="container">

                            <Form
                                state={this.state}
                                context={this}
                                bare={false}
                                autoComplete="off"
                                callback={() => console.log("Form submitted ----> ", getFileFromRef(this.myFileRef))}>

                                <TextInputField
                                    value={this.state.username}
                                    name="username"
                                    hint="Enter your username"
                                    labelText="Username"
                                    validators={[isFieldEmpty(5)]}
                                />

                            {/*    <PasswordField*/}
                            {/*        name="password"*/}
                            {/*        value={this.state.password}*/}
                            {/*        labelText="Pasword"*/}
                            {/*        validators={[isFieldEmpty(5)]}*/}
                            {/*    />*/}

                            {/*    <PasswordField*/}
                            {/*    name="confirmPassword"*/}
                            {/*    value={this.state.confirmPassword}*/}
                            {/*    hint="Password must match"*/}
                            {/*    labelText="Confirm Password"*/}
                            {/*    validators={[isFieldEmpty(5), areFieldsEqual("password")]}*/}
                            {/*/>*/}

                                <EmailField
                                    name="email"
                                    value={this.state.email}
                                    hint="Your email"
                                    labelText="Please enter your email"
                                    validators={[isEmailValid()]}
                                />

                            {/*    <TextAreaField*/}
                            {/*        name="about"*/}
                            {/*        value={this.state.about}*/}
                            {/*        hint="Your email"*/}
                            {/*        labelText="Must be at least 20 characters"*/}
                            {/*        validators={[isFieldEmpty(20)]}*/}
                            {/*    />*/}

                            {/*    <CheckBoxField*/}
                            {/*        name="terms"*/}
                            {/*        checked={this.state.terms}*/}
                            {/*        hint="Click to agree"*/}
                            {/*        labelText="Agree to terms & conditions"*/}
                            {/*        validators={[isChecked()]}*/}
                            {/*    />*/}


                            {/*    <RadioGroup name="group1">*/}
                            {/*        <RadioField*/}
                            {/*            name="radio1"*/}
                            {/*            checked={this.state.radio1}*/}
                            {/*            hint="Click to agree"*/}
                            {/*            labelText="Agree to terms & conditions"*/}
                            {/*            validators={[isRadioChecked()]}*/}
                            {/*        />*/}

                            {/*        <RadioField*/}
                            {/*            name="radio2"*/}
                            {/*            checked={this.state.radio2}*/}
                            {/*            hint="Click to agree"*/}
                            {/*            labelText="Agree to terms & conditions"*/}
                            {/*        />*/}

                            {/*        <RadioField*/}
                            {/*            name="radio3"*/}
                            {/*            checked={this.state.radio3}*/}
                            {/*            hint="Click to agree"*/}
                            {/*            labelText="Agree to terms & conditions"*/}
                            {/*        />*/}
                            {/*    </RadioGroup>*/}

                            {/*    <SelectField*/}
                            {/*        size="lg"*/}
                            {/*        value={this.state.fruitChoice}*/}
                            {/*        name="fruitChoice"*/}
                            {/*        options={["banana", "apple", "orange"]}*/}
                            {/*    />*/}

                            {/*    <FileField*/}
                            {/*        ref={this.myFileRef}*/}
                            {/*        hint="Must be a file"*/}
                            {/*        labelText="Upload your file"*/}
                            {/*        name="myFileTest"*/}
                            {/*        validators={[isFile()]}*/}
                            {/*    />*/}

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
                                        return <div className="container"><code><var>metadata</var>: {JSON.stringify(context.metadata)}</code></div>;
                                    }}
                                </FormConsumer>
                            </Form>

                        </div>
                        <br />
                        <div className="container">
                            <code><var>State</var>: {JSON.stringify(this.state)}</code>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
    }
}

