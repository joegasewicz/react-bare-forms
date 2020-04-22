import * as React from "react";
import * as ReactDOM from "react-dom";


import { Main } from "./main";


function App(props: any) {
    return (<>{props.children}</>);
}

ReactDOM.render(
    <App>
        <Main />
    </App>,
    document.getElementById("main"),
);
