import {
    Chart,
    Colors,
    PointElement,
    LineElement,
    BarElement,
    LinearScale,
    RadialLinearScale,
    CategoryScale,
    Legend,
    Filler,
    Tooltip,
    PluginChartOptions,
    ScaleChartOptions,
    FontSpec,
    ScriptableContext,
} from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';


Chart.register(Colors);
Chart.register(
    MatrixController,
    MatrixElement,
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Legend,
    Filler,
    Tooltip
);

const labelStyle: Partial<FontSpec> = {
    size: 16, weight: 500, family: 'Raleway'
}

Chart.defaults.backgroundColor = '#9BD0F5';
Chart.defaults.borderColor = '#ffffff33';
Chart.defaults.color = '#ffffff77';
Chart.defaults.elements.point.borderColor = 'transparent';
Chart.defaults.scale.ticks.font = labelStyle;
Chart.defaults.scale.ticks.backdropColor = '#00000044';
Chart.defaults.scale.ticks.backdropPadding = 4;
Chart.defaults.plugins.legend.labels.font = labelStyle;

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
                    font: labelStyle
                },
                ticks: {
                    font: labelStyle
                }
            }
        }
    }
}

