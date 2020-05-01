// Context Updaters
// Methods to update & track the state of all inputs, validators & general form metadata
//
// For example:
// const context = {
//     // other props...
//     metadata: {
//          inputs: {
//              email: {
//                  isValid: false,
//                  messages: ['Cannot be empty'],
//                  value: '',
//                  isTouched: false,
//              },
//              username: {
//                  isValid: true,
//                  messages: [],
//                  value: 'joebloggs',
//                  isTouched: true,
//              }
//          }
//     }
// };
import {IValidation} from "./validators";
import {IRadioField} from "./form-elements";


export const updateValidationMetadata = (context: any, update: any) =>
    (fieldName: string, fieldValue: any, validation: IValidation): void => {
        if(typeof context.metadata === "undefined") {
            return;
        }
        let contextUpdates = {
            ...context,
            metadata: {
                ...context.metadata,
                inputs: {
                  ...context.metadata.inputs,
                    [fieldName]: {
                        ...validation,
                        value: fieldValue,
                        isTouched: true,
                    }
                },
            },
        };
        if(!(fieldName in context.metadata.inputs) || context.metadata.inputs[fieldName].value != fieldValue) {
            update(contextUpdates);
        }
    };



export function updateRadioGroupMetadata(context: any, update: any) {
    return (radioProps: Array<IRadioField>) => {
        if(typeof context.metadata === "undefined") {
            return;
        }
        let contextUpdates = {
            ...context,

        }
    }
}
