function open_menu() {
    let nav_list = document.querySelector('.nav-list');
    let menu_btn = document.querySelector('.menu-btn');

    nav_list.classList.toggle('active');
    menu_btn.classList.toggle('fa-bars');
    menu_btn.classList.toggle('fa-times');
}