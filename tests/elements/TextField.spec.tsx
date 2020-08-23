import * as React from "react";
import renderer from "react-test-renderer";
import {
    Form, isFieldEmpty,
    TextInputField,
} from "../../src";
import { MockComponent } from "../form.spec";


describe("#TextInputField()", () => {
    it("should render an input field with the bootstrap styled tags", () => {
        let state = {
            username: "joe",
        };

        let component = renderer.create(<MockComponent state={state} />);

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            username: "",
        };
        let component = renderer.create(<MockComponent state={state} bare={true} />);

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        let state = {
            username: "joebloggs"
        };

        let testFormRederer: any = renderer.create(<MockComponent state={state} />);

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props.state.username).toEqual(state.username);

    });

    it("it should display validation errors", () => {
        let state = {
            username: "a",
        };

        let component = renderer.create(
            <MockComponent state={state}
                children={<TextInputField
                    name="username"
                    value={state.username}
                    validators={[isFieldEmpty(5)]}
                />} />
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            username: "a",
        };


        let testFormRenderer: any = renderer.create(
            <MockComponent state={state}
            children={<TextInputField
                name="username"
                value={state.username}
                validators={[isFieldEmpty(5)]}
            />} />
        );

        const testFormInstance = testFormRenderer.root;
        expect(testFormInstance.props.state.username).toEqual(state.username);
    });

});
