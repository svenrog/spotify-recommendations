import { FlattenSimpleInterpolation } from 'styled-components';
import { AnswerContent } from '../../../types/QuestionContent';
import { Container } from './styles';

interface Props {
    answer: AnswerContent;
    css?: FlattenSimpleInterpolation;
    onClick?: (answer: AnswerContent) => void;
    selected: boolean;
    selection?: boolean;
    index: number;
}

function Answer({ answer, selected, index, selection, onClick, css }: Props) {
    return (
        <Container
            $selected={selected}
            $selection={selection}
            $deemphasize={answer.deemphasize}
            $index={index}
            $css={css}
            onClick={() => onClick && onClick(answer)}
        >
            {answer.text}
        </Container>
    );
}

export default Answer;
