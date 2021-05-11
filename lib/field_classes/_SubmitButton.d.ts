import { ReactElement } from "react";
export interface IButton<T> {
    create(): (props: T) => ReactElement<T>;
}
declare abstract class Button<T> implements IButton<T> {
    abstract create(): (props: T) => ReactElement<T>;
}
export interface ISubmitButtonProps {
    text?: string;
    disabled?: false;
    className?: string;
    children?: any;
}
/** @internal */
export declare class SubmitButton implements Button<ISubmitButtonProps> {
    private readonly GROUP_TYPES;
    private isGroup;
    create(): (props: ISubmitButtonProps) => JSX.Element;
}
export {};
