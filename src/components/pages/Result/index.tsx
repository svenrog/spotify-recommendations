import { useMemo } from 'react';
import { useRecommendations } from '../../../hooks/useRecommendations';
import { PageComponent } from '../../../types/PageComponent';
import { PageContent } from '../../../types/PageContent';
import { Container, Title, Description } from '../Page/styles';
import { Wrapper } from '../Page/styles';
import {
    getTrackDistance,
    getTrackDistances,
    mapRecommendationProfile,
    mapTrackValues,
    sortTracks,
} from '../../../utils/RecommendationUtils';
import SpotifyEmbed from '../../atoms/SpotifyEmbed';
import { tracks } from '../../../data/tracks';

function Result({ page }: PageComponent) {
    const [recommendations, _] = useRecommendations();
    const result = useMemo(
        () => sortTracks(tracks, recommendations),
        [recommendations]
    );
    const track = useMemo(
        () => recommendations?.questionsAnswered ? result.shift() : null,
        [recommendations]
    );
    const content = page.content as PageContent;

    if (track && recommendations) {
        const top = [track!, ...result.slice(0, 4)];
        console.log('Recommendation profile', mapRecommendationProfile(recommendations));
        console.log(`Top ${top.length} recommendations (out of ${result.length + 1})`);
        console.log('---');
        top.forEach(t => console.log(`${t.name}`, 'score', getTrackDistance(t, recommendations), getTrackDistances(t, recommendations), mapTrackValues(t)));
        console.log('---');
    }

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
