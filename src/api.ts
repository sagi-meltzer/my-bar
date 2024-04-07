import { useMutation, useQuery } from 'react-query';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

const LOCAL_DB: {
  category: string;
  glass: string;
  instructions: string;
  id: string;
  name: string; 
  thumb: string;
  ingredients:{
    ingredient: string
    measure: string
  }[];
}[] = [
];

export const useFetchCocktailByName = (cocktailName: string) => {
  return useQuery(['cocktail', cocktailName], async () => {
    if (cocktailName !== '') {
      const response = await fetch(`${BASE_URL}/search.php?s=${cocktailName}`);
      const data = await response.json();
      return data;
    } else {
      return { drinks: [] };
    }
  }, {
    onSuccess: (data) => {
      const filteredData = LOCAL_DB.filter((item: { name: string; }) => item.name === cocktailName);
      data.drinks =  data.drinks ? [...data.drinks.map((item: { idDrink: string; strDrink: string; strDrinkThumb: string; }) => {
        return {
          id: item.idDrink,
          name: item.strDrink,
          thumb: item.strDrinkThumb
        };
      }), ...filteredData] : [...filteredData];
    },
    staleTime: 60000,
    cacheTime: 600000
  })
};

export const useFetchAlcoholicDrinks = () => {
    return useQuery('alcoholicDrinks', async () => {
      const response = await fetch(`${BASE_URL}/filter.php?a=Alcoholic`);
      const data = await response.json();
      return data;
    }, {
        onSuccess: (data) => {
            data.drinks = [...data.drinks.map((item: { idDrink: string; strDrink: string; strDrinkThumb: string; }) => {
              return {
                id: item.idDrink,
                name: item.strDrink,
                thumb: item.strDrinkThumb
              };
            }), ...LOCAL_DB];
          }
    });
  };

  export const useFetchDrinkRecipeById = (drinkId: string) => {
    return useQuery(['drinkRecipe', drinkId], async () => {
      if (drinkId.startsWith('local_')) {
        const localDrink = LOCAL_DB.find((item: { id: string; }) => item.id === drinkId);
        if (localDrink) {
          const ingredients = localDrink.ingredients.reduce((acc, item, index) => {
            return {...acc, [`strIngredient${index + 1}`]: item.ingredient, [`strMeasure${index + 1}`]: item.measure};
          }, {})
          return {...localDrink, strCategory: localDrink.category, strGlass: localDrink.glass, strInstructions: localDrink.instructions, ...ingredients };
        }
      }
      const response = await fetch(`${BASE_URL}/lookup.php?i=${drinkId}`);
      const data = await response.json();
     
      return {...data.drinks[0], id: drinkId, name: data.drinks[0].strDrink, thumb: data.drinks[0].strDrinkThumb};
    });
  };

  export const useAddNewCocktail = () => {
    return useMutation(async (newCocktail: any) => {
      LOCAL_DB.push({...newCocktail, id: `local_${LOCAL_DB.length + 1}`});
      return newCocktail;
    });
  }
  

