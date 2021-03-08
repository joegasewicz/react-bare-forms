import {default as React, ReactElement, useContext} from "react";


import {FormContext, IMetadata, METADATA_NAMES} from "../form";

export interface IButton<T> {
    create(): (props: T) => ReactElement<T>;
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

/** @internal */
export class SubmitButton implements Button<ISubmitButtonProps> {


    private readonly GROUP_TYPES = ["radioGroups"]; // TODO...

    private isGroup(metaType: METADATA_NAMES): boolean {
        return this.GROUP_TYPES.includes(metaType);
    }


    create() {
       return (props: ISubmitButtonProps) => {
           // Context
           const context = useContext(FormContext);

           // Styles
           const { className = "btn btn-success btn-lg", disabled = true} = props;

           let isDisabled = false;
           const inputState = context.metadata.inputs.state;
           for (let meta of Object.keys(context.metadata)) {
               let metaField = context.metadata[meta as keyof IMetadata].state;
               // If all all fields are valid then pass through the default isDisabled value
               // Check to see that the member is not part of a metadata group
                if(!this.isGroup(context.metadata[meta as keyof IMetadata].metaType)) {
                    for(let field of Object.keys(metaField)) {
                        for(let validation of metaField[field].validation) { // TODO DRY
                            if(!validation.isValid) {
                                isDisabled = true;
                            }
                        }
                    }
                } else {
                    // Handle group metadata validation checks
                    for(let field of Object.keys(metaField)) {
                        for(let childField of Object.keys(metaField[field])) {
                            let _child = (metaField[field] as any)[childField];
                            for(let validation of _child.validation) { // TODO DRY
                                if(!validation.isValid) {
                                    isDisabled = true;
                                }
                            }
                        }
                    }
                }

           }

           return (<button
               {...props}
               disabled={isDisabled}
               className={className}
           >{props.children}</button>);
       }
    }
}
