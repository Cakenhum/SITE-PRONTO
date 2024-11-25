let slideIndex = 0;

function moveSlide(step) {
    const slides = document.querySelectorAll('.carousel-image');
    slideIndex += step;

    if (slideIndex < 0) slideIndex = slides.length - 1;
    if (slideIndex >= slides.length) slideIndex = 0;

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = `translateX(-${slideIndex * 100}%)`;
    }
}
