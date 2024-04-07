import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CocktailCard from './cocktailCard'; 

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const CocktailCarousel: React.FC<{ cocktails: { name: string; thumb: string; id: string }[] | undefined, onClick: any }> = ({ cocktails, onClick }) => {
    return (
      <Carousel centerMode showIndicators={false} centerSlidePercentage={30}  onClickItem={onClick} >
        {cocktails?.map((cocktail) => (
          <div key={cocktail.id} id={cocktail.id} style={{margin: '0 auto'}}>
            <CocktailCard {...cocktail} />
          </div>
        ))}
      </Carousel>
    );
  };

  export default CocktailCarousel;
  