document.addEventListener("DOMContentLoaded", () => {

    const text = localStorage.getItem("resultText");
    const img  = localStorage.getItem("resultImg");

    if (!text || !img) {
        location.href = "index.html";
        return;
    }

    const messages = {
        "大吉": "最高の運気です！新しい挑戦は吉。周りの人にも笑顔を届けましょう。",
        "中吉": "運気上昇中。焦らず、丁寧に行動すれば良い成果に繋がります。",
        "小吉": "小さな幸運が訪れる予感。日常の小さな出来事に感謝してみましょう。",
        "吉":   "穏やかに過ごせる一日。ゆったりとした気持ちで過ごすことで運気も安定します。",
        "末吉": "焦らずに進めば吉。少しの工夫が大きな成果につながります!",
        "凶":   "慎重に行動すれば災いを避けられます。今日の学びを明日へ活かしましょう!",
        "大凶": "注意の必要な日です!無理せず、自分を大切にして一歩ずつ進みましょう。"
    };

    const message = messages[text] || "";

    const bigFortune = document.getElementById("big-fortune");
    const normalFortune = document.getElementById("normal-fortune");
    const resultImg = document.getElementById("result-img");
    const messageElement = document.getElementById("message");

    // 表示内容セット
    bigFortune.textContent = text;
    normalFortune.textContent = text;

    const DISPLAY_DURATION = 2000; // 結果ドーン表示時間

    // 結果文字を一定時間表示 → 通常サイズに切り替え → コメント表示
    setTimeout(() => {
        bigFortune.style.display = 'none';
        normalFortune.style.display = 'block';

        // コメント表示
        messageElement.classList.add('show');
        messageElement.textContent = message;

    }, DISPLAY_DURATION);

});

