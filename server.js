const express = require('express');
const connectDB = require('./config/db');
const app = express();

//connect mongoDB
connectDB();

//init middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running....'));

app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/magazine', require('./routes/api/magazine'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
