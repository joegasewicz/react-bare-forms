import {default as React, useContext} from "react";

import {IValidation} from "../validators";
import {ReactElement} from "react";
import {FormContext, IFormContext, METADATA_NAMES} from "../form";



/** @internal */
interface IFormElementValidators {
    readonly results: Array<IValidation>;
    readonly name: string;
    readonly value: any;
    readonly type: METADATA_NAMES;
    readonly className?: string;
    readonly parent?: string;
}
/** @internal */
type TypeValidationElement = { results: Array<IValidation>, styles: string };

/** @internal */
export function ValidationResults(props: TypeValidationElement): ReactElement<TypeValidationElement> {
    const { results, styles } = props;
    return (<>{results.map((result: IValidation) =>
        result.messages.map((msg: string, index: number) =>
            <div key={index} className={styles}>{msg}</div>
        ))}</>);
}

/** @internal */
export const FormElementValidators = (props: IFormElementValidators): ReactElement => {
    const {results, name, parent, type} = props;
    const context: IFormContext = useContext(FormContext);
    const styles = !context.bare ? `alert mt-2 alert-danger ${props.className}` : props.className;
    return <ValidationResults results={results} styles={styles} />;
};
