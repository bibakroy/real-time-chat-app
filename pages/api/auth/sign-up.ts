import { NextApiRequest, NextApiResponse } from "next";
import { formSchema } from "../../../utils/formSchema";

export default function signInHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.body.data: ", req.body.data);

  const formData = req.body.data;

  formSchema
    .validate(formData)
    .catch((error: Error) => {
      console.log(error);
      res.status(422).send(error);
    })
    .then((data) => {
      if (data) {
        console.log("Form data is valid");
        res.status(200).send("Form data is valid");
      }
    });
}
