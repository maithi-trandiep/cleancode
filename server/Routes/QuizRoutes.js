const express = require('express');
const quizRouter = express.Router();
const bodyParser = require('body-parser');


const {
    getQuizByUser,
    getReminderByUser,
    createQuiz,
    createReminder
} = require('../Controllers/QuizController');

quizRouter.use(bodyParser.json());

quizRouter.get('/quiz/:userId', (req, res) => {
    const userId = req.params.userId;
    const quiz = getQuizByUser(parseInt(userId));
    if (quiz) {
        res.status(200).json(quiz);
    } else {
        res.status(404).json({ message: 'Quiz non trouvé' });
    }
})

quizRouter.get('/quiz/reminder/:userId', (req, res) => {
    const userId = req.params.userId;
    const reminder = getReminderByUser(parseInt(userId));
    if (reminder) {
        res.status(200).json(reminder);
    } else {
        res.status(404).json({ message: 'Reminder non trouvé' });
    }
})

quizRouter.post('/quiz', (req, res) => {
    const newQuiz = req.body;
    if (!newQuiz || !newQuiz.user_id) {
        res.status(400).json({ message: 'Bad request!' });
    } else {
        const quiz = createQuiz(newQuiz);
        res.status(201).json(quiz);
    }
})

quizRouter.post('/quiz/reminder', (req, res) => {
    const newReminder = req.body;
    if (!newReminder || !newReminder.dateReminder) {
        res.status(400).json({ message: 'Bad request!' });
    } else {
        const reminder = createReminder(newReminder);
        res.status(201).json(reminder);
    }
})

module.exports = quizRouter ;