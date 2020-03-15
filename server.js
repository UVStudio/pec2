const express = require('express');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('./config/conn');

const app = express();

app.set('view engine', 'ejs');

//connect mongoDB
connectDB();

//init middleware
app.use(express.json({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

//routes
app.get('/', (req, res) => res.render('index'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/articles', require('./routes/api/articles'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/users', require('./routes/api/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
