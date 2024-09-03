/*Slider*/

let index = 0;

        function showSlide(i) {
            const slides = document.querySelector('.slides');
            const totalSlides = document.querySelectorAll('.slide').length;
            index = (i + totalSlides) % totalSlides;
            slides.style.transform = `translateX(-${index * 100}%)`;
        }

        function nextSlide() {
            showSlide(index + 1);
        }

        function prevSlide() {
            showSlide(index - 1);
        }

        // Automatic slide change every 5 seconds
        setInterval(nextSlide, 5000);
  
