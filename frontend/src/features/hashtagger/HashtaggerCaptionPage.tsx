import React from 'react';
import HashtaggerBanner from './HashtaggerBanner';
import ContentSection from './ContentSection';

// eslint-disable-next-line arrow-body-style
const HashtaggerCaptionPage: React.FC = () => {
  return (
    <>
      <HashtaggerBanner />
      <ContentSection>Caption Content</ContentSection>
    </>
  );
};

export default HashtaggerCaptionPage;
