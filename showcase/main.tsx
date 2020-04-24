import * as React from "react";
import {ChangeEvent, useEffect} from "react";
import {FormConsumer, Form} from "../src/form";
import {TextInputField} from "../src/form-elements";
import {isFieldEmpty} from "../src/validators";
// import * as ReactBareForms from "../src/index";
// import {isFieldEmpty, Submit} from "../src/index";

interface IProps{}

interface IState{
    username: string;
}


export class Main extends React.Component<IProps, IState> {

    state = {
        username: "",
    };

    public render(): React.ReactElement {
        return (
            <>
            <div>
                <h1>React Bare Forms Showcase</h1>
                <div>
                    <div className="container">

                        <Form state={this.state} context={this}>

                            <TextInputField
                                value={this.state.username}
                                name="username"
                                hint="Enter your username"
                                labelText="Username"
                                validators={[isFieldEmpty(5)]}
                            />
                            <FormConsumer>
                                {(context: any) => {
                                    // this.setState({...context});
                                    return <div><code>Form State: {JSON.stringify(context)}</code></div>;
                                }}
                            </FormConsumer>
                        </Form>

                        <code>State: {JSON.stringify(this.state)}</code>

                    </div>
                </div>
            </div>
        </>
    );
    }
}

