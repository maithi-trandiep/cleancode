const fs = require('fs');

const FILE_PATH = './db.json';

const readDataFromFile = () => {
 try {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
 } catch (err) {
  return { quiz: {} };
 }
};

const writeDataToFile = (data) => {
 fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};

const getAllQuiz = () => {
    return Object.values(readDataFromFile().quiz);
}

const getQuizByUser = (user) => {
    const quizData = readDataFromFile().quiz;
    const userQuizzes = [];
    if (quizData && Array.isArray(quizData)) {
        return quizData.filter(quiz => quiz.user_id === user);
    }
    return userQuizzes;
}

const createQuiz = (newQuiz) => {
    const data = readDataFromFile();
    if (!data.quiz || !Array.isArray(data.quiz)) {
        data.quiz = [];
    }
    newQuiz.id = data.quiz.length + 1;
    data.quiz.push(newQuiz);
    writeDataToFile(data);
    return newQuiz;
}

module.exports = { 
    getAllQuiz,
    getQuizByUser,
    createQuiz,
    readDataFromFile,
    writeDataToFile 
}