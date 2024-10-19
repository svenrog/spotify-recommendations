import { useMemo } from 'react';
import { PageComponent } from '../../../types/PageComponent';
import { PageContent } from '../../../types/PageContent';
import { Wrapper, Container, Description, Title } from '../Page/styles';
import { Section, Subtitle } from './styles';
import { getScalingDataset } from '../../../utils/ChartUtils';
import { Scaling } from '../../../utils/RecommendationWeights';
import { getLineOptions } from './charts';
import { Line, } from 'react-chartjs-2';
import '../Shared/chartboot'


console.log('scaling', Scaling.key)

function Weights({ page }: PageComponent) {
    const content = page.content as PageContent;
    const keyData = useMemo(() => getScalingDataset(Scaling.key), []);
    const modeData = useMemo(() => getScalingDataset(Scaling.mode), []);
    const durationData = useMemo(() => getScalingDataset(Scaling.durationMs), []);
    const tempoData = useMemo(() => getScalingDataset(Scaling.tempo), []);
    const energyData = useMemo(() => getScalingDataset(Scaling.energy), []);
    const acousticnessData = useMemo(() => getScalingDataset(Scaling.acousticness), []);
    const danceabilityData = useMemo(() => getScalingDataset(Scaling.danceability), []);
    const livenessData = useMemo(() => getScalingDataset(Scaling.liveness), []);
    const valenceData = useMemo(() => getScalingDataset(Scaling.valence), []);

    return (
        <Wrapper color={page.color}>
            <Container>
                <Title>{content.title}</Title>
                <Description>{content.body}</Description>
                <Section>
                    <div>
                        <Subtitle>Tonart</Subtitle>
                        <p>Ett heltal som representerar låtens tonart som <a href='https://en.wikipedia.org/wiki/Pitch_class'>pitchklass</a> (0 = C, 1 = C♯/D♭, 2 = D, osv). Om tonarten ej hittades är detta värde -1.</p>
                    </div>
                    <Line
                        className='chart'
                        width={320}
                        height={240}
                        data={keyData}
                        options={getLineOptions()}
                    />
                </Section>
                <Section>
                    <div>
                        <Subtitle>Modus</Subtitle>
                        <p>Indikerar modaliteten (dur eller moll) hos ett låt. Dur är 1 och moll är 0.</p>
                    </div>
                    <Line
                        className='chart'
                        width={320}
                        height={240}
                        data={modeData}
                        options={getLineOptions()}
                    />
                </Section>
                <Section>
                    <div>
                        <Subtitle>Längd</Subtitle>
                        <p>Låtens längd, lagras internt som millisekunder men presenteras som minuter och sekunder.</p>
                    </div>
                    <Line
                        className='chart'
                        width={320}
                        height={240}
                        data={durationData}
                        options={getLineOptions()}
                    />
                </Section>
                <Section>
                    <div>
                        <Subtitle>Tempo</Subtitle>
                        <p>Det totala uppskattade tempot för ett spår i slag per minut (BPM).</p>
                    </div>
                    <Line
                        className='chart'
                        width={320}
                        height={240}
                        data={tempoData}
                        options={getLineOptions()}
                    />
                </Section>
                <Section>
                    <div>
                        <Subtitle>Energi</Subtitle>
                        <p>Energi mäts från 0,0 till 1,0 och representerar en uppskattad intensitet och aktivitet. Vanligtvis känns energifyllda spår snabba, högljudda och bullriga. Till exempel får death metal höga poäng, medan ett Bach-preludium får låga. Egenskaper som bidrar till detta värde innefattar dynamiskt omfång, upplevd ljudstyrka, klangfärg eller tonansats.</p>
                    </div>
                    <Line
                        className='chart'
                        width={320}
                        height={240}
                        data={energyData}
                        options={getLineOptions()}
                    />
                </Section>
                <Section>
                    <div>
                        <Subtitle>Akustiskhet</Subtitle>
                        <p>En sannolikhet från 0,0 till 1,0 om låten innehåller akustiska instrument. 1.0 representerar hög sannolikhet.</p>
                    </div>
                    <Line
                        className='chart'
                        width={320}
                        height={240}
                        data={acousticnessData}
                        options={getLineOptions()}
                    />
                </Section>
                <Section>
                    <div>
                        <Subtitle>Dansbarhet</Subtitle>
                        <p>Beskriver hur bra det går att dansa till en låt, baserat på en kombination av musikaliska egenskaper, inklusive tempo, rytmstabilitet, taktstyrka och övergripande regelbundenhet. Skalan går från 0,0 som representerar minst dansbart och 1,0 mest.</p>
                    </div>
                    <Line
                        className='chart'
                        width={320}
                        height={240}
                        data={danceabilityData}
                        options={getLineOptions()}
                    />
                </Section>
                <Section>
                    <div>
                        <Subtitle>Livekänsla</Subtitle>
                        <p>Mäter publiknärvaro i inspelningen. Högre värden representerar en ökad sannolikhet att låten framfördes live. Ett värde över 0,8 innebär stor sannolikhet.</p>
                    </div>
                    <Line
                        className='chart'
                        width={320}
                        height={240}
                        data={livenessData}
                        options={getLineOptions()}
                    />
                </Section>
                <Section>
                    <div>
                        <Subtitle>Valens</Subtitle>
                        <p>Ett mått från 0,0 till 1,0 som beskriver en uppskattad musikalisk positivitet. Låtar med hög valens låter mer positiva (glada, glada, euforiska), medan spår med låg valens låter negativa (ledsna, deprimerade, arga).</p>
                    </div>
                    <Line
                        className='chart'
                        width={320}
                        height={240}
                        data={valenceData}
                        options={getLineOptions()}
                    />
                </Section>

            </Container>
        </Wrapper>
    );
}

export default Weights;
