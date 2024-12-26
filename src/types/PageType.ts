import { QuestionContent } from "./QuestionContent";
import { PageContent } from "./PageContent";

export type PageType = {
    url: string;
    type?: 'question' | 'results' | 'stats' | 'weights' | null;
    content?: QuestionContent | PageContent;
    title: string;
    color: string;
    hide?: boolean;
};