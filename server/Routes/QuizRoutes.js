const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

const {
    getAllQuiz,
    getQuizByUser,
    createQuiz,
} = require('../Controllers/QuizController');

router.use(bodyParser.json());

router.get('/quiz', (req, res) => {
    const quiz = getAllQuiz();
    res.status(200).json(quiz);
});

router.get('/users/:userId/lastQuiz', (req, res) => {
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

router.post('/quiz', (req, res) => {
    console.log("req.body", req.body)
    const newQuiz = req.body;
    if (createQuiz(newQuiz)) {
        res.status(201).json(newQuiz);
    } else {
        res.status(400).json({ message: 'Erreur lors de la création du quiz' });
    }
});

module.exports = router;