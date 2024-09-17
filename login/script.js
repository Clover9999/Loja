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
  

// App de Avaliações      

const stars = document.querySelectorAll('.star');
let rating = 0;
let reviews = JSON.parse(localStorage.getItem('reviews')) || []; // Recupera avaliações salvas
const reviewsSection = document.getElementById('reviewsSection');
const showMoreBtn = document.getElementById('showMoreBtn');
const showLessBtn = document.getElementById('showLessBtn');
let reviewsToShow = 5;

// Captura a avaliação por estrelas
stars.forEach(star => {
  star.addEventListener('click', () => {
    rating = star.getAttribute('data-value');
    resetStars();
    highlightStars(rating);
  });
});

function resetStars() {
  stars.forEach(star => {
    star.classList.remove('selected');
  });
}

function highlightStars(rating) {
  for (let i = 0; i < rating; i++) {
    stars[i].classList.add('selected');
  }
}

// Função para pré-visualizar imagem
document.getElementById('imageUpload').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const preview = document.getElementById('imagePreview');
      preview.innerHTML = `<img src="${e.target.result}" alt="Imagem Carregada">`;
    };
    reader.readAsDataURL(file);
  }
});

// Submissão do formulário
document.getElementById('reviewForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const comment = document.getElementById('comment').value || "Sem comentário.";  // Comentário padrão se não preenchido
  let image = document.getElementById('imageUpload').files[0] ? URL.createObjectURL(document.getElementById('imageUpload').files[0]) : '';

  if (rating > 0 && name.trim() !== "") {  // Verifica se o nome e a avaliação estão presentes
    const review = { name, comment, rating, image };
    reviews.push(review);  // Adiciona a nova avaliação
    localStorage.setItem('reviews', JSON.stringify(reviews));  // Salva avaliações
    document.getElementById('feedback').innerHTML = `<p>Obrigado, <strong>${name}</strong>! Sua avaliação foi salva.</p>`;
    resetForm();
    displayReviews();  // Atualiza a exibição das avaliações
  } else {
    document.getElementById('feedback').innerText = 'Por favor, insira seu nome e selecione uma avaliação por estrelas.';
  }
});

function resetForm() {
  document.getElementById('reviewForm').reset();
  resetStars();
  document.getElementById('imagePreview').innerHTML = '';
  rating = 0;
}

// Função para exibir as avaliações
function displayReviews() {
  reviewsSection.innerHTML = '';
  let reviewsToDisplay = reviews.slice(0, reviewsToShow);  // Mostra apenas a quantidade definida de avaliações

  reviewsToDisplay.forEach((review, index) => {
    const reviewElement = document.createElement('div');
    reviewElement.classList.add('review');
    reviewElement.innerHTML = `
      <h4>${review.name} - ${'★'.repeat(review.rating)}</h4>
      <p>${review.comment}</p>
      ${review.image ? `<img src="${review.image}" alt="Imagem">` : ''}
    `;
    reviewsSection.appendChild(reviewElement);
  });

  toggleShowMoreBtn();
}

// Controla a exibição do botão "Mostrar Mais" ou "Mostrar Menos"
function toggleShowMoreBtn() {
  if (reviews.length > 5) {
    showMoreBtn.style.display = reviewsToShow < reviews.length ? 'block' : 'none';
    showLessBtn.style.display = reviewsToShow > 5 ? 'block' : 'none';
  } else {
    showMoreBtn.style.display = 'none';
    showLessBtn.style.display = 'none';
  }
}

// Aumenta o número de avaliações exibidas ao clicar em "Mostrar Mais"
showMoreBtn.addEventListener('click', () => {
  reviewsToShow += 5;
  displayReviews();
});

// Reduz o número de avaliações exibidas ao clicar em "Mostrar Menos"
showLessBtn.addEventListener('click', () => {
  reviewsToShow = 5;
  displayReviews();
});

// Carrega as avaliações ao iniciar a página
window.onload = displayReviews;
