document.addEventListener('DOMContentLoaded', function () {
  changeHeading(); // Call changeHeading function on page load to set initial heading
});

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

var loginContainer = document.querySelector('.login-container');
var overlay = document.querySelector('.overlay');
document.querySelector('.loggingBtn').addEventListener('click', function () {
  overlay.classList.remove('hidden');
  loginContainer.classList.remove('hidden');
  loginContainer.style.opacity = 12;
});

document
  .querySelector('.loginBtn')
  .addEventListener('click', async function () {
    overlay.classList.add('hidden');
    loginContainer.classList.add('hidden');
    loginContainer.style.opacity = 1;

    var selectType = document.querySelector('#userType').value;
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    const login = async () => {
      try {
        const response = await fetch('/loginDetail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, userType: selectType }),
        });
        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        } else {
          const data = await response.text();
          console.log(data);
          if (data === 'Login successful as Admin') {
            window.location.href = '/adminDashboard.html';
          } else if (data === 'Login successful as Customer') {
            window.location.href = '/customerDashboard.html';
          } else {
            alert(data);
          }
        }
      } catch (err) {
        console.error('Error:', err);
        alert(err.message || 'An error occurred while logging in.');
      }
    };

    await login(); // Wait for the login function to complete
  });

document.querySelector('.registerBtn').addEventListener('click', function () {
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
      console.log('Response:', response);
      if (response.ok) {
        window.location.href = '/dashboard.html';
      } else {
        throw new Error('Failed to register');
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

  overlay.classList.add('hidden');
  loginContainer.classList.add('hidden');

  loginContainer.style.opacity = 1;
});
