import {ReactElement, default as React, Consumer} from "react";
import {FormConsumer, IFormContext} from "./form";

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
           const { className = "btn btn-success btn-lg", disabled = true} = props;
           return (
               <FormConsumer>
                   {(context: IFormContext) => {
                       let isDisabled;
                       if(context && context.metadata && Object.keys(context.metadata.inputs).length > 0) {
                           const inputItem = context.metadata.inputs;
                           Object.keys(inputItem).map((key: any) => {
                               if(!inputItem[key].isValid) {
                                   isDisabled = true;
                               }
                           });
                       }
                       return (<button
                           disabled={isDisabled}
                           className={className}
                       >{props.children}</button>);
                   }}
               </FormConsumer>
           );
       }
    }
}

export const SubmitButton = new _SubmitButton().create();
