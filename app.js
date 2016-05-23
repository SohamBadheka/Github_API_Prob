var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes');
var repos = require('./routes/repos');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.get('/', routes.index);
app.post('/dashboard', repos.dashboard);
app.get('/dashboard', repos.redirectToMain);
app.get('/listOfRepos', repos.listOfRepos);
app.get('/commits', repos.commits);
app.get('/getCommits', repos.getCommits);
app.get('/userInformation',repos.userInformation);
app.get('/getUserInformation', repos.getUserInformation);

if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}
module.exports = app;
