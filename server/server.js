const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../armony-app/build')));

app.get("/api", (req, res) => {
	res.json({ message: "Hello from backend!" });
});

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, '../armony-app/build/index.html'));
});

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});