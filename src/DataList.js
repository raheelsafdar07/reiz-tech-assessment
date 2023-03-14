import { Box, Text } from '@chakra-ui/react';

function DataList({ countries }) {
  return (
    <Box>
        {countries.map((country, index) => (
          <Box key={country.name} bg={'#ccffcc'} padding={-2} pl={18} >
            <Text fontWeight="bold" color={'#869686'}>{country.name}</Text>
            <Text mt={-18} color={'#869686'}>{country.region}</Text>
            <Text mt={-18} color={'#869686'}>{country.area} km²</Text>
          </Box>
        ))}
    </Box>
  );
}

export default DataList;