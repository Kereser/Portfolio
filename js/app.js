const header = document.querySelector('header');

const first_skill = document.querySelector('.skill:first-child');
const sk_counters = document.querySelectorAll('.counter span');
const progress_bars = document.querySelectorAll('.skills svg circle');

window.addEventListener('scroll', () => {
  if (!skillsPlayed) skillsCounter();
  if (!certificationPlayed) certificationCounter();
});

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

// * Skills bar progress animation

function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;
  // let bottomPosition = el.getBoundingClientRect().bottom;
  // todo: Me devuelve el numero de pixeles que hay desde la parte superior de la pantalla hasta la parte superior del elemento
  // todo: El offsetheight simplemente me devuelve la el height del elemento.
  // todo: Window.innerHeight me da los pixeles totales que tiene la pantalla, asi que:
  //? Lo que decimos aqui, por ejemplo, si la pantalla tiene 500px, entonces yo quiero q se me devuelva true si la altura desde la parte superior de la pantalla a la parte superior del elemento + el tamaño de mi elemento es menor a la altura del viewport, pq entonces asi sabre que mi elemento ya subio mas alla de lo que el usuario ve.
  // * Basicamente seria lo mismo que hacer un el.getBoundingClientRect().bottom para conseguir asi los pixeles que hay desde la parte superior de la pantalla hasta la parte inferior del elemento. Y asi, comparando con el innerHeight y es menor podemos deducir que ya el elemento subio por encima de la altura que tiene el usuario y por ende, ya podemos empezar la carga de la animacion.
  return topPosition + el.offsetHeight <= window.innerHeight;
}

function updateCount(num, maxNum, timer) {
  const currentNum = +num.innerText;

  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => updateCount(num, maxNum, timer), timer);
  }
}

let skillsPlayed = false;

function skillsCounter() {
  if (!hasReached(first_skill)) return;

  skillsPlayed = true;

  sk_counters.forEach((counter, i) => {
    const target = +counter.dataset.target;
    const strokeValue = 427 - 427 * (target / 100);

    //? Aqui lo que digo es que me ponga una propiedad que sea --target que voy a poder usar como una variable de css con el valor que tengo de strokeValue. Si es mayor, dejara un gap mayor y si es mejor, dejara un gap menor.
    progress_bars[i].style.setProperty('--target', strokeValue);

    setTimeout(() => {
      updateCount(counter, target, 16);
    }, 400);
  });

  // * Seteo una animacion al elemento de la barra para que se vea que esta cargando. Y no sea inmediato.
  progress_bars.forEach(
    (p) => (p.style.animation = 'progressBarAnimation 2s ease-in-out forwards'),
  );
}

// * Animacion para elementos de las seccion certificacion

const first_counter_element = document.querySelector(
  '.counter-item:first-child',
);

let certificationPlayed = false;

function certificationCounter() {
  if (!hasReached(first_counter_element)) return;

  certificationPlayed = true;

  const counters = document.querySelectorAll('.counter-item span');

  counters.forEach((counter) => {
    const target = +counter.dataset.target;

    setTimeout(() => {
      updateCount(counter, target, 100);
    }, 400);
  });
}
