import { PageComponent } from '../../../types/PageComponent';
import { Container, Description, Title, Wrapper } from '../Shared/styles';

function NotFound({ page }: PageComponent) {
    return (
        <Wrapper color="#222">
            <Container>
                <Title>Hoppsan, det verkar som att sidan <em>fattas</em></Title>
                <Description>Prova <a href="/fraga-1">startsidan</a>, <a href="/stats">statistiksidan</a> eller <a href="/weights">informationssidan</a> om viktning istället.</Description>
            </Container>
        </Wrapper>
    );
}

export default NotFound;
