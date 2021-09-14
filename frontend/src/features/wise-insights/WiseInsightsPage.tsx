import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Container,
  Heading,
  Flex,
} from '@chakra-ui/react';
import WiseInsightsBanner from '../../assets/wise-insights.png';
import HeadBanner from '../../components/HeadBanner';
import WordCloud from './WordCloud';
import PopularHashtagBarChart from './PopularHashtagBarChart';
import SentimentGauge from './SentimentGauge';

const mockDataWordCloud = [
  {
    text: 'told',
    value: 64,
  },
  {
    text: 'mistake',
    value: 11,
  },
  {
    text: 'thought',
    value: 16,
  },
  {
    text: 'bad',
    value: 30,
  },
  {
    text: 'love',
    value: 65,
  },
  {
    text: 'success',
    value: 40,
  },
  {
    text: 'RMIT',
    value: 25,
  },
];

// eslint-disable-next-line arrow-body-style
const WiseInsightsPage: React.FC = () => {
  return (
    <>
      <HeadBanner
        imgSrc={WiseInsightsBanner}
        headingMsg="Explore Wise Insights"
        caption="Your best tools to understand what’s happening around the world of social media!"
      />
      {/* Main content Charts section */}
      <Container maxW="container.xl" mb={2}>
        <Grid
          templateRows="repeat(1, 1fr)"
          templateColumns="repeat(2, 1fr)"
          gap={50}
        >
          <GridItem
            rowStart={1}
            rowEnd={2}
            colStart={1}
            colEnd={3}
            border={1}
            borderColor="brand.500"
            borderStyle="solid"
          >
            {/* Title Box for Word Cloud */}
            <Box bg="brand.500" w="100%" h="50px" pl={2} pt={3}>
              <Heading size="md" color="#ffffff">
                Hashtags Word Cloud
              </Heading>
            </Box>
            <Flex justifyContent="center" p={2}>
              <WordCloud data={mockDataWordCloud} />
            </Flex>
          </GridItem>
          <GridItem
            rowStart={2}
            rowEnd={3}
            colStart={1}
            colEnd={2}
            border={1}
            borderColor="brand.500"
            borderStyle="solid"
          >
            <Box bg="brand.500" w="100%" h="50px" pl={2} pt={3}>
              <Heading size="md" color="#ffffff">
                Popular Hashtags Usage
              </Heading>
            </Box>
            <Box pl={10}>
              <PopularHashtagBarChart
                data={mockDataWordCloud}
                x="text"
                y="value"
                horizontal
              />
            </Box>
          </GridItem>
          <GridItem
            rowStart={2}
            rowEnd={3}
            colStart={2}
            colEnd={3}
            border={1}
            borderColor="brand.500"
            borderStyle="solid"
          >
            <Box bg="brand.500" w="100%" h="50px" pl={2} pt={3}>
              <Heading size="md" color="#ffffff">
                Average Sentiment
              </Heading>
            </Box>
            <Flex
              alignItems="center"
              justifyContent="center"
              p={0}
              m={0}
              h="100%"
            >
              <SentimentGauge percent={0.87} />
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </>
  );
};

export default WiseInsightsPage;
