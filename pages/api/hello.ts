// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from "next";

export default (_: NextApiRequest, response: NextApiResponse) => {
  response.statusCode = 200;
  response.json({ name: "John Doe" });
};
