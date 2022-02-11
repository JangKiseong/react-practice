const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const dbConnect = require('../database');

router.get('/', (req, res, next) => {
	res.render('index').end();
});

module.exports = router;
