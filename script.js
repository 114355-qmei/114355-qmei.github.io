function convert() {
  let text = document.getElementById("input").value;

  // ✅ ① 清除白話語氣詞
  const particles = ["嗎", "呢", "啦", "啊", "喔", "欸", "吧"];
  particles.forEach(p => {
    text = text.replaceAll(p, "");
  });

  // ✅ ② 字典翻譯
  const dict = {
    "我": "吾",
    "你": "汝",
    "他": "其",
    "很": "甚",
    "非常": "極",
    "喜歡": "喜",
    "討厭": "惡",
    "吃": "食",
    "喝": "飲",
    "去": "往",
    "今天": "今日",
    "明天": "明日",
    "沒有": "無",
    "真的": "誠",
    "可以": "可"
  };

  for (let key in dict) {
    text = text.replaceAll(key, dict[key]);
  }

  // ✅ ③ 簡單句型優化
  text = text.replace(/甚(.*?)的/g, "甚$1");

  // （可選）移除多餘空格
  text = text.replace(/\s+/g, "");

  // ✅ ④ 加文言語氣詞（判斷句型）
  const questionWords = ["何", "安", "誰", "孰", "豈"];

  let ending = "也"; // 預設

  // 如果原句有問句語氣（例如有「？」或「嗎」）
  if (document.getElementById("input").value.includes("嗎") ||
      document.getElementById("input").value.includes("？")) {
    ending = "乎";
  } else {
    const endings = ["也", "矣", "焉"];
    ending = endings[Math.floor(Math.random() * endings.length)];
  }

  text += ending;

  // ✅ ⑤ 打字動畫
  typeEffect(text);
}
