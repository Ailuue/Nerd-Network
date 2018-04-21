const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");

//@route GET api/profile/test
//@desc Tests profile route
//@access Public

router.get("/test", (req, res) => res.json({ msg: "Profile Works!" }));

//@route GET api/profile
//@desc Get current user's profile
//@access Private

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (!profile) {
          errors.noprofile = "This user has no profile";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

//@route POST api/profile
//@desc Create or edit current user's profile
//@access Private

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //Get fields
    const profileFields = {};
    const fields = [
      "handle",
      "company",
      "website",
      "location",
      "bio",
      "status",
      "githubprofile",
      "youtube",
      "twitter",
      "facebook",
      "linkedin",
      "instagram"
    ];

    profileFields.user = req.user.id;
    fields.forEach(field => {
      if (req.body[field]) profileFields[field] = req.body[field];
    });

    if (typeof req.body.skills !== "undefined") {
      profileFields.skills = req.body.skills.split(",");
    }
  }
);

module.exports = router;
