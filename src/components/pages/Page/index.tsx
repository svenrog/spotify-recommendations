import { PageComponent } from '../../../types/PageComponent';
import { Container, Description, Title, Wrapper } from './styles';

function Page({ page }: PageComponent) {
    return (
        <Wrapper color={page.color}>
            <Container>
                <Title dangerouslySetInnerHTML={{ __html: page.title }} />
                <Description>Hittade du det du letade efter?</Description>
            </Container>
        </Wrapper>
    );
}

export default Page;
