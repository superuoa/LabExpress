const express = require('express');
const path = require('path');
const logger = require('./middleware/logger');
const app = express();
var cors = require('cors')

app.use(cors({
    origin: '*'
}));

//init middleware
app.use(logger);

//body parse middleware
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/userstest',require('./routes/api/userstest'));
app.use('/store',require('./routes/api/store'));
//app.use('/api/users',require('./routes/api/users'));


app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("server is running on port " + PORT));
