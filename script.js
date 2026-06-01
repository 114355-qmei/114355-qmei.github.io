function convert() {
  let original = document.getElementById("input").value;
  let text = original;

  // ✅ ① 刪除語氣詞
  text = text.replace(/[嗎呢啦啊喔欸吧]/g, "");

  // 👉 刪句尾「了」
  text = text.replace(/了$/g, "");

  // ✅ ② 字典（順序很重要）
  const dict = [
    ["非常", "極"],
    ["喜歡", "喜"],
    ["討厭", "惡"],
    ["可以", "可"],
    ["真的", "誠"],
    ["沒有", "無"],
    ["今天", "今日"],
    ["明天", "明日"],
    ["我", "吾"],
    ["你", "汝"],
    ["他", "其"],
    ["很", "甚"],
    ["吃", "食"],
    ["喝", "飲"],
    ["去", "往"]
  ];

  dict.forEach(([key, value]) => {
    text = text.replaceAll(key, value);
  });

  // ✅ ③ 簡單句型優化
  text = text.replace(/甚(.*?)的/g, "甚$1");

  // 去空格
  text = text.replace(/\s+/g, "");

  // ✅ ④ 判斷語氣
  let ending = "也";

  if (original.includes("嗎") || original.includes("？")) {
    ending = "乎";
  } else {
    const endings = ["也", "矣", "焉"];
    ending = endings[Math.floor(Math.random() * endings.length)];
  }

  text += ending;

  // ✅ ⑤ 打字動畫
  typeEffect(text);
}

// 🔥 打字動畫
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
