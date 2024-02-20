import React from 'react';
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormCreateCard from 'client/src/components/FormCreateCard';

// Mock de CardService
jest.mock('../service/CardService', () => ({
  createCard: jest.fn(),
}));

<<<<<<< HEAD
describe('FormCreateCard component', () => { 
=======
describe('FormCreateCard component', () => { // à compléter
>>>>>>> 0afac85d36549cc0517e931015fa652cd16e2b92
  test('affiche le formulaire avec les éléments corrects', () => {
    const { getByText } = render(<FormCreateCard />);

    expect(getByText('Create new card')).toBeInTheDocument();
  });

 
});
