import * as React from "react";
import {ChangeEvent, useEffect} from "react";
import {FormConsumer, Form} from "../src/form";
import {
    CheckBoxField,
    EmailField,
    PasswordField,
    RadioField, RadioGroup,
    TextAreaField,
    TextInputField
} from "../src/form-elements";
import {areFieldsEqual, isEmailValid, isFieldEmpty} from "../src/validators";
import {TextArea} from "../_src/form-elements";
// import * as ReactBareForms from "../src/index";
// import {isFieldEmpty, Submit} from "../src/index";

interface IProps{}

interface IState{
    // username: string;
    password: string;
    confirmPassword: string;
    email: string;
    about: string;
    terms: boolean;
    radio1: boolean;
    radio2: boolean;
    radio3: boolean;
}


export class Main extends React.Component<IProps, IState> {

    state = {
        // username: "",
        password: "",
        confirmPassword: "",
        email: "",
        about: "",
        terms: false,
        radio1: true,
        radio2: false,
        radio3: false,
    };

    public render(): React.ReactElement {
        return (
            <>
            <div>
                <h1>React Bare Forms Showcase</h1>
                <div>
                    <div className="container">
                        <div className="container">

                            <Form state={this.state} context={this} bare={false} autoComplete="off">

                                <TextInputField
                                    value={this.state.password}
                                    name="username"
                                    hint="Enter your username"
                                    labelText="Username"
                                    validators={[isFieldEmpty(5)]}
                                />

                                <PasswordField
                                    name="password"
                                    value={this.state.password}
                                    labelText="Pasword"
                                    validators={[isFieldEmpty(5)]}
                                />

                                <PasswordField
                                    name="confirmPassword"
                                    value={this.state.confirmPassword}
                                    hint="Password must match"
                                    labelText="Confirm Password"
                                    validators={[isFieldEmpty(5), areFieldsEqual("password")]}
                                />

                                <EmailField
                                    name="email"
                                    value={this.state.email}
                                    hint="Your email"
                                    labelText="Please enter your email"
                                    validators={[isEmailValid()]}
                                />

                                <TextAreaField
                                    name="about"
                                    value={this.state.about}
                                    hint="Your email"
                                    labelText="Must be at least 20 characters"
                                    validators={[isFieldEmpty(20)]}
                                />

                                <CheckBoxField
                                    name="terms"
                                    checked={this.state.terms}
                                    hint="Click to agree"
                                    labelText="Agree to terms & conditions"
                                />


                                {/*<RadioGroup>*/}
                                {/*    <RadioField*/}
                                {/*        name="radio1"*/}
                                {/*        checked={this.state.radio1}*/}
                                {/*        hint="Click to agree"*/}
                                {/*        labelText="Agree to terms & conditions"*/}
                                {/*    />*/}

                                {/*    <RadioField*/}
                                {/*        name="radio2"*/}
                                {/*        checked={this.state.radio2}*/}
                                {/*        hint="Click to agree"*/}
                                {/*        labelText="Agree to terms & conditions"*/}
                                {/*    />*/}

                                {/*    <RadioField*/}
                                {/*        name="radio3"*/}
                                {/*        checked={this.state.radio3}*/}
                                {/*        hint="Click to agree"*/}
                                {/*        labelText="Agree to terms & conditions"*/}
                                {/*    />*/}


                                {/*</RadioGroup>*/}




                                <FormConsumer>
                                    {(context: any) => {
                                        // this.setState({...context});
                                        return <div><code>Form State: {JSON.stringify(context)}</code></div>;
                                    }}
                                </FormConsumer>
                            </Form>

                        </div>



                        <code>State: {JSON.stringify(this.state)}</code>

                    </div>
                </div>
            </div>
        </>
    );
    }
}

