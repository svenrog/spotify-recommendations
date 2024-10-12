import {
    Chart,
    Colors,
    PointElement,
    LineElement,
    LinearScale,
    RadialLinearScale,
    CategoryScale,
    Legend,
    Filler,
    Tooltip,
    PluginChartOptions,
    ScaleChartOptions
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';

Chart.defaults.backgroundColor = '#9BD0F5';
Chart.defaults.borderColor = '#ffffff33';
Chart.defaults.color = '#ffffff77';
Chart.defaults.scale.ticks.backdropColor = '#00000044';
Chart.defaults.scale.ticks.backdropPadding = 4;

Chart.register(Colors);
Chart.register(
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Legend,
    Filler,
    Tooltip
);

export function getScatterPlotOptions(renderTicks?: (value: string | number) => string): _DeepPartialObject<PluginChartOptions<"scatter"> & ScaleChartOptions<"scatter">> {
    return {
        plugins: {
            legend: {
                display: false,
            }
        },
        scales: {
            x: {
                ticks: {
                    callback: renderTicks,
                }
            }
        }
    }
}