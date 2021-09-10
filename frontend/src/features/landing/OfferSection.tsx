import React from 'react';
import {
  Grid,
  GridItem,
  Flex,
  Box,
  Image,
  Text,
  Heading,
} from '@chakra-ui/react';

export interface Offer {
  assetURI: string;
  name: string;
  description: string;
  isPremium: boolean;
}

export interface OfferSectionProps {
  offers: Offer[];
}

// eslint-disable-next-line arrow-body-style
const OfferSection: React.FC<OfferSectionProps> = ({ offers }) => {
  return (
    <Box bg="#f9f9f9">
      {/* List of offers - one-line offers */}
      <Grid
        templateColumns={`repeat(${offers.length}, minmax(0, 1fr))`}
        templateRows="1fr 2fr"
        margin="0 auto"
        maxW="106rem"
        w="100%"
      >
        {/* Intro section */}
        <GridItem rowSpan={1} colSpan={offers.length} pt={50} ml={100} mb={20}>
          <Heading size="lg">What we offer?</Heading>
        </GridItem>
        {/* Individual offer */}
        {offers.map((offer) => (
          <>
            <GridItem rowSpan={1} colSpan={1}>
              <Flex
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Image src={offer.assetURI} w={16} h={16} />
                <Box mt={7}>
                  {offer.isPremium ? (
                    <>
                      <Text
                        align="center"
                        color="brand.400"
                        fontWeight={800}
                        fontSize={18}
                      >
                        {offer.name}
                      </Text>
                    </>
                  ) : (
                    <>
                      <Text align="center" fontWeight={800} fontSize={18}>
                        {offer.name}
                      </Text>
                    </>
                  )}
                </Box>
                <Box w={220} mt={2}>
                  <Text align="center">{offer.description}</Text>
                </Box>
              </Flex>
            </GridItem>
          </>
        ))}
      </Grid>
    </Box>
  );
};

export default OfferSection;
