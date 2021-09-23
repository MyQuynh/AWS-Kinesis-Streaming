import React from 'react';
import {
  Box,
  Image,
  Grid,
  GridItem,
  Heading,
  Button,
  Text,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import HashTagBanner from '../../assets/hashtag-section.jpg';

// eslint-disable-next-line arrow-body-style
const LandingBanner: React.FC = () => {
  return (
    <>
      <Grid templateRows="1fr" templateColumns="repeat(2, minmax(0, 1fr))">
        <GridItem rowSpan={1} colSpan={1}>
          <Box position="relative" bg="#2A8DE0" h="100%" w="100%" />
          <Box
            position="absolute"
            bottom={0}
            top={270}
            ml={200}
            w="350px"
            h="200px"
          >
            <Heading color="#fff" size="2xl" mb={5}>
              Start blending today!
            </Heading>
            <Button
              colorScheme="brand"
              _hover={{
                backgroundColor: 'brand.400',
              }}
              roundedBottom="none"
              roundedTop="none"
              h={50}
              w={145}
            >
              <Link to="/hashtagger/caption">
                <Text fontWeight={800} fontSize={20}>
                  Get Started
                </Text>
              </Link>
            </Button>
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Image src={HashTagBanner} alt="HashTagBanner" h={577} />
        </GridItem>
      </Grid>
    </>
  );
};

export default LandingBanner;
