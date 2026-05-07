import { useMemo } from 'react';
import { useRecommendations } from '../../../hooks/useRecommendations';
import { useTracks } from '../../../hooks/useTracks';
import { PageComponent } from '../../../types/PageComponent';
import { PageContent } from '../../../types/PageContent';
import { Container, Title, Description, Wrapper } from '../Shared/styles';
import {
    getTrackDistance,
    getTrackScaledDistances,
    mapRecommendationProfile,
    mapTrackValues,
    sortTracks,
} from '../../../utils/RecommendationUtils';
import SpotifyEmbed from '../../atoms/SpotifyEmbed';

function Result({ page }: PageComponent) {
    const [recommendations, _] = useRecommendations();
    const tracks = useTracks();
    const result = useMemo(
        () => tracks ? sortTracks(tracks, recommendations) : [],
        [tracks, recommendations]
    );
    const track = useMemo(
        () => recommendations?.questionsAnswered && tracks ? result.shift() : null,
        [result, recommendations, tracks]
    );
    const content = page.content as PageContent;

    if (track && recommendations) {
        const top = [track!, ...result.slice(0, 5)];
        console.log('Recommendation profile', mapRecommendationProfile(recommendations));
        console.log(`Top ${top.length} recommendations (out of ${result.length + 1})`);
        console.log('---');
        top.forEach(t => console.log(`${t.name}`,
            'distance', getTrackDistance(t, recommendations),
            getTrackScaledDistances(t, recommendations),
            mapTrackValues(t)));
        console.log('---');
    }

    return (
        <Wrapper color={page.color}>
            <Container>
                {track ? (
                    <>
                        <Title dangerouslySetInnerHTML={{ __html: content.title }} />
                        <Description dangerouslySetInnerHTML={{ __html: content.body }} />
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
