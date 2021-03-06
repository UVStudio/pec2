const express = require('express');
const connectDB = require('./config/db');
const app = express();
const methodOverride = require('method-override');

//connect mongoDB
connectDB();

//init middleware
app.use(express.json({ extended: false }));
app.use(methodOverride('_method'));

//routes
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/articles', require('./routes/api/articles'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/avatar', require('./routes/api/avatar'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
