let lastFocusedCard = null;

function openModal(idx, lang) {
    const p = projects[lang][idx];
    const t = i18n[lang];
    const backdrop = document.getElementById('modalBackdrop');
    const imgArea = document.getElementById('modalImgArea');
    imgArea.innerHTML = `<div class="modal-img-placeholder" aria-hidden="true">${p.imgPlaceholder}</div>`;
    document.getElementById('modalName').textContent = p.name;
    document.getElementById('modalDesc').textContent = p.fullDesc;
    document.getElementById('modalTags').innerHTML = p.tags.map(tag => `<span class="proj-tag">${tag}</span>`).join('');
    
    let linksHTML = `<a class="modal-link-btn primary" href="${p.github}" target="_blank" rel="noopener noreferrer" aria-label="${t['modal.github']}: ${p.name}">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
        ${t['modal.github']}
    </a>`;
    if (p.live) {
        linksHTML += `<a class="modal-link-btn secondary" href="${p.live}" target="_blank" rel="noopener noreferrer">🔗 ${t['modal.live']}</a>`;
    }
    document.getElementById('modalLinks').innerHTML = linksHTML;
    
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('modalClose').focus(), 100);
}

function closeModal() {
    const backdrop = document.getElementById('modalBackdrop');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocusedCard) {
        lastFocusedCard.focus();
        lastFocusedCard = null;
    }
}

document.getElementById('modalClose')?.addEventListener('click', closeModal);
document.getElementById('modalBackdrop')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('modalBackdrop')) closeModal();
});
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

document.getElementById('modal')?.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    const focusable = document.getElementById('modal').querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
    }
});