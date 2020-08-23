// ERRORS & EXCEPTION MESSAGES
//
// The below functions are only designed to construct Error & Exceptions messages.
// This makes it much simpler to test, while leaving the option to throw either
// an Error or an Exception to the caller.


/**
 *
 * @param type
 * @param name
 * @param message
 * @private
 */
export const _throwNewErrorMsg = (type: string, name: string, message: string): string =>
    `React Bare Forms ERROR:\n\t${type} - ${name}\n\t- ${message}`;


export const _isFieldEmptyErrorMsg = _throwNewErrorMsg(
    "Function",
    "isFieldEmpty()",
    "Missing argument: minLength (number)"
);

export class _FieldEmptyErrorMsg extends Error { }

export const _noContextError = _throwNewErrorMsg(
    "Required Props",
    "context",
    "You must pass in a context prop. Class components use 'state' " +
    "& functional components must use useState hook. See https://joegasewicz.github.io/react-bare-forms/modules/_form_.html"
);
