// script.js

async function fetchAndPopulateProducts() {
    try {
        const response = await fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json');
        const data = await response.json();
        const productContainer = document.getElementById('product-container');


        data.categories.forEach(category => {
            category.category_products.forEach(product => {
                const card = document.createElement('div');
                card.classList.add('product-card');
                card.setAttribute('data-category', category.category_name);

                // Construct product card HTML
                card.innerHTML = `
                    <div class="imageContainer">
                        <img src="${product.image}" alt="${product.title}">
                    </div>
                    <div class="product-info">
                        
                        ${product.badge_text ? `<span class="badge">${product.badge_text}</span>` : ''}
                        <div class="prod-descri1">
                        <h3 class="title">${product.title}</h3>
                        <div class=circleSeperator></div>
                        <p class="vendor "> ${product.vendor}</p>
                        </div>
                        <div class="prod-descri2">
                        <p class="price">Rs. ${product.price}.00</p>
                        <p class="compare-price"> ${product.compare_at_price}.00</p>
                        <p class="discount"> ${calculateDiscount(product.price, product.compare_at_price)}% Off</p>
                        </div>
                        <button class="add-to-cart-btn">Add to Cart</button>
                    </div>
                `;

                productContainer.appendChild(card);
            });
        });
        hideCategory('Women');
        hideCategory('Kids');
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}
function hideCategory(categoryName) {
    const productCards = document.querySelectorAll(`.product-card[data-category="${categoryName}"]`);
    productCards.forEach(card => {
        card.style.display = 'none';
    });
}

function showTab(category) {
    // Hide all product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.display = 'none';
    });

    // Show product cards of the selected category
    const selectedCards = document.querySelectorAll(`.product-card[data-category="${category}"]`);
    selectedCards.forEach(card => {
        card.style.display = 'block';
    });

    // Toggle active class for tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`${category.toLowerCase()}-tab`).classList.add('active');
}

function calculateDiscount(price, compareAtPrice) {
    const discount = ((compareAtPrice - price) / compareAtPrice) * 100;
    return Math.round(discount);
}

// Fetch and populate products when the page loads
//window.onload = fetchAndPopulateProducts;
window.onload = function() {
    fetchAndPopulateProducts();
    showTab('Men');
}
