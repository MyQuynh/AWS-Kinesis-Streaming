import React from 'react';
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory';
import { WiseInsightsData } from './wiseInsightsSlice';

interface PopularHashtagBarChartProps {
  data: WiseInsightsData[];
  x: string;
  y: string;
  horizontal: boolean;
  w?: number;
  h?: number;
}

const PopularHashtagBarChart: React.FC<PopularHashtagBarChartProps> = ({
  data,
  x,
  y,
  horizontal,
  w = 500,
  h = 350,
  // eslint-disable-next-line arrow-body-style
}) => {
  return (
    <>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={20}
        width={w}
        height={h}
      >
        <VictoryAxis
          tickValues={data.map((t: WiseInsightsData) => t.text)}
          style={{
            grid: { stroke: 'none' },
            tickLabels: {
              fontSize: 10,
            },
          }}
        />
        <VictoryAxis
          dependentAxis
          label="Usage"
          style={{
            axisLabel: {
              padding: 30,
            },
          }}
        />
        <VictoryBar
          horizontal={horizontal}
          data={data}
          x={x}
          y={y}
          style={{
            data: { fill: '#ff9248' },
          }}
        />
      </VictoryChart>
    </>
  );
};

export default PopularHashtagBarChart;
