import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apikey = process.env.MAPLE_API_KEY;

  if (!apikey) {
    return res.status(500).json({ error: "API key is not defined." });
  }

  const response = await fetch(
    "https://open.api.nexon.com/maplestory/v1/id?character_name=Cakes",
    {
      headers: {
        "x-nxopen-api-key": apikey as string,
      },
    }
  );

  if (!response.ok) {
    return res.status(response.status);
  }

  const data = await response.json();
  return res.status(200).json(data);
}
