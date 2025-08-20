// pages/api/sheets.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { readKPIs, updateKPI } from "../../services/googleSheets";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const data = await readKPIs();
      return res.status(200).json(data);
    }

    if (req.method === "POST") {
      const { row, column, value } = req.body;
      const result = await updateKPI(row, column, value);
      return res.status(200).json(result);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err: unknown) {
    console.error(err);
    const errorMessage = typeof err === "object" && err !== null && "message" in err ? (err as { message?: string }).message : String(err);
    res.status(500).json({ error: errorMessage });
  }
}
