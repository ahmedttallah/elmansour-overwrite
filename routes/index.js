const { singUpVendor, loginVendor } = require("../controllers");

const router = require("express").Router();

// @Route [GET] /api
// @desc Base URL
router.get("/", (req, res) => {
  res.send("<h1> Hello from Server, Please Get Out </h1>");
});

// @Route [POST] /api/vendor/signup
// @desc Singup new vendor
router.post("/vendor/signup", singUpVendor);

// @Route [POST] /api/vendor/login
// @desc login a vendor
router.post("/vendor/login", loginVendor);
module.exports = router;
