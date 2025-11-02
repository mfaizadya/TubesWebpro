const form = document.querySelector('.login-form');

  form.addEventListener('submit', function(event) {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (username === '' || password === '') {
      event.preventDefault();
      alert('Username dan kata sandi tidak boleh kosong!');
    }
  });

const showPassword = document.getElementById('show-password');
const passwordInput = document.getElementById('password');

showPassword.addEventListener('change', function() {
  passwordInput.type = this.checked ? 'text' : 'password';
});