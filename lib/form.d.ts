import { default as React } from "react";
import { IValidation } from "./validators";
import { AbstractMetadata } from "./field_classes";
/** @internal */
export declare type TypeFieldValueTypes = "value" | "checked" | "file";
/** @internal */
export interface IFieldValues {
    currentValue: any;
    readonly type: TypeFieldValueTypes;
}
/** @internal */
export interface IFieldValidation {
    readonly name: string;
    validation: Array<IValidation>;
    fieldValues: IFieldValues;
    isTouched: boolean;
}
/** @internal */
export interface IInputFieldMetadata extends IFieldValidation {
}
/** @internal */
export interface IFileMetaData extends IFieldValidation {
    readonly refName: string;
}
/** @internal */
export interface IRadioGroupChildren extends IFieldValidation {
}
/** @internal */
export interface ICheckBoxesMetadata extends IFieldValidation {
}
/** @internal */
export declare type TypeInputMetadata = AbstractMetadata<IInputFieldMetadata>;
/** @internal */
export declare type TypeFileMetadata = AbstractMetadata<IFileMetaData>;
/** @internal */
export declare type TypeRadioGroupMetadata = AbstractMetadata<IRadioGroupChildren>;
/** @internal */
export declare type TypeCheckboxesMetadata = AbstractMetadata<ICheckBoxesMetadata>;
/** @internal */
export declare type TypeFormMetadata = TypeInputMetadata | TypeRadioGroupMetadata | TypeCheckboxesMetadata | TypeFileMetadata;
export interface IMetadata {
    radioGroups: TypeRadioGroupMetadata;
    inputs: TypeInputMetadata;
    files: TypeInputMetadata;
    checkboxes: TypeCheckboxesMetadata;
}
/** @internal **/
export declare enum METADATA_NAMES {
    INPUTS = "inputs",
    RADIO_GROUPS = "radioGroups",
    FILES = "files",
    CHECKBOXES = "checkboxes"
}
/**
 * @interface **IForm** Exported Form interface available to the caller. Contains all the properties required by
 * the Form *RBF* Form's component.
 */
export interface IForm extends React.FormHTMLAttributes<HTMLFormElement> {
    /** The passed in state from the parentName component */
    state: any;
    /** If the parentName component is a class component then the context must contain the parentName's **this** keyword. */
    context?: any;
    /** If the form's state is not directly contained at parentName's state root object, then formKey needs to represent the key. */
    readonly formKey?: string;
    /** Default is false. If set to true then the form state will be displayed just below the form component in `code` tags. */
    readonly debug?: boolean;
    /** Default is True. If set to false, the  validators will not be called until the form is submitted. */
    readonly dynamic?: boolean;
    /** The passed through props to the Form component */
    children?: any;
    /** Default set to false. If set to true then it will now use bootstrap styling or any extra elements. */
    readonly bare?: boolean;
    /** Callback function wil be called on form submission if all validators pass */
    readonly callback?: Function;
}
export interface ICursorPositionState {
    cursorPosition: number;
    fieldName: string;
}
export declare type TypeCursorPositionState = {
    [key: string]: ICursorPositionState;
};
export interface IFormContext {
    readonly bare?: boolean;
    readonly debug?: boolean;
    readonly dynamic?: boolean;
    readonly formKey?: string;
    cursorPositions: TypeCursorPositionState;
    metadata: IMetadata;
    state: any;
    updateCursorPositionState: (fieldName: string, cursorPosition: number) => void;
    updateParentState?: (e: React.ChangeEvent<any>, name: string, formKey?: string) => void;
    updateRadioGroupStateFromPassedInContext?: (e: React.ChangeEvent<any>, name: string, radioGroup: any, formKey?: string) => void;
}
/** @internal */
export interface IRadioGroupParentContext {
    parent?: {
        name: string;
    };
    children?: any;
}
/** @internal */
export declare const RadioGroupContext: React.Context<TypeRadioGroupMetadata>;
/** @internal */
export declare const FormContext: React.Context<IFormContext>;
/** @internal */
export declare const FormProvider: React.Provider<IFormContext>;
/**
 * @var Access the form state within a React Context Api Consumer scope
 * @example For example:
 * ```
 * <Form state={this.state} context={this}>
 *      <FormConsumer>
 *      {({state}) => {
 *          return <div>{state} is equal {myState}</div>;
 *      }}
 *    </FormConsumer>
 * </Form>
 * ```
 * */
export declare const FormConsumer: React.Consumer<IFormContext>;
/** @internal */
export declare const handleSubmit: (props: IForm) => (e: React.ChangeEvent<any>) => void;
/**
 * The main Form component that is required to wrap all *RBF* components.
 * If the component that uses the Form component is a functional component then
 * only the state props & state update function returned from the useState hook are
 * required. If you are calling Form component from a class component then you must
 * pass your local context or `this` keyword to
 * the `context` prop.
 * @param props {@link IForm}
 *
 * An example using *RBF* Form component in a functional component
 * @example
 * ```
 * // Minimal setup for a RBF's Form component
 *
 *  const myState = {
 *      username: '',
 *  }
 *  const [state, setState] = React.useState(state);
 *  <Form state={myState} context={setState}></Form>
 * ```
 *
 * To use *RBF* Form component from a class component you must pass in your
 * local state of `this` keyword.
 * @example
 * ```
 * // Minimal setup for a RBF's Form component for a class component
 *
 *  this.state = { // in the constructor
 *      username: '',
 *  }
 *
 *  <Form state={this.state} context={this}></Form>
 * ```
 * @constructor
 */
export declare const Form: (props: IForm) => JSX.Element;
