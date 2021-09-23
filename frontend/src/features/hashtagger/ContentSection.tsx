import React, { ReactChildren, ReactElement, ReactNode } from 'react';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import { FaAmilia, FaFileImage, FaLink } from 'react-icons/fa';
import SideMenu, { MenuItem } from './SideMenu';

const menuItems: MenuItem[] = [
  {
    icon: FaAmilia,
    id: 'caption',
    name: 'Caption Hashtagger',
  },
  {
    icon: FaFileImage,
    id: 'image',
    name: 'Image Hashtagger',
  },
  {
    icon: FaLink,
    id: 'url',
    name: 'URL Hashtagger',
  },
];

interface ContentSectionProps {
  children: ReactNode;
}

// eslint-disable-next-line arrow-body-style
const ContentSection: React.FC<ContentSectionProps> = ({ children }) => {
  return (
    <>
      <Container maxW="container.xl" mb={2}>
        <Grid templateRows="1fr" templateColumns="1fr 4fr">
          <GridItem rowSpan={1} colSpan={1}>
            <SideMenu items={menuItems} />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            {children}
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default ContentSection;
