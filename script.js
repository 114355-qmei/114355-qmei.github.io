console.log("JS 已載入成功");

let btn = document.getElementById("btn");
let title = document.getElementById("title");
let sound = document.getElementById("clickSound");

let count = 0;
let canMove = false;

/* 每階段延遲（ms） */
function getDelay() {
    if (count <= 3) return 1000;
    if (count === 4) return 800;
    if (count === 5) return 600;
    if (count === 6) return 400;
    if (count === 7) return 300;
    return 200; // 最低不會變0
}

/* 控制「暫時不逃」 */
function pauseMove() {
    canMove = false;

    let delay = getDelay();

    setTimeout(() => {
        canMove = true;
    }, delay);
}

/* 隨機移動 */
function move() {
    let x = Math.random() * (window.innerWidth - 150);
    let y = Math.random() * (window.innerHeight - 100);
    btn.style.left = x + "px";
    btn.style.top = y + "px";
}

move();

/* 滑鼠靠近才逃 */
document.addEventListener("mousemove", (e) => {
    let rect = btn.getBoundingClientRect();
    let dx = e.clientX - (rect.left + rect.width / 2);
    let dy = e.clientY - (rect.top + rect.height / 2);
    let dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 120 && count >= 3 && canMove) {
        move();
    }
});

/* 點擊 */
btn.addEventListener("click", () => {
    count++;

    sound.currentTime = 0;
    sound.play();

    document.body.classList.add("shake");
    setTimeout(() => {
        document.body.classList.remove("shake");
    }, 300);

    // 👉 每次點擊都給「短暫安全時間」
    if (count >= 3) {
        pauseMove();
    }

    if (count === 1) {
        title.innerText = "欸？不是說不要點嗎 😑";
    }
    else if (count === 2) {
        title.innerText = "你很故意欸 🤨";
        move();
    }
    else if (count === 3) {
        title.innerText = "好，我開始躲，但我還會讓你一下 😏";
        move();
    }
    else if (count === 4) {
        title.innerText = "機會變少了喔 👀";
        move();
    }
    else if (count === 5) {
        title.innerText = "你快點不到了吧 🤡";
        document.body.style.background = "#3a1c1c";
        move();
    }
    else if (count === 6) {
        title.innerText = "開始變難了 😈";
        btn.style.transform = "scale(1.3)";
        move();
    }
    else if (count === 7) {
        title.innerText = "最後機會們 ⚠️";
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
