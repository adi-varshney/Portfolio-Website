const mobileNav = () => {
    const headerBtn = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileLinks = document.querySelectorAll('.mobile-nav__link');
    
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
    }

    const HandleMobileLinks = (link) => {
        link.addEventListener('click', () => {
            isMobileNavOpen = false;
            mobileNav.style.display = 'none';
            document.body.style.overflowY = 'auto';
            // mobileNav.removeAttribute('display');
            // document.body.removeAttribute('style');
        });
    }

    // Events
    headerBtn.addEventListener('click', HandleHeaderBtnToggle);

    mobileLinks.forEach(HandleMobileLinks);
}; 

export default mobileNav;