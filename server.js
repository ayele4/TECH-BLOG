const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

const helpers = require('./utils/helpers');

const exphbs = require('express-handlebars');
const hbs = exphbs.create({helpers});

const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const sess = {
    secret: 'Super secret secret',

    cookie: {expires: 60000},
    resave: true,
    rolling: true,
    saveUninitialized: false,
    store:new SequelizeStore({
        db: sequelize
    }),
};
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, ()  => console.log('Now listening'));
});