const lazyLoading = () => {
    const lazyImgs = document.querySelectorAll('.lazy');

    // State
    const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry  => {
                if (entry.isIntersecting) {
                    let img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('loading');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }//,
        // Default values
        // {
        // root: null,       // Defines parent element that should be observed, null means whole page
        // rootMargin: '0px',// Adds additional page to be obesrved on the root, 
        // threshold: 0,     // How much image should load before it being observed, 0 means loads only when it comes in viewport, 1  means whole image loads 
        // }
    );

    // Events
    lazyImgs.forEach(img => {
        observer.observe(img);
    });
};

export default lazyLoading;