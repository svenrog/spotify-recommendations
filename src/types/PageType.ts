import { QuestionContent } from "./QuestionContent";
import { ResultContent } from "./ResultContent";

export type PageType = {
    path: string;
    type?: 'question' | 'results' | 'stats' | null;
    content?: QuestionContent | ResultContent;
    title: string;
    color: string;
    hide?: boolean;
};