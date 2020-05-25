import * as React from "react";
import renderer from "react-test-renderer";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import {Form, FileField, isFile, createFileRef} from "../../src";
import {file} from "@babel/types";


let container: any = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    // container *must* be attached to document so events work correctly.
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

describe("#<FileField />", () => {
    const myFileRef = createFileRef();

    it("should render an input field with the bootstrap styled tags", () => {
        let state = {
            my_file: null,
        };


        let component = renderer.create(
            <Form state={state}>
                <FileField name="my_file" ref={myFileRef} />
            </Form>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("should render a single input tag with no bootstrap styles", () => {
        let state = {
            my_file: null,
        };

        let component = renderer.create(
            <Form state={state}>
                <FileField name="about_text" ref={myFileRef} />
            </Form>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });


    it("it should pass in props", () => {
        const _mockRef = createFileRef();
        let expectedResult = {
            lastModifiedDate: "",
            lastModified: "",
            name: "test.png",
            size: 500001,
            type: "image/png"
        };

        const mockRef = {
            ..._mockRef,
            current: {
                files: [expectedResult]
            },
        };

        let state = {
            my_file: null,
        };

        let component = renderer.create(
            <Form state={state}>
                <FileField name="my_file" ref={mockRef} />
            </Form>
        );
        const testFormInstance = component.root;
        // expect(testFormInstance.props.state).toEqual({});
    //

    });

    it("it should display validation errors", () => {
        let state = {
            my_file: null,
        };

        let component = renderer.create(
            <Form state={state}>
                <FileField
                    name="about_text"
                    ref={myFileRef}
                    validators={[isFile()]}
                />
            </Form>
        );

        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });

    it("it should pass validation props", () => {
        let state = {
            my_file: null,
        };

        let testFormRederer: any = renderer.create(
            <Form state={state}>
                <FileField
                    name="about_text"
                    ref={myFileRef}
                    validators={[isFile()]}
                />
            </Form>
        );

        const testFormInstance = testFormRederer.root;

        expect(testFormInstance);

    });
});

