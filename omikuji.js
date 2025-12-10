function shuffle(array) {
    const newArr = [...array];
    for (let i = newArr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
    }
    return newArr;
}

document.addEventListener("DOMContentLoaded", () => {
    const cardsBox = document.getElementById("cards");
    if (!cardsBox) return;

    const cardImage = "Card8.jpg";
    const results = [
        { text: "大吉"  },
        { text: "中吉"  },
        { text: "小吉" },
        { text: "吉" },
        { text: "末吉" },
        { text: "凶" },
        { text: "大凶" }
    ];
    const shuffledResults = shuffle(results);


    const cards = [];

    // カード生成
    results.forEach(() => {
        const card = document.createElement("img");
        card.src = cardImage;
        card.className = "card";
        card.dataset.scale = 1;      // ← 現在のスケール値を保持
        card.dataset.tx = 0;         // ← X座標
        card.dataset.ty = 0;         // ← Y座標
        cardsBox.appendChild(card);
        cards.push(card);
    });

    // transform を1ヶ所で管理
    function applyTransform(card) {
        const tx = card.dataset.tx;
        const ty = card.dataset.ty;
        const sc = card.dataset.scale;
        card.style.transform = `translate(${tx}px, ${ty}px) scale(${sc})`;
    }

    // ホバー効果（transform を壊さない）
    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            card.dataset.scale = 1.15;
            applyTransform(card);
        });
        card.addEventListener("mouseleave", () => {
            card.dataset.scale = 1;
            applyTransform(card);
        });
    });

    // ───────── シャッフル ─────────
    setTimeout(() => shuffleCards(cards), 300);

    function shuffleCards(cards) {
        let count = 0;
        const maxX = 250, maxY = 150;

        const interval = setInterval(() => {
            cards.forEach(card => {
                card.dataset.tx = Math.random() * maxX * 2 - maxX;
                card.dataset.ty = Math.random() * maxY * 2 - maxY;
                card.dataset.scale = 1;
                applyTransform(card);
            });
            count++;

            if (count >= 10) {
                clearInterval(interval);
                setTimeout(() => arrangeCards(cards), 300);
            }
        }, 300);
    }

    // ───────── 最終整列 ─────────
    function arrangeCards(cards) {
        const spacingPC = 180;
        const spacingMobile = 120;
        const isMobile = window.innerWidth <= 767;

        cards.forEach((card, i) => {
            card.style.transition = "transform 0.6s ease";
            let x = (i - (cards.length - 1) / 2) * spacingPC;
            let y = 0;

            if (isMobile) {
                const col = i % 3;
                const row = Math.floor(i / 3);
                x = (col - 1) * spacingMobile;
                y = row * 150 - 150; 
            }

            card.dataset.tx = x;
            card.dataset.ty = y;
            card.dataset.scale = 1;
            applyTransform(card);

            card.style.pointerEvents = "auto";
        });

        // ───────── クリック（1回だけ登録）─────────
        cards.forEach((card, i) => {
            card.onclick = () => {
                cards.forEach(c => c.style.pointerEvents = "none");
                card.dataset.scale = 2;
                card.style.transition = "transform 0.8s ease";
                applyTransform(card);

                // ← 選んだ結果を保存
                const selected = shuffledResults[i];
                localStorage.setItem("resultText", selected.text);
                localStorage.setItem("resultImg", selected.img);

                setTimeout(() => {
                    location.href = "result.html";
                }, 800);
            };

        });
    }

    
});
