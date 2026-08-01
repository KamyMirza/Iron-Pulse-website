// ===== Contact Form Validation =====
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault(); 

    let isValid = true;

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');

    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

    if (name.value.trim() === '') {
      document.getElementById('name-error').textContent = 'Please enter your name.';
      isValid = false;
    }

    if (email.value.trim() === '' || !email.value.includes('@')) {
      document.getElementById('email-error').textContent = 'Please enter a valid email.';
      isValid = false;
    }

    if (subject.value.trim() === '') {
      document.getElementById('subject-error').textContent = 'Please enter a subject.';
      isValid = false;
    }

    if (message.value.trim() === '') {
      document.getElementById('message-error').textContent = 'Please enter a message.';
      isValid = false;
    }

    if (isValid) {
      document.getElementById('form-success').textContent = 'Message sent! We\'ll get back to you soon.';
      contactForm.reset();
    }
  });
}