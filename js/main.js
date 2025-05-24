// Script para gerenciar traduções e funcionalidades do site

// Importar traduções
// As traduções estão definidas no arquivo translations.js

document.addEventListener('DOMContentLoaded', function() {
    // Inicializar o site
    initSite();
});

function initSite() {
    // Configurar navegação mobile
    setupMobileNav();
    
    // Configurar tema (dark/light mode)
    setupThemeToggle();
    
    // Configurar idioma
    setupLanguageToggle();
    
    // Configurar animações de scroll
    setupScrollAnimations();
    
    // Configurar filtros de portfólio
    setupPortfolioFilters();
    
    // Configurar modais de portfólio
    setupPortfolioModals();
    
    // Configurar formulário de contato
    setupContactForm();
    
    // Aplicar idioma salvo ou padrão
    applyLanguage(getSavedLanguage());
}

// Navegação Mobile
function setupMobileNav() {
    const hamburger = document.getElementById('hamburger');
    const mobileNav = document.getElementById('mobile-nav');
    const overlay = document.getElementById('overlay');
    const header = document.getElementById('header');
    
    if (hamburger && mobileNav && overlay) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileNav.classList.toggle('active');
            overlay.classList.toggle('active');
        });
        
        overlay.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
    
    // Scroll Header
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
}

// Alternância de Tema (Dark/Light Mode)
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    const body = document.body;
    
    function toggleTheme() {
        body.classList.toggle('dark-mode');
        
        const isDarkMode = body.classList.contains('dark-mode');
        const themeIcon = isDarkMode ? 'fa-sun' : 'fa-moon';
        
        if (themeToggle) themeToggle.innerHTML = `<i class="fas ${themeIcon}"></i>`;
        if (mobileThemeToggle) mobileThemeToggle.innerHTML = `<i class="fas ${themeIcon}"></i>`;
        
        localStorage.setItem('darkMode', isDarkMode);
    }
    
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
    
    // Aplicar tema salvo
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        if (mobileThemeToggle) mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
}

// Alternância de Idioma
function setupLanguageToggle() {
    const langToggle = document.getElementById('lang-toggle');
    const mobileLangToggle = document.getElementById('mobile-lang-toggle');
    
    function toggleLanguage() {
        const currentLang = getSavedLanguage();
        const newLang = currentLang === 'pt-BR' ? 'en-US' : 'pt-BR';
        const newFlag = newLang === 'pt-BR' ? 'flag-br.svg' : 'flag-en.svg';
        
        // Atualizar ícones de bandeira
        if (langToggle) {
            const img = langToggle.querySelector('img');
            if (img) {
                img.src = `images/${newFlag}`;
                img.alt = newLang === 'pt-BR' ? 'Português' : 'English';
            }
        }
        
        if (mobileLangToggle) {
            const img = mobileLangToggle.querySelector('img');
            if (img) {
                img.src = `images/${newFlag}`;
                img.alt = newLang === 'pt-BR' ? 'Português' : 'English';
            }
        }
        
        // Salvar preferência de idioma
        localStorage.setItem('language', newLang);
        
        // Aplicar traduções
        applyLanguage(newLang);
    }
    
    if (langToggle) langToggle.addEventListener('click', toggleLanguage);
    if (mobileLangToggle) mobileLangToggle.addEventListener('click', toggleLanguage);
}

// Obter idioma salvo ou padrão
function getSavedLanguage() {
    return localStorage.getItem('language') || 'pt-BR';
}

// Aplicar traduções ao conteúdo da página
function applyLanguage(lang) {
    if (!translations || !translations[lang]) {
        console.error('Traduções não encontradas para o idioma:', lang);
        return;
    }
    
    const trans = translations[lang];
    
    // Traduzir elementos com atributo data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (trans[key]) {
            element.textContent = trans[key];
        }
    });
    
    // Traduzir placeholders com atributo data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        if (trans[key]) {
            element.placeholder = trans[key];
        }
    });
    
    // Traduzir atributos alt com data-i18n-alt
    document.querySelectorAll('[data-i18n-alt]').forEach(element => {
        const key = element.getAttribute('data-i18n-alt');
        if (trans[key]) {
            element.alt = trans[key];
        }
    });
    
    // Traduzir atributos title com data-i18n-title
    document.querySelectorAll('[data-i18n-title]').forEach(element => {
        const key = element.getAttribute('data-i18n-title');
        if (trans[key]) {
            element.title = trans[key];
        }
    });
}

// Animações de Scroll
function setupScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .zoom-in');
    
    function checkScroll() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('active');
            }
        });
    }
    
    // Verificar elementos ao carregar a página
    window.addEventListener('load', checkScroll);
    
    // Verificar elementos ao rolar
    window.addEventListener('scroll', checkScroll);
}

// Filtros de Portfólio
function setupPortfolioFilters() {
    const portfolioFilters = document.querySelectorAll('.portfolio-filter');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    if (portfolioFilters.length && portfolioItems.length) {
        portfolioFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Remover classe active de todos os filtros
                portfolioFilters.forEach(f => f.classList.remove('active'));
                
                // Adicionar classe active ao filtro clicado
                filter.classList.add('active');
                
                // Obter valor do filtro
                const filterValue = filter.getAttribute('data-filter');
                
                // Mostrar/ocultar itens do portfólio com base no filtro
                portfolioItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
}

// Modais de Portfólio
function setupPortfolioModals() {
    const portfolioButtons = document.querySelectorAll('.portfolio-btn');
    const modals = document.querySelectorAll('.portfolio-modal');
    const closeButtons = document.querySelectorAll('.modal-close');
    
    // Abrir modal ao clicar no botão
    portfolioButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    // Fechar modal ao clicar no botão de fechar
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.portfolio-modal');
            if (modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Fechar modal ao clicar fora do conteúdo
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Fechar modal ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });
}

// Formulário de Contato
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Em uma implementação real, você enviaria os dados do formulário para um servidor
            // Para esta demonstração, apenas mostraremos uma mensagem de sucesso
            const lang = getSavedLanguage();
            const successMessage = translations[lang]['contact_form_success'];
            alert(successMessage);
            contactForm.reset();
        });
    }
}
