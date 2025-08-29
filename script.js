console.log("Enhanced Portfolio Script loaded!");

// ===== ANIMATED SECTION HEADERS =====
const observerOptions = {
  threshold: 0.3,
  rootMargin: '0px 0px -50px 0px'
};

const headerObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const header = entry.target.querySelector('h2');
      if (header) {
        header.classList.add('animate');
      }
    }
  });
}, observerOptions);

// Observe all sections with h2 headers
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');
  sections.forEach(section => {
    if (section.querySelector('h2')) {
      headerObserver.observe(section);
    }
  });
});

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Close mobile menu if open
      if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
      
      // Update active nav link
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Active navigation highlighting on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Navbar slide-in animation
gsap.from("nav", {
  y: -100,
  duration: 1,
  opacity: 0,
  ease: "power4.out",
});

// Hero Section Enhanced Animations
const heroTimeline = gsap.timeline();
heroTimeline
  .from(".profile-pic", {
    scale: 0,
    rotation: 180,
    duration: 1.2,
    ease: "back.out(1.7)",
  })
  .from(".hero-content h1", {
    opacity: 0,
    y: -50,
    duration: 1,
    ease: "power4.out",
  }, "-=0.8")
  .from(".hero-content p", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power4.out",
  }, "-=0.6")
  .from(".cta-buttons .btn", {
    opacity: 0,
    scale: 0.8,
    stagger: 0.2,
    duration: 1,
    ease: "back.out(1.7)",
  }, "-=0.4");

// Subtle breathing animation for hero heading - very gentle
gsap.to(".hero-content h1", {
  y: 2,
  duration: 4,
  repeat: -1,
  yoyo: true,
  ease: "power1.inOut",
});

// Enhanced profile picture interactions
const profilePic = document.querySelector(".profile-pic");
profilePic.addEventListener("mouseenter", () => {
  gsap.to(profilePic, {
    scale: 1.15,
    rotation: 5,
    duration: 0.4,
    ease: "power2.out",
  });
});
profilePic.addEventListener("mouseleave", () => {
  gsap.to(profilePic, {
    scale: 1,
    rotation: 0,
    duration: 0.4,
    ease: "power2.out",
  });
});

// Section Animations with ScrollTrigger
gsap.utils.toArray('section').forEach((section, index) => {
  if (section.id !== 'hero') {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 60,
      duration: 1,
      ease: "power3.out",
    });
  }
});

// Skills Section Enhanced Animation
gsap.from(".skills-container .skill", {
  scrollTrigger: {
    trigger: ".skills-container",
    start: "top 80%",
  },
  opacity: 0,
  scale: 0.8,
  y: 50,
  duration: 0.8,
  stagger: 0.1,
  ease: "back.out(1.7)",
});

// Enhanced hover animations for skills with progress bars
document.querySelectorAll(".skill").forEach((skill) => {
  skill.addEventListener("mouseenter", () => {
    gsap.to(skill, {
      scale: 1.05,
      y: -8,
      duration: 0.3,
      ease: "power2.out",
    });
  });
  skill.addEventListener("mouseleave", () => {
    gsap.to(skill, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});

// Animate skill progress bars when in view
const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBars = entry.target.querySelectorAll('.skill-progress');
      progressBars.forEach(bar => {
        const percent = bar.getAttribute('data-percent');
        if (percent) {
          bar.style.width = percent + '%';
        }
      });
    }
  });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.querySelector('.skills');
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
});

// Projects Section Enhanced Animations
gsap.utils.toArray(".project").forEach((project, index) => {
  gsap.from(project, {
    scrollTrigger: {
      trigger: project,
      start: "top 85%",
    },
    opacity: 0,
    x: index % 2 === 0 ? -80 : 80,
    scale: 0.9,
    duration: 1,
    ease: "power3.out",
  });
});

// Enhanced hover effect for project cards
document.querySelectorAll(".project").forEach((project) => {
  project.addEventListener("mouseenter", () => {
    gsap.to(project, {
      y: -10,
      scale: 1.02,
      duration: 0.4,
      ease: "power2.out",
    });
  });
  project.addEventListener("mouseleave", () => {
    gsap.to(project, {
      y: 0,
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });
  });
});

// Enhanced Modal Logic
const modal = document.getElementById("modal");
const modalImages = document.getElementById("modal-images");
const closeModalButton = document.querySelector(".close");
const toggleGalleryButtons = document.querySelectorAll(".toggle-gallery-btn");

// Function to Show Modal with Animation
function showModal(imagesHTML) {
  modalImages.innerHTML = imagesHTML;
  modal.style.display = "flex";
  
  // Animate modal entrance
  gsap.fromTo(modal, 
    { opacity: 0 },
    { opacity: 1, duration: 0.3, ease: "power2.out" }
  );
  
  gsap.fromTo(".modal-content", 
    { scale: 0.8, y: -50 },
    { scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
  );
  
  // Animate images
  gsap.from(".modal-content img", {
    opacity: 0,
    scale: 0.8,
    stagger: 0.1,
    duration: 0.5,
    ease: "power2.out",
    delay: 0.2
  });
  
  // Prevent body scroll
  document.body.style.overflow = 'hidden';
}

// Function to Close Modal with Animation
function closeModal() {
  gsap.to(modal, {
    opacity: 0,
    duration: 0.3,
    ease: "power2.out",
    onComplete: () => {
      modal.style.display = "none";
      modalImages.innerHTML = "";
      document.body.style.overflow = 'auto';
    }
  });
}

// Event Listeners
closeModalButton.addEventListener("click", closeModal);

// Close modal on click outside
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

// Close modal on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "flex") {
    closeModal();
  }
});

// Enhanced Gallery Button Logic - Fixed Version
toggleGalleryButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    
    const projectFolder = button.getAttribute("data-project");
    const folderPath = `assets/images/${projectFolder}/`;
    
    // Create a simple array of image URLs
    const imageUrls = [];
    for (let i = 1; i <= 5; i++) {
      imageUrls.push(`${folderPath}SS${i}.png`);
    }
    
    // Create HTML for images that exist
    let imagesHTML = '';
    const totalImages = imageUrls.length;
    
    if (totalImages === 0) {
      showModal('<p class="no-images">No images available for this project.</p>');
      return;
    }
    
    // Simple approach - create all image elements and let browser handle loading
    imageUrls.forEach((url, index) => {
      imagesHTML += `<img src="${url}" alt="Screenshot ${index + 1}" loading="lazy" onerror="this.style.display='none'"/>`;
    });
    
    showModal(imagesHTML);
  });
});

// Initialize EmailJS
(function() {
  emailjs.init("YOUR_PUBLIC_KEY"); // You'll need to replace this with your actual EmailJS public key
})();

// Enhanced Form Handling with Email Functionality
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data using form elements directly
    const nameField = contactForm.querySelector('input[name="name"]');
    const emailField = contactForm.querySelector('input[name="email"]');
    const messageField = contactForm.querySelector('textarea[name="message"]');
    
    const name = nameField ? nameField.value : '';
    const email = emailField ? emailField.value : '';
    const message = messageField ? messageField.value : '';
    
    // Simple form validation
    if (!name || !email || !message) {
      showNotification('Please fill in all fields.', 'error');
      return;
    }
    
    if (!isValidEmail(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }
    
    // Show loading state
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<div class="loading"></div> Opening email...';
    submitButton.disabled = true;
    
    // Create mailto link with proper encoding
    const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
    const body = encodeURIComponent(`From: ${name} (${email})\n\nMessage:\n${message}`);
    const mailtoLink = `mailto:basel.alraoush15@gmail.com?subject=${subject}&body=${body}`;
    
    // Open default email client
    window.location.href = mailtoLink;
    
    // Show success message
    setTimeout(() => {
      showNotification('Email client opened! Please send the message from your email app.', 'success');
      contactForm.reset();
      
      // Restore button state
      submitButton.innerHTML = originalText;
      submitButton.disabled = false;
    }, 1000);
  });
}

// Utility Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Determine background color
  let backgroundColor;
  if (type === 'success') {
    backgroundColor = 'var(--success-color)';
  } else if (type === 'error') {
    backgroundColor = 'var(--accent-color)';
  } else {
    backgroundColor = 'var(--primary-color)';
  }
  
  // Style the notification
  Object.assign(notification.style, {
    position: 'fixed',
    top: '20px',
    right: '20px',
    padding: '1rem 1.5rem',
    borderRadius: 'var(--border-radius)',
    color: 'white',
    fontWeight: '600',
    zIndex: '3000',
    transform: 'translateX(400px)',
    transition: 'transform 0.3s ease-out',
    backgroundColor: backgroundColor
  });
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(400px)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Enhanced Back to Top Button
const backToTopButton = document.getElementById("back-to-top");
let lastScrollTop = 0;

if (backToTopButton) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 300) {
      if (!backToTopButton.classList.contains('show')) {
        backToTopButton.classList.add('show');
        backToTopButton.style.display = 'block';
        gsap.from(backToTopButton, {
          scale: 0,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      }
    } else if (backToTopButton.classList.contains('show')) {
      backToTopButton.classList.remove('show');
      gsap.to(backToTopButton, {
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          backToTopButton.style.display = 'none';
        }
      });
    }
    
    lastScrollTop = scrollTop;
  });

  backToTopButton.addEventListener('click', () => {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.5,
      ease: "power3.out"
    });
  });
}

function scrollToTop() {
  if (backToTopButton) {
    gsap.to(window, {
      scrollTo: { y: 0 },
      duration: 1.5,
      ease: "power3.out"
    });
  }
}

// Intersection Observer for fade-in animations
const fadeObserverOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in-visible');
    }
  });
}, fadeObserverOptions);

// Observe elements for fade-in animation
document.querySelectorAll('.project, .skill, .education-container').forEach(el => {
  fadeObserver.observe(el);
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll-heavy functions
const debouncedScrollHandler = debounce(() => {
  // Any heavy scroll processing can go here
}, 16); // ~60fps

window.addEventListener('scroll', debouncedScrollHandler);

console.log("Enhanced Portfolio functionality loaded successfully!");