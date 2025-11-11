import express from "express";
import fetch from "node-fetch";

const app = express();

// ✅ Thêm middleware CORS cho mọi request
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS",
    "Access-Control-Allow-Headers": "*"
  });
  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }
  next();
});

app.get("/", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("⚠️ Missing ?url");

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": "https://www.firefox.fun/",
        "Origin": "https://www.firefox.fun"
      },
    });

    const text = await response.text();
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(text);
  } catch (err) {
    res.status(500).send("💥 Proxy error: " + err.message);
  }
});

app.listen(3000, () => console.log("✅ Proxy Render đang chạy trên cổng 3000"));
