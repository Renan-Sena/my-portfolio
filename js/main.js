function loadLanguagePreference() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang === 'pt' || savedLang === 'en') {
        currentLang = savedLang;
    } else {
        currentLang = navigator.language?.startsWith('pt') ? 'pt' : 'en';
    }
    applyLang(currentLang);
}

function saveLanguagePreference(lang) {
    localStorage.setItem('lang', lang);
}

document.getElementById('langToggle')?.addEventListener('click', () => {
    const newLang = currentLang === 'pt' ? 'en' : 'pt';
    applyLang(newLang);
    saveLanguagePreference(newLang);
});

window.addEventListener('languageChanged', (e) => {
    renderCarousel(e.detail.lang);
});

loadLanguagePreference();
loadTheme();
renderCarousel(currentLang);