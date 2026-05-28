const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const getBotResponse = require("./chatbot");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/chat", (req, res) => {
    const userMessage = req.body.message;

    const botReply = getBotResponse(userMessage);

    res.json({
        reply: botReply
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});