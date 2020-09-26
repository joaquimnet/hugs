const express = require('express');

const router = express.Router();

const controller = require('../controllers').hug;

router.get('/:id', controller.get_hug);
router.post('/', controller.post_hug);
// router.post('/', express.json(), controller.post_hug);

module.exports =  router;
