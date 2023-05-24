const express = require("express");
const { registerUser, loginUser, getUserDetails, getAllUsers, getSingleUser, deleteUser, logout, updatePassword, updateProfile, updateUserRole } = require("../controllers/userController");
const {isAuthenticatedUser, authorizedRoles} = require("../middleware/auth");

const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logout);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router.route("/admin/users").get(isAuthenticatedUser, authorizedRoles("admin"), getAllUsers);

router.route("/admin/user/:id")
.get(isAuthenticatedUser, authorizedRoles("admin"), getSingleUser)
.delete(isAuthenticatedUser, authorizedRoles("admin"), deleteUser)
.put(isAuthenticatedUser, authorizedRoles("admin"), updateUserRole)


module.exports = router;