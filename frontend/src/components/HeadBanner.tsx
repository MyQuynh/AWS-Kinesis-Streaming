import React from 'react';
import { Box, Image, Grid, GridItem, Heading, Text } from '@chakra-ui/react';

export interface HeadBannerProps {
  imgSrc: string;
  headingMsg: string;
  caption: string;
}

// eslint-disable-next-line arrow-body-style
const HeadBanner: React.FC<HeadBannerProps> = ({
  imgSrc,
  headingMsg,
  caption,
}) => (
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
            {headingMsg}
          </Heading>
          <Text fontWeight={400} fontSize={18}>
            {caption}
          </Text>
        </Box>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <Image src={imgSrc} alt="HashTagBanner" h={577} />
      </GridItem>
    </Grid>
  </>
);

export default HeadBanner;
