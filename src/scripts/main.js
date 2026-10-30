'use strict';

const firstPromise = new Promise((resolve, reject) => {
  const timer = setTimeout(() => {
    reject(new Error('First promise was rejected'));
  }, 3000);

  document.addEventListener(
    'click',
    () => {
      clearTimeout(timer);
      resolve();
    },
    { once: true },
  );
});

const secondPromise = new Promise((resolve, reject) => {
  document.addEventListener(
    'click',
    () => {
      resolve();
    },
    { once: true },
  );

  document.addEventListener(
    'contextmenu',
    (e) => {
      e.preventDefault();
      resolve();
    },
    { once: true },
  );
});

const thirdPromise = new Promise((resolve, reject) => {
  let leftClicked = false;
  let rightClicked = false;

  document.addEventListener('click', () => {
    leftClicked = true;

    if (leftClicked && rightClicked) {
      resolve();
    }
  });

  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    rightClicked = true;

    if (leftClicked && rightClicked) {
      resolve();
    }
  });
});

firstPromise
  .then(() => {
    const success = document.createElement('div');

    success.classList.add('success');
    success.dataset.qa = 'notification';
    success.textContent = 'First promise was resolved';

    document.body.append(success);
  })
  .catch(() => {
    const error = document.createElement('div');

    error.classList.add('error');
    error.dataset.qa = 'notification';
    error.textContent = 'First promise was rejected';

    document.body.append(error);
  });

secondPromise
  .then(() => {
    const success = document.createElement('div');

    success.classList.add('success');
    success.dataset.qa = 'notification';
    success.textContent = 'Second promise was resolved';

    document.body.append(success);
  })
  .catch(() => {
    const error = document.createElement('div');

    error.classList.add('error');
    error.dataset.qa = 'notification';
    error.textContent = 'Second promise was rejected';

    document.body.append(error);
  });

thirdPromise
  .then(() => {
    const success = document.createElement('div');

    success.classList.add('success');
    success.dataset.qa = 'notification';
    success.textContent = 'Third promise was resolved';

    document.body.append(success);
  })
  .catch(() => {
    const error = document.createElement('div');

    error.classList.add('error');
    error.dataset.qa = 'notification';
    error.textContent = 'Third promise was rejected';

    document.body.append(error);
  });
