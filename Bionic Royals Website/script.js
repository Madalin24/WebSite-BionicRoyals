// =========================================
// CACHED DOM ELEMENTS (Performance Boost)
// =========================================
// We find these elements ONCE when the page loads, 
// rather than searching for them every single click/scroll.
const dom = {
    carousel: document.getElementById("carouselWindow"),
    header: document.querySelector('.header'),
    dropdownMenu: document.getElementById("dropdownMenu")
};

// =========================================
// SMART STICKY HEADER
// =========================================
let lastScrollTop = 0;

if (dom.header) {
    // { passive: true } improves scroll performance by preventing layout thrashing
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY || document.documentElement.scrollTop;

        if (currentScroll > lastScrollTop) {
            // Scrolled DOWN -> Hide the header
            dom.header.classList.add('hide-header');
        } else {
            // Scrolled UP -> Show the header
            dom.header.classList.remove('hide-header');
        }
        
        // Updates the memory for the next time you scroll
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; 
    }, { passive: true });
}

// =========================================
// HAMBURGER MENU
// =========================================
function toggleMenu() {
    // Safety check: only run if the menu exists on the page
    if (dom.dropdownMenu) {
        dom.dropdownMenu.classList.toggle("show");
    }
}

// =========================================
// CAROUSEL LOGIC
// =========================================
function slideRight() {
    // Safety check: prevents errors on pages without a carousel (like the Team page)
    if (!dom.carousel) return; 

    const firstImage = dom.carousel.firstElementChild;
    if (!firstImage) return;

    // Smoothly slide it out of view to the left
    firstImage.style.transition = "margin-left 0.3s ease-in-out";
    firstImage.style.marginLeft = "-215px"; 

    // Wait exactly 300ms for the animation to finish, then snap it to the back
    setTimeout(() => {
        dom.carousel.appendChild(firstImage);
        firstImage.style.transition = "none";
        firstImage.style.marginLeft = "0";
    }, 300); 
}

function slideLeft() {
    // Safety check: prevents errors on pages without a carousel
    if (!dom.carousel) return;

    const lastImage = dom.carousel.lastElementChild;
    if (!lastImage) return;

    // Instantly teleport the last image to the front, but hide it to the left
    dom.carousel.prepend(lastImage);
    lastImage.style.transition = "none";
    lastImage.style.marginLeft = "-215px";

    // Wait a tiny fraction of a second for the browser to register the hidden position
    // then smoothly animate it into its normal spot
    setTimeout(() => {
        lastImage.style.transition = "margin-left 0.3s ease-in-out";
        lastImage.style.marginLeft = "0";
    }, 10); 
}