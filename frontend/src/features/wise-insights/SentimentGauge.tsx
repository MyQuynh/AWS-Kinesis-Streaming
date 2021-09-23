import React from 'react';
import GaugeChart from 'react-gauge-chart';

interface SentimentGaugeProps {
  percent: number;
}

// eslint-disable-next-line arrow-body-style
const SentimentGauge: React.FC<SentimentGaugeProps> = ({ percent }) => {
  return (
    <>
      <GaugeChart
        id="sentiment-gauge"
        percent={percent}
        colors={['#ff0000', '#fff000', '#00FF00']}
        textColor="#000000"
      />
    </>
  );
};

export default SentimentGauge;
