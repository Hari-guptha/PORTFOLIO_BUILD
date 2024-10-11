const express = require('express');
const cors = require('cors');
const path = require('path');


const app = express();

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '1mb' }))
require('dotenv').config();

app.use(cors());

app.use(express.static(path.join(__dirname, 'dist')));

app.get("*", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT);
