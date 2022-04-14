const header = document.querySelector('header');

function stickNavbar() {
  header.classList.toggle('scrolled', scrollY > 0);
}

// stickNavbar(); //? Revisar si da errores para agregarlo

window.addEventListener('scroll', stickNavbar);

const sr = ScrollReveal({
  duration: 2500,
  distance: '60px',
});

sr.reveal('.showcase-info', { delay: 500 });
sr.reveal('.showcase-img', { origin: 'top', delay: 500 });

// <a href="https://iconscout.com/illustrations/software-engineer" target="_blank">Software engineer Illustration</a> by <a href="https://iconscout.com/contributors/delesign" target="_blank">Delesign Graphics</a>
