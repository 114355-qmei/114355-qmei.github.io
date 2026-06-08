console.log("JS 已載入成功");

let title = document.getElementById("title");
let sound = document.getElementById("clickSound");

let count = 0;
let canMove = false;
let freeze = false;
let isBroken = false;

/* 延遲 */
function getDelay() {
    if (count <= 3) return 1000;
    if (count === 4) return 800;
    if (count === 5) return 600;
    if (count === 6) return 400;
    if (count === 7) return 300;
    return 200;
}

function pauseMove() {
    canMove = false;
    setTimeout(() => {
        canMove = true;
    }, getDelay());
}

/* 移動 */
function move(btn) {
    let x = Math.random() * (window.innerWidth - 150);
    let y = Math.random() * (window.innerHeight - 100);
    btn.style.left = x + "px";
    btn.style.top = y + "px";
}

/* 點擊邏輯 */
function handleClick(e) {
    let btn = e.target;

    count++;

    sound.currentTime = 0;
    sound.play();

    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 300);

    if (count >= 3 && !freeze) pauseMove();

    if (count === 1) {
        title.innerText = "欸？不是說不要點嗎 😑";
    }
    else if (count === 2) {
        title.innerText = "你很故意欸 🤨";
        move(btn);
    }
    else if (count === 3) {
        title.innerText = "我開始躲了，但還會讓你 😏";
        move(btn);
    }
    else if (count === 4) {
        title.innerText = "機會變少囉 👀";
        move(btn);
    }
    else if (count === 5) {
        title.innerText = "你是不是快不行了 🤡";
        document.body.style.background = "#3a1c1c";
        move(btn);
    }
    else if (count === 6) {
        title.innerText = "難度↑ 😈";
        btn.style.transform = "scale(1.3)";
        move(btn);
    }
    else if (count === 7) {
        title.innerText = "最後機會 ⚠️";
        move(btn);
    }
    else if (count === 8) {
        title.innerText = "好，你完了 😈";
        document.body.style.background = "black";
        move(btn);
    }
    else if (count >= 9) {
        title.innerText = "停不下來了吧 😂";

        freeze = true; // 不再躲

        let newBtn = btn.cloneNode(true);
        newBtn.addEventListener("click", handleClick);

        document.body.appendChild(newBtn);
        move(newBtn);

        // ✅ 檢查是否達到 32 顆
        let totalBtns = document.querySelectorAll("button").length;
        if (totalBtns >= 32 && !isBroken) {
            breakGame();
        }
    }
}

/* 崩壞模式 💀 */
function breakGame() {
    isBroken = true;

    title.innerText = "系統錯誤…正在崩壞…";

    // 畫面旋轉抖動
    setInterval(() => {
        document.body.style.transform =
            "rotate(" + (Math.random() * 10 - 5) + "deg) scale(" + (1 + Math.random() * 0.2) + ")";
    }, 100);

    // 背景閃爍
    setInterval(() => {
        document.body.style.background =
            Math.random() > 0.5 ? "black" : "red";
    }, 80);

    // 按鈕亂飛
    let buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
        setInterval(() => {
            let x = Math.random() * window.innerWidth;
            let y = Math.random() * window.innerHeight;
            btn.style.left = x + "px";
            btn.style.top = y + "px";
        }, 200);
    });

    // 最終文字
    setTimeout(() => {
        title.innerText = "你把網站玩壞了 💀";
    }, 3000);
}

/* 初始按鈕 */
let firstBtn = document.getElementById("btn");
firstBtn.addEventListener("click", handleClick);
move(firstBtn);

/* 滑鼠靠近 */
document.addEventListener("mousemove", (e) => {
    if (!canMove || count < 3 || freeze) return;

    let buttons = document.querySelectorAll("button");

    buttons.forEach(btn => {
        let rect = btn.getBoundingClientRect();
        let dx = e.clientX - (rect.left + rect.width / 2);
        let dy = e.clientY - (rect.top + rect.height / 2);
        let dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
            move(btn);
        }
    });
});
