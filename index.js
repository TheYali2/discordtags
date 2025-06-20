import express from 'express';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 3000;

// טוען את קובץ התגים
const tagsData = JSON.parse(fs.readFileSync('tags.json', 'utf8'));

// מחזיר את כל התגים (כל האובייקטים)
app.get('/api/tags', (req, res) => {
  res.json(tagsData);
});

// חיפוש לפי טקסט בתוך השדה "tag"
app.get('/api/tags/search', (req, res) => {
  const q = req.query.q?.toLowerCase() || '';
  const results = tagsData.filter(entry =>
    entry.tag.toLowerCase().includes(q)
  );
  res.json(results);
});
