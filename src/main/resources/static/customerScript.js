document.querySelector('.logout').addEventListener('click', function () {
  console.log('logout  button clicked');
  if (confirm('Are you sure you want to logout?')) {
    window.location.href = '/';
  }
});

document.querySelector('.profile').addEventListener('click', function () {
  console.log('profile button clicked');
});

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

      fetchProductByCategory();
    })
    .catch((err) => console.log(err));
}
document.addEventListener('DOMContentLoaded', fetchCategories);

function fetchProducts() {
  fetch('/products')
    .then((response) => response.json())
    .then((data) => {
      const productsDiv = document.querySelector('.products');
      const productsHTML = data
        .map(
          (product) => `<div class="product__container">
        <div class="product__image">
          <img src="${product.image}"/>
        </div>
        <div class="product__details">
          <div class="product_name">${product.name}</div>
          <div class="product_quantity">1 Kg</div>
          <div class="productAndBtn">
            <div class="product_rate">&#8377 ${product.rate}</div>
            <div class="addbtn btn"><button>Add</button></div>
          </div>
        </div>
      </div>`
        )
        .join('');

      productsDiv.innerHTML = `<h2 class="products__heading">Products</h2>
        <div class="product__list">${productsHTML}</div>`;
      // productsDiv.innerHTML += productsHTML;
    })
    .catch((err) => console.log(err));
}
document.addEventListener('DOMContentLoaded', fetchProducts);

async function fetchProductByCategory(sectionId) {
  try {
    let url = `/products`;
    if (sectionId) {
      url = `/products/${sectionId}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    const productsDiv = document.querySelector('.products');
    const productsHTML = data
      .map(
        (
          product
        ) => `<div class="product__container" data_product_id="${product.productId}">
          <div class="product__image">
            <img src="${product.image}"/>
          </div>
          <div class="product__details">
            <div class="product_name">${product.name}</div>
            <div class="product_quantity">1 Kg</div>
            <div class="productAndBtn">
              <div class="product_rate">&#8377 ${product.rate}</div>
              <div class="addbtn btn"><button class="productBtn">Add</button></div>
            </div>
          </div>
        </div>`
      )
      .join('');

    let sectionName = 'Products'; // Default value
    if (sectionId) {
      sectionName = await fetchSectionName(sectionId);
    }

    productsDiv.innerHTML = `<h2 class="products__heading">${sectionName}</h2>
      <div class="product__list">${productsHTML}</div>`;
  } catch (err) {
    console.error(err);
  }
}

// Event delegation for handling click events on category items
document.querySelector('.categories').addEventListener('click', (event) => {
  const categoryItem = event.target.closest('.category__item');
  if (categoryItem) {
    const categoryId = categoryItem.dataset.categoryId;
    fetchProductByCategory(categoryId);
  }
});

// fetch section name using sectionId
async function fetchSectionName(sectionId) {
  try {
    const response = await fetch(`/categories/${sectionId}`);
    const data = await response.text();
    return data;
  } catch (err) {
    return 'Products';
  }
}

function decrementCount(displayCount, productId) {
  let count = parseInt(displayCount.textContent);
  const parent = displayCount.parentElement;
  if (parent.classList.contains('sidePageButton')) {
    if (count > 1) {
      count--;
      displayCount.textContent = count;

      const productPageCount = fetchDisplayCountForCart(productId);

      const productContainers = document.querySelectorAll(
        '.product__container'
      );
      productContainers.forEach((productContainer) => {
        const containerProductId =
          productContainer.getAttribute('data_product_id');
        if (parseInt(containerProductId) === productId) {
          const container = productContainer.querySelector('.countDisplay');
          container.textContent = parseInt(productPageCount);
        }
      });
      updateDataToCart(1, productId, count);
    } else {
      const parentContainer = parent.parentElement;

      parentContainer.remove();

      const productContainers = document.querySelectorAll(
        '.product__container'
      );
      productContainers.forEach((productContainer) => {
        const containerProductId =
          productContainer.getAttribute('data_product_id');
        if (parseInt(containerProductId) === productId) {
          const displayCount = productContainer.querySelector('.countDisplay');
          const countDiv = displayCount.parentElement;
          const productAndBtn = countDiv.parentElement;
          const addBtnContainer = document.createElement('div');
          addBtnContainer.classList.add('addbtn', 'btn');
          const addBtn = document.createElement('button');
          addBtn.classList.add('productBtn');
          addBtn.textContent = 'Add';
          addBtnContainer.appendChild(addBtn);
          countDiv.replaceWith(addBtnContainer);
        }
      });
      countCartItem();
      deleteDataFromCart(1, productId);
    }
  } else {
    if (count > 1) {
      count--;
      displayCount.textContent = count;

      const sidePageCount = fetchDisplayCount(productId);
      const cartContainers = document.querySelectorAll('.sidePageContainer');
      cartContainers.forEach((cartContainer) => {
        const containerProductId =
          cartContainer.getAttribute('data_product_id');

        if (containerProductId === productId) {
          const container = cartContainer.querySelector('.sidePageCount');
          container.textContent = parseInt(sidePageCount);
        }
      });

      updateDataToCart(1, productId, count);
    } else {
      const countDiv = displayCount.parentElement;
      const productAndBtn = countDiv.parentElement;
      const addBtnContainer = document.createElement('div');
      addBtnContainer.classList.add('addbtn', 'btn');
      const addBtn = document.createElement('button');
      addBtn.classList.add('productBtn');
      addBtn.textContent = 'Add';
      // addBtn.addEventListener('click', replaceWithCountDiv);
      addBtnContainer.appendChild(addBtn);
      countDiv.replaceWith(addBtnContainer);

      const cartContainers = document.querySelectorAll('.sidePageContainer');
      cartContainers.forEach((cartContainer) => {
        const containerProductId =
          cartContainer.getAttribute('data_product_id');
        if (containerProductId === productId) {
          const container = cartContainer.querySelector('.sidePageCount');
          cartContainer.remove();
        }
      });
      deleteDataFromCart(1, productId);
      countCartItem();
    }
  }
}

function incrementCount(displayCount, productId) {
  const parent = displayCount.parentElement;
  let count = parseInt(displayCount.textContent);
  count++;
  if (parent.classList.contains('sidePageButton')) {
    displayCount.textContent = count;
    const productPageCount = fetchDisplayCountForCart(productId);
    const productContainers = document.querySelectorAll('.product__container');
    productContainers.forEach((productContainer) => {
      const containerProductId =
        productContainer.getAttribute('data_product_id');
      if (parseInt(containerProductId) === productId) {
        const container = productContainer.querySelector('.countDisplay');
        container.textContent = parseInt(productPageCount);
      }
    });
  } else {
    displayCount.textContent = count;
    const sidePageCount = fetchDisplayCount(productId);

    const cartContainers = document.querySelectorAll('.sidePageContainer');
    cartContainers.forEach((cartContainer) => {
      const containerProductId = cartContainer.getAttribute('data_product_id');

      if (containerProductId === productId) {
        const container = cartContainer.querySelector('.sidePageCount');
        container.textContent = parseInt(sidePageCount);
      }
    });
  }
  updateDataToCart(1, productId, count);
}

document.addEventListener('click', function (e) {
  if (e.target.classList.contains('productBtn')) {
    const addBtnContainer = e.target.closest('.addbtn');
    const productAndButton = addBtnContainer.parentElement;
    const productDetails = productAndButton.parentElement;
    const productContainer = productDetails.parentElement;
    const productId = productContainer.getAttribute('data_product_id');

    const countDiv = document.createElement('div');
    countDiv.classList.add('countDiv');

    const minusBtn = document.createElement('button');
    minusBtn.textContent = '-';
    minusBtn.classList.add('minusBtn');
    minusBtn.addEventListener('click', function () {
      decrementCount(countDisplay, productId);
    });

    const plusBtn = document.createElement('button');
    plusBtn.textContent = '+';
    plusBtn.classList.add('plusBtn');
    plusBtn.addEventListener('click', function () {
      incrementCount(countDisplay, productId);
    });

    const countDisplay = document.createElement('div');
    countDisplay.textContent = '1';
    countDisplay.classList.add('countDisplay');

    countDiv.appendChild(minusBtn);
    countDiv.appendChild(countDisplay);
    countDiv.appendChild(plusBtn);

    addBtnContainer.replaceWith(countDiv);

    addToCart(productContainer);
  }
});

function addToCart(productContainer) {
  // Get the values from the productContainer
  const productName =
    productContainer.querySelector('.product_name').textContent;
  const productQuantity =
    productContainer.querySelector('.product_quantity').textContent;
  const productRate =
    productContainer.querySelector('.product_rate').textContent;
  const productImage = productContainer.querySelector(
    '.product__image img'
  ).src;
  const count = productContainer.querySelector('.countDisplay').textContent;
  const productId = productContainer.getAttribute('data_product_id');

  // Create the innerHTML string with the dynamic values
  const innerHTML = `
    <div class="sidePageContainer" data_product_id="${productId}">
      <div class="sidePageContainer__image">
        <img src="${productImage}" alt="${productName}" />
      </div>
      <div class="sidePageDetails">
        <div class="sidePageDetails_name">${productName}</div>
        <div class="sidePageDetails_quantity">${productQuantity}</div>
      </div>
      <div class="countDiv sidePageButton"><button class="minusBtn" onClick="decrementCount(this.nextElementSibling,${productId})">-</button><div class="countDisplay sidePageCount">${count}</div><button class="plusBtn" onClick="incrementCount(this.previousElementSibling,${productId})">+</button></div>
      <div class="sidePageDetails_price">${productRate}</div>
    </div>`;

  const sidePage = document.querySelector('.sidePage');
  sidePage.innerHTML += innerHTML;

  addToDbCart(1, productId, count);
  countCartItem();
}

function fetchDisplayCount(productId) {
  const productContainers = document.querySelectorAll('.product__container');
  let displayCount = NaN;

  productContainers.forEach((productContainer) => {
    const containerProductId = productContainer.getAttribute('data_product_id');
    if (containerProductId === productId) {
      displayCount =
        productContainer.querySelector('.countDisplay').textContent;
    }
  });
  return displayCount;
}

function fetchDisplayCountForCart(productId) {
  const cartContainers = document.querySelectorAll('.sidePageContainer');
  let displayCount = NaN;

  cartContainers.forEach((cartContainer) => {
    const containerProductId = cartContainer.getAttribute('data_product_id');
    if (parseInt(containerProductId) === productId) {
      displayCount = cartContainer.querySelector('.sidePageCount').textContent;
    }
  });
  return displayCount;
}

function addToDbCart(userId, productId, count) {
  fetch('/addToDbCart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      productId: productId,
      productQuantity: count,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log('Failed to add item to cart db');
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateDataToCart(userId, productId, count) {
  fetch('/updateToDbCart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      productId: productId,
      productQuantity: count,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log('Failed to add item to cart db');
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function deleteDataFromCart(userId, productId) {
  fetch('/deleteFromDbCart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      userId: userId,
      productId: productId,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.log('Failed to add item to cart db');
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

async function fetchCartDetails(userId) {
  try {
    const response = await fetch(`/cart/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch cart details');
    }
    const cartItems = await response.json();
    // Process and render cart items as needed
  } catch (error) {
    console.error('Error fetching cart details:', error);
  }
}

fetchCartDetails('1');

document.querySelector('.cart').addEventListener('click', function () {
  // document.querySelector('.sidePage').classList.add('active');
  document.querySelector('.overlay').classList.remove('hidden');
  document.querySelector('.sidePage').classList.remove('hidden');
});

// document.querySelector('.close-button').addEventListener('click', function () {
//   // document.querySelector('.sidePage').classList.add('active');
//   console.log('button clicked');
//   document.querySelector('.overlay').classList.add('hidden');
//   document.querySelector('.sidePage').classList.add('hidden');
// });

const closeCart = function () {
  document.querySelector('.overlay').classList.add('hidden');
  document.querySelector('.sidePage').classList.add('hidden');
  history.replaceState(null, null, window.location.pathname);
};

function countCartItem() {
  const parentDiv = document.querySelector('.sidePage');
  const noOfChildren = parentDiv.children.length;

  if (noOfChildren == 3) {
    document.querySelector('.cartSpan').style.display = 'none';
    document.querySelector('.emptyCartMessage').style.display = '';
  } else {
    document.querySelector('.cartSpan').style.display = '';
    document.querySelector('.emptyCartMessage').style.display = 'none';
    const changeCartcount = (document.querySelector('.cartSpan').textContent =
      noOfChildren - 3);
  }
}
countCartItem();
