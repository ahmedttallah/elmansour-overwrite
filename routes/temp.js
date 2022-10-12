const router = require("express").Router();

router.get("/vendor/signup", (req, res) => {

  res.render("signupVendor.ejs", { msg: "مرحبا بك" });
});

module.exports = router;
