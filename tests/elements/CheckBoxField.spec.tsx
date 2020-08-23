import * as React from "react";
import renderer from "react-test-renderer";
import {
    Form, CheckBoxField, isChecked
} from "../../src";
import { MockComponent } from "../form.spec";



describe("#CheckBoxField()", () => {
    it("should render an input field with the bootstrap styled tags", () => {
        let state = {
            terms: false,
        };

        let component = renderer.create(
            <MockComponent state={state}>
                <CheckBoxField name="username" checked={state.terms} />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            terms: false,
        };
        let component = renderer.create(
            <MockComponent state={state}>
                <CheckBoxField name="username" checked={state.terms} />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        let state = {
            terms: true,
        };

        let testFormRederer: any = renderer.create(
            <MockComponent state={state}>
                <CheckBoxField name="username" checked={state.terms} />
            </MockComponent>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props.state.terms).toEqual(state.terms);

    });

    it("it should display validation errors", () => {
        let state = {
            terms: false,
        };

        let component = renderer.create(
            <MockComponent state={state} name="myForm">
                <CheckBoxField
                    name="terms"
                    checked={state.terms}
                    validators={[isChecked()]}
                />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            terms: true,
        };


        let testFormRenderer: any = renderer.create(
            <MockComponent state={state} name="myForm">
                <CheckBoxField
                    name="terms"
                    checked={state.terms}
                    validators={[isChecked()]}
                />
            </MockComponent>
        );

        const testFormInstance = testFormRenderer.root;
        expect(testFormInstance.props.state.terms).toEqual(state.terms);
    });

});
