const express = require("express");
const Member = require('../models/Member');

const {
    createMember,
    retrieveMember,
    updateMumber,
} = require("../controllers/MemberController");

const router = express.Router();

router.route("/").post(createMember);
router.route("/:id").get(retrieveMember);
router.route("/:id").put(updateMumber);

module.exports = router;