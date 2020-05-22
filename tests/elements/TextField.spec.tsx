import * as React from "react";
import renderer from "react-test-renderer";
import {
    Form, isFieldEmpty,
    TextInputField,
} from "../../src";
import {FormElementValidators} from "../../src/core";



describe("#TextInputField()", () => {
    it("should render an input field with the bootstrap styled tags", () => {
        let state = {
            username: "joe",
        };

        let component = renderer.create(
            <Form state={state}>
                <TextInputField name="username" value={state.username} />
            </Form>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            username: "",
        };
        let component = renderer.create(
            <Form state={state}>
                <TextInputField name="username" value={state.username} />
            </Form>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        let state = {
            username: "joebloggs"
        };

        let testFormRederer: any = renderer.create(
            <Form state={state}>
                <TextInputField name="username" value={state.username} />
            </Form>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props.state.username).toEqual(state.username);

    });

    it("it should display validation errors", () => {
        let state = {
            username: "a",
        };

        let component = renderer.create(
            <Form state={state} name="myForm">
                <TextInputField
                    name="username"
                    value={state.username}
                    validators={[isFieldEmpty(5)]}
                />
            </Form>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            username: "a",
        };


        let testFormRenderer: any = renderer.create(
                <Form state={state} name="myForm">
                <TextInputField
                    name="username"
                    value={state.username}
                    validators={[isFieldEmpty(5)]}
                />
                </Form>
        );

        const testFormInstance = testFormRenderer.root;
        expect(testFormInstance.props.state.username).toEqual(state.username);
    });

});
