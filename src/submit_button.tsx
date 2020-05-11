import {ReactElement, default as React, useContext, useEffect} from "react";
import {FormContext, METADATA_NAMES} from "./form";

export interface IButton<T> {
    create(): (props: ISubmitButtonProps) => ReactElement<T>;
}


abstract class Button<T> implements IButton<T> {

    public abstract create(): (props: T) => ReactElement<T>;

}

export interface ISubmitButtonProps {
    text?: string;
    disabled?: false;
    className?: string;
    children?: any;
}

/**
 * SubmitButton is the main component for submitting forms.
 *
 */
class _SubmitButton implements Button<ISubmitButtonProps> {

    create() {
       return (props: ISubmitButtonProps) => {
           // Context
           const context = useContext(FormContext);

           // Styles
           const { className = "btn btn-success btn-lg", disabled = true} = props;

           let isDisabled = true;

           // Check inputs
           let inputs = context.metadata[METADATA_NAMES.INPUTS];
           // Check files
           let fieldGroups = context.metadata[METADATA_NAMES.FIELD_GROUPS];
           // Check fieldGroups
           let files = context.metadata[METADATA_NAMES.FILES];
           // Check checkboxes
           let checkboxes = context.metadata[METADATA_NAMES.CHECKBOXES];

           let inputsValid = true;
           let filesValid = true;
           let radiosValid = true;
           let checkboxesValid = true;

           useEffect(() => {
               // Check all metadata on context
               // TODO
               for (let input of Object.keys(inputs)){
                   let _input = context.metadata[METADATA_NAMES.INPUTS][input];
                   console.log("inputs", _input);
                   // if(!_input.isTouched || _input.isTouched && !_input.isValid) {
                   //     inputsValid = false;
                   // }
               }

               for (let input of Object.keys(files)){
                   let _input = context.metadata[METADATA_NAMES.FILES][input];
                   // if(!_input.isTouched || _input.isTouched && !_input.isValid) {
                   //     inputsValid = false;
                   // }
                   console.log("files", _input);
               }

               for (let input of Object.keys(fieldGroups)){
                   let _input = context.metadata[METADATA_NAMES.FIELD_GROUPS][input];
                   console.log("fieldGroups", _input);
                   for(let radio of Object.keys(_input)) {
                       // if(!_input.isValid) {
                       //     inputsValid = false;
                       // }
                   }

               }

               for (let input of Object.keys(checkboxes)){
                   let _input = context.metadata[METADATA_NAMES.CHECKBOXES][input];
                   console.log("checkboxes", _input);
                   // if(!_input.isTouched || _input.isTouched && !_input.isValid) {
                   //     inputsValid = false;
                   // }
               }

               if(inputsValid && filesValid && radiosValid && checkboxesValid) {
                   isDisabled = false;
               }

           }, [inputs, fieldGroups, files, checkboxes]);


           return (<button
               disabled={isDisabled}
               className={className}
           >{props.children}</button>);
       }
    }
}

export const SubmitButton = new _SubmitButton().create();
