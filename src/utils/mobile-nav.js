const mobileNav = () => {
    const headerBtn = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');
    const menuToggle = document.querySelector('.header__bars');
    
    // State
    let isMobileNavOpen = false;
    
    // Handlers
    const HandleHeaderBtnToggle = () => {
        isMobileNavOpen = !isMobileNavOpen;  //Setting to opposite
        if (isMobileNavOpen) {
            mobileNav.style.display = 'flex';
            document.body.style.overflowY = 'hidden';
        } else {
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
        }
        menuToggle.setAttribute('aria-expanded', String(isMobileNavOpen));
        menuToggle.setAttribute('aria-label', isMobileNavOpen ? 'Close menu' : 'Open menu');
    }

    const HandleMobileLinks = (link) => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Open menu');
        });
    }

    // Events
    headerBtn.addEventListener('click', HandleHeaderBtnToggle);

    mobileLinks.forEach(HandleMobileLinks);
}; 

export default mobileNav;
