import {default as React} from "react";
import {getFileFromRef} from "../uncrontrolled";


/** @internal **/
export interface IFile {
    readonly name: string;
    readonly lastModified: string;
    readonly lastModifiedDate: string;
    readonly size: string;
    readonly type: string;
}

/** @internal */
export function createFileObject(ref: React.RefObject<HTMLFormElement>): IFile|null {
    let fileData = getFileFromRef(ref);
    if(fileData) {
        let {name, lastModified, lastModifiedDate, size, type} = fileData;
        return {
            name,
            lastModified,
            lastModifiedDate,
            size,
            type,
        };
    }
    return null;
}
