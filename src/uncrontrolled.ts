/////////////////////////////////////////////////////////
// Public uncontrolled React Component Helper functions
/////////////////////////////////////////////////////////
import {default as React} from "react";
import {IFile} from "./_file";

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
export function getFileFromRef(fileRef: React.RefObject<HTMLFormElement>): IFile {
    if(fileRef) {
        return fileRef.current.files[0];
    } else {
        return null;
    }
}
