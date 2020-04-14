const express = require('express');
const app = express();
const port = 3000;

// Initialize public directories
app.use(express.static('static'));
app.use('/dist', express.static('dist'));

app.listen(port, () => console.log('App listening on port ' + port));
