const express = require('express');

const app = express();

app.get('/', (req, res) => res.send('API running....'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));

//mongodb+srv://Leonard:<password>@cluster0-a8566.mongodb.net/test?retryWrites=true&w=majority
