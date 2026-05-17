let currentTheme = 'dark';

function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    const btn = document.getElementById('themeToggle');
    if (btn) {
        const icon = btn.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        btn.setAttribute('aria-label', theme === 'dark' ? 'Trocar para tema claro' : 'Trocar para tema escuro');
    }
}

function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
        currentTheme = savedTheme;
    } else {
        currentTheme = getSystemTheme();
    }
    applyTheme(currentTheme);
}

function saveTheme(theme) {
    localStorage.setItem('theme', theme);
    currentTheme = theme;
}

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        applyTheme(e.matches ? 'dark' : 'light');
    }
});

document.getElementById('themeToggle')?.addEventListener('click', () => {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(newTheme);
    saveTheme(newTheme);
});