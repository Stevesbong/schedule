const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const schedules = require('./routes/schedules');

app.set('view engine', 'pug');
app.set('views', path.join( __dirname, 'views' ));

app.use('/static', express.static( path.join( __dirname, 'public')));
app.use(bodyParser.urlencoded( { extended:false } ) );


require('./routes/index')(app);
app.use('/schedules', schedules);

let port = process.env.PORT ? process.env.PORT : 3000;
app.listen( port, () => console.log(`listening port on ${port}`))