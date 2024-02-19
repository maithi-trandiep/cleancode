const fs = require('fs');

const FILE_PATH = './db.json';

const readDataFromFile = () => {
    try {
     const data = fs.readFileSync(FILE_PATH);
     return JSON.parse(data);
    } catch (err) {
     return { users: {} };
    }
};

const writeDataToFile = (data) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
};

const signUp = async (newUser) => {
    const data = readDataFromFile();
    if (!data.users || !Array.isArray(data.users)) {
        data.users = [];
    }
    newUser.id = data.users.length + 1;
    data.users.push(newUser);
    writeDataToFile(data);
    return newUser;
}

const signIn = async (email, password) => {
    const data = readDataFromFile();
    if (!data.users || !Array.isArray(data.users)) {
        return null;
    }
    return data.users.find(user => user.email === email && user.password === password);
}

const checkIfEmailAlreadyExists = async (email) => {
    const data = readDataFromFile();
    if (!data.users || !Array.isArray(data.users)) {
        return false;
    }
    return data.users.find(user => user.email === email);
}

module.exports = { 
    signUp,
    signIn,
    checkIfEmailAlreadyExists,
    readDataFromFile,
    writeDataToFile 
}
