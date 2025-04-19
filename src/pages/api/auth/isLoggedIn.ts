import type { NextApiRequest, NextApiResponse } from "next/types";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return req.method?.toLowerCase() === "get"
    ? res.status(200).json({ isLoggedIn: false })
    : res.status(200).json({ isLoggedIn: false });
}
