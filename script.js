const toggleBtn = document.getElementById('theme-toggle');
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const chooseButtons = document.querySelectorAll('.choose-btn');
const toast = document.getElementById('selection-toast');
let toastTimer;

function setTheme(isDark) {
  document.body.classList.toggle('dark', isDark);
  toggleBtn.innerHTML = isDark ? '☀ <span>Light mode</span>' : '☾ <span>Dark mode</span>';
  toggleBtn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  try { localStorage.setItem('mytech-theme', isDark ? 'dark' : 'light'); } catch (error) { /* Theme still works when storage is unavailable. */ }
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('mytech-theme'); } catch (error) { /* Use the default theme. */ }
setTheme(savedTheme === 'dark');
toggleBtn.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '✕' : '☰';
});

mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  });
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3200);
}

chooseButtons.forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.plan').forEach((plan) => {
      plan.classList.remove('selected');
      plan.setAttribute('aria-pressed', 'false');
    });
    const plan = button.closest('.plan');
    plan.classList.add('selected');
    button.setAttribute('aria-pressed', 'true');
    showToast(`${plan.dataset.plan} plan selected. This demo does not process payments.`);
  });
});

document.querySelectorAll('.plan').forEach((plan) => {
  plan.setAttribute('aria-label', `${plan.dataset.plan} pricing plan`);
});
document.getElementById('current-year').textContent = new Date().getFullYear();
