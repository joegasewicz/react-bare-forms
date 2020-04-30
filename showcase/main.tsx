import * as React from "react";
import {ChangeEvent, useEffect} from "react";
import {FormConsumer, Form} from "../src/form";
import {EmailField, PasswordField, TextInputField} from "../src/form-elements";
import {areFieldsEqual, isEmailValid, isFieldEmpty} from "../src/validators";
// import * as ReactBareForms from "../src/index";
// import {isFieldEmpty, Submit} from "../src/index";

interface IProps{}

interface IState{
    // username: string;
    password: string;
    confirmPassword: string;
    email: string;
}


export class Main extends React.Component<IProps, IState> {

    state = {
        // username: "",
        password: "",
        confirmPassword: "",
        email: "",
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

