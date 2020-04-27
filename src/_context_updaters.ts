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


export const updateValidationMetadata = (context: any, update: any) =>
    (fieldName: string, fieldValue: any, validation: IValidation): void => {
        if(typeof context.metadata === "undefined") {
            return;
        }
        if(!(fieldName in context.metadata)) {
            update({
                ...context,
                metadata: {
                    ...context.metadata,
                    [fieldName]: {
                        ...validation,
                        value: fieldValue,
                        isTouched: true,
                    }
                },
            });
            // Should update context.metadata value
        } else if(context.metadata[fieldName].value != fieldValue) {
            update({
                ...context,
                metadata: {
                    ...context.metadata,
                    [fieldName]: {
                        ...validation,
                        value: fieldValue,
                        isTouched: true,
                    }
                },
            });
        }

    };


