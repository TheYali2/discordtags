import express from 'express';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

console.log("📦 Starting server...");

let tagsData = [];
try {
  tagsData = JSON.parse(fs.readFileSync('tags.json', 'utf8'));
  console.log(`✅ Loaded ${tagsData.length} tags from tags.json`);
} catch (err) {
  console.error("❌ Failed to load tags.json:", err.message);
}

// API שמחזיר את כל האובייקטים
app.get('/api/tags', (req, res) => {
  res.json(tagsData);
});

// API שמחזיר אובייקטים לפי חיפוש בתג
app.get('/api/tags/search', (req, res) => {
  const q = req.query.q?.toLowerCase().trim();
  if (!q) {
    return res.json([]);
  }
  const results = tagsData.filter(entry =>
    entry.name?.toLowerCase().includes(q)
  );
  res.json(results);
});



// רק שמוודא שהשרת אכן רץ
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

// טיפול בשגיאות לא צפויות
process.on('uncaughtException', err => {
  console.error('💥 Uncaught Exception:', err);
});
