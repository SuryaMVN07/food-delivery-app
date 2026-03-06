// utils.js - Shared utilities for Fiesto

// --- Popup Logic ---
let loginPopup = null;

function initPopup() {
    loginPopup = document.getElementById('loginPopup');

    // Close popup if clicking outside of it
    window.addEventListener('click', function (event) {
        if (event.target === loginPopup) {
            closePopup();
        }
    });

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', login);
    }

    // Check login state on load
    const savedUser = sessionStorage.getItem('fiestoUser');
    if (savedUser) {
        updateUILoggedIn(savedUser);
    }
}

function updateUILoggedIn(username) {
    const loginTexts = document.querySelectorAll('.logged-name');
    loginTexts.forEach(el => el.textContent = username);

    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'inline-block';
}

function updateUILoggedOut() {
    const loginTexts = document.querySelectorAll('.logged-name');
    loginTexts.forEach(el => el.textContent = 'Login');

    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    if (loginBtn) loginBtn.style.display = 'inline-block';
    if (logoutBtn) logoutBtn.style.display = 'none';
}

function openPopup() {
    if (loginPopup) {
        loginPopup.style.display = 'block';
    }
}

function closePopup() {
    if (loginPopup) {
        loginPopup.style.display = 'none';
    }
}

function login(event) {
    if (event) event.preventDefault();
    const username = document.getElementById('username').value;
    if (username) {
        alert('Welcome, ' + username + '!');
        sessionStorage.setItem('fiestoUser', username);
        closePopup();
        updateUILoggedIn(username);
    }
}

function logout() {
    alert('Logged out successfully.');
    sessionStorage.removeItem('fiestoUser');
    updateUILoggedOut();

    // Clear form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.reset();

    closePopup();
}

// Initialize popup logic when DOM is loaded
document.addEventListener('DOMContentLoaded', initPopup);
