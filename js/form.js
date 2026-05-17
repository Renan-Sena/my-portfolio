function applyPhoneMask(input, countryCode) {
    let value = input.value.replace(/\D/g, '');

    if (countryCode === '55') {
        if (value.length > 2) {
            value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7, 11)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        input.value = value.slice(0, 16);
        input.placeholder = "(99) 99999-9999";
    }
    else if (countryCode === '1') {
        if (value.length > 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        input.value = value.slice(0, 17);
        input.placeholder = "(999) 999-9999";
    }
    else if (countryCode === '54') {
        if (value.length > 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        input.value = value.slice(0, 17);
        input.placeholder = "(999) 999-9999";
    }
    else if (countryCode === '33') {
        if (value.length > 2) {
            value = `${value.slice(0, 2)} ${value.slice(2, 4)} ${value.slice(4, 6)} ${value.slice(6, 8)} ${value.slice(8, 10)}`;
        }
        input.value = value.slice(0, 14);
        input.placeholder = "99 99 99 99 99";
    }
    else if (countryCode === '49') {
        if (value.length > 3) {
            value = `${value.slice(0, 3)} ${value.slice(3, 7)} ${value.slice(7, 11)}`;
        }
        input.value = value.slice(0, 15);
        input.placeholder = "999 99999999";
    }
    else if (countryCode === '39') {
        if (value.length > 3) {
            value = `${value.slice(0, 3)} ${value.slice(3, 7)} ${value.slice(7, 11)}`;
        }
        input.value = value.slice(0, 15);
        input.placeholder = "999 9999999";
    }
    else if (countryCode === '52') {
        if (value.length > 3) {
            value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
        } else if (value.length > 0) {
            value = `(${value}`;
        }
        input.value = value.slice(0, 17);
        input.placeholder = "(999) 999-9999";
    }
    else {
        if (value.length > 3) {
            value = `${value.slice(0, 3)} ${value.slice(3, 6)} ${value.slice(6, 10)}`;
        }
        input.value = value.slice(0, 15);
        input.placeholder = "999 999 9999";
    }
}

function setupPhoneField() {
    const phoneInput = document.getElementById('fphone');
    const countrySelect = document.getElementById('countryCode');
    if (!phoneInput || !countrySelect) return;

    phoneInput.addEventListener('input', function () {
        applyPhoneMask(this, countrySelect.value);
    });

    countrySelect.addEventListener('change', function () {
        phoneInput.value = '';
        applyPhoneMask(phoneInput, this.value);
        phoneInput.focus();
    });

    applyPhoneMask(phoneInput, countrySelect.value);
}

function showToast(msg, isSuccess) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMsg');
    toastMsg.textContent = msg;
    toast.querySelector('.toast-icon').textContent = isSuccess ? '✅' : '⚠️';
    toast.style.borderColor = isSuccess ? 'var(--accent)' : '#ff6b6b';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

document.getElementById('formSubmit')?.addEventListener('click', () => {
    const name = document.getElementById('fname')?.value.trim();
    const phoneInput = document.getElementById('fphone');
    const rawPhone = phoneInput?.value.replace(/\D/g, '') || '';
    const countryCode = document.getElementById('countryCode')?.value || '55';
    const fullPhoneNumber = `+${countryCode}${rawPhone}`;
    const email = document.getElementById('femail')?.value.trim();
    const subject = document.getElementById('fsubject')?.value.trim();
    const message = document.getElementById('fmessage')?.value.trim();

    ['fname', 'fphone', 'femail', 'fmessage'].forEach(id => {
        document.getElementById(id)?.removeAttribute('aria-invalid');
    });

    let hasError = false;

    if (!name) {
        document.getElementById('fname')?.setAttribute('aria-invalid', 'true');
        hasError = true;
    }
    if (!rawPhone || rawPhone.length < 10) {
        document.getElementById('fphone')?.setAttribute('aria-invalid', 'true');
        hasError = true;
    }
    if (!email || !email.includes('@')) {
        document.getElementById('femail')?.setAttribute('aria-invalid', 'true');
        hasError = true;
    }
    if (!message) {
        document.getElementById('fmessage')?.setAttribute('aria-invalid', 'true');
        hasError = true;
    }

    if (hasError) {
        showToast(
            currentLang === 'pt'
                ? '⚠️ Preencha corretamente: nome, telefone (mínimo 10 dígitos), e-mail e mensagem.'
                : '⚠️ Please fill in: name, phone (min 10 digits), email and message.',
            false
        );
        return;
    }

    const btn = document.getElementById('formSubmit');
    btn.disabled = true;
    const sendSpan = btn.querySelector('span[data-i18n]');
    if (sendSpan) {
        sendSpan.textContent = currentLang === 'pt' ? 'Enviando...' : 'Sending...';
    }

    const waText = encodeURIComponent(
        `Olá Renan! Me chamo *${name}*.\n` +
        `📞 Telefone: ${fullPhoneNumber}\n` +
        `📧 Email: ${email}\n` +
        `📌 Assunto: ${subject || '—'}\n\n` +
        `💬 ${message}`
    );
    const waUrl = `https://wa.me/${fullPhoneNumber.replace('+', '')}?text=${waText}`;
    const renanWhatsApp = '5592993200386';
    const waUrlFixed = `https://wa.me/${renanWhatsApp}?text=${waText}`;

    const mailSubject = encodeURIComponent(subject || (currentLang === 'pt' ? 'Contato via portfólio' : 'Portfolio contact'));
    const mailBody = encodeURIComponent(
        `${message}\n\n---\n` +
        `Nome: ${name}\n` +
        `Telefone: ${fullPhoneNumber}\n` +
        `Email: ${email}`
    );
    const mailUrl = `mailto:renanlealsena00@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    showToast(i18n[currentLang]['toast.success'], true);

    setTimeout(() => {
        window.open(waUrlFixed, '_blank');
        setTimeout(() => {
            window.location.href = mailUrl;
            btn.disabled = false;
            if (sendSpan) {
                sendSpan.textContent = i18n[currentLang]['form.send'];
            }
        }, 600);
    }, 1000);
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupPhoneField);
} else {
    setupPhoneField();
}