import { IValidation } from "../validators";
import { ReactElement } from "react";
import { METADATA_NAMES } from "../form";
/** @internal */
interface IFormElementValidators {
    readonly results: Array<IValidation>;
    readonly name: string;
    readonly type: METADATA_NAMES;
    readonly className?: string;
    readonly parent?: string;
    readonly isTouched: boolean;
}
/** @internal */
declare type TypeValidationElement = {
    results: Array<IValidation>;
    styles: string;
};
/** @internal */
export declare function ValidationResults(props: TypeValidationElement): ReactElement<TypeValidationElement>;
/** @internal */
export declare const FormElementValidators: (props: IFormElementValidators) => ReactElement | null;
export {};
