import * as React from "react";
import * as ReactBareForms from "../src/index";
import {isFieldEmpty, Submit} from "../src/index";

interface IProps{}

interface IState{
    myForm1: {};
}


export class Main extends React.Component<IProps, IState> {

    state = {
      myForm1: {
          message: "",
      }
    };

    public render(): React.ReactElement {
        return (
            <>
            <div>
                <h1>React Bare Forms Showcase</h1>
                <div>
                    <div className="container">

                            <ReactBareForms.Form state={this.state} formKey="myForm1" dynamic={true}>
                                <h2 className="text-center">Text Field</h2>
                                <div className="row">
                                    <div className="col-md-6">
                                        <ReactBareForms.Field
                                            name="message"
                                            hint="Must be at least 5 characters long"
                                            label="Your Name"
                                            validators={[isFieldEmpty(5)]}
                                            type="text"
                                        ></ReactBareForms.Field>
                                    </div>
                                    <div className="col-md-6">
                                        <p>Click to test the input field wth & without a value</p>
                                        <Submit>Submit</Submit>
                                    </div>
                                </div>
                            </ReactBareForms.Form>
                    </div>
                </div>
            </div>
        </>
    );
    }
}
