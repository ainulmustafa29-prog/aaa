// SEO Helper - Ensures consistent SEO across all pages
(function() {
    'use strict';
    
    // Update HTML lang attribute based on selected language
    function updateLangAttribute() {
        const savedLang = localStorage.getItem('selectedLanguage') || 'en';
        const htmlElement = document.documentElement;
        const langMap = {
            'en': 'en',
            'de': 'de',
            'zh': 'zh-CN',
            'ja': 'ja',
            'ko': 'ko',
            'fr': 'fr',
            'es': 'es'
        };
        const langCode = langMap[savedLang] || 'en';
        htmlElement.setAttribute('lang', langCode);
    }
    
    // Add loading="lazy" to images that don't have it
    function addLazyLoading() {
        const images = document.querySelectorAll('img:not([loading])');
        images.forEach(img => {
            // Don't add lazy loading to images above the fold
            if (img.getBoundingClientRect().top > window.innerHeight) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }
    
    // Ensure all images have alt attributes
    function checkAltAttributes() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.getAttribute('alt') || img.getAttribute('alt') === '') {
                // Generate a basic alt text from image src if missing
                const src = img.getAttribute('src') || '';
                const filename = src.split('/').pop().replace(/\.(jpg|jpeg|png|gif|webp|svg)$/i, '');
                const altText = filename.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                img.setAttribute('alt', altText || 'Image');
            }
        });
    }
    
    // Add proper meta tags if missing
    function ensureMetaTags() {
        // Check for description
        if (!document.querySelector('meta[name="description"]')) {
            const meta = document.createElement('meta');
            meta.name = 'description';
            meta.content = 'AIVOROPRO - Free AI-powered online tools for image, video, and audio processing. Convert, enhance, and optimize your media files.';
            document.head.appendChild(meta);
        }
        
        // Check for viewport
        if (!document.querySelector('meta[name="viewport"]')) {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, initial-scale=1.0';
            document.head.appendChild(meta);
        }
        
        // Check for charset
        if (!document.querySelector('meta[charset]')) {
            const meta = document.createElement('meta');
            meta.setAttribute('charset', 'UTF-8');
            document.head.insertBefore(meta, document.head.firstChild);
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            updateLangAttribute();
            setTimeout(addLazyLoading, 1000);
            setTimeout(checkAltAttributes, 1000);
            ensureMetaTags();
        });
    } else {
        updateLangAttribute();
        setTimeout(addLazyLoading, 100);
        setTimeout(checkAltAttributes, 100);
        ensureMetaTags();
    }
    
    // Re-check when language changes
    if (typeof window !== 'undefined') {
        window.addEventListener('storage', function(e) {
            if (e.key === 'selectedLanguage') {
                updateLangAttribute();
            }
        });
    }
})();

