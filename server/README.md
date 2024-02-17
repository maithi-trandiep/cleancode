## DOC API

1. **Obtenir toutes les cartes**
    - Méthode : GET
    - URL : `http://localhost:8080/cards`

2. **Obtenir toutes les cartes par tags**
    - Méthode : GET
    - URL : `http://localhost:8080/cards?tags=Europe,Africa`

3. **Obtenir une carte par ID**
    - Méthode : GET
    - URL : `http://localhost:8080/cards/{id}`

4. **Créer une carte**
    - Méthode : POST
    - URL : `http://localhost:8080/cards/`
    - Corps de la requête :
    ```json
    {
        "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
        "question": "France",
        "answer": "LA",
        "tag": "Europe",
        "category": "FIRST"
    }
    ```

5. **Modifier une carte**
    - Méthode : PATCH
    - URL : `http://localhost:8080/cards/{id}`
    - Corps de la requête :
    ```json
    {
        // Champ(s) à mettre à jour
    }
    ```

6. **Supprimer une carte**
    - Méthode : DELETE
    - URL : `http://localhost:8080/cards/{id}`
