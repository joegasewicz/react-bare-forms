import * as React from "react";
import * as ReactBareForms from "../src/index";

interface IProps{}

interface IState{
    myForm: {};
}


export class Main extends React.Component<IProps, IState> {

    state = {
      myForm: {
          message: "",
      }
    };

    public render(): React.ReactElement {
        return (
            <>
            <div>
                <h1>React Bare Forms Showcase</h1>
                <div>
                    <ReactBareForms.Form state={this.state} formKey="myForm">
                        <ReactBareForms.Field
                          name="message"
                          hint="Enter"
                          label="Please enter some text"
                          type="textarea"
                        ></ReactBareForms.Field>
                    </ReactBareForms.Form>
                </div>
            </div>
        </>
    );
    }
}
