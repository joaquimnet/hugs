const express = require('express');

const router = express.Router();

const controller = require('../controllers').hug;

router.get('/api/hugs/:id', express.json(), controller.get_hug);
router.post('/api/hugs', express.json(), controller.post_hug);
router.post('/api/hugs/claim/:id', express.json(), controller.post_claim_hug);
router.get('/hug/:id', controller.get_hug_view);

module.exports = router;
