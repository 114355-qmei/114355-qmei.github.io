let btn = document.getElementById("btn");
let title = document.getElementById("title");
let sound = document.getElementById("clickSound");

let count = 0;

/* 隨機移動 */
function move(btnElement) {
    let x = Math.random() * (window.innerWidth - 150);
    let y = Math.random() * (window.innerHeight - 80);
    btnElement.style.left = x + "px";
    btnElement.style.top = y + "px";
}

/* 滑鼠靠近逃跑 */
document.addEventListener("mousemove", (e) => {
    let rect = btn.getBoundingClientRect();
    let dx = e.clientX - (rect.left + rect.width/2);
    let dy = e.clientY - (rect.top + rect.height/2);
    let dist = Math.sqrt(dx*dx + dy*dy);

    if (dist < 120 && count >= 3) {
        move(btn);
    }
});

/* 點擊事件 */
btn.addEventListener("click", () => {
    count++;
    sound.currentTime = 0;
    sound.play();

    document.body.classList.add("shake");
    setTimeout(()=>document.body.classList.remove("shake"),400);

    if (count === 1) {
        title.innerText = "欸…不是說不要點嗎 😑";
    }
    else if (count === 2) {
        title.innerText = "你很故意欸 🤨";
    }
    else if (count === 3) {
        title.innerText = "好，那我開始躲了";
        move(btn);
    }
    else if (count === 4) {
        title.innerText = "抓不到吧 😏";
    }
    else if (count === 5) {
        title.innerText = "你是不是太閒 🤡";
        document.body.style.background = "#3a1c1c";
    }
    else if (count === 6) {
        title.innerText = "我開始不爽了 😡";
        btn.style.transform = "scale(1.4)";
    }
    else if (count === 7) {
        title.innerText = "最後警告 ⚠️";
    }
    else if (count === 8) {
        title.innerText = "好，你自己選的";
        title.classList.add("glitch");
    }
    else if (count === 9) {
        title.innerText = "😈😈😈";
        btn.innerText = "還點？";
    }
    else if (count >= 10) {
        title.innerText = "停不下來了吧 😏";

        let newBtn = btn.cloneNode(true);
        newBtn.onclick = btn.onclick;
        move(newBtn);
        document.body.appendChild(newBtn);
    }
});

/* 初始位置 */
move(btn);
