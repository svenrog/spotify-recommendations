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
} from 'chart.js';
import { MatrixController, MatrixElement } from 'chartjs-chart-matrix';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';
import { chartLabelStyle } from './styles';

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

Chart.defaults.backgroundColor = '#9BD0F5';
Chart.defaults.borderColor = '#ffffff33';
Chart.defaults.color = '#ffffff77';
Chart.defaults.elements.point.borderColor = 'transparent';
Chart.defaults.scale.ticks.font = chartLabelStyle;
Chart.defaults.scale.ticks.backdropColor = '#00000044';
Chart.defaults.scale.ticks.backdropPadding = 4;
Chart.defaults.plugins.legend.labels.font = chartLabelStyle;