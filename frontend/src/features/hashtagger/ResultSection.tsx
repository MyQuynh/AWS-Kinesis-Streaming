import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { HashtaggerResponseData } from './hashtaggerSlice';

interface ResultSectionProps {
  hashtags: HashtaggerResponseData;
}

// eslint-disable-next-line arrow-body-style
const ResultSection: React.FC<ResultSectionProps> = ({ hashtags }) => {
  return (
    <Box>
      <Flex flexDirection="row">
        <Text fontSize={32} fontWeight={800}>
          Hashtags
        </Text>
        <Text>({hashtags.length})</Text>
      </Flex>
      <Flex flexWrap="wrap">
        {hashtags.map((hashtag) => (
          <>
            <Box flex="0 0 33.333333%" mt={2}>
              {hashtag}
            </Box>
          </>
        ))}
      </Flex>
    </Box>
  );
};

export default ResultSection;
