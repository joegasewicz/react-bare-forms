import { default as React } from "react";
/** @internal **/
export interface IFile {
    readonly name: string;
    readonly lastModified: string;
    readonly lastModifiedDate: string;
    readonly size: string;
    readonly type: string;
}
/** @internal */
export declare function createFileObject(ref: React.RefObject<HTMLFormElement>): IFile | null;
