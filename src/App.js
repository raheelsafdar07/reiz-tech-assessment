import React, { useState, useEffect } from 'react';
import { Box, Button, Heading, Stack } from '@chakra-ui/react';
import { Pagination } from '@mui/material';
import DataList from './DataList';

function App() {
  
  const [countries, setCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage] = useState(10);

  const [finalCountries, setFinalCountries] = useState([]);
  const [isAscending, setIsAscending] = useState(false);

  const [smallerThanLithuania, setSmallerThanLithuania] = useState([]);
  const [isSmallerThanLithuania, setIsSmallerThanLithuania] = useState(false);

  const [inOceania, setInOceania] = useState([]);
  const [isInOceania, setIsInOceania] = useState(false);


  useEffect(() => {
    fetch('https://restcountries.com/v2/all?fields=name,region,area')
      .then(response => response.json())
      .then(data => setCountries(data));
  }, []);

  useEffect(() => {
    setFinalCountries([...countries]);
  }, [countries]);

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = finalCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const handleSortCountries = () => {
    const sorted = [...finalCountries].sort((a, b) =>
      isAscending ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setFinalCountries(sorted);
    setIsAscending(!isAscending);
  };

  const handleSmallerThanLithuania = 
  isInOceania ?
  () => {
    const smallerAndOceania = [...inOceania].filter(country => 
      isSmallerThanLithuania ? country : (country.area && country.area < 65300) );
    setFinalCountries(smallerAndOceania);
    setIsSmallerThanLithuania(!isSmallerThanLithuania);
  } :
  () => {
    const smaller = [...countries].filter(country =>
      isSmallerThanLithuania ? country : (country.area && country.area < 65300) );
    setFinalCountries(smaller);
    setSmallerThanLithuania(smaller);
    setIsSmallerThanLithuania(!isSmallerThanLithuania);
  };

  const handleInOceania = 
  isSmallerThanLithuania ?
  () => {
    const oceania = [...smallerThanLithuania].filter(country => 
      isInOceania ? country : country.region === "Oceania" );
    setFinalCountries(oceania);
    setIsInOceania(!isInOceania);
  } :
  () => {
    const oceania = [...countries].filter(country =>
      isInOceania ? country : country.region === "Oceania" );
    setFinalCountries(oceania);
    setInOceania(oceania);
    setIsInOceania(!isInOceania);
  };

  return (
    <Box p={4}>

      <Heading as="h1" size="xl" ml={4} color={'#869686'}>
      REIZ TECH HOMEWORK ASSIGNMENT
      </Heading>

      <Stack direction="row" spacing={927} ml={4}>
        
        <Stack direction="row" spacing={10} ml={4}>\
          <Button borderColor='#91ff91' borderRadius={7} bg={'#91ff91'} color={'#869686'} onClick={handleSmallerThanLithuania}>
            Smaller than Lithuania
          </Button>
          <Button borderColor='#91ff91' borderRadius={7} bg={'#91ff91'} color={'#869686'} onClick={handleInOceania}>
            Oceania only
          </Button>
        </Stack>

        <Stack direction="row" spacing={10} ml={4}>
          <Button borderColor='#91ff91' borderRadius={7} bg={'#91ff91'} color={'#869686'} onClick={handleSortCountries}>
            Toggle Sort
          </Button>
        </Stack>
    
      </Stack>
      
      <DataList countries={currentCountries}/>

      <Pagination 
              count={Math.ceil(finalCountries.length / countriesPerPage)} 
              onChange={(event, value) => setCurrentPage(value)}
              style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}
              size="large"
            />

    </Box>
  );
}

export default App;
