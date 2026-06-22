// Izzy Burger - All Pages JS
    document.addEventListener('DOMContentLoaded', function() {

// 1. Mobile menu toggle - safe for all pages
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('show');
    });
    }

// 2. Cart setup - works on ordernow.html + menu.html + shows on all pages
    let cart = JSON.parse(localStorage.getItem('izzyCart')) || [];
    const cartIndicator = document.querySelector('.cart');

// Update cart count on page load for ALL pages
    function updateCartCount() {
        if (cartIndicator) {
        cartIndicator.textContent = `Cart: ${cart.length}`;
    }
    }
    updateCartCount();

// Add to cart buttons
    const addButtons = document.querySelectorAll('.btn-add');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
    const productCard = this.closest('.product-card');
        if (!productCard) return;

    const name = productCard.querySelector('h3').textContent;
    const priceText = productCard.querySelector('.price').textContent;
    const price = parseInt(priceText.replace('R', ''));

    cart.push({ name, price });
    localStorage.setItem('izzyCart', JSON.stringify(cart));

    updateCartCount();

// Button feedback
    const originalText = this.textContent;
    this.textContent = 'Added!';
    this.disabled = true;
    setTimeout(() => {
    this.textContent = originalText;
    this.disabled = false;
    }, 1000);
    });
    });

// 3. Newsletter form validation
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        let email = document.getElementById('newsletter-email').value;
        let error = document.getElementById('email-error');
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        e.preventDefault();
    if (error) error.style.display = 'block';
    } else {
    if (error) error.style.display = 'none';
    }
    });
    }

// 4. Contact form response
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you! Your enquiry has been sent. We will contact you soon.');
    this.reset();
    });
    }

// 5. Checkout functionality - Order Now page only
    const checkoutBtn = document.getElementById('checkout-btn');
    const cartModal = document.getElementById('cart-modal');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalDiv = document.getElementById('cart-total');
    const closeModalBtn = document.getElementById('close-modal');

// Show checkout modal
    if (checkoutBtn && cartModal) {
    checkoutBtn.addEventListener('click', function() {
        displayCart();
    cartModal.style.display = 'block';
    });
    }

// Close modal
    if (closeModalBtn && cartModal) {
        closeModalBtn.addEventListener('click', function() {
        cartModal.style.display = 'none';
    });
    }

// Display cart items + total
    function displayCart() {
    if (!cartItemsDiv || !cartTotalDiv) return;

    cartItemsDiv.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty</p>';
    cartTotalDiv.textContent = 'Total: R0';
    return;
    }

    cart.forEach((item, index) => {
    total += item.price;
        cartItemsDiv.innerHTML += `
        <div class="cart-item" style="margin:10px 0; display:flex; justify-content:space-between;">
        <span>${item.name} - R${item.price}</span>
        <button onclick="removeFromCart(${index})" style="cursor:pointer;">Remove</button>
        </div>
    `;
    });

    cartTotalDiv.textContent = `Total: R${total}`;
    }

// Remove item - make it global so onclick works
    window.removeFromCart = function(index) {
    cart.splice(index, 1);
    localStorage.setItem('izzyCart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
    }

// Confirm order button
    const confirmBtn = document.getElementById('confirm-order');
    if (confirmBtn) {
        confirmBtn.addEventListener('click', function() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Order placed! Thank you for ordering with Izzy Burger 🍔');
        cart = [];
    localStorage.removeItem('izzyCart');
        updateCartCount();
    cartModal.style.display = 'none';
    });
    }
    });