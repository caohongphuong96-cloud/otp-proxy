import express from "express";
import fetch from "node-fetch";

const app = express();

// ✅ Cho phép CORS cho tất cả request
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Allow-Headers": "*"
  });
  if (req.method === "OPTIONS") {
    return res.status(204).send("");
  }
  next();
});

// ✅ Route chính xử lý proxy
app.get("/", async (req, res) => {
  const url = req.query.url;
  if (!url) return res.status(400).send("⚠️ Missing ?url parameter");

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Referer": "https://www.firefox.fun/",
        "Origin": "https://www.firefox.fun"
      }
    });

    const text = await response.text();
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(text);
  } catch (err) {
    res.status(500).send("💥 Proxy error: " + err.message);
  }
});

// ✅ Trang mặc định khi truy cập root domain
app.get("*", (req, res) => {
  res.send("✅ Render Proxy đang hoạt động! Dùng cú pháp ?url=...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Proxy Render chạy tại cổng ${PORT}`));

