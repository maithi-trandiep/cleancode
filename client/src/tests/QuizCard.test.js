import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import QuizCard from 'client/src/components/QuizCard';

describe('QuizCard component', () => {
  const mockCard = {
    question: 'France',
    answer: 'Paris',
    tag: 'Country',
    category: 'Geography'
  };

  test('Rendu des cartes avec les bon contenus', () => {
    const { getByText, getByLabelText } = render(
      <QuizCard card={mockCard} answerValidated={false} />
    );

    expect(getByText(`What's the capital of ${mockCard.question} ?`)).toBeInTheDocument();
    expect(getByText(`${mockCard.tag} / ${mockCard.category}`)).toBeInTheDocument();
    expect(getByLabelText('Answer')).toBeInTheDocument();
  });

  test('Afficher la bonne réponse quand la réponse est fausse', () => {
    const { getByText } = render(
      <QuizCard card={mockCard} answerValidated={true} isCorrect={false} />
    );

    expect(getByText(`Correct answer is: ${mockCard.answer}`)).toBeInTheDocument();
  });

  test('Ne pas afficher la réponse quand la réponse est correcte', () => {
    const { queryByText } = render(
      <QuizCard card={mockCard} answerValidated={true} isCorrect={true} />
    );

    expect(queryByText(`Correct answer is: ${mockCard.answer}`)).toBeNull();
  });

  test('Appel à la soumission de la réponse lorsque les paramètres sont corrects et que le bouton d \'envoi est cliqué', () => {
    const mockSubmitAnswer = jest.fn();
    const { getByText, getByLabelText } = render(
      <QuizCard card={mockCard} submitAnswer={mockSubmitAnswer} answerValidated={false} />
    );

    const answerInput = getByLabelText('Answer');
    fireEvent.change(answerInput, { target: { value: 'Paris' } });

    const sendButton = getByText('Send');
    fireEvent.click(sendButton);

    expect(mockSubmitAnswer).toHaveBeenCalledWith(mockCard, 'Paris');
  });
});
