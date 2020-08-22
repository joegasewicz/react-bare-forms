import * as React from "react";
import {useState} from "react";
import * as ReactDOM from "react-dom";


import { Main, FPForm } from "./main";

function App(props: any) {
    const navState = {
        page: 1,
    }
    const [pageState, setState] = useState(navState);
    return (
        <div>
            <div className="container">
                <h1 className="text-center">React Bare Forms Showcase</h1>
                <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group mr-2" role="group" aria-label="First group">
                        <button onClick={() => setState({page: 1})} type="button" className="btn btn-secondary">1</button>
                        <button onClick={() => setState({page: 2})} type="button" className="btn btn-secondary">2</button>
                    </div>
            
                </div>
            </div>
                <div className="container">
                    <div className="container">
                    <>{pageState.page === 1 ? <Main /> : <FPForm />}</>
                    </div>
                </div>
        
        </div>
        );
}

ReactDOM.render(
    <App>
        
    </App>,
    document.getElementById("main"),
);
