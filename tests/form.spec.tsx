import * as React from "react";
import TestRenderer from "react-test-renderer";
import {Form} from "../src/form";
import {
    act,
    findRenderedDOMComponentWithClass,
    renderIntoDocument,
} from "react-dom/test-utils";
import {unmountComponentAtNode } from "react-dom";
import {TextInputField} from "../src/form-elements";
import { shallow, render } from 'enzyme';


let container: any = null;

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
            render(
                <Form state={{}} bare={true}>

                </Form>, container);
        });
         expect(container.querySelector("form").childElementCount).toBe(0);
    });

    it("should contain a context object with state and form props", () => {
        let state = {
            username: "joebloggs"
        };
        let context = {state};
        let testFormRederer: any = TestRenderer.create(
            <Form state={state} ></Form>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props).toEqual(context);
    });

    it("should render a form element with no extra tags", () => {
        let state = {
            username: "joebloggs"
        };

        const tree = TestRenderer.create(
            <Form state={state}>
                <TextInputField
                    name="username"
                    value={state.username}
                />
            </Form>
        ).toJSON();
        expect(tree).toMatchSnapshot();

        const wrapper = render(
            <Form state={state} bare={true}>
            <TextInputField
                name="username"
                value={state.username}
            />
        </Form>);

        expect(wrapper.find(".form-group")).toHaveLength(0);
        expect(wrapper.find(".form-control")).toHaveLength(0);
    });

    it("should render a form element with bootstrap extra tags", () => {
        let state = {
            username: "joebloggs"
        };

        const tree: any = TestRenderer.create(
            <Form state={ state}>
                <TextInputField
                    name="username"
                    value={state.username}
                />
            </Form>
        );
        expect(tree.toJSON()).toMatchSnapshot();

        const wrapper = render((<Form state={state}>
            <TextInputField
                name="username"
                value={state.username}
            />
        </Form>));

        expect(wrapper.find(".form-group")).toHaveLength(1);
        expect(wrapper.find(".form-control")).toHaveLength(1);
    });
});
