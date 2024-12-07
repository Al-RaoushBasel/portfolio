console.log('Script loaded!');

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Navbar slide-in animation
gsap.from('nav', {
  y: -100,
  duration: 1,
  opacity: 0,
  ease: 'power4.out',
});

// Hero Section Animations
gsap.timeline()
  .from('.hero-content h1', {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: 'power4.out',
  })
  .from('.hero-content p', {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: 'power4.out',
  }, '-=0.5')
  .from('.cta-buttons .btn', {
    opacity: 0,
    scale: 0.8,
    stagger: 0.2,
    duration: 1,
    ease: 'power4.out',
  }, '-=0.5');

// Floating animation for hero heading
gsap.to('.hero-content h1', {
  y: 10,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut',
});

// Profile picture hover effect
const profilePic = document.querySelector('.profile-pic');
profilePic.addEventListener('mouseenter', () => {
  gsap.to(profilePic, {
    scale: 1.1,
    duration: 0.3,
    boxShadow: '0 4px 15px rgba(88, 166, 255, 0.5)',
  });
});
profilePic.addEventListener('mouseleave', () => {
  gsap.to(profilePic, {
    scale: 1,
    duration: 0.3,
    boxShadow: 'none',
  });
});

// About Section Animation
gsap.from('.about', {
  scrollTrigger: '.about',
  opacity: 0,
  y: 100,
  duration: 1,
  ease: 'power4.out',
});

// Skills Section Animation with Delays
gsap.from('.skills-container .skill', {
  scrollTrigger: '.skills-container',
  opacity: 0,
  scale: 0.8,
  duration: 0.8,
  stagger: 0.2,
  ease: 'power4.out',
});

// Hover animation for skills
document.querySelectorAll('.skill').forEach((skill) => {
  skill.addEventListener('mouseenter', () => {
    gsap.to(skill, {
      scale: 1.2,
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

// Projects Section Animations
gsap.utils.toArray('.project').forEach((project, index) => {
  gsap.from(project, {
    scrollTrigger: project,
    opacity: 0,
    x: index % 2 === 0 ? -100 : 100,
    duration: 1,
    ease: 'power4.out',
  });
});

// Hover effect for project cards
document.querySelectorAll('.project').forEach((project) => {
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

// Modal Logic
const modal = document.getElementById('modal');
const modalImages = document.getElementById('modal-images');
const closeModalButton = document.querySelector('.close');
const toggleGalleryButtons = document.querySelectorAll('.toggle-gallery-btn');

// Function to Show Modal
function showModal(imagesHTML) {
  modalImages.innerHTML = imagesHTML; // Populate modal with images
  modal.style.display = 'flex'; // Display modal
}

// Function to Close Modal
function closeModal() {
  modal.style.display = 'none'; // Hide modal
  modalImages.innerHTML = ''; // Clear modal content
}

// Event Listener for Close Button
closeModalButton.addEventListener('click', closeModal);

// Event Listener for Clicking Outside Modal Content
window.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

// Event Listener for "View Images" Buttons
toggleGalleryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const projectFolder = button.getAttribute('data-project');
    const folderPath = `assets/images/${projectFolder}/`;
    const imagesHTML = Array.from({ length: 5 }, (_, i) => {
      const imgSrc = `${folderPath}SS${i + 1}.png`;
      return `<img src="${imgSrc}" alt="Screenshot ${i + 1}" onerror="this.style.display='none'"/>`;
    }).join('');

    showModal(imagesHTML);
  });
});