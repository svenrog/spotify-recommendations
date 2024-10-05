import { FlattenSimpleInterpolation } from 'styled-components';
import { AnswerContent } from '../../../types/QuestionContent';
import { Container } from './styles';

interface Props {
    answer: AnswerContent;
    css?: FlattenSimpleInterpolation;
    onClick?: (answer: AnswerContent) => void;
    selected: boolean;
}

function Answer({ answer, selected, onClick, css }: Props) {
    return (
        <Container
            $selected={selected}
            $deemphasize={answer.deemphasize}
            $css={css}
            onClick={() => onClick && onClick(answer)}
        >
            {answer.text}
        </Container>
    );
}

export default Answer;
