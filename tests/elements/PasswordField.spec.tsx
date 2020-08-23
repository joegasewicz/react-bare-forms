import * as React from "react";
import {create, act} from "react-test-renderer";
import {
    Form,
    PasswordField,
    isFieldEmpty, areFieldsEqual, SubmitButton,
} from "../../src";
import {IFormContext} from "../../src/form";
import {useEffect, useState} from "react";
import {expression} from "@babel/template";
import { MockComponent } from "../form.spec";



describe("#PasswordField()", () => {
    it("should render an input field with the bootstrap styled tags", () => {
        let state = {
            password: "joe",
        };

        let component = create(
            <MockComponent state={state}>
                <PasswordField name="password" value={state.password} />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            password: "",
        };

        let component = create(
            <MockComponent state={state}>
                <PasswordField name="password" value={state.password} />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        let state = {
            password: "joebloggs"
        };

        let testFormRederer: any = create(
            <MockComponent state={state}>
                <PasswordField name="password" value={state.password} />
            </MockComponent>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props.state.password).toEqual(state.password);

    });

    it("it should display validation errors", () => {
        let state = {
            password: "a",
        };

        let component = create(
            <MockComponent state={state}>
                <PasswordField
                    name="password"
                    value={state.password}
                    validators={[isFieldEmpty(5)]}
                />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            password: "a",
        };


        let testFormRederer: any = create(
            <div>
                <MockComponent state={state}>
                    <PasswordField
                        name="password"
                        value={state.password}
                        validators={[isFieldEmpty(5)]}
                    />
                </MockComponent>
            </div>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance)

    });

    it("should confirm passwords are equal", () => {
        let state = {
            password: "wizard",
            confirmPassword: "wizard",
        };

        let component = create(
            <MockComponent state={state}>
                <PasswordField name="password" value={state.password} />
                <PasswordField
                    name="confirmPassword"
                    value={state.confirmPassword}
                    validators={[areFieldsEqual("password")]} />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should how message that passwords are not equal", () => {
        let state = {
            password: "wizard",
            confirmPassword: "w",
        };

        let root = create(
            <MockComponent state={state}>
                <PasswordField
                    name="password"
                    value={state.password}
                    />
                <PasswordField
                    name="confirmPassword"
                    value={state.confirmPassword}
                    validators={[areFieldsEqual("password")]} />
            </MockComponent>
        );

        let tree = root.toJSON();
        expect(tree).toMatchSnapshot();


        act(() => {
            state.confirmPassword = "wi";

            root.update(
                <MockComponent state={state}>
                    <PasswordField
                        name="password"
                        value={state.password}
                    />
                    <PasswordField
                        name="confirmPassword"
                        value={state.confirmPassword}
                        validators={[areFieldsEqual("password")]} />
                </MockComponent>
            )
        });

        tree = root.toJSON();
        expect(tree).toMatchSnapshot();

    });

    it("should maintain a disabled submit button with both password fields not matching", () => {
        let state = {
            password: "",
            confirmPassword: "",
        };

        let root = create(
            <MockComponent state={state}>
                <PasswordField
                    name="password"
                    value={state.password}
                />
                <PasswordField
                    name="confirmPassword"
                    value={state.confirmPassword}
                    validators={[areFieldsEqual("password")]} />
                <SubmitButton>Submit MockComponent</SubmitButton>
            </MockComponent>
        );

        let tree: any = root.toJSON();
        expect(tree).toMatchSnapshot();
        expect(tree.children[2].props.disabled).toEqual(true);

        act(() => {
            state.password = "";
            state.confirmPassword = "";

            root.update(
                <MockComponent state={state}>
                    <PasswordField
                        name="password"
                        value={state.password}
                    />
                    <PasswordField
                        name="confirmPassword"
                        value={state.confirmPassword}
                        validators={[areFieldsEqual("password")]} />
                    <SubmitButton>Submit MockComponent</SubmitButton>
                </MockComponent>
            )
        });

       expect(tree.children[2].props.disabled).toEqual(true);

    });

});

