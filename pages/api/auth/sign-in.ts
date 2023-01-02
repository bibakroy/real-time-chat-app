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
      "SELECT id, username, passhash FROM users u WHERE u.username=$1",
      [username]
    );

    if (existingUser.rowCount > 0) {
      const isSamePassword = await bcrypt.compare(
        password,
        existingUser.rows[0].passhash
      );

      if (isSamePassword) {
        const token = jwt.sign(
          {
            username,
            id: existingUser.rows[0].id,
          },
          process.env.JWT_SECRET!
        );
        res.status(200).json({ signIn: true, token });
      } else {
        return res
          .status(401)
          .json({ signIn: false, message: "Wrong username or password" });
      }
    } else {
      return res
        .status(401)
        .json({ signIn: false, message: "Wrong username or password" });
    }
  } catch (error) {
    console.log("error", error);
    return res.status(502).send(error);
  }
}
