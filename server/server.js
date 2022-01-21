const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('server/public'));
app.use(express.urlencoded({extended: true}));

const listRouter= require('./routes/list.router.js');
app.use('/list', listRouter);

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
})