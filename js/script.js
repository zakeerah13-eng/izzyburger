// Izzy Burger JS - Part 3 Requirements

    document.addEventListener('DOMContentLoaded', function() {

// 1. Mobile menu toggle - for phones
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
        if (menuToggle) {
    menuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('show');
    });
    }

// 2. Add to cart counter
    let cartCount = 0;
    const cartCountSpan = document.getElementById('cart-count');
    document.querySelectorAll('.add-cart').forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
        if (cartCountSpan) cartCountSpan.textContent = cartCount;
            alert(this.dataset.name + ' added to cart! 🍔');
    });
    });

// 3. Newsletter form validation - stops bad emails
    const newsletterForm = document.getElementById('newsletter-form');
        if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        let email = document.getElementById('newsletter-email').value;
        let error = document.getElementById('email-error');
        let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        e.preventDefault();
        error.style.display = 'block';
        } else {
        error.style.display = 'none';
        }
    });
    }

 // 4. Contact form response - no Tomcat needed
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
    alert('Thank you! Your enquiry has been sent. We will contact you soon.');
        this.reset();
    });
    }
    })