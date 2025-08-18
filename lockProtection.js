export function initLockProtection() {
  const icon = document.createElement('div');
  icon.id = 'lockIcon';
  icon.className = 'lock-icon';
  icon.textContent = '🔒';
  document.body.appendChild(icon);

  function showLockIcon() {
    icon.style.display = 'block';
    setTimeout(() => {
      icon.style.display = 'none';
    }, 1500);
  }

  document.addEventListener('contextmenu', e => {
    e.preventDefault();
    showLockIcon();
  });

  document.addEventListener('keydown', e => {
    if (
      e.key === 'F12' ||
      (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
      (e.ctrlKey && e.key === 'U')
    ) {
      e.preventDefault();
      showLockIcon();
    }
  });
}
