function convert() {
  let text = document.getElementById("input").value;

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
    "來": "來",
    "今天": "今日",
    "明天": "明日",
    "不": "不",
    "沒有": "無"
  };

  // 字典替換
  for (let key in dict) {
    text = text.replaceAll(key, dict[key]);
  }

  // 簡單句型調整（很 + 形容詞 → 甚 + 形容詞）
  text = text.replace(/甚(.*?)的/g, "甚$1");

  // 加語氣詞
  const endings = ["也", "矣", "焉"];
  let ending = endings[Math.floor(Math.random() * endings.length)];

  text += ending;

  typeEffect(text);
}

// 打字動畫
function typeEffect(text) {
  let output = document.getElementById("output");
  output.innerText = "";
  let i = 0;

  let timer = setInterval(() => {
    output.innerText += text[i];
    i++;
    if (i >= text.length) clearInterval(timer);
  }, 50);
}
