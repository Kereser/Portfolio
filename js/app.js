const header = document.querySelector('header');

function stickNavbar() {
  header.classList.toggle('scrolled', scrollY > 0);
}

// stickNavbar(); //? Revisar si da errores para agregarlo

window.addEventListener('scroll', stickNavbar);
