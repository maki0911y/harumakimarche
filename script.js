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

    // tsParticlesの初期化
    tsParticles.load("tsparticles", {
        fullScreen: {
            enable: false, // 全画面表示はCSSで制御
        },
        particles: {
            number: {
                value: 30, // 少なめの粒子数
            },
            color: {
                value: ["#FFD1DC", "#A9E4D7", "#FFFACD", "#FFB6C1"], // パステルカラー
            },
            shape: {
                type: ["circle", "triangle", "star"], // 丸、三角、星
            },
            opacity: {
                value: 0.6,
                random: true,
            },
            size: {
                value: 5,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false,
                },
            },
            links: {
                enable: false, // 線は表示しない
            },
            move: {
                enable: true,
                speed: 0.5, // ゆっくり動く
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                },
            },
        },
        interactivity: {
            detectsOn: "canvas",
            events: {
                onHover: {
                    enable: false, // ホバー時のインタラクションなし
                },
                onClick: {
                    enable: false, // クリック時のインタラクションなし
                },
                resize: true,
            },
        },
        detectRetina: true,
    });

});