import { PageComponent } from '../../../types/PageComponent';
import { ResultContent } from '../../../types/ResultContent';
import { Title } from '../Question/styles';
import { Container, Graph, Graphs, Subtitle } from './styles';
import { Wrapper } from '../Page/styles';
import { tracks } from '../../../data/tracks';
import { Radar, Scatter } from 'react-chartjs-2';
import { useMemo } from 'react';
import {
    getDanceabilityValenceDataset,
    getKeyModeDataset,
    getTempoEnergyDataset,
} from '../../../utils/ChartUtils';
import './charts'; // Setup defaults for chart component

function Stats({ page }: PageComponent) {
    const content = page.content as ResultContent;
    const keyModeData = useMemo(() => getKeyModeDataset(tracks), [tracks]);
    const tempoEnergyData = useMemo(
        () => getTempoEnergyDataset(tracks),
        [tracks]
    );
    const danceabilityValenceData = useMemo(
        () => getDanceabilityValenceDataset(tracks),
        [tracks]
    );

    return (
        <Wrapper color={page.color}>
            <Container>
                <Title>{content.title}</Title>
                <Graphs>
                    <Graph>
                        <Subtitle>Modus och fördelning av tonarter</Subtitle>
                        <Radar data={keyModeData} />
                    </Graph>
                    <Graph>
                        <Subtitle>Tempo och energi</Subtitle>
                        <Scatter
                            data={tempoEnergyData}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                            }}
                        />
                    </Graph>
                    <Graph>
                        <Subtitle>Dansbarhet och valens</Subtitle>
                        <Scatter
                            data={danceabilityValenceData}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                            }}
                        />
                    </Graph>
                </Graphs>
            </Container>
        </Wrapper>
    );
}

export default Stats;
