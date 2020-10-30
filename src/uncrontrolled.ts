/////////////////////////////////////////////////////////
// Public uncontrolled React Component Helper functions
/////////////////////////////////////////////////////////
import {default as React} from "react";
import {IFile} from "./core";

/**
 * RBF's provides a function that returns a React ref to access your file object.
 * To use, simply assign the returned ref from the createFileRef function to a
 * variable & pass this variable to FileField's ref prop.
 * @returns
 * @example
 * ```
 *
 *  import {createFileRef, FileField, isFile, getFileFromRef} from "react-bare-forms";
 *
 *  const myFileRef = createFileRef();
 *
 *  <FileField
 *     ref={myFileRef}
 *     hint="Must be a file"
 *     labelText="Upload your file"
 *     name="myFileTest"
 *     validators={[isFile()]}
 *  />
 *
 * ```
 */
export function createFileRef(): React.RefObject<HTMLFormElement> {
    return React.createRef<HTMLFormElement>();
}

/**
 * To get a file object back from the react ref, you can use `getFileFromRef` function.
 * @params The React ref returned from {@link createFileRef}
 * @returns
 * @example
 * ```
 *
 *  import {createFileRef, FileField, isFile, getFileFromRef} from "react-bare-forms";
 *
 *  const myFileRef = createFileRef();
 *
 *  <FileField
 *     ref={myFileRef}
 *     hint="Must be a file"
 *     labelText="Upload your file"
 *     name="myFileTest"
 *     validators={[isFile()]}
 *  />
 *
 *  let fileData = {
 *      myFile: getFileFromRef(myFileRef)
 *  };
 *
 *  // fileData.myFile is your Javascript File object.
 *
 * ```
 */
export function getFileFromRef(fileRef: React.RefObject<HTMLFormElement>): IFile|null {
    if(fileRef && (fileRef as any).current && Object.keys((fileRef as any).current.files).length) {
        return (fileRef as any).current.files[0];
    } else {
        return null;
    }
}
