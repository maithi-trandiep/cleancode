const fs = require('fs');
const {
    getQuizByUser,
    createQuiz,
} = require('server/Controllers/QuizController.js');

jest.mock('fs');

const mockData = {
    quiz: [
        {
            "id": 1,
            "user_id": 1,
            "dateQuiz": "2024-02-17T20:06:31.255Z",
        },
        {
            "id": 2,
            "user_id": 1,
            "dateQuiz": "2024-02-17T20:07:04.002Z",
        },
        {
            "id": 3,
            "user_id": 1,
            "dateQuiz": "2024-02-17T21:23:46.317Z",
        }
    ]
};

describe('getQuizByUser', () => {
    test('it should return all quiz by user', () => {
        fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
        expect(getQuizByUser(1)).toEqual(mockData.quiz);
    });

    test('it should return an empty array if no quiz found by this user', () => {
        fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
        expect(getQuizByUser(2)).toEqual([]);
    });
});

describe('createQuiz', () => {
    test('it should create a new quiz', () => {
        fs.readFileSync.mockReturnValue(JSON.stringify(mockData));
        const newQuiz = {
            "user_id": 1,
            "dateQuiz": "2024-02-17T21:23:46.317Z",
        };

        createQuiz(newQuiz);
        const newData = JSON.parse(fs.writeFileSync.mock.calls[0][1]);
        const expectedData = {
            quiz: [
                ...mockData.quiz,
                newQuiz
            ]
        };

        expect(newData).toEqual(expectedData);
    });
});