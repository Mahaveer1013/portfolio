// function open_menu() {
//     let contact_me_btn = document.getElementById('contact-me-btn');
//     let nav_list = document.querySelector('.nav-list');
//     let nav_list_close = document.querySelector('.nav-close-li');
//     contact_me_btn.classList.toggle('contact-me');
//     nav_list.classList.toggle('active');
//     nav_list_close.classList.toggle('active');
// }
function open_menu() {
    // let contact_me_btn = document.getElementById('contact-me-btn');
    let nav_list = document.querySelector('.nav-list');
    let menu_btn = document.querySelector('.menu-btn');

    // contact_me_btn.classList.toggle('contact-me');
    nav_list.classList.toggle('active');
    menu_btn.classList.toggle('fa-bars');
    menu_btn.classList.toggle('fa-times');
}

const wrapper_1 = document.querySelector(".wrapper-1");
const carousel_1 = document.querySelector(".carousel-1");
const firstCardWidth_1 = carousel_1.querySelector(".inner-card-1").offsetWidth;
const arrowBtns_1 = document.querySelectorAll(".wrapper-1 i");
const carouselChildrens_1 = [...carousel_1.children];

swipe(wrapper_1, carousel_1, arrowBtns_1, carouselChildrens_1);

const wrapper_2 = document.querySelector(".wrapper-2");
const carousel_2 = document.querySelector(".carousel-2");
const firstCardWidth_2 = carousel_2.querySelector(".inner-card-2").offsetWidth;
const arrowBtns_2 = document.querySelectorAll(".wrapper-2 i");
const carouselChildrens_2 = [...carousel_2.children];

swipe(wrapper_2, carousel_2, arrowBtns_2, carouselChildrens_2);

function swipe(wrapper,carousel,arrowBtns,carouselChildrens) {
        
    let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

    // Get the number of cards that can fit in the carousel at once
    let cardPerView = Math.round(carousel.offsetWidth / 500);

    // Insert copies of the last few cards to beginning of carousel for infinite scrolling
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
        carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
    });

    // Insert copies of the first few cards to end of carousel for infinite scrolling
    carouselChildrens.slice(0, cardPerView).forEach(card => {
        carousel.insertAdjacentHTML("beforeend", card.outerHTML);
    });

    // Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");

    // Add event listeners for the arrow buttons to scroll the carousel left and right
    arrowBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            carousel.scrollLeft += btn.id == "left" ? -500 : 500;
        });
    });

    const dragStart = (e) => {
        isDragging = true;
        carousel.classList.add("dragging");
        // Records the initial cursor and scroll position of the carousel
        startX = e.pageX;
        startScrollLeft = carousel.scrollLeft;
    }

    const dragging = (e) => {
        if(!isDragging) return; // if isDragging is false return from here
        // Updates the scroll position of the carousel based on the cursor movement
        carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    }

    const dragStop = () => {
        isDragging = false;
        carousel.classList.remove("dragging");
    }

    const infiniteScroll = () => {
        // If the carousel is at the beginning, scroll to the end
        if(carousel.scrollLeft === 0) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
            carousel.classList.remove("no-transition");
        }
        // If the carousel is at the end, scroll to the beginning
        else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
            carousel.classList.add("no-transition");
            carousel.scrollLeft = carousel.offsetWidth;
            carousel.classList.remove("no-transition");
        }

        // Clear existing timeout & start autoplay if mouse is not hovering over carousel
        clearTimeout(timeoutId);
        if(!wrapper.matches(":hover")) autoPlay();
    }

    const autoPlay = () => {
        if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
        // Autoplay the carousel after every 2500 ms
        timeoutId = setTimeout(() => carousel.scrollLeft += 500, 2500);
    }
    autoPlay();

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);
    carousel.addEventListener("scroll", infiniteScroll);
    wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
    wrapper.addEventListener("mouseleave", autoPlay);
}