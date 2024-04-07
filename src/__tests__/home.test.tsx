import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../pages/home';


jest.mock('../api', () => ({
    useFetchAlcoholicDrinks: jest.fn(() => ({
        data: { drinks: [{ name: 'Mocktail 1' }, { name: 'Mocktail 2' }] },
        isLoading: false,
        isError: false,
      })),
  useFetchCocktailByName: jest.fn(() => ({
    data: { drinks: [{ name: 'Mocktail Search 1' }, { name: 'Mocktail Search 2' }] },
    refetch: jest.fn(),
  })),
}));

const mockUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUsedNavigate,
}));

test('renders loading state', () => {
  render(<Home />);
  expect(screen.getByText('Loading...')).toBeInTheDocument();
});

test('renders error state', () => {
  jest.spyOn(window, 'alert').mockImplementation(() => {});
  jest.clearAllMocks();
  jest.mock('../api', () => ({
    useFetchAlcoholicDrinks: jest.fn(() => ({
      data: null,
      isLoading: false,
      isError: true,
    })),
  }));
  render(<Home />);
  expect(screen.getByText('Error fetching cocktails data.')).toBeInTheDocument();
});

test('renders Autocomplete and Button', () => {
  render(<Home />);
  expect(screen.getByLabelText('search cocktail by name')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Add New' })).toBeInTheDocument();
});


test('user interaction - updates search term in Autocomplete', () => {
  render(<Home />);
  
  const searchInput = screen.getByLabelText('search cocktail by name');
  
  fireEvent.change(searchInput, { target: { value: 'Mocktail' } });
  
  expect(searchInput).toHaveValue('Mocktail');
});

