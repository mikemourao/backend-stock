import express from "express";
import { getUsers, addUser , login } from "../../controllers/users/users.js"

const router = express.Router()

router.get("/", getUsers)
router.post("/", addUser)
router.get("/login", login)

export default router