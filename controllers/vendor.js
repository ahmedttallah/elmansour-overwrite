const axios = require("axios");
const { VENDOR_SIGN_UP_URL, VENDOR_LOGIN_URL } = require("../config");
const Vendor = require("../models/vendors");
const referralCodes = require("referral-codes");

module.exports = {
  singUpVendor: async (req, res) => {
    try {
      const { vendor_name, name, phone, password, password_repeat } = req.body;

      // Checking for existance
      if (!vendor_name || !name || !phone || !password || !password_repeat) {
        return res
          .status(400)
          .render("signupVendor.ejs", { msg: "برجاء إدخال جميع البيانات" });
      }

      // Checking for password matching
      if (password != password_repeat) {
        return res
          .status(400)
          .render("signupVendor.ejs", { msg: "كلمة المرور غير متطابقة" });
      }

      // Generate random mail
      const genMail = referralCodes.generate({
        length: 9,
        prefix: "dev",
        postfix: "@mansour.com",
        charset: "abcdefghijklmnopqrstuvwxyz1234567890",
      });
      var newPhone = `+2${phone}`;

      const formData = {
        vendor_name: vendor_name,
        vendor_type_id: 1,
        vendor_email: genMail[0],
        vendor_phone: newPhone,
        name: name,
        email: genMail[0],
        phone: newPhone,
        password: password,
        agreedVendor: true,
      };

      const user = await Vendor.findOne({ phone: newPhone });

      await axios.post(VENDOR_SIGN_UP_URL, formData).then(() => {
        if (!user) {
          const vendor = new Vendor({
            email: genMail[0],
            password,
            phone: newPhone,
          });
          vendor
            .save()
            .then(() => {
              // Respone a Success Message
              return res.status(200).render("signupVendor.ejs", {
                msg: "تم التسجيل بنجاح يرجي التواصل مع المسؤول لتفعيل حسابك",
              });
            })
            .catch((err) => {
              return res.status(401).render("signupVendor.ejs", {
                msg: "خطأ لم يتم التسجيل",
              });
            });
        }
        if (user) {
          user
            .updateOne({ email: genMail[0], password, phone: newPhone })
            .then(() => {
              // Respone a Success Message
              return res.status(200).render("signupVendor.ejs", {
                msg: "تم التسجيل بنجاح يرجي التواصل مع المسؤول لتفعيل حسابك",
              });
            })
            .catch((err) => {
              return res.status(401).render("signupVendor.ejs", {
                msg: "خطأ لم يتم التسجيل",
              });
            });
        }
      });
    } catch (err) {
      return res.status(501).render("signupVendor.ejs", {
      });
    }
  }, // Sing Up new Vendor

  loginVendor: async (req, res) => {
    try {
      const { phone, password } = req.body;

      var newPhone = `+2${phone}`;

      const user = await Vendor.findOne({ phone: newPhone });

      if (!user) {
        return res.status(401).send({
          msg: "User Not Found",
        });
      }

      if (password != user.password) {
        return res.status(401).send({
          msg: "Password Incorrect",
        });
      }

      const userMail = user.email;

      const formData = {
        email: userMail,
        password: password,
      };

      await axios.post(VENDOR_LOGIN_URL, formData).then((data) => {
        res.status(201).send({
          msg: "Login Successfully",
          data: data.data,
        });
      });
    } catch (err) {
      res.status(500).send({
        msg: "Internal Server ERROR",
        err,
      });
    }
  }, // Login Vendor
};
