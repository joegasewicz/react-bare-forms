import * as React from "react";
import renderer from "react-test-renderer";
import {
    EmailField, Form,
} from "../../src";

import {isEmailValid} from "../../src";
import { MockComponent } from "../form.spec";



describe("#EmailField()", () => {
    it("should render an email field with the bootstrap styled tags", () => {
        let state = {
            email: "joe@joe.com",
        };

        let component = renderer.create(
            <MockComponent state={state}>
                <EmailField name="email" value={state.email} />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            email: "email@email.com",
        };

        let component = renderer.create(
            <MockComponent state={state}>
                <EmailField name="email" value={state.email} />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        let state = {
            email: "joe@joe.com"
        };

        let testFormRederer: any = renderer.create(
            <MockComponent state={state}>
                <EmailField name="email" value={state.email} />
            </MockComponent>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props.state.email).toEqual(state.email);

    });

    it("it should display validation errors", () => {
        let state = {
            email: "joejoe",
        };


        let component = renderer.create(
            <MockComponent state={state}>
                <EmailField
                    name="email"
                    value={state.email}
                    validators={[isEmailValid()]}
                />
            </MockComponent>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            email: "a",
        };



        let testFormRederer: any = renderer.create(
                <MockComponent state={state}>
                    <EmailField
                        name="email"
                        value={state.email}
                        validators={[isEmailValid()]}
                    />
                </MockComponent>
        );

        const testFormInstance = testFormRederer.root;
        // expect(testFormInstance.props.value).toEqual(state.username);
        expect(testFormInstance)


    });
});

