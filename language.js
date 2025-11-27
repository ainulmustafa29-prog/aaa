// Language management system
let currentLanguage = localStorage.getItem('selectedLanguage') || 'en';

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Wait for footer to load
    setTimeout(function() {
        initializeLanguage();
        setupLanguageButtons();
    }, 500);
});

// Initialize language system
function initializeLanguage() {
    // Set active language button
    const buttons = document.querySelectorAll('.language-flag-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLanguage) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Apply translations
    applyTranslations();
}

// Setup language button click handlers
function setupLanguageButtons() {
    const buttons = document.querySelectorAll('.language-flag-btn');
    buttons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
}

// Change language
function changeLanguage(lang) {
    if (!translations[lang]) {
        console.error('Language not found:', lang);
        return;
    }
    
    currentLanguage = lang;
    localStorage.setItem('selectedLanguage', lang);
    
    // Update active button
    const buttons = document.querySelectorAll('.language-flag-btn');
    buttons.forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Apply translations
    applyTranslations();
    
    // Show notification
    showLanguageChangeNotification(lang);
}

// Apply translations to all elements with data-translate attribute
function applyTranslations() {
    if (!translations[currentLanguage]) {
        console.error('Translations not found for language:', currentLanguage);
        return;
    }
    
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[currentLanguage][key]) {
            // Preserve HTML structure for links and other elements
            if (element.tagName === 'A' || element.tagName === 'BUTTON') {
                element.textContent = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
    
    // Update page direction for RTL languages if needed
    updatePageDirection();
    
    // Update HTML lang attribute
    updateHtmlLangAttribute();
}

// Update HTML lang attribute based on current language
function updateHtmlLangAttribute() {
    const htmlElement = document.getElementById('htmlLang') || document.documentElement;
    const langMap = {
        'en': 'en',
        'de': 'de',
        'zh': 'zh-CN',
        'ja': 'ja',
        'ko': 'ko',
        'fr': 'fr',
        'es': 'es'
    };
    const langCode = langMap[currentLanguage] || 'en';
    htmlElement.setAttribute('lang', langCode);
}

// Update page direction for RTL languages
function updatePageDirection() {
    // Currently all supported languages are LTR, but this can be extended
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    if (rtlLanguages.includes(currentLanguage)) {
        document.documentElement.setAttribute('dir', 'rtl');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
    }
}

// Show language change notification
function showLanguageChangeNotification(lang) {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.language-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'language-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(72, 202, 228, 0.9);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        font-size: 0.9rem;
    `;
    
    const langNames = {
        'en': 'English',
        'de': 'Deutsch',
        'zh': '中文',
        'ja': '日本語',
        'ko': '한국어',
        'fr': 'Français',
        'es': 'Español'
    };
    
    notification.textContent = `Language changed to ${langNames[lang] || lang}`;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations for notification
if (!document.querySelector('#language-notification-styles')) {
    const style = document.createElement('style');
    style.id = 'language-notification-styles';
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        @media (max-width: 768px) {
            .language-notification {
                top: 10px !important;
                right: 10px !important;
                left: 10px !important;
                font-size: 0.85rem !important;
                padding: 12px 20px !important;
            }
        }
    `;
    document.head.appendChild(style);
}

// Export function to get current language (for use in other scripts)
function getCurrentLanguage() {
    return currentLanguage;
}

