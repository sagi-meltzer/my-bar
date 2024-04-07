import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { useFetchDrinkRecipeById } from "../api"

const CocktailDetails = ({id}: {id: string}) => {
    const { data, isLoading, isError } = useFetchDrinkRecipeById(id)
    
    if (isLoading) {
        return <Box>Loading...</Box>
    }

    if (isError) {
        return <Box>Error</Box>
    }
    
    return <Card>
    <CardMedia
        component="img"
        height="140"
        image={data.thumb}
        alt={data.thumb}
        style={{ objectFit: 'contain' }}
    />
    <CardContent>
        <Typography variant="h5" component="div">{data.name}</Typography>
        <Typography>Category: {data.strCategory}</Typography>
        <Typography>Glass: {data.strGlass}</Typography>
        <Typography>Instructions: {data.strInstructions}</Typography>
        <Typography>Ingredients:</Typography>
        <ul style={{ listStyleType: 'none' }}>
            {Array.from({length: 15}, (_, i) => i + 1).map(i => {
                const ingredient = data[`strIngredient${i}`];
                const measure = data[`strMeasure${i}`];
                return ingredient && measure && <li key={i}>{`${measure} ${ingredient}`}</li>;
            })}
        </ul>
    </CardContent>
</Card>

}

export default CocktailDetails