#!/bin/env node
var express = require('express'),
  bodyParser = require('body-parser'),
  fs = require('fs'),
  stylus = require('stylus'),
  nib = require('nib'),
  morgan = require('morgan'),
  server = express()
var util = require('util')


function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib());
}

server.set('views', __dirname + '/views')
server.set('view engine', 'pug')
server.use(express.static(__dirname + '/public'))
server.use(bodyParser.urlencoded({ extended: false }))
server.use(bodyParser.json())
server.use(morgan('combined'))

server.get('/', function (req, res) {
  const folder = process.env.ALF_JSON_PATH || './public/json/alfresco/';
  const fs = require('fs');
  var fileList = fs.readdirSync(folder);
  var cp = require("child_process");
  res.render('fireplot',
  { title : 'Fire Plots', files: fileList}
  )
})

var port = process.env.OPENSHIFT_NODEJS_PORT || 8080  
, ip = process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0";
server.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);
