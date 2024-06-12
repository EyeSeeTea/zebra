export type Id = string;

export interface Ref {
    id: Id;
}

export interface NamedRef extends Ref {
    name: string;
}

export interface CodedNamedRef extends NamedRef {
    code: string;
}

export type Option = CodedNamedRef;
