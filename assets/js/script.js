'use strict';

/**
 * element toggle function
 */

const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 10) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});



/**
 * navbar toggle
 */

const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");

navToggleBtn.addEventListener("click", function () {

  elemToggleFunc(navToggleBtn);
  elemToggleFunc(navbar);
  elemToggleFunc(document.body);

});



/**
 * skills toggle
 */

const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

for (let i = 0; i < toggleBtns.length; i++) {
  toggleBtns[i].addEventListener("click", function () {

    elemToggleFunc(toggleBtnBox);
    for (let i = 0; i < toggleBtns.length; i++) { elemToggleFunc(toggleBtns[i]); }
    elemToggleFunc(skillsBox);

  });
}



/**
 * dark & light theme toggle
 */

const themeToggleBtn = document.querySelector("[data-theme-btn]");

themeToggleBtn.addEventListener("click", function () {

  elemToggleFunc(themeToggleBtn);

  if (themeToggleBtn.classList.contains("active")) {
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");

    localStorage.setItem("theme", "light_theme");
  } else {
    document.body.classList.add("dark_theme");
    document.body.classList.remove("light_theme");

    localStorage.setItem("theme", "dark_theme");
  }

});

/**
 * check & apply last time selected theme from localStorage
 */

if (localStorage.getItem("theme") === "light_theme") {
  themeToggleBtn.classList.add("active");
  document.body.classList.remove("dark_theme");
  document.body.classList.add("light_theme");
} else {
  themeToggleBtn.classList.remove("active");
  document.body.classList.remove("light_theme");
  document.body.classList.add("dark_theme");
}



function downloadCvPDF() {
  // Google Docs export URL for PDF download
  var url = 'https://drive.google.com/uc?export=download&id=1uR8g3i5v5h_HW25G_9cMxV8-1lL4BPWA';
  window.location.href = url;
}

// document.getElementById('contact-form').addEventListener('submit', async function (event) {
//   event.preventDefault();

//   const form = this;
//   const formData = {
//     name: form.name.value.trim(),
//     email: form.email.value.trim(),
//     phone: form.phone.value.trim(),
//     message: form.message.value.trim(),
//   };

//   try {
//     const webAppUrl = "https://script.google.com/macros/s/AKfycbwcoYUKZAww-TtubiwNAL-MNo9DfN_X8qM3bfe84F-yWZ6U2m6NPIhCr3HOdZumAXC8pw/exec";

//     // Show loading state
//     const submitButton = form.querySelector('button[type="submit"]');
//     submitButton.disabled = true;
//     submitButton.textContent = 'Sending...';

//     const response = await fetch(webAppUrl, {
//       method: 'POST',
//       mode: 'no-cors', // Add this line
//       cache: 'no-cache',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData)
//     });

//     // Since we're using no-cors, we can't read the response
//     // Just assume success if no error is thrown
//     alert("Message sent successfully!");
//     form.reset();
//   } catch (error) {
//     console.error('Error:', error);
//     alert("Error sending message. Please try again.");
//   } finally {
//     // Reset button state
//     submitButton.disabled = false;
//     submitButton.textContent = 'Send';
//   }
// });

// document.getElementById('contact-form').addEventListener('submit', async function (event) {
//   event.preventDefault();

//   const form = this;
//   // Get the submit button element inside the form
//   const submitButton = form.querySelector('button[type="submit"]');

//   const formData = {
//     name: form.name.value.trim(),
//     email: form.email.value.trim(),
//     phone: form.phone.value.trim(),
//     message: form.message.value.trim(),
//   };

//   try {
//     const webAppUrl = "https://script.google.com/macros/s/AKfycbwcoYUKZAww-TtubiwNAL-MNo9DfN_X8qM3bfe84F-yWZ6U2m6NPIhCr3HOdZumAXC8pw/exec";

//     // Show loading state
//     submitButton.disabled = true;
//     submitButton.textContent = 'Sending...';

//     const response = await fetch(webAppUrl, {
//       method: 'POST',
//       mode: 'no-cors',
//       cache: 'no-cache',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formData)
//     });

//     // Since we're using no-cors, we can't read the response
//     alert("Message sent successfully!");
//     form.reset();
//   } catch (error) {
//     console.error('Error:', error);
//     alert("Error sending message. Please try again.");
//   } finally {
//     // Reset button state
//     submitButton.disabled = false;
//     submitButton.textContent = 'Send';
//   }
// });


// class ContactForm {
//   constructor(formId) {
//     this.form = document.getElementById(formId);
//     this.submitButton = this.form.querySelector('button[type="submit"]');
//     this.setupFormValidation();
//     this.setupSubmitHandler();
//   }

//   setupFormValidation() {
//     const inputs = this.form.querySelectorAll('input, textarea');
//     inputs.forEach(input => {
//       input.addEventListener('input', () => {
//         this.validateField(input);
//       });
//     });
//   }

//   validateField(input) {
//     const value = input.value.trim();
//     const validationMessage = input.parentElement.querySelector('.validation-message')
//       || this.createValidationMessage(input);

//     if (!Validator[input.name]?.(value)) {
//       input.classList.add('invalid');
//       validationMessage.textContent = this.getErrorMessage(input.name);
//       validationMessage.style.display = 'block';
//       return false;
//     }

//     input.classList.remove('invalid');
//     validationMessage.style.display = 'none';
//     return true;
//   }

//   createValidationMessage(input) {
//     const message = document.createElement('div');
//     message.className = 'validation-message text-red-500 text-sm mt-1';
//     input.parentElement.appendChild(message);
//     return message;
//   }

//   getErrorMessage(fieldName) {
//     const messages = {
//       name: 'Name should only contain letters and be 2-50 characters long',
//       email: 'Please enter a valid email address',
//       phone: 'Please enter a valid phone number',
//       message: 'Message should be between 1 and 1000 characters'
//     };
//     return messages[fieldName] || 'Invalid input';
//   }

//   validateForm() {
//     const inputs = this.form.querySelectorAll('input, textarea');
//     return Array.from(inputs).every(input => this.validateField(input));
//   }

//   async submitForm(formData) {
//     try {
//       const response = await fetch("https://script.google.com/macros/s/AKfycbwcoYUKZAww-TtubiwNAL-MNo9DfN_X8qM3bfe84F-yWZ6U2m6NPIhCr3HOdZumAXC8pw/exec", {
//         method: 'POST',
//         mode: 'cors',
//         cache: 'no-cache',
//         headers: {
//           'Content-Type': 'application/json',
//           'X-Requested-With': 'XMLHttpRequest'
//         },
//         body: JSON.stringify(formData)
//       });

//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }

//       const result = await response.json();
//       return result;
//     } catch (error) {
//       console.error('Submission error:', error);
//       throw new Error('Failed to submit form');
//     }
//   }

//   setupSubmitHandler() {
//     this.form.addEventListener('submit', async (event) => {
//       event.preventDefault();

//       // Check honeypot
//       if (this.form.querySelector('#honeypot').value) {
//         return;
//       }

//       if (!this.validateForm()) {
//         alert('Please fix the errors in the form');
//         return;
//       }

//       this.submitButton.disabled = true;
//       this.submitButton.textContent = 'Sending...';

//       try {
//         const formData = {
//           name: this.form.name.value.trim(),
//           email: this.form.email.value.trim(),
//           phone: this.form.phone.value.trim(),
//           message: this.form.message.value.trim(),
//         };

//         const result = await this.submitForm(formData);

//         if (result.status === 'success') {
//           alert('Message sent successfully!');
//           this.form.reset();
//         } else {
//           throw new Error(result.message || 'Submission failed');
//         }
//       } catch (error) {
//         alert('Error sending message. Please try again later.');
//       } finally {
//         this.submitButton.disabled = false;
//         this.submitButton.textContent = 'Send';
//       }
//     });
//   }
// }

// // Initialize the form handler
// document.addEventListener('DOMContentLoaded', () => {
//   new ContactForm('contact-form');
// });

// class ContactForm {
//   constructor(formId) {
//     this.form = document.getElementById(formId);
//     this.submitButton = this.form.querySelector('button[type="submit"]');
//     this.validator = {
//       email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
//       phone: (phone) => /^\+?[\d\s-]{10,15}$/.test(phone),
//       name: (name) => /^[a-zA-Z\s]{2,50}$/.test(name),
//       message: (message) => message.length <= 1000 && message.trim().length > 0
//     };
//     this.setupFormValidation();
//     this.setupSubmitHandler();

//     console.log('Contact form initialized');
//   }

//   setupFormValidation() {
//     const inputs = this.form.querySelectorAll('input, textarea');
//     inputs.forEach(input => {
//       input.addEventListener('input', () => {
//         this.validateField(input);
//       });
//     });
//   }

//   validateField(input) {
//     const value = input.value.trim();
//     const validationMessage = input.parentElement.querySelector('.validation-message')
//       || this.createValidationMessage(input);

//     if (input.name === 'honeypot') return true;

//     if (!this.validator[input.name]?.(value)) {
//       input.classList.add('invalid');
//       validationMessage.textContent = this.getErrorMessage(input.name);
//       validationMessage.style.display = 'block';
//       return false;
//     }

//     input.classList.remove('invalid');
//     validationMessage.style.display = 'none';
//     return true;
//   }

//   createValidationMessage(input) {
//     const message = document.createElement('div');
//     message.className = 'validation-message';
//     input.parentElement.appendChild(message);
//     return message;
//   }

//   getErrorMessage(fieldName) {
//     const messages = {
//       name: 'Name should only contain letters and be 2-50 characters long',
//       email: 'Please enter a valid email address',
//       phone: 'Please enter a valid phone number (10-15 digits)',
//       message: 'Message should be between 1 and 1000 characters'
//     };
//     return messages[fieldName] || 'Invalid input';
//   }

//   validateForm() {
//     const inputs = this.form.querySelectorAll('input:not([name="honeypot"]), textarea');
//     return Array.from(inputs).every(input => this.validateField(input));
//   }

//   async submitForm(formData) {
//     console.log('Form submission data:', formData);

//     // Simulate API call with a delay
//     await new Promise(resolve => setTimeout(resolve, 1000));

//     // Simulate successful response
//     return {
//       status: 'success',
//       message: 'Form submitted successfully (local test)'
//     };
//   }

//   setupSubmitHandler() {
//     this.form.addEventListener('submit', async (event) => {
//       event.preventDefault();

//       // Check honeypot
//       if (this.form.querySelector('#honeypot').value) {
//         console.log('Honeypot triggered - possible spam');
//         return;
//       }

//       if (!this.validateForm()) {
//         console.log('Form validation failed');
//         alert('Please fix the errors in the form');
//         return;
//       }

//       this.submitButton.disabled = true;
//       this.submitButton.textContent = 'Sending...';

//       try {
//         const formData = {
//           name: this.form.name.value.trim(),
//           email: this.form.email.value.trim(),
//           phone: this.form.phone.value.trim(),
//           message: this.form.message.value.trim(),
//         };

//         const result = await this.submitForm(formData);
//         console.log('Submission result:', result);

//         if (result.status === 'success') {
//           alert('Message sent successfully! (Local Test)');
//           this.form.reset();
//         } else {
//           throw new Error(result.message || 'Submission failed');
//         }
//       } catch (error) {
//         console.error('Submission error:', error);
//         alert('Error sending message. Please try again later.');
//       } finally {
//         this.submitButton.disabled = false;
//         this.submitButton.textContent = 'Send';
//       }
//     });
//   }
// }

// // Initialize the form handler
// document.addEventListener('DOMContentLoaded', () => {
//   new ContactForm('contact-form');
// });



class ContactForm {
  constructor(formId) {
    this.form = document.getElementById(formId);
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.validator = {
      email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      phone: (phone) => /^\+?[\d\s-]{10,15}$/.test(phone),
      name: (name) => /^[a-zA-Z\s]{2,50}$/.test(name),
      message: (message) => message.length <= 1000 && message.trim().length > 0
    };
    this.apiUrl = "https://script.google.com/macros/s/AKfycbwcoYUKZAww-TtubiwNAL-MNo9DfN_X8qM3bfe84F-yWZ6U2m6NPIhCr3HOdZumAXC8pw/exec";
    this.setupFormValidation();
    this.setupSubmitHandler();
  }

  setupFormValidation() {
    const inputs = this.form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        this.validateField(input);
      });
    });
  }

  validateField(input) {
    const value = input.value.trim();
    const validationMessage = input.parentElement.querySelector('.validation-message')
      || this.createValidationMessage(input);

    if (input.name === 'honeypot') return true;

    if (!this.validator[input.name]?.(value)) {
      input.classList.add('invalid');
      validationMessage.textContent = this.getErrorMessage(input.name);
      validationMessage.style.display = 'block';
      return false;
    }

    input.classList.remove('invalid');
    validationMessage.style.display = 'none';
    return true;
  }

  createValidationMessage(input) {
    const message = document.createElement('div');
    message.className = 'validation-message';
    input.parentElement.appendChild(message);
    return message;
  }

  getErrorMessage(fieldName) {
    const messages = {
      name: 'Name should only contain letters and be 2-50 characters long',
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number (10-15 digits)',
      message: 'Message should be between 1 and 1000 characters'
    };
    return messages[fieldName] || 'Invalid input';
  }

  validateForm() {
    const inputs = this.form.querySelectorAll('input:not([name="honeypot"]), textarea');
    return Array.from(inputs).every(input => this.validateField(input));
  }

  async submitForm(formData) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        mode: 'no-cors',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Handle no-cors mode response
      if (response.type === 'opaque') {
        // Google Apps Script in no-cors mode always returns opaque response
        return { status: 'success', message: 'Form submitted successfully' };
      }

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Submission error:', error);
      throw new Error('Failed to submit form');
    }
  }

  setupSubmitHandler() {
    this.form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Check honeypot
      if (this.form.querySelector('#honeypot').value) {
        return;
      }

      if (!this.validateForm()) {
        alert('Please fix the errors in the form');
        return;
      }

      this.submitButton.disabled = true;
      this.submitButton.textContent = 'Sending...';

      try {
        const formData = {
          name: this.form.name.value.trim(),
          email: this.form.email.value.trim(),
          phone: this.form.phone.value.trim(),
          message: this.form.message.value.trim(),
        };

        const result = await this.submitForm(formData);

        if (result.status === 'success') {
          alert('Message sent successfully!');
          this.form.reset();
        } else {
          throw new Error(result.message || 'Submission failed');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Error sending message. Please try again later.');
      } finally {
        this.submitButton.disabled = false;
        this.submitButton.textContent = 'Send';
      }
    });
  }
}

// Initialize the form handler
document.addEventListener('DOMContentLoaded', () => {
  new ContactForm('contact-form');
});