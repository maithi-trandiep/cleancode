import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import DisplayCard from 'client/src/components/DisplayCard.jsx';


describe('DisplayCard component', () => {
  const testCard = {
    question: 'Test Question',
    answer: 'Test Answer',
    tag: 'Test Tag',
    category: 'Test Category'
  };

  test('Tester le bon rendu des élément de la carte', () => {
    const { getByText } = render(<DisplayCard card={testCard} />);
    
    expect(getByText('Test Question')).toBeInTheDocument();
    expect(getByText('Test Answer')).toBeInTheDocument();
    expect(getByText('Test Tag')).toBeInTheDocument();
    expect(getByText('Test Category')).toBeInTheDocument();
  });
});