// script.js

document.addEventListener("DOMContentLoaded", () => {

    // --- Fade-in Animation on Scroll ---
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeInSections.forEach(section => {
        observer.observe(section);
    });

    // --- CTA Button Click ---
    const ctaButton = document.getElementById('cta-reserve');
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('来場予約ありがとうございます！\n（実際のサイトでは予約フォームに移動します）');
            // Example: window.location.href = 'reservation-form.html';
        });
    }

    // チェックボックスのカスタムスタイル
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const customCheckbox = this.nextElementSibling;
            const checkmark = customCheckbox.querySelector('div');
            if (this.checked) {
                checkmark.classList.remove('hidden');
            } else {
                checkmark.classList.add('hidden');
            }
        });
    });

    // BGMの再生/停止
    const bgm = document.getElementById('bgm');
    const bgmToggle = document.getElementById('bgm-toggle');
    const bgmIcon = bgmToggle.querySelector('i');

    // ユーザーがページを操作した後にBGMを再生する（ブラウザの自動再生ポリシー対策）
    document.addEventListener('click', function initialPlay() {
        if (bgm.paused) {
            bgm.play().then(() => {
                bgm.muted = false; // 自動再生が許可されたらミュート解除
                bgmIcon.classList.remove('ri-volume-mute-line');
                bgmIcon.classList.add('ri-volume-up-line');
            }).catch(error => {
                console.log('BGM autoplay prevented:', error);
                // 自動再生がブロックされた場合は、ミュートアイコンを表示
                bgm.muted = true;
                bgmIcon.classList.remove('ri-volume-up-line');
                bgmIcon.classList.add('ri-volume-mute-line');
            });
        }
        document.removeEventListener('click', initialPlay);
    });

    bgmToggle.addEventListener('click', () => {
        if (bgm.paused) {
            bgm.play();
            bgm.muted = false;
            bgmIcon.classList.remove('ri-volume-mute-line');
            bgmIcon.classList.add('ri-volume-up-line');
        } else {
            bgm.pause();
            bgm.muted = true;
            bgmIcon.classList.remove('ri-volume-up-line');
            bgmIcon.classList.add('ri-volume-mute-line');
        }
    });


    // --- Shop Modal ---
    const modal = document.getElementById('shop-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalImage = document.getElementById('modal-image');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.getElementById('modal-close');
    const shopItems = document.querySelectorAll('.shop-item');

    shopItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.dataset.title;
            const image = item.dataset.image;
            const description = item.dataset.description;

            modalTitle.textContent = title;
            modalImage.src = image;
            modalDescription.textContent = description;

            modal.classList.remove('hidden');
            modal.classList.add('flex');
            document.body.classList.add('modal-open');
        });
    });

    const closeModal = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.classList.remove('modal-open');
    }

    modalClose.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // --- Fortune Cookie Game ---
    const fortuneCookie = document.getElementById('fortune-cookie');
    const fortuneModal = document.getElementById('fortune-modal');
    const fortuneMessage = document.getElementById('fortune-message');
    const fortuneModalClose = document.getElementById('fortune-modal-close');

    const fortunes = [
        "今日は新しいことに挑戦するのに最適な日！",
        "思わぬ人から嬉しい連絡があるかも。",
        "ちょっとした休憩が、大きなひらめきに繋がりそう。",
        "笑顔を心がけると、幸運が舞い込んでくるでしょう。",
        "美味しいものを食べると、エネルギーが満ち溢れます。",
        "探していたものが見つかる予感。",
        "周りの人に親切にすると、良いことがありそう。",
        "小さな成功体験が、自信に繋がる一日。"
    ];

    fortuneCookie.addEventListener('click', () => {
        alert('クッキーがクリックされました！'); // デバッグ用アラート
        const randomIndex = Math.floor(Math.random() * fortunes.length);
        fortuneMessage.textContent = fortunes[randomIndex];
        fortuneModal.classList.remove('hidden');
        fortuneModal.classList.add('flex');
        document.body.classList.add('modal-open');
    });

    const closeFortuneModal = () => {
        fortuneModal.classList.add('hidden');
        fortuneModal.classList.remove('flex');
        document.body.classList.remove('modal-open');
    }

    fortuneModalClose.addEventListener('click', closeFortuneModal);

    fortuneModal.addEventListener('click', (e) => {
        if (e.target === fortuneModal) {
            closeFortuneModal();
        }
    });
});