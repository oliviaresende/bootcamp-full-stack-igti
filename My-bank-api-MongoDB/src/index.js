const express = require('express');

const app = express();
app.use(express.json());

require('./app/controllers/accountController')(app);

app.listen(3001);