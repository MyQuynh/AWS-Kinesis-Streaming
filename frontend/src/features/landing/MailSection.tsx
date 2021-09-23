import React from 'react';
import {
  Box,
  Heading,
  Button,
  Grid,
  GridItem,
  Input,
  Image,
  InputGroup,
  InputRightAddon,
  Text,
} from '@chakra-ui/react';
import ContactUsImage from '../../assets/contact-us.png';

// eslint-disable-next-line arrow-body-style
const MailSection: React.FC = () => {
  return (
    <>
      <Grid templateRows="1fr" templateColumns="4fr 3fr" pt={57} pb={20}>
        {/* Subscribe Box section */}
        <GridItem rowSpan={1} colSpan={1}>
          <Box ml={230} mt={150}>
            <Text fontSize={20} fontWeight={800} mb={2}>
              Subscribe to receive daily #HashSociety
            </Text>
            <InputGroup>
              <Input
                size="lg"
                w={500}
                borderColor="brand.500"
                focusBorderColor="brand.400"
                _hover={{
                  borderColor: 'brand.400',
                }}
              />
              <InputRightAddon h="48px" padding={0}>
                <Button
                  colorScheme="brand"
                  roundedLeft="none"
                  w="120px"
                  h="48px"
                  p="0px 0px"
                  m={0}
                  padding={0}
                  rounded="none"
                >
                  <Text fontSize={18} fontWeight={800}>
                    Subscribe
                  </Text>
                </Button>
              </InputRightAddon>
            </InputGroup>
          </Box>
        </GridItem>

        {/* Image Setcion */}
        <GridItem rowSpan={1} colSpan={1}>
          <Image src={ContactUsImage} />
        </GridItem>
      </Grid>
    </>
  );
};

export default MailSection;
