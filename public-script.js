// JavaScript pour le site vitrine public

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing scripts...');
    
    // Wait a bit for all elements to be fully rendered
    setTimeout(function() {
        // Mobile Menu Toggle
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        
        if (mobileToggle && navMenu) {
            console.log('Mobile menu elements found');
            
            // Remove any existing event listeners
            mobileToggle.replaceWith(mobileToggle.cloneNode(true));
            const newMobileToggle = document.querySelector('.mobile-menu-toggle');
            
            newMobileToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Mobile toggle clicked');
                
                navMenu.classList.toggle('mobile-active');
                
                // Change hamburger icon to X when menu is open
                const icon = this.querySelector('i');
                if (navMenu.classList.contains('mobile-active')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            });
            
            // Close mobile menu when clicking on a link
            const navLinks = navMenu.querySelectorAll('a');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navMenu.classList.contains('mobile-active')) {
                        navMenu.classList.remove('mobile-active');
                        const icon = newMobileToggle.querySelector('i');
                        icon.className = 'fas fa-bars';
                    }
                });
            });
        } else {
            console.log('Mobile menu elements not found:', {mobileToggle, navMenu});
        }
        
        // Access dropdown toggle
        const accessDropdown = document.querySelector('.access-dropdown');
        const accessToggle = document.querySelector('.access-toggle');
        
        if (accessToggle && accessDropdown) {
            console.log('Access dropdown elements found');
            
            // Remove any existing event listeners
            accessToggle.replaceWith(accessToggle.cloneNode(true));
            const newAccessToggle = document.querySelector('.access-toggle');
            
            newAccessToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('Access toggle clicked');
                
                const dropdown = document.querySelector('.access-dropdown');
                dropdown.classList.toggle('active');
                console.log('Dropdown active state:', dropdown.classList.contains('active'));
            });
            
            // Close dropdown when clicking outside
            document.addEventListener('click', function(e) {
                const dropdown = document.querySelector('.access-dropdown');
                if (dropdown && !dropdown.contains(e.target)) {
                    dropdown.classList.remove('active');
                }
            });
            
            // Prevent dropdown from closing when clicking inside
            const dropdown = document.querySelector('.access-dropdown');
            if (dropdown) {
                dropdown.addEventListener('click', function(e) {
                    e.stopPropagation();
                });
            }
        } else {
            console.log('Access dropdown elements not found:', {accessToggle, accessDropdown});
        }
    }, 100);
});

// Gallery Slider Functionality
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;

function showSlide(index) {
    // Hide all slides
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Show current slide
    if (slides[index]) {
        slides[index].classList.add('active');
    }
    if (dots[index]) {
        dots[index].classList.add('active');
    }
    
    // Move slider track
    const track = document.getElementById('galleryTrack');
    if (track) {
        track.style.transform = `translateX(-${index * 100}%)`;
    }
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    showSlide(currentSlideIndex);
}

function currentSlide(index) {
    currentSlideIndex = index - 1;
    showSlide(currentSlideIndex);
}

// Auto-play slider
let sliderInterval;
function startSliderAutoplay() {
    sliderInterval = setInterval(() => {
        if (totalSlides > 0) {
            changeSlide(1);
        }
    }, 5000);
}

function stopSliderAutoplay() {
    if (sliderInterval) {
        clearInterval(sliderInterval);
    }
}

// Initialize slider
document.addEventListener('DOMContentLoaded', function() {
    if (totalSlides > 0) {
        showSlide(0);
        startSliderAutoplay();
        
        // Pause autoplay on hover
        const sliderContainer = document.querySelector('.gallery-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSliderAutoplay);
            sliderContainer.addEventListener('mouseleave', startSliderAutoplay);
        }
    }
});

// Fonction pour aller à un slide spécifique
function currentSlide(n) {
    // Retirer la classe active de l'élément actuel
    slides[currentSlideIndex].classList.remove('active');
    dots[currentSlideIndex].classList.remove('active');
    
    // Définir le nouvel index
    currentSlideIndex = n - 1;
    
    // Ajouter la classe active au nouvel élément
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
    
    // Déplacer le slider
    const track = document.getElementById('galleryTrack');
    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
}

// Auto-play du slider (optionnel)
function autoSlide() {
    changeSlide(1);
}

// Démarrer l'auto-play toutes les 5 secondes
setInterval(autoSlide, 5000);

// Fonctions pour l'espace patient
function showTab(tabName) {
    // Masquer tous les formulaires
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => form.classList.remove('active'));
    
    // Désactiver tous les boutons d'onglets
    const tabs = document.querySelectorAll('.tab-btn');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Afficher le formulaire sélectionné
    if (tabName === 'login') {
        document.getElementById('loginForm').classList.add('active');
        document.querySelector('[onclick="showTab(\'login\')"]').classList.add('active');
    } else if (tabName === 'register') {
        document.getElementById('registerForm').classList.add('active');
        document.querySelector('[onclick="showTab(\'register\')"]').classList.add('active');
    }
}

// Gestion des formulaires d'authentification
document.addEventListener('DOMContentLoaded', function() {
    // Formulaire de connexion
    const loginForm = document.querySelector('.patient-login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Simulation de connexion
            const submitBtn = this.querySelector('.auth-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Connexion...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Connexion réussie ! Redirection vers votre espace...', 'success');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Ici vous pourriez rediriger vers l'espace patient
                // window.location.href = 'patient-dashboard.html';
            }, 2000);
        });
    }
    
    // Formulaire d'inscription
    const registerForm = document.querySelector('.patient-register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm-password').value;
            
            // Vérifier que les mots de passe correspondent
            if (password !== confirmPassword) {
                showNotification('Les mots de passe ne correspondent pas.', 'error');
                return;
            }
            
            // Simulation d'inscription
            const submitBtn = this.querySelector('.auth-btn');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Création du compte...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Compte créé avec succès ! Un email de confirmation vous a été envoyé.', 'success');
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
                
                // Basculer vers l'onglet de connexion
                showTab('login');
                this.reset();
            }, 2500);
        });
    }
});

document.addEventListener('DOMContentLoaded', function() {
    
    // Gestion du header scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('mobile-active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('mobile-active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('mobile-active');
                const icon = mobileToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            });
        });
    }
    
    // Access dropdown toggle - consolidated version
    const accessDropdown = document.querySelector('.access-dropdown');
    const accessToggle = document.querySelector('.access-toggle');
    
    if (accessToggle && accessDropdown) {
        console.log('Dropdown elements found, adding event listeners');
        
        accessToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Dropdown button clicked');
            accessDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!accessDropdown.contains(e.target)) {
                accessDropdown.classList.remove('active');
            }
        });
        
        // Prevent dropdown from closing when clicking inside
        accessDropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    } else {
        console.log('Dropdown elements not found:', {accessToggle, accessDropdown});
    }
    
    // Smooth scroll pour les liens d'ancrage
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animation des éléments au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les éléments à animer
    const animatedElements = document.querySelectorAll('.service-card, .team-member, .testimonial-card, .gallery-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupérer les données du formulaire
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Simulation d'envoi
            const submitBtn = this.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Envoi en cours...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                showNotification('Message envoyé avec succès ! Nous vous répondrons sous 24h.', 'success');
                this.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    // Gestion de la galerie
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openImageModal(img.src, img.alt);
            }
        });
    });
    
    // Compteur animé pour les statistiques
    const statNumbers = document.querySelectorAll('.stat-number');
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + (target >= 100 ? '%' : '+');
        }, 20);
    };
    
    // Observer pour les statistiques
    const statsObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
    
    // Gestion des témoignages avec slider
    const testimonialsContainer = document.querySelector('.testimonials-grid');
    if (testimonialsContainer) {
        let currentTestimonial = 0;
        const testimonials = testimonialsContainer.querySelectorAll('.testimonial-card');
        
        if (testimonials.length > 0) {
            // Masquer tous sauf le premier
            testimonials.forEach((testimonial, index) => {
                if (index !== 0) {
                    testimonial.style.display = 'none';
                }
            });
            
            // Auto-rotation des témoignages
            setInterval(() => {
                testimonials[currentTestimonial].style.display = 'none';
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
                testimonials[currentTestimonial].style.display = 'block';
            }, 5000);
        }
    }
    
    // Gestion des services avec hover effects
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Gestion des boutons CTA
    const ctaButtons = document.querySelectorAll('.cta-button, .btn-primary');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Effet de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Gestion des modales
    window.openImageModal = function(src, alt) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <span class="modal-close">&times;</span>
                    <img src="${src}" alt="${alt}">
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Fermer la modale
        const closeModal = () => {
            modal.remove();
        };
        
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        // Fermer avec Échap
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    };
    
    // Système de notifications
    window.showNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Fermer la notification
        const closeNotification = () => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        };
        
        notification.querySelector('.notification-close').addEventListener('click', closeNotification);
        
        // Auto-fermeture après 5 secondes
        setTimeout(closeNotification, 5000);
    };
    
    // Gestion des formulaires avec validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
    });
    
    function validateField(field) {
        const value = field.value.trim();
        const type = field.type;
        const required = field.hasAttribute('required');
        
        // Supprimer les classes d'erreur précédentes
        field.classList.remove('error', 'success');
        
        if (required && !value) {
            field.classList.add('error');
            return false;
        }
        
        if (value) {
            if (type === 'email' && !isValidEmail(value)) {
                field.classList.add('error');
                return false;
            }
            
            if (type === 'tel' && !isValidPhone(value)) {
                field.classList.add('error');
                return false;
            }
            
            field.classList.add('success');
        }
        
        return true;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone);
    }
    
    // Gestion du lazy loading des images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Gestion des tooltips
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = this.dataset.tooltip;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 10 + 'px';
        });
        
        element.addEventListener('mouseleave', function() {
            const tooltip = document.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
    
    // Gestion du scroll progress
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.offsetHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
    
    // Gestion des raccourcis clavier
    document.addEventListener('keydown', function(e) {
        // Ctrl + K pour ouvrir la recherche
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('input[type="search"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Échap pour fermer les modales
        if (e.key === 'Escape') {
            const modals = document.querySelectorAll('.image-modal');
            modals.forEach(modal => modal.remove());
        }
    });
    
    // Gestion du thème sombre (optionnel)
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('darkTheme', isDark);
        });
        
        // Charger le thème sauvegardé
        if (localStorage.getItem('darkTheme') === 'true') {
            document.body.classList.add('dark-theme');
        }
    }
    
    // Gestion des animations de particules (optionnel)
    function createParticles() {
        const particleContainer = document.createElement('div');
        particleContainer.className = 'particles';
        document.body.appendChild(particleContainer);
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particleContainer.appendChild(particle);
        }
    }
    
    // Initialiser les particules si on est sur la page d'accueil
    if (window.location.pathname === '/' || window.location.pathname.includes('index')) {
        createParticles();
    }
    
    console.log('Site vitrine Bright Smile initialisé avec succès !');
});
