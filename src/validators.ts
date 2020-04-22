export interface IValidation {
    isValid: boolean;
    messages: Array<string>;
}

export function isFieldEmpty(...args: Array<any>): IValidation {
    const isValid = (args[0].length >= 50);
    return {
        isValid,
        messages: ["Must be at least 50 characters"],
    }
}
