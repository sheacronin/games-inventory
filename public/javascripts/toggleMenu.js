const toggleButton = document.querySelector('.toggle-button');
const navBar = document.querySelector('nav');

toggleButton.addEventListener('click', () => {
    navBar.classList.toggle('active');
});
