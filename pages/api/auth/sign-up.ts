import { NextApiRequest, NextApiResponse } from "next";
import { formSchema } from "../../../utils/formSchema";
import pool from "../../../server/db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default async function signInHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body.data;

  try {
    await formSchema.validate({ username, password });
  } catch (error) {
    return res.status(422).send(error);
  }

  try {
    const existingUser = await pool.query(
      "SELECT username FROM users WHERE username=$1",
      [username]
    );

    if (existingUser.rowCount === 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await pool.query(
        "INSERT INTO users(username, passhash) values($1, $2) RETURNING id, username",
        [username, hashedPassword]
      );
      const token = jwt.sign(
        {
          username,
          id: newUser.rows[0].id,
        },
        process.env.JWT_SECRET!
      );
      return res.status(201).json({ signUp: true, token });
    } else {
      return res
        .status(409)
        .json({ signUp: false, status: "Username already exists" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(502).send(error);
  }
}
