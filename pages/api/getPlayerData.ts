import type { NextApiRequest, NextApiResponse } from "next";
import { stringify } from "querystring";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apikey = process.env.MAPLE_API_KEY;
  const urlString = `https://open.api.nexon.com/maplestory/v1/character/basic?ocid=${req.query.ocid}`;

  if (!apikey) {
    return res.status(500).json({ error: "API key is not defined." });
  }

  const response = await fetch(urlString, {
    headers: {
      "x-nxopen-api-key": apikey,
    },
  });

  if (!response.ok) {
    return res
      .status(response.status)
      .json({ error: "Failed to fetch character data." });
  }

  const data = await response.json();

  return res.status(200).json(data);
}
