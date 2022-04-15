const header = document.querySelector('header');

const first_skill = document.querySelector('.skill:first-child');
const sk_counters = document.querySelectorAll('.counter span');
const progress_bars = document.querySelectorAll('.skills svg circle');

window.addEventListener('scroll', () => {
  if (!skillsPlayed) skillsCounter();
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

// Skills bar progress animation

function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;
  return topPosition + el.offsetHeight <= window.innerHeight;
}

function updateCount(num, maxNum) {
  const currentNum = +num.innerText;

  if (currentNum < maxNum) {
    num.innerText = currentNum + 1;
    setTimeout(() => updateCount(num, maxNum), 12);
  }
}

let skillsPlayed = false;

function skillsCounter() {
  if (!hasReached(first_skill)) return;

  skillsPlayed = true;

  sk_counters.forEach((counter, i) => {
    const target = +counter.dataset.target;
    const strokeValue = 427 - 427 * (target / 100);

    progress_bars[i].style.setProperty('--target', strokeValue);

    setTimeout(() => {
      updateCount(counter, target);
    }, 400);
  });

  progress_bars.forEach(
    (p) => (p.style.animation = 'progress 2s ease-in-out forwards'),
  );
}
