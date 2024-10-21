import { PluginChartOptions, ScaleChartOptions, ScriptableContext } from "chart.js";
import { LABELS } from "../../../utils/ChartUtils";
import { IPlotPoint } from "../../../types/IPlotPoint";
import { _DeepPartialObject } from 'chart.js/dist/types/utils';

export function getMatrixOptions(): _DeepPartialObject<PluginChartOptions<"matrix"> & ScaleChartOptions<"matrix">> {
    return {
        maintainAspectRatio: true,
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (context: ScriptableContext<"matrix">) => {
                        const label = LABELS[context.datasetIndex];
                        const value = context.raw as IPlotPoint;

                        return `${label}, intervall ${value.y}: ${value.v}`;
                    }
                }
            }
        },
        scales: {
            x: {
                type: 'category',
                labels: LABELS,
            },
            y: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false
                },
                reverse: false,
                min: 0.5,
                max: 6.5
            }
        },
        animations: {
            x: {
                duration: 0
            },
            y: {
                duration: 0
            }
        }
    }
}
