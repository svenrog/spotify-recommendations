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
import { getEncodedHexValue } from '../../../utils/ColorUtils';

function Result({ page }: PageComponent) {
    const [recommendations, _] = useRecommendations();
    const [tracks, setTracks] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchTracks = async () => {
        console.log('fetching tracks');
        try {
            const data = await getData();
            if (data) {
                console.log('set track data', data);
                setTracks(data);
            }
        }
        catch (error) {
            setErrorMessage(error);
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        fetchTracks();
    }, []);

    const result = useMemo(
        () => (tracks.length > 0 && recommendations ? sortTracks(tracks, recommendations) : []),
        [tracks, recommendations]
    );

    const track = useMemo(
        //() => (recommendations?.questionsAnswered ? result[0] : null),
        () => (result[0]),
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

    const renderWrapper = (children) => {
        return (<Wrapper color={getEncodedHexValue(track?.albumBackgroundColor) ?? page.color}>
            <Container>
                {children}
            </Container>
        </Wrapper>)
    }

    if (track) {
        return renderWrapper(<><Title dangerouslySetInnerHTML={{ __html: content.title }} />
            <Description dangerouslySetInnerHTML={{ __html: content.body }} />
            <SpotifyEmbed trackId={track.id} />
        </>);
    }

    if (loaded && errorMessage) {
        console.log('rendering error', errorMessage);
        return renderWrapper(<>
            <Title>Hoppsan, ett<em>fel</em> uppstod</Title>
            <Description>{String(errorMessage)}</Description>
        </>);
    }

    if (loaded) {
        return renderWrapper(<>
            <Title>Inget <em>resultat</em> ännu</Title>
            <Description>Besvara några frågor och återvänd vid ett senare tillfälle.</Description>
        </>);
    }

    return renderWrapper(null);
}

export default Result;
