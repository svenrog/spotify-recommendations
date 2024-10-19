import { QuestionContent } from "./QuestionContent";
import { PageContent } from "./PageContent";

export type PageType = {
    path: string;
    type?: 'question' | 'results' | 'stats' | 'weights' | null;
    content?: QuestionContent | PageContent;
    title: string;
    color: string;
    hide?: boolean;
};