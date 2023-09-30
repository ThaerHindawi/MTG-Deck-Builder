const express = require("express");
var cors = require("cors");

const app = express();
const database = require("./database");

app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: "*",
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api", (request, response) => {
  response.json({ info: 'Welcome to the MTG Deck Builder API.' })
});

app.get("/members/logged_in", database.logged_in);

app.get("/members", database.getMembers);
app.get("/members/:member_id", database.getMemberByID);

app.get("/decks", database.getDecks);
app.get("/decks/:deck_id", database.getDeckByID);
app.get("/decks/:deck_id/cards", database.getCardsByDeckID);
app.get("/decks/member/:memberid", database.getDecksByMemberID);

app.get("/decks/:deck_id/delete", database.authenticateToken, database.deleteDeck);
app.get("/decks/:deck_id/cards/:card_id/delete", database.authenticateToken, database.deleteCardFromDeck);

app.post("/members/register", database.registerUser);
app.post("/members/authenticate", database.authenticateUser);
app.post("/decks/new", database.authenticateToken, database.createDeck);
app.post("/decks/:deck_id/add", database.authenticateToken, database.addCardToDeck);

app.get("/auth/logout", (request, response) => {
  request.session.destroy();
  response.redirect("/");
});

app.listen(8080, () => {
  console.log(`Server is running on port 8080.`);
});