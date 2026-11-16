// Sends the contact form in place with pageclip.js and confirms on the page.
// Without pageclip.js the form still posts normally to the same Pageclip URL.
(function () {
  var form = document.querySelector('form[action^="https://send.pageclip.co/"]');
  if (!form || !window.Pageclip) return;
  var status = form.querySelector('.form-status');

  window.Pageclip.form(form, {
    onSubmit: function () {
      if (status) status.textContent = '';
      form.classList.add('is-sending');
    },
    onResponse: function (error) {
      form.classList.remove('is-sending');
      if (error) {
        if (status) status.textContent = 'Something went wrong. Please try again, or email mail@dilshadkallingal.com.';
        return false;
      }
    },
    successTemplate: '<p class="form-thanks"><span class="form-thanks__title">Thank you.</span>Your message has been sent. I will be in touch soon.</p>'
  });
})();
