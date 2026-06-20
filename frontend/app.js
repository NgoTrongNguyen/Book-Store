// API URL - Thay đổi theo môi trường
const API_URL = 'https://book-store-1-oxap.onrender.com/api';

// ========== NAVIGATION ==========
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.dataset.section;

        // Remove active class from all links and sections
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.section-content').forEach(s => s.classList.remove('active'));

        // Add active class
        link.classList.add('active');
        document.getElementById(`${section}-section`).classList.add('active');

        // Load data if needed
        if (section === 'reviews') {
            loadReviews();
        } else if (section === 'author') {
            loadAuthor();
        }

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// ========== FORM SUBMISSION ==========
document.getElementById('preorderForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect form data
    const formData = {
        name: document.querySelector('input[name="name"]').value,
        email: document.querySelector('input[name="email"]').value,
        phone: document.querySelector('input[name="phone"]').value,
        quantity: document.querySelector('select[name="quantity"]').value,
        address: document.querySelector('input[name="address"]').value,
        city: document.querySelector('input[name="city"]').value,
        zip: document.querySelector('input[name="zip"]').value,
        country: document.querySelector('select[name="country"]').value,
        requests: document.querySelector('textarea[name="requests"]').value,
        updates: document.querySelector('input[name="updates"]').checked
    };

    try {
        const response = await fetch(`${API_URL}/preorder`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit preorder');
        }

        const result = await response.json();

        // Hide form and show success message
        document.getElementById('preorderForm').style.display = 'none';
        document.getElementById('successMessage').style.display = 'flex';

        // Reset form
        setTimeout(() => {
            document.getElementById('preorderForm').reset();
            document.getElementById('preorderForm').style.display = 'block';
            document.getElementById('successMessage').style.display = 'none';
        }, 3000);

    } catch (error) {
        console.error('Error:', error);
        alert('Có lỗi xảy ra. Vui lòng thử lại!');
    }
});

// ========== LOAD REVIEWS ==========
async function loadReviews() {
    const container = document.getElementById('reviews-container');

    try {
        const response = await fetch(`${API_URL}/reviews`);

        if (!response.ok) {
            throw new Error('Failed to fetch reviews');
        }

        const reviews = await response.json();

        if (reviews.length === 0) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #999;">No reviews yet. Be the first to review!</div>';
            return;
        }

        container.innerHTML = reviews.map(review => `
            <div class="review-card">
                <div class="review-rating">
                    ${generateStars(review.rating)}
                </div>
                <div class="review-title">${escapeHtml(review.title)}</div>
                <div class="review-text">${escapeHtml(review.text)}</div>
                <div class="review-author">${escapeHtml(review.author)}</div>
                <div class="review-date">${formatDate(review.date)}</div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading reviews:', error);
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: #999;">Failed to load reviews</div>';
    }
}

// ========== LOAD AUTHOR ==========async function loadAuthor() {
const container = document.getElementById('author-container');

try {
    const response = await fetch(`${API_URL}/authors`);  // ← /authors (plural)

    if (!response.ok) {
        throw new Error('Failed to fetch authors');
    }

    const authors = await response.json();
    console.log('Authors loaded:', authors);  // ← Debug xem có dữ liệu không

    container.innerHTML = authors.map(author => `
            <div class="author-bio">
                ${author.imageUrl ? `
                    <img src="${author.imageUrl}" 
                         alt="${escapeHtml(author.name)}" 
                         class="author-image-photo"
                         loading="lazy"
                         onerror="this.src='https://via.placeholder.com/200?text=No+Image'">
                ` : `
                    <div class="author-image">${author.name.split(' ').map(n => n[0]).join('')}</div>
                `}
                
                <div class="author-info">
                    <h2>${escapeHtml(author.name)}</h2>
                    <div class="author-title">${escapeHtml(author.title)}</div>
                    <div class="author-description">${author.bio}</div>
                    
                    <div class="author-achievements">
                        <h3>Highlights</h3>
                        <ul class="achievement-list">
                            ${author.achievements.map(a => `<li>${escapeHtml(a)}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `).join('<hr class="author-divider">');

} catch (error) {
    console.error('Error loading authors:', error);
    container.innerHTML = '<div style="text-align: center; padding: 3rem; color: #999;">Không thể tải thông tin tác giả</div>';
}


// ========== UTILITY FUNCTIONS ==========

/**
 * Generate star rating HTML
 */
function generateStars(rating) {
    let stars = '';
    for (let i = 0; i < 5; i++) {
        stars += i < rating ? '<span class="star">★</span>' : '<span style="color: #ddd;">★</span>';
    }
    return stars;
}

/**
 * Escape HTML to prevent XSS
 */
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format date
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

// ========== CORS Handling ==========
// Nếu frontend và backend trên khác domain, cần enable CORS ở backend