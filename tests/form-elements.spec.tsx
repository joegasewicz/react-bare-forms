import * as React from "react";
import renderer from "react-test-renderer";
import {
    EmailField, FormGroup,
    PasswordField,
    TextInputField,
} from "../src/form-elements";
import {FormConsumer, FormProvider} from "../src/form";
import {isFieldEmpty} from "../src/validators";
import {updateValidationMetadata} from "../src/_context_updaters";
import {FormElementValidators} from "../src/_helpers";


describe("#TextInputField()", () => {
    it("should render an input field with the bootstrap styled tags", () => {
        let state = {
            username: "joe",
        };
        let contextDefault = {
            bare: false,
            state: state,
            formKey: "",
            debug: false,
            dynamic: true,
            metadata: {},
        };

        let component = renderer.create(
            <FormProvider value={contextDefault}>
                <TextInputField name="username" value={state.username} />
            </FormProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            username: "",
        };
        let contextDefault = {
            bare: true,
            state: {},
            formKey: "",
            debug: false,
            dynamic: true,
            metadata: {},
        };
        let component = renderer.create(
            <FormProvider value={contextDefault}>
                <TextInputField name="username" value={state.username} />
            </FormProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        let state = {
            username: "joebloggs"
        };
        let contextDefault = {
            bare: false,
            state: state,
            formKey: "",
            debug: false,
            dynamic: true,
            metadata: {},
        };

        let testFormRederer: any = renderer.create(
            <FormProvider value={contextDefault}>
                <TextInputField name="username" value={state.username} />
            </FormProvider>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props.value).toEqual(state.username);

    });

    it("it should display validation errors", () => {
        let state = {
            username: "a",
        };

        let _contextDefault = {
            bare: false,
            state: state,
            formKey: "",
            debug: false,
            dynamic: true,
            metadata: {},
        };

        let contextDefault = {
            ..._contextDefault,
            updateFieldValidation: updateValidationMetadata(_contextDefault, (t: any) => {})
        };

        let component = renderer.create(
            <FormProvider value={contextDefault}>
                <TextInputField
                    name="username"
                    value={state.username}
                    validators={[isFieldEmpty(5)]}
                />
            </FormProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            username: "a",
        };

        let _contextDefault = {
            bare: true,
            state: state,
            formKey: "",
            debug: false,
            dynamic: true,
            metadata: {},
        };


        let contextDefault = {
            ..._contextDefault,
            updateFieldValidation: updateValidationMetadata(_contextDefault, updateMetadata)
        };

        function updateMetadata(t: any) {
            contextDefault["metadata"] = t.metadata;
        }

        let testFormRederer: any = renderer.create(
            <div>
            <FormProvider value={contextDefault}>
                <TextInputField
                    name="username"
                    value={state.username}
                    validators={[isFieldEmpty(5)]}
                />
            </FormProvider>
            </div>
        );

        const testFormInstance = testFormRederer.root;
        // expect(testFormInstance.props.value).toEqual(state.username);
        expect(testFormInstance
            .find(FormElementValidators)
            .props
            .children
            .props
            .value
            .metadata
        ).toEqual({"username": {
            isTouched: true,
            isValid: false,
            messages: [
              "Must be at least 5 characters",
            ],
            value: "a",
             }
        });

    });

});

describe("#EmailField()", () => {

});

describe("#PasswordField()", () => {

});

