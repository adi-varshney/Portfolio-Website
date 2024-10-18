const darkMode = () => {
    const themeToggleBtn = document.querySelectorAll('#theme-toggle');

    // State
    const theme = localStorage.getItem('theme');

    // On Mount(happens once website initially loads)
    theme && document.body.classList.add(theme);

    // Handler
    const HandleThemeToggle = () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light-mode');
        } else {
            localStorage.removeItem('theme');
            document.body.removeAttribute('class');
        }
    };
    
    // Events
    themeToggleBtn.forEach(btn =>
        btn.addEventListener('click', HandleThemeToggle)
    );
};

export default darkMode;