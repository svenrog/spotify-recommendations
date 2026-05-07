import type {
    PluginChartOptions,
    ScaleChartOptions,
} from 'chart.js';
import { Decimals, Round } from '../../../utils/MathUtils';
//@ts-ignore
import type { _DeepPartialObject } from 'chart.js/dist/types/utils';

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
            y: {
                max: 2.0,
                min: 0.0,
            }
        },
        animations: {
            y: {
                duration: 0,
            }
        }
    }
}
