document.addEventListener('DOMContentLoaded', function () {
  changeHeading();
});
// window.addEventListener('beforeunload', function (event) {
//   localStorage.clear();
// });

var content = [
  'Wide selection, delivered fresh. Shop online for all your grocery needs, from pantry staples to seasonal delights.',
  'Discover the freshest produce, the finest cuts of meat, and the most delicious baked goods.',
  'Experience convenience like never before. Order groceries online and have them delivered straight to your doorstep.',
];

var randomNum = Math.floor(Math.random() * content.length);
const paraDynamic = document.querySelector('.details__para');
paraDynamic.textContent = content[randomNum];

function changeHeading() {
  var selectType = document.querySelector('#userType').value;
  var formHeading = document.querySelector('.formHeading');
  var registerBtn = document.querySelector('.registerBtn');

  console.log(selectType);
  if (selectType == 'admin') {
    formHeading.textContent = 'Admin Login';
    registerBtn.style.visibility = 'hidden';
  } else if (selectType == 'customer') {
    formHeading.textContent = 'Customer Login';
    registerBtn.style.visibility = '';
  } else {
    formHeading.textContent = 'Login';
    registerBtn.style.visibility = '';
  }
}

var body = document.querySelector('body');
var loginContainer = document.querySelector('.login-container');
var overlay = document.querySelector('.overlay');
document.querySelector('.loggingBtn').addEventListener('click', function () {
  body.style.overflowY = 'hidden';
  overlay.classList.remove('hidden');
  loginContainer.classList.remove('hidden');
  loginContainer.style.opacity = 12;
});

document.querySelector('.loginBtn').addEventListener('click', function () {
  body.style.overflowY = 'scroll';
  overlay.classList.add('hidden');
  loginContainer.classList.add('hidden');
  loginContainer.style.opacity = 1;

  var selectType = document.querySelector('#userType').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // localStorage.setItem('userId', 'ASDF');
  // localStorage.setItem('userType', 'DDFFG');

  fetch('/loginDetail', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, userType: selectType }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse response as JSON
      } else {
        throw new Error('Login failed');
      }
    })
    .then((data) => {
      console.log(data);
      if (data.userType) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userType', data.userType);
        localStorage.setItem('username', username);
        console.log('Local Storage Data ' + localStorage.getItem('userId'));
        window.location.href =
          selectType === 'admin'
            ? '/adminDashboard.html'
            : '/customerDashboard.html';
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error); // Handle error
      alert('Login failed');
    });
});

document.querySelector('.registerBtn').addEventListener('click', function () {
  body.style.overflowY = 'scroll';
  overlay.classList.add('hidden');
  loginContainer.classList.add('hidden');
  loginContainer.style.opacity = 1;

  var selectType = document.querySelector('#userType').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  fetch('/createUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, userType: selectType }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json(); // Parse response as JSON
      } else {
        alert('User already exist. Please login...');
      }
    })
    .then((data) => {
      console.log(data);
      if (data.userType) {
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userType', data.userType);
        localStorage.setItem('username', username);
        console.log('Local Storage Data ' + localStorage.getItem('userId'));
        window.location.href = '/customerDashboard.html';
      } else {
        alert(data.message);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
});

document.querySelector('.close-button').addEventListener('click', function () {
  console.log('Cross button clicked');
  document.querySelector('#userType').value = 'select';
  document.getElementById('username').value = null;
  document.getElementById('password').value = '';
  body.style.overflowY = 'scroll';

  overlay.classList.add('hidden');
  loginContainer.classList.add('hidden');

  loginContainer.style.opacity = 1;
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var formData = {
    name: document.getElementById('nameContactForm').value,
    email: document.getElementById('emailContactForm').value,
    message: document.getElementById('messageContactForm').value,
  };

  fetch('/submitQuery', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (response.ok) {
        console.log(response);
        document.getElementById('nameContactForm').value = '';
        document.getElementById('emailContactForm').value = '';
        document.getElementById('messageContactForm').value = '';
      } else {
        console.error('Failed to send email');
        alert('Failed to send email');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Failed to send email');
    });
});
