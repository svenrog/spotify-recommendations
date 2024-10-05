import { useState } from 'react';
import { useRecommendations } from '../../../hooks/useRecommendations';
import { AnswerContent, QuestionContent } from '../../../types/QuestionContent';
import { PageComponent } from '../../../types/PageComponent';
import { Answers, answerStyles, Container, Title, Wrapper } from './styles';
import Answer from '../../atoms/Answer';

function Question({ page, nextPage }: PageComponent) {
  const content = page.content as QuestionContent;
  const [selected, setSelected] = useState<number>();
  const [_, setRecommendations] = useRecommendations();

  const onClickHandler = (answer: AnswerContent, index: number) => {
    if (answer.modifier) {
      answer.modifier.forEach((modifier) => setRecommendations(modifier));
    }
    setSelected(index);
    setTimeout(() => {
      nextPage && nextPage();
    }, 350);
  };

  return (
    <Wrapper color={page.color}>
      <Container $hasSelection={Boolean(selected && selected >= 0)}>
        <Title>{content.question}</Title>
        <Answers>
          {content.answers.map((answer, index) => (
            <Answer
              css={answerStyles}
              key={index}
              answer={answer}
              selected={selected == index}
              onClick={(a) => onClickHandler(a, index)}
            />
          ))}
        </Answers>
      </Container>
    </Wrapper>
  );
}

export default Question;
