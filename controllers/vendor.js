const axios = require("axios");
const { VENDOR_SIGN_UP_URL } = require("../config");
const Vendor = require("../models/vendors");

module.exports = {
  singUpVendor: async (req, res) => {
    try {
      const { vendor_name, name, email, phone, password, password_repeat } =
        req.body;

      // Checking for password matching
      if (password != password_repeat) {
        return res.status(400).render("signupVendor.ejs", {msg: "كلمة المرور غير متطابقة"});
      }

      

      const formData = {
        vendor_name: vendor_name,
        vendor_type_id: 1,
        vendor_email: email,
        vendor_phone: phone,
        name: name,
        email: email,
        phone: phone,
        password: password,
        agreedVendor: true,
      };

      await axios.post(VENDOR_SIGN_UP_URL, formData).then(() => {
        const vendor = new Vendor({
          email,
          password,
          phone,
        });
        vendor
          .save()
          .then(() => {
            // Respone a Success Message
            return res.status(200).send({
              msg: "Register Successful",
              vendor: vendor,
            });
          })
          .catch((err) => {
            return res.status(401).send({
              msg: "Vendor Not Registered",
              err,
            });
          });
      });
    } catch (err) {
      return res.status(501).send({
        msg: "Internal Server ERROR",
        err: err.message,
      });
    }
  }, // Sing Up new Vendor
  loginVendor: async (req, res) => {}, // Login Vendor
};
