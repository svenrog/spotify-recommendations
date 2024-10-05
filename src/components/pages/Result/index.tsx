import { useMemo } from 'react';
import { useRecommendations } from '../../../hooks/useRecommendations';
import { PageComponent } from '../../../types/PageComponent';
import { ResultContent } from '../../../types/ResultContent';
import { Title } from '../Question/styles';
import { Container, Description } from './styles';
import { Wrapper } from '../Page/styles';
import { sortTracks } from '../../../utils/RecommendationUtils';
import SpotifyEmbed from '../../atoms/SpotifyEmbed';
import { tracks } from '../../../data/tracks';

function Result({ page }: PageComponent) {
  const [recommendations, _] = useRecommendations();
  const result = useMemo(
    () => sortTracks(tracks, recommendations),
    [recommendations, tracks]
  );

  const track = result[0];
  const content = page.content as ResultContent;
  return (
    <Wrapper color={page.color}>
      <Container>
        {track ? (
          <>
            <Title>{content.title}</Title>
            <Description>{content.body}</Description>
            <SpotifyEmbed trackId={track.id} />
          </>
        ) : (
          <>
            <Title>
              Inget <em>resultat</em> ännu
            </Title>
            <Description>
              Besvara några frågor och återvänd vid ett senare tillfälle.
            </Description>
          </>
        )}
      </Container>
    </Wrapper>
  );
}

export default Result;
