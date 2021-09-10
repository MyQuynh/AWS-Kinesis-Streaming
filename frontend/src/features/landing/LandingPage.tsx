import React from 'react';
import LandingBanner from './LandingBanner';
import OfferSection, { Offer } from './OfferSection';
import CaptionOrange from '../../assets/caption-orange.png';
import PhotoOrange from '../../assets/photo-orange.png';
import LinkOrange from '../../assets/link-orange.png';
import DashboardOrange from '../../assets/dashboard-orange.png';
import MailSection from './MailSection';

/**
 * List of offer items (client-side)
 */
const offers: Offer[] = [
  {
    assetURI: PhotoOrange,
    name: 'Image Hashtagger',
    description: 'A picture worths a thousand words!',
    isPremium: false,
  },
  {
    assetURI: CaptionOrange,
    name: 'Caption Hashtagger',
    description:
      'Don’t worry about using lengthy words, we got that sum up for you!',
    isPremium: false,
  },
  {
    assetURI: LinkOrange,
    name: 'Link Hashtagger',
    description: 'Even a link can speak itself now, pretty cool!',
    isPremium: false,
  },
  {
    assetURI: DashboardOrange,
    name: 'Wise Insights',
    description: 'Magic gadget to help you understand the virtuality!',
    isPremium: true,
  },
];

// eslint-disable-next-line arrow-body-style
const LandingPage: React.FC = () => {
  return (
    <>
      <LandingBanner />
      <OfferSection offers={offers} />
      <MailSection />
    </>
  );
};

export default LandingPage;
