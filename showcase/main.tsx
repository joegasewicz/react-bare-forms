import * as React from "react";
import {ChangeEvent, useEffect} from "react";
import {FormConsumer, Form, InputText} from "../src/form";
// import * as ReactBareForms from "../src/index";
// import {isFieldEmpty, Submit} from "../src/index";

interface IProps{}

interface IState{
    message: string;
}


export class Main extends React.Component<IProps, IState> {

    state = {
        message: "",
    };

    public render(): React.ReactElement {
        return (
            <>
            <div>
                <h1>React Bare Forms Showcase</h1>
                <div>
                    <div className="container">

                            {/*<ReactBareForms.Form state={this.state} formKey="myForm1" dynamic={true}>*/}
                            {/*    <h2 className="text-center">Text Field</h2>*/}
                            {/*    <div className="row">*/}
                            {/*        <div className="col-md-6">*/}
                            {/*            <ReactBareForms.Field*/}
                            {/*                name="message"*/}
                            {/*                hint="Must be at least 5 characters long"*/}
                            {/*                label="Your Name"*/}
                            {/*                validators={[isFieldEmpty(5)]}*/}
                            {/*                type="text"*/}
                            {/*            ></ReactBareForms.Field>*/}
                            {/*        </div>*/}
                            {/*        <div className="col-md-6">*/}
                            {/*            <p>Click to test the input field wth & without a value</p>*/}
                            {/*            <Submit>Submit</Submit>*/}
                            {/*        </div>*/}
                            {/*    </div>*/}
                            {/*</ReactBareForms.Form>*/}


                        <Form state={this.state} context={this}>
                            <InputText value={this.state.message} state={this.state} />
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

