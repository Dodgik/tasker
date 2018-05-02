const config = require('../config/config.js');
var path = require('path');
var intel = require('intel');
var express = require('express');
var passport = require('passport');
/*
var React = require('react');
var ReactDOMServer = require('react-dom/server');
var { createStore } = require('redux');
var { Provider } = require('react-redux');
var { StaticRouter } = require('react-router');
var reducers = require('../../client/src/reducers/index');
var { LIST_ACTIONS } = require('../../client/src/consts/action_types');
var App = require('../../client/src/app');
*/
/*
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import reducers from '../../client/src/reducers/index';
import { LIST_ACTIONS } from '../../client/src/consts/action_types';
import App from '../../client/src/app';
*/
const { guestUser, loggedInUser } = require('../lib/user_helper');


var User = require('../db/models/users');
require('../config/passport/passport.js')(passport, User);


const router = express.Router();
/*
router.use(function (req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});
*/

function rootHandler(req, res) {
  //console.log("-->ssr-rootHandler: ", req.params);
  //console.log("-->ssr-req-user: ", req.user);
  //console.log("-->ssr-req-session: ", req.session);
  let initialState = {
    api: {
      protocol: config.protocol,
      host: config.host,
      maps_api_key: config.maps_api_key,
    }
  };
  if (req.isAuthenticated()) {
    initialState.user = loggedInUser(req.user)
  } else {
    initialState.user = guestUser(req.user)
  }
  if (req.params.token) {
    initialState.user.recovery = req.params.token
  }
  //console.log("-->ssr-rootHandler initialState: ", initialState);

  const redirectUrl = false;  
  if (redirectUrl) {
    res.writeHead(301, {
      Location: redirectUrl,
    });
    res.end();
  } else {
    res.status(200).render('index.ejs', {
      state: JSON.stringify(initialState),
    });
  }
}

router.get('/forgot', rootHandler);
router.get('/reset/:token', rootHandler);
router.get('/', rootHandler);
router.get('/index.php', rootHandler);

module.exports = router;
