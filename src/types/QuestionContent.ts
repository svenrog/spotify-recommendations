import { IValueModifier } from "./IValueModifier";

export type QuestionContent = {
    question: React.ReactNode;
    answers: AnswerContent[]
}

export type AnswerContent = {
    text: React.ReactNode;
    modifier?: IValueModifier[];
    deemphasize?: boolean;
}

