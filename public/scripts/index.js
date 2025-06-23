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


document.querySelectorAll('.btn-edit').forEach(button => {
  button.addEventListener('click', () => {
    const password = prompt('Enter admin password to edit:');
    if (!password) return;

    const productId = button.dataset.id;
    const url = `/products/${productId}?auth=${encodeURIComponent(password)}`;
    window.location.href = url;
  });
});

document.querySelectorAll('.btn-delete').forEach(button => {
  button.addEventListener('click', () => {
    const password = prompt('Enter admin password to delete:');
    if (!password) return;

    const productId = button.dataset.id;
    const url = `/products/${productId}?auth=${encodeURIComponent(password)}`;
    window.location.href = url;
  });
});