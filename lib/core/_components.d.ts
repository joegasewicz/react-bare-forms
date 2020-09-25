import { default as React } from "react";
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
export declare const FormElementValidators: (props: IFormElementValidators) => React.ReactElement<any, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
export {};
