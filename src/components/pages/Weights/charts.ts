import {
    PluginChartOptions,
    ScaleChartOptions,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { Decimals, Round } from '../../../utils/MathUtils';

export function getLineOptions(): _DeepPartialObject<PluginChartOptions<"line"> & ScaleChartOptions<"line">> {
    return {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                ticks: {
                    callback: (value: number | string, index: number) => {
                        const x = Round(index / 10, Decimals.One);
                        return x.toString();
                    },
                },
            },
        },
        animations: {
            y: {
                duration: 0,
            }
        }
    }
}
