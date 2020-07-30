const express = require('express');

const account = require('../models/account');

const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const accounts = await account.find();

    res.send({ accounts })
  } catch (err) {
    res.status(400).send({ error: 'Error loading accounts' });
  }
});

router.post('/deposit', async (req, res) => {
  try {
    const { agencia, conta, deposit } = req.body;

    const accountModify = await account.findOne({ agencia, conta });

    if (!accountModify)
      res.status(400).send({ error: "Account not found!" });

    accountModify.balance += deposit;

    await accountModify.save();

    res.send({
      "name": accountModify.name,
      "balance": accountModify.balance
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post('/deduct', async (req, res) => {
  try {
    const { agencia, conta, deduct } = req.body;

    const accountModify = await account.findOne({ agencia, conta });

    if (!accountModify)
      res.status(400).send({ error: "Account not found!" });

    if (accountModify.balance - (deduct + 1) < 0)
      res.status(400).send({ error: "Insufficient funds!" });

    accountModify.balance -= (deduct + 1);

    await accountModify.save();

    res.send({
      "name": accountModify.name,
      "balance": accountModify.balance
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/balance', async (req, res) => {
  try {
    const { agencia, conta } = req.query;

    const accountConsult = await account.findOne({ agencia, conta });

    if (!accountConsult)
      res.status(400).send({ error: "Account not found!" });

    res.send({
      "name": accountConsult.name,
      "balance": accountConsult.balance
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { agencia, conta } = req.query;

    const accountDelete = await account.findOneAndRemove({ agencia, conta });

    if (!accountDelete)
      res.status(400).send({ error: "Account not found!" });

    const totalAccounts = await account.count({ agencia });

    res.send({ "contasAtivas": totalAccounts });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.post("/transfer", async (req, res) => {
  try {
    const { origin, target, value } = req.body;
    const accountOrigin = await account.findOne({ "conta": origin });

    if (!accountOrigin)
      res.status(400).send({ error: "Origin account not found!" });

    const accountTarget = await account.findOne({ "conta": target });

    if (!accountTarget)
      res.status(400).send({ error: "Target account not found!" });

    let valueDeduct = value;

    if (accountOrigin.agencia !== accountTarget.agencia)
      valueDeduct += 8;

    if (accountOrigin.balance - valueDeduct < 0)
      res.status(400).send({ error: "Insufficient funds!" });

    accountOrigin.balance -= valueDeduct;
    accountTarget.balance += value;

    await accountOrigin.save();
    await accountTarget.save();

    res.send({
      "name": accountOrigin.name,
      "balance": accountOrigin.balance
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/average", async (req, res) => {
  try {
    const agencia = +req.query.agencia;

    const average = await account.aggregate([
      { $match: { agencia: agencia } },
      { $group: { _id: null, media: { $avg: "$balance" } } }
    ]);

    res.send({ "media": parseFloat(average[0].media.toFixed(2)) });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/lowestbalance", async (req, res) => {
  try {
    const limit = +req.query.limit;

    const lowest = await account.find().sort({ balance: 1 }).limit(limit);

    res.send(
      lowest.map(item => (
        {
          agencia: item.agencia,
          conta: item.conta,
          balance: item.balance
        }
      ))
    )
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/biggestbalance", async (req, res) => {
  try {
    const limit = +req.query.limit;

    const biggest = await account.find().sort({ balance: -1, name: 1 }).limit(limit);

    res.send(
      biggest.map(item => (
        {
          agencia: item.agencia,
          conta: item.conta,
          name: item.name,
          balance: item.balance
        }
      ))
    )
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get("/private", async (_, res) => {
  try {
    const agencias = await account.distinct("agencia");

    const promises = agencias.map(async (agencia) => {
      const accountTop = await account.find({ agencia }).sort({ balance: -1 }).limit(1);

      accountTop[0].agencia = 99;

      await accountTop[0].save();
    });

    await Promise.all(promises);

    const privates = await account.find({ "agencia": 99 });

    res.send(privates);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

module.exports = app => app.use('/account', router);