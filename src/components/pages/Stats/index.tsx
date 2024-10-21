import { useEffect, useMemo, useState } from 'react';
import { PageComponent } from '../../../types/PageComponent';
import { PageContent } from '../../../types/PageContent';
import { Graph, Graphs, List, Dual } from './styles';
import { Wrapper, Container, Title, Subtitle } from '../Page/styles';
import { tracks } from '../../../data/tracks';
import { Radar, Scatter } from 'react-chartjs-2';
import { emptyAnalysis, IPropblemAnalysis } from '../../../types/IProblemAnalysis';
import { getRadarPlotOptions, getScatterPlotOptions } from './charts';
import Matrix from '../../atoms/Matrix';
import {
    getBucketDataset,
    getKeyModeDataset,
    getScatterPlotDataset,
    getTime,
} from '../../../utils/ChartUtils';
import '../Shared/chartboot'; // Setup defaults for chart component

const displayMissingTracks = 30;

function Stats({ page }: PageComponent) {
    const content = page.content as PageContent;
    const [{ missingTracks, missingBuckets, collidingTracks, collidingBuckets, heatMap, permutations }, setProblems] = useState<IPropblemAnalysis>(emptyAnalysis);
    const keyModeData = useMemo(() => getKeyModeDataset(tracks), [tracks]);
    const tempoEnergyData = useMemo(
        () => getScatterPlotDataset('tempo', 'energy', tracks, heatMap),
        [tracks, heatMap]
    );
    const danceabilityValenceData = useMemo(
        () => getScatterPlotDataset('danceability', 'valence', tracks, heatMap),
        [tracks, heatMap]
    );
    const durationTempoData = useMemo(
        () => getScatterPlotDataset('durationMs', 'tempo', tracks, heatMap),
        [tracks, heatMap]
    );
    const livenessAcousticnessData = useMemo(
        () => getScatterPlotDataset('liveness', 'acousticness', tracks, heatMap),
        [tracks, heatMap]
    );
    const missingTracksData = useMemo(
        () => {
            const buckets = getBucketDataset(missingBuckets);
            return buckets;
        },
        [tracks, missingBuckets]
    )
    const collidingTracksData = useMemo(
        () => {
            const buckets = getBucketDataset(collidingBuckets);
            return buckets;
        },
        [tracks, collidingBuckets]
    )
    useEffect(() => {
        const problemWorker = new Worker('./problemWorker.js', { type: "module" });
        problemWorker.onmessageerror = (error) => {
            console.warn(error);
        }
        problemWorker.onerror = (error) => {
            console.error(error);
        }
        problemWorker.onmessage = (message) => {
            const problems = message.data as IPropblemAnalysis;
            console.log('analysis complete', problems)
            setProblems(problems);
        }
        problemWorker.postMessage(tracks);
        return () => problemWorker.terminate();
    }, []);
    return (
        <Wrapper color={page.color}>
            <Container>
                <Title>{content.title}</Title>
                <Graphs>
                    <Graph>
                        <Subtitle>Modus och fördelning av tonarter</Subtitle>
                        <Radar data={keyModeData}
                            options={getRadarPlotOptions()} />
                    </Graph>
                    <Graph>
                        <Subtitle>Tempo och energi</Subtitle>
                        <Scatter
                            data={tempoEnergyData}
                            options={getScatterPlotOptions((value) => `${value} BPM`)}
                        />
                    </Graph>
                    <Graph>
                        <Subtitle>Dansbarhet och valens</Subtitle>
                        <Scatter
                            data={danceabilityValenceData}
                            options={getScatterPlotOptions()}
                        />
                    </Graph>
                    <Graph>
                        <Subtitle>Låtlängd och tempo</Subtitle>
                        <Scatter
                            data={durationTempoData}
                            options={getScatterPlotOptions((value) => {
                                const { minutes, seconds } = getTime(value as number);
                                return `${minutes}:${seconds}`
                            })}
                        />
                    </Graph>
                    <Graph>
                        <Subtitle>Livekänsla och akustiska instrument</Subtitle>
                        <Scatter
                            data={livenessAcousticnessData}
                            options={getScatterPlotOptions()}
                        />
                    </Graph>
                </Graphs>
                {collidingTracks.length > 0 &&
                    <List>
                        <Subtitle>Låtar som förekommer i över 100 av {permutations} frågekombinationer</Subtitle>
                        <table>
                            <thead>
                                <tr>
                                    <th>Låtnamn</th>
                                    <th>Artist</th>
                                    <th>Frågor</th>
                                    <th>Poäng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {collidingTracks.map(t => <tr key={t.id}>
                                    <td className='track'>{t.name}</td>
                                    <td className='artist'>{t.artistName}</td>
                                    <td className="count">{t.count}</td>
                                    <td className="score">{t.score}</td>
                                </tr>)}
                            </tbody>
                        </table>
                    </List>
                }
                {missingTracks.length > 0 &&
                    <>
                        <List>
                            <Subtitle>Låtar som inte visas i någon frågekombination</Subtitle>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Låtnamn</th>
                                        <th>Artist</th>
                                        <th>Poäng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {missingTracks.slice(0, displayMissingTracks).map(t => <tr key={t.id}>
                                        <td className='track'>{t.name}</td>
                                        <td className='artist'>{t.artistName}</td>
                                        <td className="score">{t.score}</td>
                                    </tr>)}
                                    {missingTracks.length > displayMissingTracks && <tr>
                                        <td colSpan={3}><span className="dark">Dolde {missingTracks.length - displayMissingTracks} resultat...</span></td>
                                    </tr>}
                                </tbody>
                            </table>
                        </List>
                        {missingTracksData && <Graph>
                            <Subtitle>Gemensamt för låtar som inte visas / visas</Subtitle>
                            <Dual>
                                <Matrix data={missingTracksData} />
                                {collidingTracksData && <Matrix data={collidingTracksData} />}
                            </Dual>
                        </Graph>}
                    </>
                }
            </Container>
        </Wrapper >
    );
}

export default Stats;
