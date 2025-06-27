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

});