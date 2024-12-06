// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      window.scrollTo({
        top: targetSection.offsetTop - 50, // Adjust offset for fixed navbar
        behavior: 'smooth',
      });
    }
  });
});

// GSAP Animations for sections
gsap.registerPlugin(ScrollTrigger);

// Navbar slide-in animation
gsap.from('nav', {
  y: -100,
  duration: 1,
  opacity: 0,
  ease: 'power4.out',
});

// Hero Section Animation
gsap.from('.hero-content h1', {
  opacity: 0,
  y: -50,
  duration: 1,
  ease: 'power4.out',
});

gsap.from('.hero-content p', {
  opacity: 0,
  y: 50,
  delay: 0.5,
  duration: 1,
  ease: 'power4.out',
});

gsap.from('.cta-buttons .btn', {
  opacity: 0,
  scale: 0.8,
  delay: 1,
  duration: 1,
  stagger: 0.2,
  ease: 'power4.out',
});

// Floating animation for hero heading
gsap.to('.hero-content h1', {
  y: 10,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
});

// About Section Animation
gsap.from('.about', {
  scrollTrigger: '.about',
  opacity: 0,
  y: 100,
  duration: 1,
  ease: 'power4.out',
});

// Skills Section Animation
gsap.from('.skills-container .skill', {
  scrollTrigger: '.skills-container',
  opacity: 0,
  scale: 0.8,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power4.out',
});

// Hover animation for skill icons
const skills = document.querySelectorAll('.skill');
skills.forEach((skill) => {
  skill.addEventListener('mouseenter', () => {
    gsap.to(skill, {
      scale: 1.1,
      duration: 0.2,
    });
  });

  skill.addEventListener('mouseleave', () => {
    gsap.to(skill, {
      scale: 1,
      duration: 0.2,
    });
  });
});

// Projects Section Animation
gsap.utils.toArray('.project').forEach((project, index) => {
  gsap.from(project, {
    scrollTrigger: project,
    opacity: 0,
    x: index % 2 === 0 ? -100 : 100, // Alternates animation direction
    duration: 1,
    ease: 'power4.out',
  });
});

// Hover effect for project cards
const projects = document.querySelectorAll('.project');
projects.forEach((project) => {
  project.addEventListener('mouseenter', () => {
    gsap.to(project, {
      scale: 1.05,
      duration: 0.3,
      ease: 'power1.out',
    });
  });

  project.addEventListener('mouseleave', () => {
    gsap.to(project, {
      scale: 1,
      duration: 0.3,
      ease: 'power1.out',
    });
  });
});

// Contact Section Animation
gsap.from('#contact form', {
  scrollTrigger: '#contact',
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power4.out',
});

// Shake animation for the submit button
const contactForm = document.getElementById('contact-form');
const submitButton = document.querySelector('#contact-form button');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  gsap.fromTo(
    submitButton,
    { x: -5 },
    { x: 5, duration: 0.1, repeat: 3, yoyo: true }
  );
  alert('Thank you for reaching out! I will get back to you soon.');
  contactForm.reset();
});

// Footer slide-in animation
gsap.from('footer', {
  scrollTrigger: 'footer',
  y: 100,
  opacity: 0,
  duration: 1,
  ease: 'power4.out',
});

// Easter egg: Terminal animation
document.querySelector('.highlight').addEventListener('click', () => {
  const terminalText = '> Welcome to my portfolio!';
  let i = 0;
  const interval = setInterval(() => {
    if (i < terminalText.length) {
      document.querySelector('.hero-content p').textContent += terminalText[i];
      i++;
    } else {
      clearInterval(interval);
    }
  }, 100);
});
