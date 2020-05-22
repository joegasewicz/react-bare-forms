import * as React from "react";
import renderer from "react-test-renderer";
import {
    EmailField, Form,
    PasswordField, TextAreaField,
    TextInputField,
} from "../../src";
import {FormProvider} from "../../src/form";
import {isEmailValid, isFieldEmpty} from "../../src";


describe("#PasswordField()", () => {
    it("should render an input field with the bootstrap styled tags", () => {
        let state = {
            password: "joe",
        };

        let component = renderer.create(
            <Form state={state}>
                <PasswordField name="password" value={state.password} />
            </Form>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            password: "",
        };

        let component = renderer.create(
            <Form state={state}>
                <PasswordField name="password" value={state.password} />
            </Form>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        let state = {
            password: "joebloggs"
        };

        let testFormRederer: any = renderer.create(
            <Form state={state}>
                <PasswordField name="password" value={state.password} />
            </Form>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props.state.password).toEqual(state.password);

    });

    it("it should display validation errors", () => {
        let state = {
            password: "a",
        };

        let component = renderer.create(
            <Form state={state}>
                <PasswordField
                    name="password"
                    value={state.password}
                    validators={[isFieldEmpty(5)]}
                />
            </Form>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            password: "a",
        };


        let testFormRederer: any = renderer.create(
            <div>
                <Form state={state}>
                    <PasswordField
                        name="password"
                        value={state.password}
                        validators={[isFieldEmpty(5)]}
                    />
                </Form>
            </div>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance)

    });
});

