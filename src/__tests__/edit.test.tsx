import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Edit from '../pages/edit';
import { QueryClientProvider, QueryClient } from 'react-query';


const queryClient = new QueryClient();
const wrapper = ({ children }: any) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

test('renders Edit component', () => {
  render(<Edit />);
  const nameInput = screen.getByLabelText('Name');
  const categoryInput = screen.getByLabelText('Category');
  const glassInput = screen.getByLabelText('Glass');
  const instructionsInput = screen.getByLabelText('Instructions');
  const addIngredientButton = screen.getByText('Add Ingredient');
  const submitButton = screen.getByText('Submit');
  expect(nameInput).toBeInTheDocument();
  expect(categoryInput).toBeInTheDocument();
  expect(glassInput).toBeInTheDocument();
  expect(instructionsInput).toBeInTheDocument();
  expect(addIngredientButton).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test('adds ingredient to the form', () => {
    render(wrapper(<Edit />));
    
    const initialIngredientCount = screen.getAllByLabelText(/Ingredient/).length;
  
    const addIngredientButton = screen.getByText('Add Ingredient');
    fireEvent.click(addIngredientButton);
  
    const newIngredientCount = screen.getAllByLabelText(/Ingredient/).length;
    expect(newIngredientCount).toBe(initialIngredientCount + 1);
  });

 

  test('submits the form with valid data', () => {
    render(wrapper(<Edit />));
    
    const nameInput = screen.getByTestId('name');
    const categoryInput = screen.getByTestId('category');
    const glassInput = screen.getByTestId('glass');
    const instructionsInput = screen.getByTestId('instructions');
  
    fireEvent.change(nameInput, { target: { value: 'Margarita' } });
    fireEvent.change(categoryInput, { target: { value: 'Cocktail' } });
    fireEvent.change(glassInput, { target: { value: 'Margarita Glass' } });
    fireEvent.change(instructionsInput, { target: { value: 'Mix tequila, lime juice, and triple sec.' } });
  
    const addIngredientButton = screen.getByText('Add Ingredient');
    fireEvent.click(addIngredientButton);
  
    const ingredientInput = screen.getByTestId('ingredient-1');
    const measureInput = screen.getByTestId('measure-1');
    fireEvent.change(ingredientInput, { target: { value: 'Tequila' } });
    fireEvent.change(measureInput, { target: { value: '2 oz' } });
  
    const submitButton = screen.getByText('Submit');
    fireEvent.click(submitButton);
  
    expect(screen.queryByText('Please fill out all fields and add at least one ingredient with a measurement.')).not.toBeInTheDocument();
  });