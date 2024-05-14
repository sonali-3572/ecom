const userId = localStorage.getItem('userId');
const body = document.querySelector('body');
body.dataset.userId = userId;

function showPopup(message, duration = 5000) {
  console.log('popup message ', message);
  const popup = document.getElementById('popup');
  popup.textContent = message;
  popup.classList.remove('hidden');
  setTimeout(() => {
    popup.classList.add('hidden');
  }, duration);
}

var username = localStorage.getItem('username');
document.querySelector('.profileImage').textContent = username
  .substring(0, 1)
  .toUpperCase();
document.getElementById('username').value = username;

document.addEventListener('DOMContentLoaded', function () {
  var userId = localStorage.getItem('userId');
  if (!userId) {
    window.location.href = '/';
  } else {
    body.dataset.userId = userId;
    fetchCategories();
    fetchProducts();
    updateCartUI();
    fetchUserDetails(userId);
  }
});

document.querySelector('.profile').addEventListener('click', function () {
  const overlay = document.querySelector('.overlay');
  overlay.classList.remove('hidden');
  const profilePage = document.querySelector('.profilePage');
  profilePage.classList.remove('hidden');
});

document.querySelector('.logout').addEventListener('click', function () {
  if (confirm('Are you sure you want to logout?')) {
    window.addEventListener('beforeunload', function (e) {
      localStorage.clear();
    });
    window.location.href = '/';
  }
});

// to fetch all categories
function fetchCategories() {
  fetch('/categories')
    .then((response) => response.json())
    .then((data) => {
      const categoriesDiv = document.querySelector('.categories');
      categoriesDiv.innerHTML = `<h2 class="categoryHeading">Categories</h2>`;
      const categoriesHTML = data
        .map(
          (
            category
          ) => `<div class="category__item category" data-category-id="${category.sectionId}">
        <div class="imgContainer">
          <img class="imgContainer_img"
            src="${category.image}"
          />
        </div>
        <div class="categoryDetails">${category.name}</div>
      </div>`
        )
        .join('');
      categoriesDiv.innerHTML += categoriesHTML;

      const categoryHeading = document.querySelector('.categoryHeading');
      categoryHeading.addEventListener('click', function () {
        fetchProducts();
      });
    })
    .catch((err) => console.error(err));
}

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('productBtn')) {
    const addBtnContainer = e.target.closest('.addbtn');
    const productAndButton = addBtnContainer.parentElement;
    const productDetails = productAndButton.parentElement;
    const productContainer = productDetails.parentElement;
    const productId = productContainer.dataset.productId;

    const countDiv = document.createElement('div');
    countDiv.classList.add('countDiv');

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    minusBtn.classList.add('minusBtn');

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.classList.add('plusBtn');

    const countDisplay = document.createElement('div');
    countDisplay.textContent = '1';
    countDisplay.classList.add('countDisplay');

    countDiv.appendChild(minusBtn);
    countDiv.appendChild(countDisplay);
    countDiv.appendChild(plusBtn);

    addBtnContainer.replaceWith(countDiv);
    addToDbCart(userId, productId);
    // fetchCartDetails(userId);
  }
});

async function addToDbCart(userId, productId) {
  try {
    const response = await fetch('/addToDbCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        productQuantity: 1,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to add item to cart db');
    }

    // Recalculate total price after adding to cart
    calculateTotalPrice();
    updateCartUI();
  } catch (error) {
    console.error(error);
  }
}

async function updateDataToCart(userId, productId, count) {
  try {
    const response = await fetch('/updateToDbCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
        productQuantity: count,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to update item quantity in the cart database');
    }

    // Recalculate total price after updating cart
    calculateTotalPrice();
    updateCartUI();
  } catch (error) {
    console.error(error);
  }
}

async function deleteDataFromCart(userId, productId) {
  try {
    const response = await fetch('/deleteFromDbCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: userId,
        productId: productId,
      }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete item from db cart');
    }

    calculateTotalPrice();
    updateCartUI();
  } catch (error) {
    console.error(error);
  }
}

document.querySelector('.cart').addEventListener('click', function () {
  fetchCartDetails(userId);
  document.querySelector('.overlay').classList.remove('hidden');
  document.querySelector('.sidePage').classList.remove('hidden');
});

document.querySelector('.notifications').addEventListener('click', function () {
  fetchMessages(userId);
  document.querySelector('.overlay').classList.remove('hidden');
  document.querySelector('.notificationSection').classList.remove('hidden');
});

const closeCart = function () {
  document.querySelector('.overlay').classList.add('hidden');
  document.querySelector('.sidePage').classList.add('hidden');
  document.querySelector('.notificationSection').classList.add('hidden');
  document.querySelector('.profilePage').classList.add('hidden');
  history.replaceState(null, null, window.location.pathname);
};

async function fetchCartDetails(userId) {
  // let totalPrice = 0;
  try {
    const response = await fetch(`/cart/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart details');
    }
    const cartItems = await response.json();
    calculateTotalPrice(cartItems);
    const productDetails = await Promise.all(
      cartItems.map(async (item) => {
        const productResponse = await fetch(
          `/products/product/${item.productId}`
        );
        if (!productResponse.ok) {
          throw new Error(
            `Failed to fetch product details for productId: ${item.productId}`
          );
        }
        const product = await productResponse.json();
        const productWithQuantity = {
          ...product,
          quantity: item.productQuantity,
        };
        return productWithQuantity;
      })
    );
    displayCartItems(productDetails);
  } catch (error) {
    console.error('Error fetching cart details:', error);
  }
}

function displayCartItems(productDetails) {
  const cartSection = document.querySelector('.cartContainer');
  let cartHTML = '';
  if (productDetails.length === 0) {
    cartHTML = '<div class="emptyCartMessage">No products added to cart</div>';
  } else {
    cartHTML = productDetails
      .map((item) => {
        return `
        <div class="sidePageContainer productContainer" data-product-id="${item.productId}">
          <div class="sidePageContainer__image">
          <img src="${item.image}" alt="${item.name}" />
          </div>
          <div class="sidePageDetails">
          <div class="sidePageDetails_name">${item.name}</div>
          <div class="sidePageDetails_quantity">1kg</div>
          </div>
          <div class="countDiv sidePageButton"><button class="minusBtn">-</button><div class="countDisplay sidePageCount">${item.quantity}</div><button class="plusBtn">+</button></div>
          <div class="sidePageDetails_price">&#8377 ${item.rate}</div>
          </div>`;
      })
      .join('');
  }
  cartSection.innerHTML = cartHTML;
}

fetchCartDetails(userId);

document.querySelector('.categories').addEventListener('click', (event) => {
  const categoryItem = event.target.closest('.category__item');
  if (categoryItem) {
    const categoryId = categoryItem.dataset.categoryId;
    fetchProducts(categoryId);
  }
});

// Fetch products and cart items
async function fetchProducts(sectionId = null) {
  try {
    const userId = localStorage.getItem('userId');
    const [productsResponse, cartResponse, sectionNameResponse] =
      await Promise.all([
        fetch(sectionId ? `/products/${sectionId}` : '/products'),
        fetch(`/cart/${userId}`),
        sectionId ? fetchSectionName(sectionId) : Promise.resolve('Products'),
      ]);

    if (!productsResponse.ok || !cartResponse.ok) {
      throw new Error('Failed to fetch products or cart items');
    }

    const [products, cartItems, sectionName] = await Promise.all([
      productsResponse.json(),
      cartResponse.json(),
      sectionNameResponse,
    ]);

    // Map cart item productIds for quick lookup
    const cartItemIds = cartItems.map((item) => item.productId);

    // Render products with appropriate buttons
    renderProducts(products, cartItemIds, cartItems);
    document.querySelector('.products__heading').textContent = sectionName;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

// Render products with appropriate buttons
function renderProducts(products, cartItemIds, cartItems) {
  const productsDiv = document.querySelector('.products');
  const productsHTML = products
    .map((product) => {
      const isInCart = cartItemIds.includes(product.productId);
      const cartItem = cartItems.find(
        (item) => item.productId === product.productId
      );
      const quantity = cartItem ? cartItem.productQuantity : 0;

      const addButtonHTML = isInCart
        ? `
      <div class="countDiv">
      <button class="minusBtn">-</button>
      <div class="countDisplay">${quantity}</div>
      <button class="plusBtn">+</button>
      </div>`
        : `<div class="addbtn btn"><button class="productBtn">Add</button></div>`;

      return `<div class="product__container productContainer" data-product-id="${product.productId}">
        <div class="product__image">
        <img src="${product.image}"/>
        </div>
        <div class="product__details">
        <div class="product_name">${product.name}</div>
        <div class="product_quantity">1 Kg</div>
        <div class="productAndBtn">
        <div class="product_rate">&#8377 ${product.rate}</div>
        ${addButtonHTML}
        </div>
        </div>
        </div>`;
    })
    .join('');

  productsDiv.innerHTML = `<h2 class="products__heading">Products</h2>
      <div class="product__list">${productsHTML}</div>`;
}
// document.addEventListener('DOMContentLoaded', fetchProducts);

async function fetchSectionName(sectionId) {
  try {
    const response = await fetch(`/categories/${sectionId}`);
    const data = await response.text();
    return data;
  } catch (err) {
    return 'Products';
  }
}

document.addEventListener('click', function (e) {
  const plusBtn = e.target.closest('.plusBtn');
  if (plusBtn) {
    const countDisplay = plusBtn.previousElementSibling;
    const count = parseInt(countDisplay.textContent);
    const newCount = count + 1;
    countDisplay.textContent = newCount;

    // Update quantity in the product list
    const productContainer = plusBtn.closest('.productContainer');
    const productId = productContainer.dataset.productId;
    updateProductQuantity(productId, newCount);

    // Update quantity in the cart
    updateDataToCart(userId, productId, newCount);
  }
});

document.addEventListener('click', function (e) {
  const minusBtn = e.target.closest('.minusBtn');
  if (minusBtn) {
    const countDisplay = minusBtn.nextElementSibling;
    const count = parseInt(countDisplay.textContent);
    if (count > 1) {
      const newCount = count - 1;
      countDisplay.textContent = newCount;

      // Update quantity in the product list
      const productContainer = minusBtn.closest('.productContainer');
      const productId = productContainer.dataset.productId;
      updateProductQuantity(productId, newCount);

      // Update quantity in the cart
      updateDataToCart(userId, productId, newCount);
    } else if (count === 1) {
      const productContainer = e.target.closest('.productContainer');
      const container = productContainer.classList.contains(
        'product__container'
      )
        ? 'product__container'
        : 'sidePageContainer';
      const productId = productContainer.dataset.productId;
      if (container === 'product__container') {
        const productAndBtn = productContainer.querySelector('.productAndBtn');
        productAndBtn.removeChild(e.target.parentElement);
        newHTML =
          '<div class="addbtn btn"><button class="productBtn">Add</button></div>'; // Replace with add button HTML
        productAndBtn.innerHTML += newHTML;
        deleteDataFromCart(userId, productId);
      } else if (container === 'sidePageContainer') {
        productContainer.remove();
        deleteDataFromCart(userId, productId);
        const correspondingProductContainer = document.querySelector(
          `.productContainer[data-product-id="${productId}"]`
        );
        const productAndBtn =
          correspondingProductContainer.querySelector('.productAndBtn');
        const countDiv = productAndBtn.querySelector('.countDiv');
        countDiv.remove('countDiv');
        newHTML =
          '<div class="addbtn btn"><button class="productBtn">Add</button></div>'; // Replace with add button HTML
        productAndBtn.innerHTML += newHTML;
      }
    }
  }
});

function updateProductQuantity(productId, newCount) {
  const productContainer = document.querySelector(
    `.product__container[data-product-id="${productId}"]`
  );
  const countDisplay = productContainer.querySelector('.countDisplay');
  countDisplay.textContent = newCount;
}

async function calculateTotalPrice() {
  let totalPrice = 0;
  let totalItems = 0;
  try {
    const response = await fetch(`/cart/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart items');
    }
    const cartItems = await response.json();
    for (const item of cartItems) {
      const productResponse = await fetch(
        `/products/product/${item.productId}`
      );
      if (!productResponse.ok) {
        throw new Error(
          `Failed to fetch product details for productId: ${item.productId}`
        );
      }
      const productDetails = await productResponse.json();
      const subtotal = productDetails.rate * item.productQuantity;
      totalPrice += subtotal;

      totalItems += item.productQuantity;
      const cartSpan = document.querySelector('.cartSpan');
      cartSpan.textContent = totalItems;
    }
    return { totalPrice, totalItems };
  } catch (error) {
    console.error('Error calculating total price:', error);
  }
}

async function updateCartUI() {
  try {
    const { totalPrice, totalItems } = await calculateTotalPrice();

    const cartSpan = document.querySelector('.cartSpan');
    if (totalItems === 0) {
      const cartSection = document.querySelector('.cartContainer');
      let cartHTML = '';
      cartHTML =
        '<div class="emptyCartMessage">No products added to cart</div>';
      cartSection.innerHTML = cartHTML;
      cartSpan.style.display = 'none';
    } else {
      cartSpan.style.display = 'inline-block';
    }

    // Update total amount inside the cart container
    const totalAmountElement = document.querySelector('.totalAmount');
    const orderButton = document.querySelector('.orderButton');
    if (totalPrice > 0) {
      totalAmountElement.style.display = '';
      orderButton.style.display = '';
      totalAmountElement.textContent = 'Subtotal: ₹' + totalPrice.toFixed(2);
    } else if (totalPrice === 0) {
      totalAmountElement.style.display = 'none';
      orderButton.style.display = 'none';
    }
  } catch (error) {
    console.error('Error updating cart UI:', error);
  }
}

async function fetchUserDetails(userId) {
  try {
    const response = await fetch(`/getUserDetails/${userId}`);
    if (!response.ok) {
      throw new Error('User details not found');
    }
    const data = await response.json();
    console.log('User details:', data);
    document.querySelector('.profileImage').style.backgroundColor =
      data.backgroundColor;
    document.getElementById('fullName').value = data.fullName;
    document.getElementById('username').value = data.user.username;
    document.getElementById('email').value = data.email;
    document.getElementById('date').value = data.dateOfBirth;
    document.getElementById('address').value = data.address;
    return data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error; //
  }
}

document
  .getElementById('userForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault();
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const dateOfBirth = document.getElementById('date').value;
    const address = document.getElementById('address').value;

    const updatedUserDetail = {
      fullName,
      email,
      dateOfBirth,
      address,
    };

    try {
      const response = await fetch(`/updateUserDetails/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUserDetail),
      });
      if (!response.ok) {
        throw new Error('Failed to update user details');
      }

      const data = await response.json();
      fetchUserDetails(userId);
      showPopup('Your profile has been updated successfully!');
    } catch (err) {
      console.error('Error updating user details:', err);
    }
  });

document
  .querySelector('.orderButton')
  .addEventListener('click', async function () {
    try {
      const response = await fetch(`/cart/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const cartItems = await response.json();

      if (cartItems.length > 0) {
        const { totalPrice, totalItems } = await calculateTotalPrice();
        const orderDetails = {
          userId: userId,
          orderDate: new Date().toISOString().split('T')[0],
          totalAmount: totalPrice,
          orderStatus: 'Pending',
        };

        const saveOrderResponse = await fetch('/saveOrder', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderDetails),
        });
        if (!saveOrderResponse) {
          throw new Error('Failed to save order details');
        }
        const data = await saveOrderResponse.json();

        for (const item of cartItems) {
          const productResponse = await fetch(
            `/products/product/${item.productId}`
          );
          if (!productResponse.ok) {
            throw new Error(
              `Failed to fetch product details for productId: ${item.productId}`
            );
          }
          const productDetails = await productResponse.json();
          const amount = productDetails.rate * item.productQuantity;

          const orderItemDetails = {
            orderId: data.orderId,
            userId: data.userId,
            productId: item.productId,
            quantity: item.productQuantity,
            unitPrice: amount,
          };

          const saveOrderItemResponse = await fetch('/saveOrderItem', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderItemDetails),
          });
          if (!saveOrderItemResponse.ok) {
            throw new Error('Failed to save order item details');
          }
          const savedOrderItem = await saveOrderItemResponse.json();
          deleteDataFromCart(userId, item.productId);
        }

        sendMessage(
          userId,
          data.orderId,
          `Your order has been placed with order Id ${data.orderId}`
        );
      }
      closeCart();
      fetchProducts();
      updateCartUI();
      fetchUserDetails(userId);
      showPopup(
        'Your order has been placed. Please check message section for your orderId.'
      );
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again later.');
    }
  });

async function fetchMessages(userId) {
  try {
    const response = await fetch(`/notifications/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch messages');
    }
    const messages = await response.json();
    console.log(messages);
    displayMessages(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
  }
}

function displayMessages(messages) {
  const messageSection = document.querySelector('.messageContainer');
  let messageHTML = '';
  if (messages.length === 0) {
    messageHTML = '<div class="noMessages">No messages available.</div>';
  } else {
    messages.reverse();
    messageHTML = messages
      .map((message) => {
        const messageTime = calculateTimeDifference(
          new Date(message.createdAt)
        );
        return `
        <div class="inbox" data-order-id="${message.orderId}">
          <p>
            ${message.message}
          </p>
          <p>${messageTime}</p>
        </div>`;
      })
      .join('');
  }
  messageSection.innerHTML = messageHTML;
}

function calculateTimeDifference(createdAt) {
  const currentTime = new Date();
  const differenceInSeconds = Math.floor((currentTime - createdAt) / 1000);
  if (differenceInSeconds < 60) {
    return `${differenceInSeconds} sec`;
  } else if (differenceInSeconds < 3600) {
    const minutes = Math.floor(differenceInSeconds / 60);
    return `${minutes} min${minutes > 1 ? 's' : ''}`;
  } else if (differenceInSeconds < 86400) {
    const hours = Math.floor(differenceInSeconds / 3600);
    return `${hours} hr${hours > 1 ? 's' : ''}`;
  } else if (differenceInSeconds < 86400 * 5) {
    const days = Math.floor(differenceInSeconds / 86400);
    return `${days} day${days > 1 ? 's' : ''}`;
  } else {
    return '+5 days';
  }
}

async function sendMessage(userId, orderId, message) {
  try {
    const response = await fetch('/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, orderId, message }),
    });
    if (!response.ok) {
      throw new Error('Failed to send message');
    }
    console.log('Message sent successfully');
  } catch (error) {
    console.error('Error sending message:', error);
  }
}
