document.getElementById("btn").addEventListener("click", convert);

function convert() {
  let original = document.getElementById("input").value;
  let text = original;

  if (!text) {
    document.getElementById("output").innerText = "請輸入文字也";
    return;
  }

  // ✅ ① 刪語氣詞
  text = text.replace(/[嗎呢啦啊喔欸吧]/g, "");

  // 👉 刪句尾「了」
  text = text.replace(/了$/, "");

  // ✅ ② 字典（用 replace + regex，穩）
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

  dict.forEach(pair => {
    let key = pair[0];
    let value = pair[1];
    let reg = new RegExp(key, "g");
    text = text.replace(reg, value);
  });

  // ✅ ③ 簡單優化
  text = text.replace(/甚(.*?)的/g, "甚$1");
  text = text.replace(/\s+/g, "");

  // ✅ ④ 語氣詞
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

function typeEffect(text) {
  let output = document.getElementById("output");
  output.innerText = "";
  let i = 0;

  let timer = setInterval(() => {
    output.innerText += text.charAt(i);
    i++;
    if (i >= text.length) clearInterval(timer);
  }, 40);
}
