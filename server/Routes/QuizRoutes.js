const express = require('express');
const quizRouter = express.Router();
const bodyParser = require('body-parser');


const {
    getAllQuiz,
    getQuizByUser,
    createQuiz,
} = require('../Controllers/QuizController');

quizRouter.use(bodyParser.json());

quizRouter.get('/quiz', (req, res) => {
    const quiz = getAllQuiz();
    res.status(200).json(quiz);
});

quizRouter.get('/users/:userId/lastQuiz', (req, res) => {
    let user = req.params.userId;
    user = parseInt(user);
    const quiz = getQuizByUser(user);
    if (quiz) {
        quiz.sort((a, b) => new Date(b.dateQuiz) - new Date(a.dateQuiz));
        res.status(200).json(quiz[0]);
    } else {
        res.status(404).json({ message: 'Quiz non trouvé' });
    }
});

quizRouter.post('/quiz', (req, res) => {
    const newQuiz = req.body;
    if (createQuiz(newQuiz)) {
        res.status(201).json(newQuiz);
    } else {
        res.status(400).json({ message: 'Erreur lors de la création du quiz' });
    }
});

module.exports = quizRouter ;