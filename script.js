console.log("JS 已載入成功");

let btn = document.getElementById("btn");
let title = document.getElementById("title");
let sound = document.getElementById("clickSound");

let count = 0;
let canMove = false; // 控制是否可以開始躲

/* 初始位置 */
function move() {
    let x = Math.random() * (window.innerWidth - 150);
    let y = Math.random() * (window.innerHeight - 100);
    btn.style.left = x + "px";
    btn.style.top = y + "px";
}

move();

/* 滑鼠靠近才逃跑 */
document.addEventListener("mousemove", (e) => {
    let rect = btn.getBoundingClientRect();
    let dx = e.clientX - (rect.left + rect.width / 2);
    let dy = e.clientY - (rect.top + rect.height / 2);
    let dist = Math.sqrt(dx * dx + dy * dy);

    // ✅ 加上 canMove 控制
    if (dist < 120 && count >= 3 && canMove) {
        move();
    }
});

/* 點擊事件 */
btn.addEventListener("click", () => {
    count++;

    sound.currentTime = 0;
    sound.play();

    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 300);

    if (count === 1) {
        title.innerText = "欸？不是說不要點嗎 😑";
    }
    else if (count === 2) {
        title.innerText = "你很故意欸 🤨";
        move();
    }
    else if (count === 3) {
        title.innerText = "好，那我開始躲了（給你1秒 😏）";

        canMove = false; // 先關閉

        // ✅ 延遲1秒再開始躲
        setTimeout(() => {
            canMove = true;
        }, 1000);

        move();
    }
    else if (count === 4) {
        title.innerText = "抓不到吧 😆";
        move();
    }
    else if (count === 5) {
        title.innerText = "你是不是很閒 🤡";
        document.body.style.background = "#3a1c1c";
        move();
    }
    else if (count === 6) {
        title.innerText = "我開始認真了 😡";
        btn.style.transform = "scale(1.3)";
        move();
    }
    else if (count === 7) {
        title.innerText = "最後警告 ⚠️";
        move();
    }
    else if (count === 8) {
        title.innerText = "好，你完了 😈";
        document.body.style.background = "black";
        move();
    }
    else if (count >= 9) {
        title.innerText = "停不下來了吧 😂";

        let newBtn = btn.cloneNode(true);
        newBtn.addEventListener("click", btn.onclick);
        document.body.appendChild(newBtn);

        newBtn.style.left = Math.random() * window.innerWidth + "px";
        newBtn.style.top = Math.random() * window.innerHeight + "px";
    }
});
