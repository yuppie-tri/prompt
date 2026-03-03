// YUP Website JavaScript
// Mobile Navigation, Search, and Filter Functionality

document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // Mobile Navigation Toggle
    // ===============================================
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && 
                !mobileMenuToggle.contains(event.target) &&
                navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }

    // ===============================================
    // Prompt Search and Filter Functionality
    // ===============================================
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const promptCards = document.querySelectorAll('.prompt-card');
    const noResults = document.getElementById('noResults');
    
    let currentCategory = 'all';
    let currentSearchTerm = '';

    // Filter by Category
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get selected category
                currentCategory = this.getAttribute('data-category');
                
                // Apply filter
                filterPrompts();
            });
        });
    }

    // Search Function
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', performSearch);
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });

        // Real-time search as user types
        searchInput.addEventListener('input', function() {
            currentSearchTerm = this.value.toLowerCase().trim();
            filterPrompts();
        });
    }

    function performSearch() {
        if (searchInput) {
            currentSearchTerm = searchInput.value.toLowerCase().trim();
            filterPrompts();
        }
    }

    function filterPrompts() {
        let visibleCount = 0;

        promptCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const title = card.querySelector('h3').textContent.toLowerCase();
            const text = card.querySelector('.prompt-text').textContent.toLowerCase();
            const categoryText = card.querySelector('.prompt-category').textContent.toLowerCase();
            
            // Check category filter
            const categoryMatch = currentCategory === 'all' || category === currentCategory;
            
            // Check search term
            const searchMatch = currentSearchTerm === '' || 
                                title.includes(currentSearchTerm) || 
                                text.includes(currentSearchTerm) ||
                                categoryText.includes(currentSearchTerm);
            
            // Show or hide card
            if (categoryMatch && searchMatch) {
                card.style.display = 'block';
                // Add fade-in animation
                card.style.animation = 'fadeIn 0.5s ease-out';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Show/hide no results message
        if (noResults) {
            if (visibleCount === 0) {
                noResults.style.display = 'block';
            } else {
                noResults.style.display = 'none';
            }
        }

        // Scroll to prompts section after filter
        if (currentSearchTerm !== '' || currentCategory !== 'all') {
            const promptsSection = document.querySelector('.prompts-grid');
            if (promptsSection && window.innerWidth <= 768) {
                promptsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
    }

    // ===============================================
    // Smooth Scroll for Anchor Links
    // ===============================================
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // ===============================================
    // Scroll to Top on Page Load
    // ===============================================
    window.scrollTo(0, 0);

    // ===============================================
    // Add fade-in animation to elements on scroll
    // ===============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for fade-in animation
    const animateElements = document.querySelectorAll('.phase-card, .highlight-item, .method-step, .timeline-item, .position-card, .book-card, .value-card');
    
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // ===============================================
    // Form Submission Handlers (if needed)
    // ===============================================
    const registerButtons = document.querySelectorAll('.register-btn, .cta-button');
    
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Prevent default if it's a button element
            if (this.tagName === 'BUTTON') {
                e.preventDefault();
                
                // Show alert - in real application, this would open a registration form
                alert('Cảm ơn bạn đã quan tâm! Vui lòng liên hệ info@yup.vn hoặc gọi hotline để đăng ký khóa học.');
            }
        });
    });

    // ===============================================
    // Highlight Active Navigation Item
    // ===============================================
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // ===============================================
    // Lazy Loading Images (if needed)
    // ===============================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });

    // ===============================================
    // Search Statistics (Optional)
    // ===============================================
    function logSearchStats() {
        if (currentSearchTerm && window.gtag) {
            // Google Analytics tracking (if implemented)
            gtag('event', 'search', {
                'search_term': currentSearchTerm,
                'event_category': 'engagement'
            });
        }
    }

    // ===============================================
    // Print Prompt Feature (Optional Enhancement)
    // ===============================================
    function addPrintButtons() {
        promptCards.forEach(card => {
            const printBtn = document.createElement('button');
            printBtn.className = 'print-btn';
            printBtn.textContent = '📄 In';
            printBtn.style.cssText = `
                background: var(--primary-color);
                color: white;
                border: none;
                padding: 5px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.85rem;
                margin-top: 10px;
                display: none;
            `;
            
            card.appendChild(printBtn);
            
            // Show print button on hover
            card.addEventListener('mouseenter', function() {
                printBtn.style.display = 'inline-block';
            });
            
            card.addEventListener('mouseleave', function() {
                printBtn.style.display = 'none';
            });
            
            printBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                printPrompt(card);
            });
        });
    }

    function printPrompt(card) {
        const promptContent = card.innerHTML;
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <html>
            <head>
                <title>YUP Prompt</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 40px;
                        max-width: 800px;
                        margin: 0 auto;
                    }
                    .prompt-number { display: none; }
                    h3 { color: #0b9444; margin-bottom: 10px; }
                    .prompt-category {
                        background: #f0f0f0;
                        padding: 5px 15px;
                        border-radius: 15px;
                        display: inline-block;
                        margin: 10px 0;
                    }
                    .prompt-text { line-height: 1.8; }
                    .print-btn { display: none; }
                </style>
            </head>
            <body>
                <h1 style="color: #0b9444;">YUP - Business Prompt</h1>
                ${promptContent}
                <hr style="margin-top: 30px; border: none; border-top: 2px solid #0b9444;">
                <p style="text-align: center; color: #999;">
                    <strong>YUP</strong> - Inspiring Entrepreneurship | www.yup.vn
                </p>
            </body>
            </html>
        `);
        
        printWindow.document.close();
        printWindow.print();
    }

    // Uncomment to enable print feature
    // addPrintButtons();

    // ===============================================
    // Copy Prompt to Clipboard Feature
    // ===============================================
    function addCopyButtons() {
        promptCards.forEach(card => {
            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-btn';
            copyBtn.innerHTML = '📋 Copy';
            copyBtn.style.cssText = `
                background: #0b9444;
                color: white;
                border: none;
                padding: 8px 15px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 0.9rem;
                margin-top: 10px;
                transition: background 0.3s ease;
            `;
            
            const promptText = card.querySelector('.prompt-text');
            card.appendChild(copyBtn);
            
            copyBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Copy to clipboard
                const textToCopy = promptText.textContent;
                navigator.clipboard.writeText(textToCopy).then(() => {
                    // Show success feedback
                    copyBtn.innerHTML = '✓ Đã copy';
                    copyBtn.style.background = '#087a34';
                    
                    setTimeout(() => {
                        copyBtn.innerHTML = '📋 Copy';
                        copyBtn.style.background = '#0b9444';
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy:', err);
                    alert('Không thể copy. Vui lòng thử lại.');
                });
            });
            
            copyBtn.addEventListener('mouseenter', function() {
                this.style.background = '#087a34';
            });
            
            copyBtn.addEventListener('mouseleave', function() {
                if (this.innerHTML === '📋 Copy') {
                    this.style.background = '#0b9444';
                }
            });
        });
    }

    // Enable copy feature
    addCopyButtons();

    // ===============================================
    // Category Counter
    // ===============================================
    function updateCategoryCounters() {
        filterButtons.forEach(button => {
            const category = button.getAttribute('data-category');
            let count = 0;
            
            if (category === 'all') {
                count = promptCards.length;
            } else {
                promptCards.forEach(card => {
                    if (card.getAttribute('data-category') === category) {
                        count++;
                    }
                });
            }
            
            // Add counter to button text
            const originalText = button.textContent.split('(')[0].trim();
            button.textContent = `${originalText} (${count})`;
        });
    }

    // Update counters on page load
    if (filterButtons.length > 0) {
        updateCategoryCounters();
    }

    // ===============================================
    // Keyboard Shortcuts
    // ===============================================
    document.addEventListener('keydown', function(e) {
        // Press '/' to focus search
        if (e.key === '/' && searchInput) {
            e.preventDefault();
            searchInput.focus();
        }
        
        // Press 'Escape' to clear search
        if (e.key === 'Escape' && searchInput) {
            searchInput.value = '';
            currentSearchTerm = '';
            filterPrompts();
            searchInput.blur();
        }
    });

    // ===============================================
    // Loading Animation
    // ===============================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    console.log('YUP Website loaded successfully! 🚀');
});
