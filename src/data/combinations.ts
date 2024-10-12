import { ITrackModel } from "../types/ITrackModel";
import { AnswerContent, QuestionContent } from "../types/QuestionContent";
import { sortTracks } from "../utils/RecommendationUtils";
import { setValueSpace } from "../utils/ValueSpaceUtils";
import { defaults } from "../components/contexts/RecommendationContext";
import { pages } from "./pages";

const questions: AnswerContent[][] = [];
const modulos: number[] = [];
const answers: number[] = [];

for (const page of pages) {
    if (page.type !== 'question') continue;
    const content = page.content! as QuestionContent;
    const index = questions.length;
    questions.push(content.answers);
    answers.push(content.answers.length)
    modulos[index] = answers.reduce((p, c) => p * c, 1);
}

export const getPermutations = () => {
    const iterations = modulos[modulos.length - 1];
    const permutations: number[][] = new Array(iterations);
    const values: number[] = new Array(questions.length);

    values.fill(0, 0, questions.length);

    for (let i = 0; i < iterations; i++) {
        permutations[i] = [];
        for (let q = 0; q < questions.length; q++) {
            const modulo = q < 1 ? 1 : modulos[q - 1];
            if ((i + 1) % modulo === 0) values[q] = (values[q] + 1) % answers[q];
            permutations[i][q] = values[q];
        }
    }

    return permutations;
}

export const performTest = (answers: number[], tracks: ITrackModel[]): ITrackModel => {
    const profile = { ...defaults };

    for (let i = 0; i < questions.length; i++) {

        const question = questions[i];
        const answer = question[answers[i]];
        const modifiers = answer.modifier || [];

        for (const modifier of modifiers) {
            const value = profile[modifier.property];
            profile[modifier.property] = setValueSpace(value, modifier);
        }
    }

    tracks = sortTracks(tracks, profile);

    return tracks[0];
}
