/////////////////////////////////////////////////////////
// Public uncontrolled React Component Helper functions
/////////////////////////////////////////////////////////
import {default as React} from "react";

/**
 * @returns a React Ref
*/
export function createFileRef(): React.RefObject<HTMLFormElement> {
    return React.createRef<HTMLFormElement>();
}

/**
 *
 * @param fileRef
 */
export function getFileFromRef(fileRef: React.RefObject<HTMLFormElement>) {
    return fileRef.current.files[0];
}
