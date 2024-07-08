import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apikey = process.env.MAPLE_API_KEY;

  if (!apikey) {
    return res.status(500).json({ error: "API key is not defined." });
  }

  console.log("called api");
  const response = await fetch(
    "https://open.api.nexon.com/maplestory/v1/id?character_name=Cakes",
    {
      headers: {
        "x-nxopen-api-key": apikey as string,
        // "x-nxopen-api-key":
        //   "test_39a2bc6acb1d691592dd91bdbc11c17d109b25f5adc21b8827b072bcb7bed885efe8d04e6d233bd35cf2fabdeb93fb0d",
      },
    }
  );

  if (!response.ok) {
    return res.status(response.status);
  }

  const data = await response.json();
  return res.status(200).json(data);
}
