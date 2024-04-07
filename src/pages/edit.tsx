import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useAddNewCocktail } from '../api';

interface Ingredient {
    ingredient: string;
    measure: string;
}

interface CocktailData {
    name: string;
    category: string;
    glass: string;
    instructions: string;
    ingredients: Ingredient[];
    [key: string]: string | Ingredient[];   
}

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


const Edit = () => {
    const navigate = useNavigate();
    const { mutate } = useAddNewCocktail();
    const [error, setError] = useState<string>('');
    const [cocktailData, setCocktailData] = useState<CocktailData>({
        name: '',
        category: '',
        glass: '',
        instructions: '',
        ingredients: []
    });

    const handleChange = (index: number, type: string, value: string) => {
        const newCocktail = { ...cocktailData };
        const newIngredients = [...cocktailData.ingredients];
        if (type === 'ingredient') {
            newIngredients[index] = { ...newIngredients[index], ingredient: value };
        } else if (type === 'measure') {
            newIngredients[index] = { ...newIngredients[index], measure: value };
        } else {
            newCocktail[type] = value; 
        }
    
        setCocktailData({ ...newCocktail, ingredients: newIngredients });
    };

    const handleAddIngredient  = () => {
        setCocktailData({ ...cocktailData, ingredients: [...cocktailData.ingredients, { ingredient: '', measure: '' }] });
    };

    const handleSubmit = () => {
        if (
            cocktailData.name.trim() !== '' &&
            cocktailData.category.trim() !== '' &&
            cocktailData.glass.trim() !== '' &&
            cocktailData.instructions.trim() !== '' &&
            cocktailData.ingredients.length > 0 &&
            cocktailData.ingredients.every((ingredient) => ingredient.ingredient.trim() !== '' && ingredient.measure.trim() !== '')
        ) {
        mutate(cocktailData);
        navigate('/')
        } else {
            setError('Please fill out all fields and add at least one ingredient with a measurement.');
        }
    };

    const handleThumbnailUpload = (files: FileList | null) => {
        if (files && files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
          reader.onload = (event) => {
            const thumbnailDataURL = event.target?.result as string;
            setCocktailData({ ...cocktailData, thumb: thumbnailDataURL });
          };
          reader.readAsDataURL(file);
        }
      };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: '30px auto', width: '300px' }}>
            <TextField label="Name" data-testid='name' value={cocktailData.name} onChange={(e) => handleChange(0, 'name', e.target.value)} />
          
            <TextField label="Category" data-testid='category' value={cocktailData.category} onChange={(e) => handleChange(0, 'category', e.target.value)} />
            <TextField label="Glass" data-testid='glass' value={cocktailData.glass} onChange={(e) => handleChange(0, 'glass', e.target.value)} />
            <TextField label="Instructions" data-testid='instructions' value={cocktailData.instructions} onChange={(e) => handleChange(0, 'instructions', e.target.value)} />

            {cocktailData.ingredients.map((ingredient, index) => (
                <Box sx={{ display: 'flex', flexDirection: 'row', gap: '10px' }} key={index}>
                    <TextField data-testid={`ingredient-${index + 1}`} label={`Ingredient ${index + 1}`} value={ingredient.ingredient} onChange={(e) => handleChange(index, 'ingredient', e.target.value)} />
                    <TextField data-testid={`measure-${index + 1}`} label={`Measure ${index + 1}`} value={ingredient.measure} onChange={(e) => handleChange(index, 'measure', e.target.value)} />
                </Box>
            ))}

            <Button variant="contained" onClick={handleAddIngredient} >Add Ingredient</Button>
            <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            >
                Upload thumbnail
                <VisuallyHiddenInput type="file" onChange={(e) => handleThumbnailUpload(e.target.files)} accept="image/png, image/jpeg"/>
            </Button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
    ); 
}

export default Edit;