import React from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  Divider,
  Flex,
} from '@chakra-ui/react';
import { Icon } from '@chakra-ui/icons';
import { FaTwitter, FaLinkedin, FaFacebook } from 'react-icons/fa';

// eslint-disable-next-line arrow-body-style
const Footer: React.FC = () => {
  return (
    <Box bg="#f9f9f9" w="100%">
      <Grid
        templateColumns="repeat(2, minmax(0, 1fr))"
        templateRows="3fr 0.5fr 1fr"
      >
        {/* Info footer */}
        <GridItem rowSpan={1} colSpan={1} mt={100} ml={200}>
          <Box>
            <Heading
              letterSpacing="tighter"
              size="xl"
              color="#ff6700"
              fontWeight={800}
            >
              #HashSociety
            </Heading>
          </Box>
        </GridItem>
        {/* General child grid */}
        <GridItem rowSpan={1} colSpan={1} mt={55}>
          {/* Categories children grid */}
          <Grid templateRows="repeat(4, 1fr)" templateColumns="repeat(3, 1fr)">
            {/* 1st Row */}
            <GridItem rowSpan={1} colSpan={1}>
              <Text fontWeight={800}>Features</Text>
            </GridItem>
            <GridItem rowStart={2} rowEnd={3} colStart={1} colEnd={1} mt={3}>
              <Text fontWeight={400} color="#52596C">
                Hashtagger
              </Text>
            </GridItem>
            <GridItem rowStart={3} rowEnd={4} colStart={1} colEnd={1} mt={3}>
              <Text fontWeight={400} color="#52596C">
                Wise Insights
              </Text>
            </GridItem>
            {/* 2nd Row */}
            <GridItem rowSpan={1} colSpan={1}>
              <Text fontWeight={800}>Categories</Text>
            </GridItem>
            <GridItem rowStart={2} rowEnd={3} colStart={2} colEnd={2} mt={3}>
              <Text fontWeight={400} color="#52596C">
                Caption Hashtagger
              </Text>
            </GridItem>
            <GridItem rowStart={3} rowEnd={4} colStart={2} colEnd={2} mt={3}>
              <Text fontWeight={400} color="#52596C">
                Image Hashtagger
              </Text>
            </GridItem>
            <GridItem rowStart={4} rowEnd={5} colStart={2} colEnd={2} mt={3}>
              <Text fontWeight={400} color="#52596C">
                URL Hashtagger
              </Text>
            </GridItem>
            {/* 3rd Row */}
            <GridItem rowStart={1} rowEnd={2} colStart={3} colEnd={3}>
              <Text fontWeight={800}>Misc</Text>
            </GridItem>
            <GridItem rowStart={2} rowEnd={3} colStart={3} colEnd={3} mt={3}>
              <Text fontWeight={400} color="#52596C">
                Licenses
              </Text>
            </GridItem>
            <GridItem rowStart={3} rowEnd={4} colStart={3} colEnd={3} mt={3}>
              <Text fontWeight={400} color="#52596C">
                Contacts
              </Text>
            </GridItem>
          </Grid>
        </GridItem>

        {/* Divider */}
        <GridItem rowStart={2} rowEnd={3} colStart={1} colEnd={3} mt={8} mb={5}>
          <Divider margin="0 auto" max-width="48rem" width="75%" />
        </GridItem>
        {/* Contact/Social Media footer */}
        <GridItem
          rowStart={3}
          rowEnd={4}
          colStart={1}
          colEnd={1}
          margin="0 auto"
          max-width="48rem"
          width="50%"
        >
          <Icon as={FaTwitter} boxSize={6} />
          <Icon as={FaLinkedin} boxSize={6} ml={8} />
          <Icon as={FaFacebook} boxSize={6} ml={8} />
        </GridItem>
        <GridItem
          rowStart={3}
          rowEnd={4}
          colStart={2}
          colEnd={2}
          margin="0 auto"
          max-width="48rem"
          width="50%"
        >
          <Flex justify="space-between">
            <Text fontWeight={400} color="#52596C">
              Terms of Conditions
            </Text>
            <Text fontWeight={400} color="#52596C">
              Privacy Policy
            </Text>
            <Text fontWeight={400} color="#52596C">
              Billing
            </Text>
          </Flex>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Footer;
