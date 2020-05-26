import * as React from "react";
import {create} from "react-test-renderer";
import {Form, SelectField} from "../../src";


describe("#<SelectField>", () => {
    it("should render props", () => {
        let state = {
            select_data_id: undefined as any,
        };

        let component = create(
            <Form state={state}>
                <SelectField
                    size="lg"
                    value={state.select_data_id}
                    name="fruitChoice"
                    options={["banana", "apple", "orange"]}
                />
            </Form>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
    it("should render props from object keys", () => {
        let selectData: Array<{id: number, name: string}> = [
            {id: 1, name: "first"},
            {id: 2, name: "second"},
            {id: 3, name: "third"},
        ];
        let state = {
            select_data_id: undefined as any,
        };

        let component = create(
            <Form state={state}>
                <SelectField
                    size="lg"
                    value={state.select_data_id}
                    name="fruitChoice"
                    objectKey="id"
                    objectValue="name"
                    options={selectData}
                />
            </Form>
        );
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
