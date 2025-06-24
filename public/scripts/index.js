const toggleBtn = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');

toggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('open');
  if (sidebar.classList.contains('open')) {
    sidebar.focus();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    sidebar.classList.remove('open');
  }
});


function handleProtectedAction(event, productId, actionType) {
  event.preventDefault();
  const secret = prompt('Enter the secret admin password:');
  if (!secret) return;

  const inputId = `auth-${actionType}-${productId}`;
  const formId = `${actionType}-form-${productId}`;
  
  document.getElementById(inputId).value = secret;
  document.getElementById(formId).submit();
}