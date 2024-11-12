import { useEffect, useMemo, useState } from 'react';
import { PageComponent } from '../../../types/PageComponent';
import { PageContent } from '../../../types/PageContent';
import { Wrapper, Container, Title, Description } from '../Shared/styles';
import { getData } from '../../../data/tracks'; 
import SpotifyEmbed from '../../atoms/SpotifyEmbed';
import { useRecommendations } from '../../../hooks/useRecommendations';
import {
    getTrackDistance,
    getTrackScaledDistances,
    mapRecommendationProfile,
    mapTrackValues,
    sortTracks,
} from '../../../utils/RecommendationUtils';

function Result({ page }: PageComponent) {
    const [recommendations, _] = useRecommendations();
    const [tracks, setTracks] = useState([]); 


    useEffect(() => {
        const fetchTracks = async () => {
            const data = await getData();
            if (data) {
                setTracks(data);
            }
        };
        fetchTracks();
    }, []);

    const result = useMemo(
        () => (tracks.length > 0 && recommendations ? sortTracks(tracks, recommendations) : []),
        [tracks, recommendations]
    );

    const track = useMemo(
        () => (recommendations?.questionsAnswered ? result[0] : null),
        [recommendations, result]
    );

    const content = page.content as PageContent;

    if (track && recommendations) {
        const top = [track, ...result.slice(1, 6)];
        console.log('Recommendation profile', mapRecommendationProfile(recommendations));
        console.log(`Top ${top.length} recommendations (out of ${result.length})`);
        console.log('---');
        top.forEach(t =>
            console.log(
                `${t.name}`,
                'distance',
                getTrackDistance(t, recommendations),
                getTrackScaledDistances(t, recommendations),
                mapTrackValues(t)
            )
        );
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
