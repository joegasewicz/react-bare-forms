import {ReactElement, default as React, Consumer, useContext, useEffect} from "react";
import {
    FormConsumer, FormContext,
    IFormContext,
    IMetadata,
    METADATA_NAMES,
    TypeMetadataNames,
    TypeRadioGroup
} from "./form";

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


           useEffect(() => {
               // Check all metadata on context

               for (let input of Object.keys(files)){
                   let _input = context.metadata[METADATA_NAMES.FILES][input];
                   console.log("File ----> ", _input);
               }

               for (let input of Object.keys(inputs)){
                   let _input = context.metadata[METADATA_NAMES.INPUTS][input];
                   console.log("Input ----> ", _input);
               }

               for (let input of Object.keys(fieldGroups)){
                   let _input = context.metadata[METADATA_NAMES.FIELD_GROUPS][input];
                   console.log("fieldGroups ----> ", _input);
               }

               for (let input of Object.keys(checkboxes)){
                   let _input = context.metadata[METADATA_NAMES.CHECKBOXES][input];
                   console.log("checkboxes ----> ", _input);
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
