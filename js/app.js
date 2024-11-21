
// start of header
const header = document.querySelector('header');
// daynamic ul function

/// Create Dynamic Navigation
function createDynamicNav() {
  const navbarList = document.getElementById('navbar__list');
  const sections = document.querySelectorAll('section');

  if (!navbarList || sections.length === 0) {
      console.error("Error: Navigation or sections not found!");
      return;
  }

  navbarList.innerHTML = ''; // Clear existing items
  sections.forEach(section => {
      const sectionID = section.id;
      const sectionName = section.getAttribute('data-nav');

      const navItem = document.createElement('li');
      navItem.innerHTML = `<a href="#${sectionID}" class="menu__link">${sectionName}</a>`;
      navbarList.appendChild(navItem);
  });
}

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled'); // Fix the header when scrolling down
    header.style.position = 'fixed';
  } else {
    header.classList.remove('scrolled'); // Reset to default when back to the top
    header.style.position = 'static';
  }
});

function highlightActiveSection() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.menu__link');

  sections.forEach((section, index) => {
    const rect = section.getBoundingClientRect();
    const isActive = rect.top >= -300 && rect.top <= 300; // Adjust the range as needed

    section.classList.toggle('active-class', isActive);

    if (navLinks[index]) {
      navLinks[index].classList.toggle('active', isActive);
    }
  });
}

function smoothScroll(event) {
  event.preventDefault();
  const targetID = event.target.getAttribute('href').substring(1);
  const targetElement = document.getElementById(targetID);

  if (targetElement) {
    const offset = header.offsetHeight; // Adjust for the fixed header height
    const position = targetElement.offsetTop - offset;

    window.scrollTo({
      top: position,
      behavior: 'smooth',
    });
  }
}



// Initialize Functions
document.addEventListener('DOMContentLoaded', () => {
  createDynamicNav();

  // Add event listeners
  document.getElementById('navbar__list').addEventListener('click', smoothScroll);

  window.addEventListener('scroll', highlightActiveSection);
});

// toggle menu bar open and close
const hamburger = document.getElementById("hamburger");
const closeIcon = document.getElementById("close");
const menu = document.getElementById("menu");


hamburger.addEventListener("click", () => {
  // Show the menu and the close icon
  menu.classList.add("active");
  closeIcon.classList.add("active");
  hamburger.classList.add("active");

});

closeIcon.addEventListener("click", () => {
  // Hide the menu and show the hamburger icon
  menu.classList.remove("active");
  closeIcon.classList.remove("active");
  hamburger.classList.remove("active");
});
let interval;

function startRandomCountdown() {
    // Generate a random countdown time between 1 minute (60 seconds) and 1 hour (3600 seconds)
    const countdownTime = Math.floor(Math.random() * (100- 60 + 1)) + 60;

    let timeRemaining = countdownTime;
    const timerDisplay = document.getElementById("gift-timer");
    const popup = document.getElementById("popup");

    // Clear any previous interval if it exists
    clearInterval(interval);

    // Update the timer every second
    interval = setInterval(() => {
        const hours = Math.floor(timeRemaining / 3600);
        const minutes = Math.floor((timeRemaining % 3600) / 60);
        const seconds = timeRemaining % 60;

        // Format the timer display
        timerDisplay.innerText =
            `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

        timeRemaining--;

        // Check if time is up
        if (timeRemaining < 0) {
            clearInterval(interval);
             // Show the pop-up card
            popup.style.display = "block";
            overlay.style.display = "block";

        }
    }, 1000);
}
//random deails  in the pop up
const brands = ["KFC", "Nike", "Walmart", "Apple", "Amazon", "Adidas", "Starbucks"];
const randomBrand = brands[Math.floor(Math.random() * brands.length)];
const p3 = document.getElementById("p3");
p3.textContent =`from ${randomBrand}`;

// Function to close the pop-up and start a new countdown
function closePopup() {
   document.getElementById("overlay").style.display = "none";
    document.getElementById("popup").style.display = "none"; // Hide the pop-up card
    startRandomCountdown(); // Start a new countdown
}

// Start the random countdown on page load
window.onload = startRandomCountdown();
const offer = document.getElementById("p2");
let randoffer = Math.floor(Math.random() * (10,80)) ;
offer.textContent = randoffer + " % " + " off !";

// random offer code fun
function generateRandomText() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
  }

  return result;
}

const offercode = document.getElementById("p4");
offercode.textContent = generateRandomText();
// end of header


// start main code
// slider 1
let currentIndex = 0;



function scrollToLeft() {
    const slides = document.querySelectorAll('#slider-1 .content div');

    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = slides.length - 1; // Loop back to the last slide
    }

    updateSliderPosition(currentIndex);
}

function scrollToRight() {
    const slides = document.querySelectorAll('#slider-1 .content div');

    if (currentIndex < slides.length - 1) {
        currentIndex++;
    } else {
        currentIndex = 0; // Loop back to the first slide
    }

    updateSliderPosition(currentIndex);
}
function updateSliderPosition(index) {
  const content = document.querySelector('#slider-1 .content');

  // Check if the index is within bounds
  const slides = content.children;
  if (index >= 0 && index < slides.length) {
      content.style.transform = `translateX(-${index * 100}%)`;
      updatePagination(index);
  } else {
      console.warn(`Slide index ${index} is out of bounds.`);
  }
}


function updatePagination(index) {
  const paginationDots = document.querySelectorAll('.pagination .dot');

  // Remove 'active' class from all dots
  paginationDots.forEach(dot => dot.classList.remove('active'));

  // Add 'active' class to the current dot, if it exists
  if (paginationDots[index]) {
      paginationDots[index].classList.add('active');
  } else {
      console.warn(`No pagination dot found at index: ${index}`);
  }
}



function goToSlide(index) {
  currentIndex = index; // Update global currentIndex
  updateSliderPosition(index);
}
// Auto-scroll with error handling
setInterval(() => {
  try {
    scrollToRight();
  } catch (err) {
    console.error('Error in autoScroll:', err);
  }
}, 3000);
// testm code function  ;
const testimonialsContainer = document.querySelector('.testimonials');

function addTestimonial({ name, comment, rating }) {
  console.log('Testimonial to Add:', { name, comment, rating }); // Debugging

  const testimonialDiv = document.createElement('div');
  testimonialDiv.className = 'test';

  testimonialDiv.innerHTML = `
    <div class="profile">
      <img src="../assets/images/profiles/th.jpeg" alt="Profile">
    </div>
    <div class="content">
      <p><strong>${name}</strong></p>
      <p>${comment}</p>
      <div class="stars">${generateStars(rating)}</div> <!-- Pass correct rating -->
    </div>
  `;

  testimonialsContainer.appendChild(testimonialDiv);
}



// Function to clear all stars
function clearStars() {
  Array.from(starsRating.children).forEach(star => {
    star.classList.remove('selected', 'hovered');
  });
}
function generateStars(rating = 0) {
  console.log('Generating stars for rating:', rating); // Debugging
  let stars = '';
  for (let i = 0; i < 5; i++) {
    stars += `<span class="${i < rating ? 'selected' : ''}">★</span>`;
  }
  console.log('Generated stars HTML:', stars); // Debugging
  return stars;
}



// Get the rating container and initialize the selected rating
const starsRating = document.getElementById('rating');
let selectedRating = 0; // To store the selected rating value

// Function to clear all stars
function clearStars() {
  Array.from(starsRating.children).forEach(star => {
    star.classList.remove('selected', 'hovered');
  });
}

// Add event listeners for hover and click
starsRating.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    clearStars(); // Clear all highlights
    selectedRating = parseInt(e.target.getAttribute('data-value'), 10); // Get the star's value

    // Highlight stars up to the clicked one
    for (let i = 0; i < selectedRating; i++) {
      starsRating.children[i].classList.add('selected');
    }

    console.log('Selected Rating:', selectedRating); // Debugging
  }
});

starsRating.addEventListener('mouseleave', () => {
  clearStars();
  for (let i = 0; i < selectedRating; i++) {
    starsRating.children[i].classList.add('selected');
  }
});

starsRating.addEventListener('click', (e) => {
  if (e.target.tagName === 'SPAN') {
    clearStars(); // Clear all highlights
    selectedRating = parseInt(e.target.getAttribute('data-value'), 10);

    // Highlight stars up to the clicked star
    for (let i = 0; i < selectedRating; i++) {
      starsRating.children[i].classList.add('selected');
    }

    console.log('Selected Rating:', selectedRating); // Debugging
  }
});

// Save testimonials to local storage
function saveToLocalStorage(testimonial) {
  const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
  testimonials.push(testimonial);
  localStorage.setItem('testimonials', JSON.stringify(testimonials));
}

// Load testimonials from local storage
function loadFromLocalStorage() {
  const testimonials = JSON.parse(localStorage.getItem('testimonials')) || [];
  console.log('Loaded Testimonials:', testimonials); // Debugging
  testimonials.forEach(addTestimonial);
}

// Handle form submission
document.getElementById('rateForm').addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent default form submission

  // Retrieve form values
  const name = document.getElementById('name').value.trim();
  const comment = document.getElementById('comment').value.trim();

  // Validate inputs
  if (!name || !comment || selectedRating === 0) {
    alert('Please fill out all fields and select a star rating!');
    return;
  }

  // Add the testimonial dynamically with the selected rating
  const testimonial = { name, comment, rating: selectedRating };
  console.log('Testimonial to Add:', testimonial); // Debugging

  addTestimonial(testimonial);

  // Save to local storage
  saveToLocalStorage(testimonial);

  // Reset form after submission
  document.getElementById('rateForm').reset();

  // Reset stars
  clearStars();
  selectedRating = 0; // Reset selectedRating

  // Notify the user
  alert('Thank you for your feedback!');
});


// Load testimonials on page load
window.onload = loadFromLocalStorage;


//scroll code
// Select all sections
// Utility function to create an Intersection Observer for any element
function createIntersectionObserver(targets, classNameToAdd) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(classNameToAdd);
      } else {
        // Optional: Keep 'visible' class once added
      }
    });
  }, { threshold: 0.2 }); // Trigger when 20% of the element is in view

  targets.forEach(target => observer.observe(target));
}

// Apply to testimonials
const testimonials = document.querySelectorAll('.testimonials .test');
createIntersectionObserver(testimonials, 'visible');
// Apply visibility effects for sections
const sections = document.querySelectorAll('section');
createIntersectionObserver(sections, 'visible');

// Apply fade-in effects for elements with the 'fade-in' class
const fadeInElements = document.querySelectorAll('.fade-in');
createIntersectionObserver(fadeInElements, 'visible');

// Go Up button functionality
const goUpButton = document.querySelector('.go-up');

// Show or hide the "Go Up" button based on scroll position
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
      goUpButton.classList.add('show');
      goUpButton.classList.remove('hide');
  } else {
      goUpButton.classList.add('hide');
      goUpButton.classList.remove('show');
  }
});

// Scroll to top functionality when the Go Up button is clicked
goUpButton.addEventListener('click', () => {
  window.scrollTo({
      top: 0,
      behavior: 'smooth' // Smooth scroll to the top
  });
});

// Smooth scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}


// localStorage.clear();