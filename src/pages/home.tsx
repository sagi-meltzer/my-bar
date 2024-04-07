import React, { useEffect } from 'react';
import { useFetchAlcoholicDrinks, useFetchCocktailByName } from '../api';
import CocktailCarousel from '../components/cocktailCarousel';
import { Autocomplete, TextField, Box, Button } from '@mui/material';
import CocktailDetails from '../components/cocktailDetails';


const Home: React.FC<{}> = () => {
    const { data, isLoading, isError } = useFetchAlcoholicDrinks();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [selectedCocktailId, setSelectedCocktailId] = React.useState<string>();
    const { data: searchData, refetch: fetchCocktailByName } = useFetchCocktailByName(searchTerm);

    useEffect(() => {
      if (searchTerm !== '') {
        fetchCocktailByName();
      }
    }, [searchTerm]);
    
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (isError) {
      return <div>Error fetching cocktails data.</div>;
    }

    const handleCardClick = (element: any) => {
      setSelectedCocktailId(element.key);
    }
  
    return (
      <Box sx={{display: 'flex', flexDirection: 'column', width: '90%', margin: '30px auto', gap: '20px'}}>
           <Box sx={{display: 'flex', flexDirection: 'row', justifyContent: 'center', gap: '20px'}}>
              <Autocomplete
                sx={{width: '300px', margin: 'auto'}}
                freeSolo
                options={data?.drinks.map((item: { name: string; }) => item.name) || []}
                onInputChange={(event, value) => setSearchTerm(value)}
                value={searchTerm}
                renderInput={(params) => <TextField {...params} label="search cocktail by name" />}
              />
            <Button href='/edit' variant="contained">Add New</Button>
          </Box>
          <CocktailCarousel key={searchTerm} cocktails={searchTerm && searchData?.drinks || data?.drinks} onClick={(i: any, e: any) => handleCardClick(e)}/>
          {selectedCocktailId && (<CocktailDetails id={selectedCocktailId} />)}
        </Box>
    );
  };

  export default Home;
  