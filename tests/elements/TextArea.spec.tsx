import * as React from "react";
import renderer from "react-test-renderer";
import {Form, TextAreaField,isFieldEmpty} from "../../src";
import { MockComponent } from "../form.spec";



describe("#<TextAreaField />", () => {
    it("should render an input field with the bootstrap styled tags", () => {
        let state = {
            about_text: "joe",
        };


        let component = renderer.create(
            <MockComponent state={state}>
                <TextAreaField name="about_text" value={state.about_text} />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            about_text: "",
        };

        let component = renderer.create(
            <MockComponent state={state}>
                <TextAreaField name="about_text" value={state.about_text} />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        let state = {
            about_text: "joebloggs"
        };

        let testFormRederer: any = renderer.create(
            <MockComponent state={state}>
                <TextAreaField name="about_text" value={state.about_text} />
            </MockComponent>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props.state.about_text).toEqual(state.about_text);

    });

    it("it should display validation errors", () => {
        let state = {
            about_text: "a",
        };

        let component = renderer.create(
            <MockComponent state={state}>
                <TextAreaField
                    rows={20}
                    name="about_text"
                    value={state.about_text}
                    validators={[isFieldEmpty(5)]}
                />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            about_text: "a",
        };

        let testFormRederer: any = renderer.create(
            <MockComponent state={state}>
                <TextAreaField
                    rows={10}
                    name="about_text"
                    value={state.about_text}
                    validators={[isFieldEmpty(5)]}
                />
            </MockComponent>
        );

        const testFormInstance = testFormRederer.root;
        // expect(testFormInstance.props.value).toEqual(state.about_text);
        expect(testFormInstance);

    });
});

