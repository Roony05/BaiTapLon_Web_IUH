// Keep track of which modal is active
let activeModal = null;

// Function to switch between modals
function showLogin() {
  // Hide register modal if it's open
  const registerModal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
  if (registerModal) {
    registerModal.hide();
  }

  // Show login modal
  const loginModal = new bootstrap.Modal(document.getElementById("loginModal"));
  loginModal.show();
  activeModal = "login";
}

function showRegister() {
  // Hide login modal if it's open
  const loginModal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
  if (loginModal) {
    loginModal.hide();
  }

  // Show register modal
  const registerModal = new bootstrap.Modal(document.getElementById("registerModal"));
  registerModal.show();
  activeModal = "register";
}

function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;
  const registerMessage = document.getElementById("registerMessage");

  if (username && password) {
    localStorage.setItem(username, password);
    registerMessage.style.color = "green";
    registerMessage.innerText = "Đăng ký thành công!";

    // Switch to login modal after short delay
    setTimeout(() => {
      showLogin();
      // Clear the message after switching
      registerMessage.innerText = "";
    }, 1500);
  } else {
    registerMessage.style.color = "red";
    registerMessage.innerText = "Vui lòng nhập đầy đủ thông tin!";
  }
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const message = document.getElementById("message");
  const storedPassword = localStorage.getItem(username);

  if (storedPassword === password) {
    message.style.color = "green";
    message.innerText = "Đăng nhập thành công!";

    // Redirect to home page after short delay
      window.location.href = "../html/home.html";
  } else {
    message.style.color = "red";
    message.innerText = "Sai tên đăng nhập hoặc mật khẩu!";
  }
}

// Initialize event listeners when the document is ready
document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners for the modal links
  const loginLink = document.querySelector('[data-bs-target="#loginModal"]');
  const registerLink = document.querySelector('[data-bs-target="#registerModal"]');

  // Setup modal switch buttons
  const switchToLogin = document.querySelector(
    '[data-bs-target="#loginModal"][data-bs-dismiss="modal"]'
  );
  if (switchToLogin) {
    switchToLogin.addEventListener("click", function (e) {
      e.preventDefault();
      showLogin();
    });
  }

  const switchToRegister = document.querySelector(
    '[data-bs-target="#registerModal"][data-bs-dismiss="modal"]'
  );
  if (switchToRegister) {
    switchToRegister.addEventListener("click", function (e) {
      e.preventDefault();
      showRegister();
    });
  }
});
