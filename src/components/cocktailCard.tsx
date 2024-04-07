import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';

const CocktailCard: React.FC<{ name: string; thumb: string; id: string }> = ({ name, thumb, id }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        height="200"
        image={thumb}
        alt={thumb}
        style={{ objectFit: 'contain' }}
      />
      <CardContent>
      <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
        
      </CardContent>
    </CardActionArea>
  </Card>
    
  );
};

export default CocktailCard;
