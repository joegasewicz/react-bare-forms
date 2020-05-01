import * as React from "react";
import renderer from "react-test-renderer";
import {
    EmailField, FormGroup,
    PasswordField, TextAreaField,
    TextInputField,
} from "../src/form-elements";
import {FormConsumer, FormProvider} from "../src/form";
import {isEmailValid, isFieldEmpty} from "../src/validators";
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
    it("should render an email field with the bootstrap styled tags", () => {
        let state = {
            email: "joe@joe.com",
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
                <EmailField name="email" value={state.email} />
            </FormProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            email: "email@email.com",
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
                <EmailField name="email" value={state.email} />
            </FormProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        let state = {
            email: "joe@joe.com"
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
                <EmailField name="email" value={state.email} />
            </FormProvider>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props.value).toEqual(state.email);

    });

    it("it should display validation errors", () => {
        let state = {
            email: "joejoe",
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
                <EmailField
                    name="email"
                    value={state.email}
                    validators={[isEmailValid()]}
                />
            </FormProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            email: "a",
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
                    <EmailField
                        name="email"
                        value={state.email}
                        validators={[isEmailValid()]}
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
        ).toEqual({"email": {
                isTouched: true,
                isValid: false,
                messages: [
                    "Must be a valid email",
                ],
                value: "a",
            }
        });

    });
});

describe("#PasswordField()", () => {
    it("should render an input field with the bootstrap styled tags", () => {
        let state = {
            password: "joe",
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
                <PasswordField name="password" value={state.password} />
            </FormProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            password: "",
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
                <PasswordField name="password" value={state.password} />
            </FormProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        let state = {
            password: "joebloggs"
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
                <PasswordField name="password" value={state.password} />
            </FormProvider>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props.value).toEqual(state.password);

    });

    it("it should display validation errors", () => {
        let state = {
            password: "a",
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
                <PasswordField
                    name="password"
                    value={state.password}
                    validators={[isFieldEmpty(5)]}
                />
            </FormProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            password: "a",
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
                    <PasswordField
                        name="password"
                        value={state.password}
                        validators={[isFieldEmpty(5)]}
                    />
                </FormProvider>
            </div>
        );

        const testFormInstance = testFormRederer.root;
        // expect(testFormInstance.props.value).toEqual(state.password);
        expect(testFormInstance
            .find(FormElementValidators)
            .props
            .children
            .props
            .value
            .metadata
        ).toEqual({"password": {
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

describe("#<TextAreaField />", () => {
    it("should render an input field with the bootstrap styled tags", () => {
        let state = {
            about_text: "joe",
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
                <TextAreaField name="about_text" value={state.about_text} />
            </FormProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            about_text: "",
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
                <TextAreaField name="about_text" value={state.about_text} />
            </FormProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        let state = {
            about_text: "joebloggs"
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
                <TextAreaField name="about_text" value={state.about_text} />
            </FormProvider>
        );

        const testFormInstance = testFormRederer.root;
        expect(testFormInstance.props.value).toEqual(state.about_text);

    });

    it("it should display validation errors", () => {
        let state = {
            about_text: "a",
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
                <TextAreaField
                    name="about_text"
                    value={state.about_text}
                    validators={[isFieldEmpty(5)]}
                />
            </FormProvider>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            about_text: "a",
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
                    <TextAreaField
                        name="about_text"
                        value={state.about_text}
                        validators={[isFieldEmpty(5)]}
                    />
                </FormProvider>
            </div>
        );

        const testFormInstance = testFormRederer.root;
        // expect(testFormInstance.props.value).toEqual(state.about_text);
        expect(testFormInstance
            .find(FormElementValidators)
            .props
            .children
            .props
            .value
            .metadata
        ).toEqual({"about_text": {
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

