import {
    PluginChartOptions,
    ScaleChartOptions,
    ScriptableContext,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { chartLabelStyle } from '../Shared/styles';

export function getScatterPlotOptions(renderTicks?: (value: string | number) => string): _DeepPartialObject<PluginChartOptions<"scatter"> & ScaleChartOptions<"scatter">> {
    return {
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    title: (contexts: ScriptableContext<"scatter">[]) => {
                        const context = contexts[0];
                        if (context.datasetIndex > 0) {
                            return "Svarsalternativ";
                        }
                        //@ts-ignore
                        return context.label;
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    callback: renderTicks,
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

export function getRadarPlotOptions(): _DeepPartialObject<PluginChartOptions<"radar"> & ScaleChartOptions<"radar">> {
    return {
        scales: {
            r: {
                pointLabels: {
                    font: chartLabelStyle
                },
                ticks: {
                    font: chartLabelStyle
                }
            }
        }
    }
}

