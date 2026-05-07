import type { QuestionContent } from "./QuestionContent";
import type { PageContent } from "./PageContent";

export type PageType = {
    url: string;
    type?: 'question' | 'results' | 'stats' | 'weights' | null;
    content?: QuestionContent | PageContent;
    title: string;
    color: string;
    hide?: boolean;
};