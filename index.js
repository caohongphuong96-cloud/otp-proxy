import express from "express";
import fetch from "node-fetch";
const app = express();

app.get("/", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.send("⚠️ Missing ?url");

  try {
    const r = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": "https://www.firefox.fun/",
        "Origin": "https://www.firefox.fun"
      },
    });

    const text = await r.text();
    res.set({
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
      "Access-Control-Allow-Headers": "*",
      "Content-Type": "text/plain; charset=utf-8"
    });
    res.send(text);
  } catch (err) {
    res.set("Access-Control-Allow-Origin", "*");
    res.send("💥 Proxy error: " + err.message);
  }
});

app.listen(3000, () => console.log("Proxy ready on port 3000"));
