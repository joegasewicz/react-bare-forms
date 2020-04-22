import * as React from "react";
import * as ReactBareForm from "../src/index";

interface IProps{}
interface IState{}


export class Main extends React.Component<IProps, IState> {
    public render(): React.ReactElement {
        return (
            <>
                <div>
                    <h1>React Bare Forms Showcase</h1>
                    <div>
                        <ReactBareForm.Form>


                        </ReactBareForm.Form>
                    </div>
                </div>
            </>
        );
    }
}
