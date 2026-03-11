const windowElement = document.getElementById("carouselWindow");

function slideRight() {
    // 1. Grab the first image
    const firstImage = windowElement.firstElementChild;

    // 2. Add a smooth CSS transition, and push it to the left by 215px
    firstImage.style.transition = "margin-left 0.3s ease-in-out";
    firstImage.style.marginLeft = "-215px"; 

    // 3. Wait exactly 300 milliseconds (0.3 seconds) for the animation to finish
    setTimeout(() => {
        // Teleport it to the back of the line!
        windowElement.appendChild(firstImage);

        // Instantly clean up the styles so it looks normal at the back
        firstImage.style.transition = "none";
        firstImage.style.marginLeft = "0";
    }, 300); 
}

function slideLeft() {
    // 1. Grab the last image
    const lastImage = windowElement.lastElementChild;

    // 2. Teleport it to the front instantly, but hide it to the left (-215px)
    windowElement.prepend(lastImage);
    lastImage.style.transition = "none";
    lastImage.style.marginLeft = "-215px";

    // 3. Wait a tiny fraction of a second for the browser to register the move
    setTimeout(() => {
        // Smoothly slide it into its normal position (0px)
        lastImage.style.transition = "margin-left 0.3s ease-in-out";
        lastImage.style.marginLeft = "0";
    }, 10); 
}

// --- HAMBURGER MENU LOGIC ---

function toggleMenu() {
    // Finds the dropdown menu in your HTML
    const menu = document.getElementById("dropdownMenu");
    
    // Toggles the "show" class on and off!
    menu.classList.toggle("show");
}