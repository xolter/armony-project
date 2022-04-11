import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
//import cors from 'cors';

import { projectList } from './controllers/projectController.js';
import { transactionalEmail, createSendingBlueContact } from './controllers/emailController.js'

const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();

const app = express();

//app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../armony-app/build')));

app.get("/api", (req, res) => {
	res.json({ message: "Hello from backend!" });
});

app.get("/api/projects", projectList);

app.get("/api/sendMail", transactionalEmail);

app.post("/api/contact", createSendingBlueContact);

app.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, '../armony-app/build/index.html'));
});

app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});