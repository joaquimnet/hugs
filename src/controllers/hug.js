const { User, Hug } = require('../models');

const get_hug_view = async (req, res) => {
  const { id } = req.params;
  const hug = await Hug.findByPk(id);
  res.render('hug', { hug });
};

const get_hug = async (req, res) => {
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
};

const post_hug = async (req, res) => {
  try {
    const hug = await Hug.create({ claimed: false, ...parseBody(req.body) });
    return res.status(201).send(hug);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: 'Something went wrong, please try again later.' });
  }
};

const post_claim_hug = async (req, res) => {
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

module.exports = {
  get_hug,
  get_hug_view,
  post_hug,
  post_claim_hug,
};
