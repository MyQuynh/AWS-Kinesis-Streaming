import React from 'react';
import HashtaggerBanner from './HashtaggerBanner';
import ContentSection from './ContentSection';

// eslint-disable-next-line arrow-body-style
const HashtaggerURLPage: React.FC = () => {
  return (
    <>
      <HashtaggerBanner />
      <ContentSection>URL Content</ContentSection>
    </>
  );
};

export default HashtaggerURLPage;
