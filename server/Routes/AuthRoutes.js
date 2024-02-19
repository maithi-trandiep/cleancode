const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

const { signIn, signUp, checkIfEmailAlreadyExists } = require('../Controllers/AuthController');

router.post('/signin', async (req, res) => {
    if (!email || !password)
    return res.status(400).json({ message: "Email ou mot de passe incorrect" });
  try {
    const user = await signIn(email, password);

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 3600000 });
    res.json({
      accessToken,
      id: user.id,
      email: user.email,
      nom: user.nom,
      prenom: user.prenom,
    });
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
});

router.post("/signup", async (req, res) => {
    const { nom, prenom, email, password } = req.body;
    if (!nom || !prenom || !email || !password)
      return res.status(400).json({ message: "Champ(s) manquant(s)" });
    const duplicateEmail = await checkIfEmailAlreadyExists(email);
    if (duplicateEmail)
      return res.status(409).json({ message: "Email déjà utilisé" });
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = {
        nom,
        prenom,
        email,
        password: hashedPassword,
      };
      await signUp(newUser);
      res.status(201).json({ message: "Utilisateur créé" });
    } catch (error) {
      console.error("Error", error);
      throw error;
    }
  });


