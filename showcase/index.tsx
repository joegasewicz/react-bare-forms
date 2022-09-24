import * as React from "react";
import {useState} from "react";
import { createRoot } from "react-dom/client";


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
                    <>{pageState.page === 1
                        ? <FPForm />
                        : <Main />}</>
                    </div>
                </div>
        
        </div>
        );
}

const container: any = document.getElementById("main");
const root = createRoot(container);
root.render(<App />);
