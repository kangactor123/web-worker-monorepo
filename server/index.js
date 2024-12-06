const express = require("express");
const app = express();
const port = 8000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello, REST Server!");
});

// 샘플 데이터
let items = [
  { id: 1, name: "Item 1" },
  { id: 2, name: "Item 2" },
];

// 모든 아이템 조회 (GET)
app.get("/api/items", (req, res) => {
  res.json(items);
});

// 서버 실행
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
