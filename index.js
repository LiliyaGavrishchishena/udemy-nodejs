const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  })
);

//Routes
app.use('/', require('./routes/home'));
app.use('/courses', require('./routes/courses'));
app.use('/add', require('./routes/add'));
app.use('/cart', require('./routes/cart'));

const PORT = process.env.PORT || 5000;

async function start() {
  try {
    const url =
      'mongodb+srv://liliya:liliya123456@udemy-nodejs-qbdll.azure.mongodb.net/shop';

    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false
    })
    app.listen(PORT, () => {
      console.log(`Server is running on port http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e)
  }

}

start();