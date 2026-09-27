const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menu.textContent = open ? 'Close −' : 'Menu +';
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open navigation');
  menu.textContent = 'Menu +';
  nav.classList.remove('open');
}));
document.querySelectorAll('[data-service]').forEach(button => button.addEventListener('click', () => {
  document.querySelector(`input[value="${button.dataset.service}"]`).checked = true;
  document.querySelector('#request').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  document.querySelector('#name').focus({ preventScroll: true });
}));
const nextSteps = {
  repair: 'Next step: an assessment of the issue and your repair options.',
  maintenance: 'Next step: a seasonal maintenance visit and system check.',
  replacement: 'Next step: a conversation about your space, priorities, and replacement options.'
};
document.querySelector('#request-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const fields = new FormData(form);
  const name = String(fields.get('name')).trim();
  if (!name) { document.querySelector('#name').setCustomValidity('Please enter your name.'); document.querySelector('#name').reportValidity(); return; }
  const result = document.querySelector('#confirmation');
  result.replaceChildren();
  const title = document.createElement('strong');
  title.textContent = `Your ${fields.get('service')} request preview, ${name}.`;
  const body = document.createElement('p');
  body.textContent = nextSteps[fields.get('service')] + ' Demo complete — no request was sent and no appointment was booked.';
  result.append(title, body);
  result.hidden = false;
});
document.querySelector('#name').addEventListener('input', event => event.target.setCustomValidity(''));
