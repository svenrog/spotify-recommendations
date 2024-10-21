import { ChartData } from "chart.js";
import { MatrixDataPoint } from "chartjs-chart-matrix";
import { Chart } from "react-chartjs-2";
import { getMatrixOptions } from "./charts";


interface Props {
    data: ChartData<"matrix", MatrixDataPoint[], unknown>;
}

function Matrix({ data }: Props) {
    return (
        <Chart height={200} type='matrix' data={data}
            options={getMatrixOptions()} />
    );
}

export default Matrix;


