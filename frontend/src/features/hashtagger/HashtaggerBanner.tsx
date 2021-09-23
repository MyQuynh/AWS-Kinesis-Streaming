import React from 'react';
import TeamworkImage from '../../assets/teamwork-illustration.png';
import HeadBanner from '../../components/HeadBanner';

// eslint-disable-next-line arrow-body-style
const HashtaggerBanner: React.FC = () => {
  return (
    <>
      <HeadBanner
        imgSrc={TeamworkImage}
        headingMsg="Explore AI-based hashtag generator"
        caption="Try our latest hashtag generators in different formats powered by
            Artificial Intelligence"
      />
    </>
  );
};

export default HashtaggerBanner;
