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

document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('#starRating .star');
  const reviewForm = document.getElementById('reviewForm');
  const reviewsSection = document.getElementById('reviewsSection');
  const averageRatingSpan = document.getElementById('averageRating');
  const imageUpload = document.getElementById('imageUpload');
  const imagePreview = document.getElementById('imagePreview');
  let selectedRating = 0;
  let selectedImage = null;
  const deletePassword = "Antoni2004"; // Definindo a senha para exclusão

  // Carrega as avaliações do LocalStorage
  let reviews = JSON.parse(localStorage.getItem('reviews')) || [];

  // Função para selecionar estrelas
  stars.forEach(star => {
    star.addEventListener('click', () => {
      selectedRating = star.getAttribute('data-value');
      stars.forEach(s => s.classList.remove('selected'));
      star.classList.add('selected');
      for (let i = 0; i < selectedRating; i++) {
        stars[i].classList.add('selected');
      }
    });
  });

  // Função para pré-visualizar a imagem antes do envio
  imageUpload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagePreview.innerHTML = `<img src="${e.target.result}" alt="Imagem da Avaliação">`;
        selectedImage = e.target.result; // Armazena a imagem em base64
      };
      reader.readAsDataURL(file);
    }
  });

  // Função para envio de avaliação
  reviewForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;

    if (selectedRating === 0) {
      alert('Por favor, selecione uma avaliação.');
      return;
    }

    const newReview = {
      id: Date.now(), // ID único para cada avaliação
      name,
      rating: parseInt(selectedRating),
      comment,
      image: selectedImage // Adiciona a imagem à avaliação
    };

    reviews.push(newReview);
    localStorage.setItem('reviews', JSON.stringify(reviews)); // Salva no LocalStorage
    displayReviews();
    updateAverageRating();
    reviewForm.reset();
    imagePreview.innerHTML = ''; // Limpa a pré-visualização
    selectedImage = null;
    stars.forEach(star => star.classList.remove('selected'));
    selectedRating = 0;
  });

  // Função para exibir as avaliações
  function displayReviews() {
    reviewsSection.innerHTML = '';
    reviews.forEach(review => {
      const reviewDiv = document.createElement('div');
      reviewDiv.classList.add('review');
      reviewDiv.innerHTML = `
        <h4>${review.name}</h4>
        <div class="stars-review">
          ${'&#9733;'.repeat(review.rating)}
          ${'&#9734;'.repeat(5 - review.rating)}
        </div>
        <p>${review.comment}</p>
        ${review.image ? `<img src="${review.image}" alt="Imagem da Avaliação">` : ''}
        <button class="delete-btn" data-id="${review.id}">Excluir</button>
      `;
      reviewsSection.appendChild(reviewDiv);
    });

    // Adiciona evento para o botão de exclusão
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function () {
        const reviewId = this.getAttribute('data-id');
        const enteredPassword = prompt('Digite a senha para excluir o comentário:');
        
        if (enteredPassword === deletePassword) {
          deleteReview(reviewId);
        } else {
          alert('Senha incorreta! Não foi possível excluir o comentário.');
        }
      });
    });
  }

  // Função para excluir uma avaliação
  function deleteReview(id) {
    reviews = reviews.filter(review => review.id != id);
    localStorage.setItem('reviews', JSON.stringify(reviews));
    displayReviews();
    updateAverageRating();
  }

  // Função para atualizar a média das avaliações
  function updateAverageRating() {
    if (reviews.length === 0) {
      averageRatingSpan.textContent = '0.0';
      return;
    }
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(1);
    averageRatingSpan.textContent = averageRating;
  }

  // Carrega as avaliações salvas na inicialização
  displayReviews();
  updateAverageRating();
});
