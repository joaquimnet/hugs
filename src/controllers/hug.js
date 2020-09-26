const { User, Hug } = require('../models');

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
    return res.status(500).send({ error: err.message });
  }
};

const post_hug = async (req, res) => {
  // const {body} = req.body;
  // const name = (body.name ?? '').trim();
  // const message = (body.message ?? '').trim();

  try {
    const hug = await Hug.create({ claimed: false });
    return res.send(hug);
  } catch (err) {
    console.log(err);
    return res.status(500).send({ error: err.message });
  }
};

module.exports = {
  get_hug,
  post_hug,
};
