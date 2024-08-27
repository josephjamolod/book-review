import express from "express";
import {
  getUser,
  signIn,
  signOutUser,
  signUp,
  updateUser,
} from "../controllers/auth.controller";
import { checkToken, verifyToken } from "../utils/verifyToken";
const router = express.Router();

router.route("/check-token").get(checkToken);
router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/get-user/:id").get(verifyToken, getUser);
router.route("/sign-out/:id").get(verifyToken, signOutUser);
router.route("/update-user/:id").patch(verifyToken, updateUser);

export default router;
