import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  if (delay < 0) {
    iziToast.warning({
      title: '⚠️ Warning',
      message: 'Please enter a positive delay.',
      position: 'topRight',
      timeout: 3000,
      progressBar: true,
      color: 'yellow',
    });
    return;
  }

  createPromise(delay, state)
    .then(message => {
      iziToast.success({
        message,
        position: 'topRight',
        timeout: 3000,
        progressBar: true,
        backgroundColor: '#32CD32',
        messageColor: '#fff',
      });
    })
    .catch(error => {
      iziToast.error({
        message: error,
        position: 'topRight',
        timeout: 3000,
        progressBar: true,
        backgroundColor: '#e74c3c',
        messageColor: '#fff',
      });
    });

  form.reset();
});

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}
