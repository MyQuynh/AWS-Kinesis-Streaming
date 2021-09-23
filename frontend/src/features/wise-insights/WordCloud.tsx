import React from 'react';
import ReactWordCloud from 'react-wordcloud';

export interface HashtagData {
  text: string;
  value: number;
}

interface WordCloudProps {
  data: HashtagData[];
  width?: number;
  height?: number;
}

const WordCloud: React.FC<WordCloudProps> = ({
  data,
  width = 1200,
  height = 500,
}) => (
  <>
    <ReactWordCloud words={data} size={[width, height]} />
  </>
);

export default WordCloud;
