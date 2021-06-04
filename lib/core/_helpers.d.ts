import { METADATA_NAMES, TypeFieldValueTypes } from "../form";
import { FIELD_NAMES } from "../elements";
/** @internal */
export declare function mergeDefaultCssWithProps(defaultValue: string, cssProps: any, bare: boolean): string;
/** @internal */
export declare function getMetadataNameType(type: FIELD_NAMES): METADATA_NAMES;
/** @internal */
export declare function getFieldValueType(type: FIELD_NAMES): TypeFieldValueTypes;
/**
 *  @internal
 *  @description Temporary fix until this issue is solved from a state perspective
 * */
export declare function isChar(charCode: number): boolean;
