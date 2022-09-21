const express = require('express');
// const path = require('path');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

const apiRouter = require('./routes/apiRouter')
app.use(apiRouter);
const htmlRouter = require('./routes/htmlRouter');
app.use(htmlRouter);

app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT}`)
);