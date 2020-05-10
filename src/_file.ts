import {default as React} from "react";
import {getFileFromRef} from "./uncrontrolled";

// File Helper Functions


/** @internal **/
export interface IFile {
    readonly name: string;
    readonly lastModified: string;
    readonly lastModifiedDate: string;
    readonly size: string;
    readonly type: string;
}

/** @internal */
export function createFileObject(ref: React.RefObject<HTMLFormElement>): IFile {
    try {
        let {name, lastModified, lastModifiedDate, size, type} = getFileFromRef(ref);
        return {
            name,
            lastModified,
            lastModifiedDate,
            size,
            type,
        };
    } catch (err) {
          return null;
    }
}
