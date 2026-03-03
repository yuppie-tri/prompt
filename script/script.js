// YUP Website JavaScript
// Mobile Navigation, Search, and Filter Functionality

// Global variables
let allPrompts = [];
let currentCategory = 'all';
let currentSearchTerm = '';

document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // Load Prompts from JSON
    // ===============================================
    loadPrompts();

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
    // Initialize Other Page Features
    // ===============================================
    initializePageFeatures();
});

// ===============================================
// Load Prompts from JSON
// ===============================================
async function loadPrompts() {
    try {
        const response = await fetch('./prompts.json');
        const data = await response.json();
        allPrompts = data.prompts;
        
        renderPrompts(allPrompts);
        initializeFiltersAndSearch();
        
        console.log(`✅ Loaded ${allPrompts.length} prompts successfully!`);
    } catch (error) {
        console.error('❌ Error loading prompts:', error);
        showError();
    }
}

// ===============================================
// Render Prompts to DOM
// ===============================================
function renderPrompts(prompts) {
    const promptsGrid = document.getElementById('promptsGrid');
    
    if (!promptsGrid) return;
    
    // Clear existing content
    promptsGrid.innerHTML = '';
    
    // Render each prompt
    prompts.forEach(prompt => {
        const promptCard = createPromptCard(prompt);
        promptsGrid.appendChild(promptCard);
    });
}

// ===============================================
// Create Prompt Card Element
// ===============================================
function createPromptCard(prompt) {
    const card = document.createElement('div');
    card.className = 'prompt-card';
    card.setAttribute('data-category', prompt.category);
    card.setAttribute('data-prompt-id', prompt.id);
    
    // Clean text for preview - replace multiple newlines with space
    let previewText = prompt.text.replace(/\n+/g, ' ').trim();
    
    card.innerHTML = `
        <div class="prompt-number">${prompt.id}</div>
        <h3>${prompt.title}</h3>
        <p class="prompt-category">${prompt.categoryName}</p>
        <p class="prompt-text">${previewText}</p>
    `;
    
    // Add click event to show modal
    card.addEventListener('click', function() {
        showPromptModal(prompt);
    });
    
    return card;
}

// ===============================================
// Initialize Filters and Search
// ===============================================
function initializeFiltersAndSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
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
    
    // Add copy buttons to all prompts
    addCopyButtons();
    
    // Update category counters
    updateCategoryCounters();

    // Setup keyboard shortcuts
    setupKeyboardShortcuts();
}

// ===============================================
// Filter Prompts
// ===============================================
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        currentSearchTerm = searchInput.value.toLowerCase().trim();
        filterPrompts();
    }
}

function filterPrompts() {
    const promptCards = document.querySelectorAll('.prompt-card');
    const noResults = document.getElementById('noResults');
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
// Update Category Counters
// ===============================================
function updateCategoryCounters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        const category = button.getAttribute('data-category');
        let count = 0;
        
        if (category === 'all') {
            count = allPrompts.length;
        } else {
            count = allPrompts.filter(p => p.category === category).length;
        }
        
        // Add counter to button text
        const originalText = button.textContent.split('(')[0].trim();
        button.textContent = `${originalText} (${count})`;
    });
}

// ===============================================
// Copy Prompt to Clipboard Feature
// ===============================================
function addCopyButtons() {
    const promptCards = document.querySelectorAll('.prompt-card');
    
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

// ===============================================
// Show Error Message
// ===============================================
function showError() {
    const promptsGrid = document.getElementById('promptsGrid');
    if (promptsGrid) {
        promptsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                <h3 style="color: #e74c3c; margin-bottom: 15px;">⚠️ Không thể tải dữ liệu</h3>
                <p style="color: #666;">Vui lòng kiểm tra kết nối hoặc thử lại sau.</p>
            </div>
        `;
    }
}

// ===============================================
// Keyboard Shortcuts
// ===============================================
function setupKeyboardShortcuts() {
    const searchInput = document.getElementById('searchInput');
    
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
}

// ===============================================
// Initialize Other Page Features
// ===============================================
function initializePageFeatures() {
    // Smooth Scroll for Anchor Links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });

    // Add fade-in animation to elements on scroll
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

    const animateElements = document.querySelectorAll('.phase-card, .highlight-item, .method-step, .timeline-item, .position-card, .book-card, .value-card');
    animateElements.forEach(element => {
        observer.observe(element);
    });

    // Form Submission Handlers
    const registerButtons = document.querySelectorAll('.register-btn, .cta-button');
    registerButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.tagName === 'BUTTON') {
                e.preventDefault();
                alert('Cảm ơn bạn đã quan tâm! Vui lòng liên hệ info@yup.vn hoặc gọi hotline để đăng ký khóa học.');
            }
        });
    });

    // Highlight Active Navigation Item
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// ===============================================
// Prompt Modal Functions
// ===============================================

function showPromptModal(prompt) {
    const modal = document.getElementById('promptModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalPromptNumber = document.getElementById('modalPromptNumber');
    const modalCategory = document.getElementById('modalCategory');
    const modalText = document.getElementById('modalText');
    
    if (!modal) return;
    
    // Populate modal with prompt data
    modalTitle.textContent = prompt.title;
    modalPromptNumber.textContent = prompt.id;
    modalCategory.textContent = prompt.categoryName;
    modalText.textContent = prompt.text;
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    
    // Setup modal close handlers
    setupModalCloseHandlers(modal, prompt);
}

function setupModalCloseHandlers(modal, prompt) {
    const closeBtn = document.getElementById('modalClose');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const copyPromptBtn = document.getElementById('copyPromptBtn');
    
    // Close on X button
    if (closeBtn) {
        closeBtn.onclick = function() {
            closeModal(modal);
        };
    }
    
    // Close on "Đóng" button
    if (closeModalBtn) {
        closeModalBtn.onclick = function() {
            closeModal(modal);
        };
    }
    
    // Copy prompt functionality
    if (copyPromptBtn) {
        copyPromptBtn.onclick = function() {
            copyPromptToClipboard(prompt);
        };
    }
    
    // Close on clicking outside modal content
    modal.onclick = function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    };
    
    // Close on Escape key
    const escapeHandler = function(event) {
        if (event.key === 'Escape') {
            closeModal(modal);
            document.removeEventListener('keydown', escapeHandler);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

function copyPromptToClipboard(prompt) {
    const textToCopy = `${prompt.title}\n\n${prompt.text}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                showCopyNotification('success');
            })
            .catch(err => {
                console.error('Failed to copy:', err);
                fallbackCopyTextToClipboard(textToCopy);
            });
    } else {
        fallbackCopyTextToClipboard(textToCopy);
    }
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.opacity = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showCopyNotification('success');
        } else {
            showCopyNotification('error');
        }
    } catch (err) {
        console.error('Fallback copy failed:', err);
        showCopyNotification('error');
    }
    
    document.body.removeChild(textArea);
}

function showCopyNotification(status) {
    const copyBtn = document.getElementById('copyPromptBtn');
    if (!copyBtn) return;
    
    const originalText = copyBtn.textContent;
    
    if (status === 'success') {
        copyBtn.textContent = '✅ Đã copy!';
        copyBtn.style.background = '#28a745';
    } else {
        copyBtn.textContent = '❌ Lỗi copy';
        copyBtn.style.background = '#dc3545';
    }
    
    setTimeout(() => {
        copyBtn.textContent = originalText;
        copyBtn.style.background = '';
    }, 2000);
}

console.log('YUP Website loaded successfully! 🚀');
