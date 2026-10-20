(() => {
  const fieldByLabel = (form, expression) => {
    for (const label of form.querySelectorAll('label')) {
      if (expression.test(label.textContent || '')) {
        return label.parentElement?.querySelector('input:not([type=checkbox]),textarea,select') || null;
      }
    }
    return null;
  };

  const valueByLabel = (form, expression) => fieldByLabel(form, expression)?.value?.trim() || '';

  const setNotice = (form, text, success = false) => {
    let notice = form.querySelector('.submission-notice');
    if (!notice) {
      notice = document.createElement('p');
      notice.className = 'submission-notice';
      notice.setAttribute('role', 'status');
      notice.setAttribute('aria-live', 'polite');
      notice.style.cssText = 'grid-column:1/-1;margin-top:12px;padding:12px 14px;background:var(--paper-dim,#f0efec);color:var(--ink,#1d1f21);font:13px/1.5 Inter,sans-serif';
      form.appendChild(notice);
    }
    notice.textContent = text;
    notice.dataset.state = success ? 'success' : 'error';
  };

  const submit = async (form, kind, trigger) => {
    if (form.dataset.sending === 'true') return;
    if (!form.reportValidity()) return;

    const email = kind === 'waitlist'
      ? form.querySelector('input[type=email]')?.value?.trim()
      : valueByLabel(form, /^email$/i);
    const consent = kind === 'waitlist' || Boolean(form.querySelector('input[type=checkbox]:checked'));
    const fields = {
      kind,
      email,
      consent,
      name: valueByLabel(form, /your name/i),
      phone: valueByLabel(form, /phone/i),
      company: valueByLabel(form, /company or property/i),
      location: valueByLabel(form, /city.*state/i),
      interest: valueByLabel(form, /interested in/i),
      category: valueByLabel(form, /what is it about/i) || valueByLabel(form, /^topic$/i),
      transactionId: valueByLabel(form, /transaction id/i),
      message: form.querySelector('textarea')?.value?.trim() || '',
      website: form.querySelector('[name=website]')?.value || '',
    };

    form.dataset.sending = 'true';
    form.setAttribute('aria-busy', 'true');
    if (trigger) {
      trigger.setAttribute('aria-disabled', 'true');
      if ('disabled' in trigger) trigger.disabled = true;
    }

    try {
      const response = await fetch('/api/submissions', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(fields),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'We could not submit your details. Please try again.');

      setNotice(form, result.message || (kind === 'waitlist'
        ? "You're on the list. We'll be in touch when Ampza launches near you."
        : 'Thanks. Your message has been sent to the Ampza team.'), result.delivery !== 'pending' && result.delivery !== 'failed');
      form.reset();
    } catch (error) {
      setNotice(form, error instanceof Error ? error.message : 'We could not submit your details. Please try again.');
    } finally {
      form.dataset.sending = 'false';
      form.removeAttribute('aria-busy');
      if (trigger) {
        trigger.removeAttribute('aria-disabled');
        if ('disabled' in trigger) trigger.disabled = false;
      }
    }
  };

  const prepare = (form, kind) => {
    // A visually hidden honeypot catches simple bots without changing the mockup layout.
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'website';
    honeypot.tabIndex = -1;
    honeypot.autocomplete = 'off';
    honeypot.setAttribute('aria-hidden', 'true');
    honeypot.style.cssText = 'position:absolute!important;left:-10000px!important;width:1px;height:1px;overflow:hidden';
    form.appendChild(honeypot);

    const email = kind === 'waitlist' ? form.querySelector('input[type=email]') : fieldByLabel(form, /^email$/i);
    if (email) email.required = true;

    if (kind !== 'waitlist') {
      const name = fieldByLabel(form, /your name/i);
      const textarea = form.querySelector('textarea');
      if (name) name.required = true;
      if (textarea) textarea.required = true;
      const consent = form.querySelector('input[type=checkbox]');
      if (consent) consent.required = true;
    }
    if (kind === 'grievance') {
      const category = fieldByLabel(form, /what is it about/i);
      if (category) category.required = true;
    }
    if (kind === 'partner') {
      const interest = fieldByLabel(form, /interested in/i);
      if (interest) interest.required = true;
    }

    const boundedFields = [
      [/your name/i, 160], [/phone/i, 40], [/company or property/i, 200],
      [/city.*state/i, 200], [/interested in/i, 100], [/what is it about|^topic$/i, 100],
      [/transaction id/i, 120],
    ];
    for (const [expression, maxLength] of boundedFields) {
      const field = fieldByLabel(form, expression);
      if (field && (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement)) field.maxLength = maxLength;
    }
    const message = form.querySelector('textarea');
    if (message) message.maxLength = 5000;
  };

  document.querySelectorAll('.waitlist-form').forEach(form => {
    prepare(form, 'waitlist');
    form.addEventListener('submit', event => {
      event.preventDefault();
      submit(form, 'waitlist', form.querySelector('button[type=submit]'));
    });
  });

  document.querySelectorAll('form.ef').forEach((form, index) => {
    const section = form.closest('section[id]');
    const kind = section?.id === 'grievance' || index > 0 ? 'grievance' : 'contact';
    prepare(form, kind);
    form.querySelector('a.btn-primary')?.addEventListener('click', event => {
      event.preventDefault();
      submit(form, kind, event.currentTarget);
    });
  });

  document.querySelectorAll('form.suggest-form').forEach(form => {
    prepare(form, 'partner');
    form.querySelector('a.btn-primary')?.addEventListener('click', event => {
      event.preventDefault();
      submit(form, 'partner', event.currentTarget);
    });
  });
})();
