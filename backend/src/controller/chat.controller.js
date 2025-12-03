// controllers/chat.controller.js
import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    // Disable caching for token endpoints
    res.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.set("Pragma", "no-cache");
    res.set("Expires", "0");
    res.set("Surrogate-Control", "no-store");

    // Prefer authenticated user, fallback to query param for dev
    const userId =
      (req.user && (req.user.id || req.user.userId)) || req.query.userId;
    if (!userId) {
      console.error("getStreamToken: no userId (req.user, req.query):", {
        reqUser: req.user,
        query: req.query,
      });
      return res.status(400).json({ message: "userId required" });
    }

    // Generate token via library
    const token = await generateStreamToken(userId);

    // Return token and public apiKey (frontend needs the public key)
    return res.status(200).json({ token, apiKey: process.env.STREAM_API_KEY });
  } catch (error) {
    // log full error (stack) for debugging
    console.error("Error in getStreamToken controller:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
