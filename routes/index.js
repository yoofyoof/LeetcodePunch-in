var express = require("express");
var router = express.Router();
const db = require("../db/mongoConnection");
const passwordHash = require("password-hash");
const number = 4;

router.post("/create-event", async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const event = req.body;
  await db.insertData("leetcode", "punch_in_detail", req.body);
  res.sendStatus(201);
});

router.post("/get-events", async function (req, res) {
  const p = await db.getData("leetcode", "punch_in_detail", req.body);
  res.json(p);
});

router.post("/check_email_and_password", async function (req, res) {
  const p = await db.getData("leetcode", "users", { email: req.body.email });
  const user = p[0];
  const verification = passwordHash.verify(req.body.password, user.password);

  if (p.length === 0) {
    res.json({ result: false });
  } else {
    if (verification) {
      await db.insertData("leetcode", "currentLogin", {
        email: req.body.email,
      });
      res.json({ result: true });
    } else {
      res.json({ result: false });
    }
  }
});

router.post("/if_user_exist", async function (req, res) {
  const p = await db.getData("leetcode", "users", req.body);
  if (p.length === 0) {
    res.json({ result: false });
  } else {
    res.json({ result: true });
  }
});
// eslint-disable-next-line no-unused-vars
router.post("/insert_user", async function (req, res) {
  const userInfo = req.body;
  const password = passwordHash.generate(userInfo.password);
  userInfo.password = password;

  await db.insertData("leetcode", "users", userInfo);
});

router.post("/get_token", async function (req, res) {
  const p = await db.insertData("leetcode", "currentLogin", req.body);
  res.json(p);
});

router.post("/delete_login_token", async function (req, res) {
  const p = await db.deleteData("leetcode", "currentLogin", req.body);
  res.json(p);
});

router.get("/get_data", async function (req, res) {
  const p = await db.getOrderData(
    "leetcode",
    "punch_in_detail",
    {},
    "date",
    number
  );
  res.json(p);
});

router.get("/get_rank_data", async function (req, res) {
  const p = await db.getOrderData(
    "leetcode",
    "punch_in_summary",
    {},
    "qCount",
    number
  );
  res.json(p);
});

// getting postInfo by user
router.post("/get_data_query", async function (req, res) {
  const p = await db.getData("leetcode", "punch_in_detail", req.body);
  res.json(p);
});

router.post("/update_rank", async function (req, res) {
  const beforeRes = await db.getData("leetcode", "punch_in_summary", req.body);
  const beforeCount = beforeRes[0].qCount;
  const newCount = beforeCount + 1;
  const newValues = { $set: { qCount: newCount } };

  await db.updateData("leetcode", "punch_in_summary", req.body, newValues);
  const p = await db.getData("leetcode", "punch_in_summary", {});
  res.json(p);
});

module.exports = router;
