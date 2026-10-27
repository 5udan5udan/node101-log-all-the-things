const express = require('express');
const fs = require('fs');
const app = express();
const logData = [];

app.use((req, res, next) => {
    logData.push({
        Agent: req.headers['user-agent'],
        Time: new Date().toISOString(),
        Method: req.method,
        Resource: req.originalUrl,
        Version: req.httpVersion,
        Status: res.statusCode
    });
    console.log(`${req.headers['user-agent']},${new Date().toISOString()},${req.method},${req.originalUrl},HTTP/${req.httpVersion},${res.statusCode}`);
    next();
});

app.get('/', (req, res) => {
  res.send("ok");
  res.status(200);
});

app.get('/logs', (req, res) => {
    return res.json(logData);
});

module.exports = app;
