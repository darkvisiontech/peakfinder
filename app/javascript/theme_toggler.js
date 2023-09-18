// Function to detect the OS theme preference
function detectOSTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Function to apply the theme
function applyTheme(theme) {
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);

    // Loop through each .popup element and set the background color
    document.querySelectorAll('.popup').forEach(function (popupElement) {
        popupElement.style.backgroundColor = theme == 'dark' ? '#333333' : '#f4f4f4';
    });
    // Loop through each .wpd-menu-dropdown element and set the background color
    document.querySelectorAll('.wpd-menu-dropdown').forEach(function (popupElement) {
        popupElement.style.backgroundColor = theme == 'dark' ? '#171717' : '#f4f4f4';
    });
}

// Function to toggle between dark and light themes
function toggleTheme() {
    const icon = document.getElementById('theme-icon');
    if (document.body.classList.contains('dark')) {
        applyTheme('light');
        localStorage.setItem('theme', 'light');
        icon.classList.remove('fa-solid', 'fa-sun', 'fa-2xs');
        icon.classList.add('fa-solid', 'fa-moon', 'fa-2xs');
        icon.style.color = "#000000"
    } else {
        applyTheme('dark');
        localStorage.setItem('theme', 'dark');
        icon.classList.remove('fa-solid', 'fa-moon', 'fa-2xs');
        icon.classList.add('fa-solid', 'fa-sun', 'fa-2xs');
        icon.style.color = "#ffffff"
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const osTheme = detectOSTheme();
    const userTheme = localStorage.getItem('theme');

    // Apply OS theme or user-selected theme
    if (userTheme) {
        applyTheme(userTheme);
        fa = userTheme
    } else {
        applyTheme(osTheme);
        fa = osTheme
    }

    const icon = document.getElementById('theme-icon');
    if (fa == 'light') {
        icon.classList.remove('fa-solid', 'fa-sun', 'fa-2xs');
        icon.classList.add('fa-solid', 'fa-moon', 'fa-2xs');
        icon.style.color = "#000000"
    } else {
        icon.classList.remove('fa-solid', 'fa-moon', 'fa-2xs');
        icon.classList.add('fa-solid', 'fa-sun', 'fa-2xs');
        icon.style.color = "#ffffff"
    }

    // Toggle theme when the button is clicked
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', toggleTheme);
});
