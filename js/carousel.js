function renderCarousel(lang) {
    const track = document.getElementById('carousel');
    if (!track) return;
    const projs = [...projects[lang], ...projects[lang], ...projects[lang]];
    const hint = i18n[lang]['carousel.hint'];

    track.innerHTML = projs.map((p, i) => `
        <article class="proj-card" role="button" tabindex="0" aria-label="${p.name}: ${p.shortDesc}" data-proj-index="${i % projects[lang].length}">
            <div class="proj-line" aria-hidden="true"></div>
            <div class="proj-img-wrap">
    ${p.imgPlaceholder && (p.imgPlaceholder.startsWith('assets/') || p.imgPlaceholder.startsWith('http'))
            ? `<img src="${p.imgPlaceholder}" alt="${p.name}" class="proj-img" loading="lazy" />`
            : `<div class="proj-img-placeholder" aria-hidden="true">${p.imgPlaceholder || '📋'}</div>`
        }
    <div class="proj-img-overlay" aria-hidden="true">
        <div class="proj-overlay-hint"><i class="fas fa-search"></i> ${hint}</div>
    </div>
</div>
            <div class="proj-body">
                <div class="proj-top">
                    <div class="proj-name">${p.name}</div>
                    <a class="proj-github-btn" href="${p.github}" target="_blank" rel="noopener noreferrer" aria-label="Ver ${p.name} no GitHub" onclick="event.stopPropagation()">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                    </a>
                </div>
                <p class="proj-desc">${p.shortDesc}</p>
                <div class="proj-tags" aria-label="Tecnologias">
                    ${p.tags.slice(0, 4).map(t => `<span class="proj-tag">${t}</span>`).join('')}
                    ${p.tags.length > 4 ? `<span class="proj-tag">+${p.tags.length - 4}</span>` : ''}
                </div>
            </div>
        </article>
    `).join('');

    attachCarouselEvents(lang);
}

function attachCarouselEvents(lang) {
    document.querySelectorAll('.proj-card').forEach(card => {
        const clickHandler = (e) => {
            if (e.target.closest('.proj-github-btn')) return;
            const idx = parseInt(card.dataset.projIndex);
            openModal(idx, lang);
            lastFocusedCard = card;
        };
        card.removeEventListener('click', clickHandler);
        card.addEventListener('click', clickHandler);
        card._clickHandler = clickHandler;

        const keyHandler = (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (e.target.closest('.proj-github-btn')) return;
                const idx = parseInt(card.dataset.projIndex);
                openModal(idx, lang);
                lastFocusedCard = card;
            }
        };
        card.removeEventListener('keydown', keyHandler);
        card.addEventListener('keydown', keyHandler);
        card._keyHandler = keyHandler;
    });
}