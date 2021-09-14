import React from 'react';
import {
  VictoryChart,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
} from 'victory';
import { HashtagData } from './WordCloud';

interface PopularHashtagBarChartProps {
  data: HashtagData[];
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
          tickValues={data.map((t: HashtagData) => t.text)}
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
