// Animation fade-in des sections au scroll
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".section-animated");
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    sections.forEach((section) => observer.observe(section));
  });
  
  // Étoiles animées en fond
  function randomBetween(a, b) {
    return a + Math.random() * (b - a);
  }
  function createStars(num, w, h) {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: randomBetween(0.3, 1.2),
        speed: randomBetween(0.02, 0.08),
        alpha: randomBetween(0.5, 1),
      });
    }
    return stars;
  }
  function animateStars() {
    const canvas = document.getElementById("stars-canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
    let stars = createStars(180, w, h);
    function draw() {
      ctx.clearRect(0, 0, w, h);
      for (let s of stars) {
        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 2 * Math.PI);
        ctx.fillStyle = "#fff";
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.restore();
        s.y += s.speed;
        if (s.y > h) {
          s.x = Math.random() * w;
          s.y = 0;
          s.r = randomBetween(0.3, 1.2);
          s.speed = randomBetween(0.02, 0.08);
          s.alpha = randomBetween(0.5, 1);
        }
      }
      requestAnimationFrame(draw);
    }
    draw();
    window.addEventListener("resize", () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      stars = createStars(180, w, h);
    });
  }
  animateStars();
  
  // Parallax sur le fond galaxie
  window.addEventListener("scroll", function () {
    const scrolled = window.scrollY;
    document.body.style.backgroundPosition = `center ${-scrolled * 0.2}px`;
  });
  