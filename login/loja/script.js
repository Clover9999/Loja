let currentSlide = 0;

function moveSlide(n) {
  const slides = document.querySelectorAll('.carousel-item');
  currentSlide = (currentSlide + n + slides.length) % slides.length;
  document.querySelector('.carousel-inner').style.transform = `translateX(-${currentSlide * 100}%)`;
}

function closePopup() {
    document.getElementById("whatsappPopup").style.display = "none";
  }
  