# cleancode

## DOC API

1.  Get toutes les fiches
    GET http://localhost:3000/api/fiches

2.  Get toutes les fiches par tags
    GET http://localhost:3000/api/fiches?tags=Europe,Africa

3.  Get une fiche by ID
    GET http://localhost:3000/api/fiches/{id}

4.  Create une fiche
    POST http://localhost:3000/api/fiches/
    body{
    "id": "6c84fb90-12c4-11e1-840d-7b25c5ee775a",
    "question": "France",
    "answer": "LA",
    "tag": "Europe",
    "category": "FIRST"
    }

5.  Patch une fiche
    PATCH http://localhost:3000/api/fiches/{id}
    body {

}

6.  Delete une fiche
    DELETE http://localhost:3000/api/fiches/{id}
