const express = require('express');

const Hug = require('./hug.model');

module.exports = {
  name: 'hug',
  routes: {
    'GET /hug/:id': 'viewHug',
    'GET /api/hug/:id': 'getHug',
    'POST /api/hugs': 'createHug',
    'POST /api/hugs/claim/:id': 'claimHug',
  },
  actions: {
    viewHug: {
      async handler(req, res) {
        const { id } = req.params;
        const hug = await Hug.findByPk(id);
        res.render('hug', { hug });
      },
    },
    getHug: {
      middleware: [express.json()],
      async handler(req, res) {
        const { id } = req.params;
        if (!id) {
          return res.status(404).send({ error: 'Not Found' });
        }

        try {
          const hug = await Hug.findByPk(id);
          if (hug) {
            return res.send(hug);
          } else {
            return res.status(404).send({ error: 'Not Found' });
          }
        } catch (err) {
          console.log(err);
          return res.status(500).send({ error: 'Something went wrong, please try again later.' });
        }
      },
    },
    createHug: {
      middleware: [express.json()],
      async handler(req, res) {
        try {
          const hug = await Hug.create({ claimed: false, ...parseBody(req.body) });
          return res.status(201).send(hug);
        } catch (err) {
          console.log(err);
          return res.status(500).send({ error: 'Something went wrong, please try again later.' });
        }
      },
    },
    claimHug: {
      middleware: [express.json()],
      async handler(req, res) {
        const { id } = req.params;
        if (!id) {
          return res.status(404).send({ error: 'Not Found' });
        }

        try {
          const hug = await Hug.findByPk(id);
          if (!hug) {
            return res.status(404).send({ error: 'Not Found' });
          }
          if (hug.claimed === true) {
            return res.status(400).send({ error: 'Hug already claimed' });
          }
          await Hug.update({ claimed: true, claimedDate: new Date() }, { where: { id } });
          res.status(204).end();
        } catch (err) {
          console.log(err);
          return res.status(500).send({ error: 'Something went wrong, please try again later.' });
        }
      },
    },
  },
};

function parseBody(body) {
  let { name, message } = body;
  const result = {};

  if (typeof name === 'string') {
    name = name.trim().substr(0, 240);
    result.name = name;
  }
  if (typeof message === 'string') {
    message = message.trim().substr(0, 240);
    result.message = message;
  }

  return result;
}
