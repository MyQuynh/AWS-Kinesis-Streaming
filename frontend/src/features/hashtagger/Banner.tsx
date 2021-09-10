import React from 'react';
import { Box, Image, Grid, GridItem, Heading, Text } from '@chakra-ui/react';
import TeamworkImage from '../../assets/teamwork-illustration.png';

// eslint-disable-next-line arrow-body-style
const Banner: React.FC = () => {
  return (
    <>
      <Grid templateRows="1fr" templateColumns="repeat(2, minmax(0, 1fr))">
        <GridItem rowSpan={1} colSpan={1}>
          <Box position="relative" bg="#ffffff" h="100%" w="100%" />
          <Box
            position="absolute"
            bottom={0}
            top={270}
            ml={200}
            w="550px"
            h="200px"
          >
            <Heading color="#000000" size="lg" mb={5}>
              Explore AI-based hashtag generator
            </Heading>
            <Text fontWeight={400} fontSize={18}>
              Try our latest hashtag generators in different formats powered by
              Artificial Intelligence
            </Text>
          </Box>
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Image src={TeamworkImage} alt="HashTagBanner" h={577} />
        </GridItem>
      </Grid>
    </>
  );
};

export default Banner;
