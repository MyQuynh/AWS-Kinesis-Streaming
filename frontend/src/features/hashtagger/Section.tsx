import React from 'react';
import { Container, Grid, GridItem } from '@chakra-ui/react';
import { FaAmilia, FaFileImage, FaLink } from 'react-icons/fa';
import SideMenu, { MenuItem } from './SideMenu';
import DynamicInput from './DynamicInput';

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

export interface SectionProps {
  type: string;
}

// eslint-disable-next-line arrow-body-style
const Section: React.FC<SectionProps> = ({ type }) => {
  return (
    <>
      <Container maxW="container.xl" mb={2}>
        <Grid templateRows="1fr" templateColumns="1fr 4fr">
          <GridItem rowSpan={1} colSpan={1}>
            <SideMenu items={menuItems} />
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <DynamicInput type={type} />
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default Section;
