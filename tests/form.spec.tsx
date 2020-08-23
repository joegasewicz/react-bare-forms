import * as React from "react";
import * as ReactDOM from "react-dom";
import TestRenderer from "react-test-renderer";
import {Form} from "../src/form";
import {
    act,
    findRenderedDOMComponentWithClass,
    renderIntoDocument,
} from "react-dom/test-utils";
import {unmountComponentAtNode } from "react-dom";
import {TextInputField} from "../src/elements";
import { shallow, render } from 'enzyme';


let container: any = null;

export function MockComponent(props: any) {
    const {state = {}, bare = "false" , children } = props;
    const [_state, setState] = React.useState(state);
    return (
    <Form state={_state} context={setState} bare={bare}>
        {children}
    </Form>);
}

beforeEach(() => {
   container = document.createElement("div");
   document.body.appendChild(container);
});


afterEach(() => {
   unmountComponentAtNode(container);
   container.remove();
   container = null;
});

describe("<Form />", () => {

    it("should render form tags with no other elements", () => {

        act(() => {
            
            ReactDOM.render(<MockComponent />, container);
        });
         expect(container.querySelector("form").childElementCount).toBe(0);
    });

    xit("should contain a context object with state and form props", () => {
        let myState = {
            username: "joebloggs"
        };
        let context = {state: myState};
        function MockComponent() {
            const [state, setState] = React.useState(myState);
            return (<Form state={state} context={setState}></Form>);
        }
        let testFormRederer: any = TestRenderer.create(
            <MockComponent />
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props).toEqual(context);
    });

    it("should render a form element with no extra tags", () => {
        let state = {
            username: "joebloggs"
        };

        const tree = TestRenderer.create(
            <MockComponent state={state} />
        ).toJSON();
        expect(tree).toMatchSnapshot();

        function MockComponentTwo() {
            const [_state, setState] = React.useState(state);
            return (
            <MockComponent state={state} bare={"true"}>
                <TextInputField
                name="username"
                value={_state.username}
            />
            </MockComponent>);
        }

        const wrapper = render(<MockComponentTwo />);

        expect(wrapper.find(".form-group")).toHaveLength(0);
        expect(wrapper.find(".form-control")).toHaveLength(0);
    });

    xit("should render a form element with bootstrap extra tags", () => {
        let state = {
            username: "joebloggs"
        };

        const tree: any = TestRenderer.create(<MockComponent state={state} />);
        expect(tree.toJSON()).toMatchSnapshot();

        const wrapper = render(<MockComponent state={state} />);

        expect(wrapper.find(".form-group")).toHaveLength(1);
        expect(wrapper.find(".form-control")).toHaveLength(1);
    });
});
