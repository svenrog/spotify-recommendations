import { IValueModifier } from "./IValueModifier";

export type QuestionContent = {
    question: string;
    answers: AnswerContent[]
}

export type AnswerContent = {
    text: string;
    modifier?: IValueModifier[];
    deemphasize?: boolean;
}