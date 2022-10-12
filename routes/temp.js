const router = require("express").Router();

router.get("/vendor/signup", (req, res) => {

  res.render("signupVendor.ejs", { msg: "مرحبا بك" });
});

router.get("/test", (req, res) => {

  res.render("success.ejs");
});

module.exports = router;
