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
var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    centerSlide: true,
    fade: true,
    grabCursor:true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
});