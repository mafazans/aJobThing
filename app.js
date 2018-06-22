import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import expressValidator from 'express-validator';
import routes from './routes/index';
import apiRoutes from './routes/api';
import errorHandlers from './handlers/errorHandlers';

const app = express();

//enable cors
app.use(cors());

//serve static files from publc
app.use(express.static(path.join(__dirname, 'public')));

//use body parser to get req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//used at validating data within register
app.use(expressValidator());

app.use('/', routes);
// app.use('/api', apiRoutes);

//error handling middleware, if the async method get the error the errorHandlers helper will catch it and pass it to notFound -> mongoError -> authError
app.use(errorHandlers.notFound);
app.use(errorHandlers.mongoError);
app.use(errorHandlers.authError);

module.exports = app;