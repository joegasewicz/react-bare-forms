import * as React from "react";
import renderer from "react-test-renderer";
import {
    Form, CheckBoxField, isChecked
} from "../../src";



describe("#CheckBoxField()", () => {
    it("should render an input field with the bootstrap styled tags", () => {
        let state = {
            terms: false,
        };

        let component = renderer.create(
            <Form state={state}>
                <CheckBoxField name="username" checked={state.terms} />
            </Form>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            terms: false,
        };
        let component = renderer.create(
            <Form state={state}>
                <CheckBoxField name="username" checked={state.terms} />
            </Form>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        let state = {
            terms: true,
        };

        let testFormRederer: any = renderer.create(
            <Form state={state}>
                <CheckBoxField name="username" checked={state.terms} />
            </Form>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props.state.terms).toEqual(state.terms);

    });

    it("it should display validation errors", () => {
        let state = {
            terms: false,
        };

        let component = renderer.create(
            <Form state={state} name="myForm">
                <CheckBoxField
                    name="terms"
                    checked={state.terms}
                    validators={[isChecked()]}
                />
            </Form>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            terms: true,
        };


        let testFormRenderer: any = renderer.create(
            <Form state={state} name="myForm">
                <CheckBoxField
                    name="terms"
                    checked={state.terms}
                    validators={[isChecked()]}
                />
            </Form>
        );

        const testFormInstance = testFormRenderer.root;
        expect(testFormInstance.props.state.terms).toEqual(state.terms);
    });

});
