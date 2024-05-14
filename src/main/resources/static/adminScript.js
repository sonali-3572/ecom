const body = document.querySelector('body');
const userid = localStorage.getItem('userId');
body.dataset.userId = userid;

document.addEventListener('DOMContentLoaded', function () {
  var userId = localStorage.getItem('userId');
  if (!userId) {
    window.location.href = '/';
    fetchCategories();
    updateDashboard();
    renderOrderList();
  }

  const sideNavbar = document.querySelector('.sideNavbar');
  sideNavbar.addEventListener('click', function (event) {
    if (event.target.classList.contains('navbar-link')) {
      event.preventDefault();
      const targetId = event.target.getAttribute('href').substring(1);
      document.querySelectorAll('.displaySection').forEach(function (content) {
        content.style.display = 'none';
      });
      document.getElementById(targetId + 'Content').style.display = 'block';
    }
  });
});
fetchCategories();

document.querySelector('.profile').addEventListener('click', function () {
  const overlay = document.querySelector('.overlay');
  overlay.classList.remove('hidden');
  const profilePage = document.querySelector('.profilePage');
  profilePage.classList.remove('hidden');
});

document.querySelector('.logout').addEventListener('click', function () {
  console.log('logout  button clicked');
  if (confirm('Are you sure you want to logout?')) {
    window.addEventListener('beforeunload', function (e) {
      localStorage.clear();
    });
    window.location.href = '/';
  }
});

document.querySelector('.home').addEventListener('click', function () {
  document.querySelector('.categoryTable').classList.remove('hidden');
  document.querySelector('.overlay').classList.add('hidden');
});

function fetchCategories() {
  let rowCount = 1;
  fetch('/categories')
    .then((response) => response.json())
    .then((data) => {
      const categoriesDiv = document.querySelector('.tableBody');
      categoriesDiv.innerHTML = ``;
      const categoriesHTML = data
        .map(
          (category) => `<tr data-section-id="${category.sectionId}">
        <td >${category.sectionId}</td>
        <td>${rowCount++}</td>
        <td>${category.name}</td>
        <td><div class="buttons">
        <button class="btn editBtn">Edit</button>
        <button class="btn deleteBtn">Delete</button>
        <button class="btn addProductBtn" onclick="showAddProductForm('${
          category.name
        }',${category.sectionId})">Add Product</button>
        <button class="btn editProductDetailBtn" onclick="editProductDetail('${
          category.name
        }',${category.sectionId})">Edit Product Details</button>
      </div></td>
      </tr>`
        )
        .join('');
      categoriesDiv.innerHTML += categoriesHTML;

      // Add event listeners to delete buttons
      const deleteButtons = document.querySelectorAll('.deleteBtn');
      deleteButtons.forEach((button) => {
        button.addEventListener('click', function () {
          const sectionId = button.closest('tr').dataset.sectionId;
          const confirmed = confirm(
            'Are you sure you want to delete this category?'
          );
          if (confirmed) {
            deleteCategory(sectionId);
          }
        });
      });
    })
    .catch((err) => console.log(err));
}

function deleteCategory(sectionId) {
  fetch(`/deleteCategory/${sectionId}`, {
    method: 'DELETE',
  })
    .then((response) => {
      if (response.ok) {
        fetchCategories();
      } else {
        console.log('Failed to delete Category');
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

const closeForm = function () {
  document.querySelector('.overlay').classList.add('hidden');
  document.querySelector('.addProductForm').classList.add('hidden');
  document.querySelector('.addCategoryForm').classList.add('hidden');
  document.querySelector('.editProductDetailForm').classList.add('hidden');
  history.replaceState(null, null, window.location.pathname);
};

function showAddProductForm(name, sectionId) {
  console.log(name, sectionId);
  const overlay = document.querySelector('.overlay');
  const addProductForm = document.querySelector('.addProductForm');
  const formHeading = document.querySelector('.heading');
  const sectionid = document.getElementById('sectionId');
  sectionid.value = sectionId;

  formHeading.textContent = `Add ${name}`;
  overlay.classList.remove('hidden');
  addProductForm.classList.remove('hidden');
}

document
  .querySelector('.addProductForm__cancelBtn')
  .addEventListener('click', function () {
    const overlay = document.querySelector('.overlay');
    const addProductForm = document.querySelector('.addProductForm');
    // addProductForm.reset();
    console.log('cancel button clicked');
    overlay.classList.add('hidden');
    addProductForm.classList.add('hidden');
  });

// add Product form add button
document
  .querySelector('.addProductForm__addBtn')
  .addEventListener('click', function () {
    const overlay = document.querySelector('.overlay');
    const addProductForm = document.querySelector('.addProductForm');

    console.log('add button clicked');
    overlay.classList.add('hidden');
    addProductForm.classList.add('hidden');

    const productName = document.getElementById('productName').value;
    const sectionId = document.getElementById('sectionId').value;
    const manufactureDate = document.getElementById('manufactureDate').value;
    const expiryDate = document.getElementById('expiryDate').value;
    console.log(manufactureDate, expiryDate);
    const rate = document.getElementById('rate').value;
    const image = document.getElementById('image').value;

    const productData = {
      name: productName,
      manufactureDate: manufactureDate,
      expiryDate: expiryDate,
      rate: rate,
      sectionId: sectionId,
      image: image,
    };
    console.log(productData);

    fetch('/addProduct', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Product added successfully: ', data);
        addProductForm.reset();
      })
      .catch((err) => {
        console.error('Error adding product:', err);
      });
  });

document.querySelector('.addRowBtn').addEventListener('click', function () {
  console.log('Add Row button clicked');
  const overlay = document.querySelector('.overlay');
  const addCategoryForm = document.querySelector('.addCategoryForm');

  overlay.classList.remove('hidden');
  addCategoryForm.classList.remove('hidden');
});

document
  .querySelector('.addCategoryForm__addBtn')
  .addEventListener('click', function () {
    console.log('add category');
    const overlay = document.querySelector('.overlay');
    const addCategoryForm = document.querySelector('.addCategoryForm');
    overlay.classList.add('hidden');
    addCategoryForm.classList.add('hidden');

    const name = document.getElementById('categoryName').value;
    const categoryImage = document.getElementById('categoryImage').value;
    const categoryData = {
      name: name,
      image: categoryImage,
    };

    fetch('/addCategory', {
      method: 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to add product');
        }
        fetchCategories();
        return response.json();
      })
      .then((data) => {
        console.log('Category added successfully: ', data);
        addCategoryForm.reset();
      })
      .catch((err) => {
        console.log('Error adding category', err);
      });
  });

document
  .querySelector('.addCategoryForm__cancelBtn')
  .addEventListener('click', function () {
    const overlay = document.querySelector('.overlay');
    const addCategoryForm = document.querySelector('.addCategoryForm');
    // addCategoryForm.reset();
    overlay.classList.add('hidden');
    addCategoryForm.classList.add('hidden');
  });

async function fetchProductByCategory(name, sectionId) {
  try {
    const response = await fetch(`/products/${sectionId}`);
    const data = await response.json();

    const productsDiv = document.querySelector('.productDetails');
    const productsHTML = data
      .map(
        (
          product
        ) => `<div class="product__container" data-product-id="${product.productId}">
        <div class="product__image">
          <img src="${product.image}"/>
        </div>
        <div class="product__details">
          <div class="product_name">${product.name}</div>
          <div class="quantityAndRate">
            <div class="product_quantity">Quantity: 1 Kg</div>
            <div class="product_rate">Price: &#8377 ${product.rate}</div>
            <div class="product_manufactureDate">Mfg: ${product.manufactureDate}</div>
            <div class="product_expiryDate">Exp: ${product.expiryDate}</div>
          </div>
          <div class="product__buttons btn">
            <button class="editProductDetailsBtn" onclick="editProductDetailSection('${product.name}',${product.productId},'${name}',${sectionId})">Edit</button>
            <button class="deleteProductBtn">Delete</button>
          </div>
        </div>
      </div>`
      )
      .join('');

    productsDiv.innerHTML = `<h2 class="products__heading">${name}</h2>
        <div class="product__list">${productsHTML}</div>`;

    const deleteButtons = document.querySelectorAll('.deleteProductBtn');
    deleteButtons.forEach((button) => {
      button.addEventListener('click', function () {
        const productId = button.closest('.product__container').dataset
          .productId;
        console.log(productId, name, sectionId);
        const confirmed = confirm(
          'Are you sure you want to delete this product?'
        );
        if (confirmed) {
          deleteProduct(productId, name, sectionId);
        }
      });
    });
  } catch (err) {
    console.error(err);
  }
}

function editProductDetail(name, sectionId) {
  document.querySelector('.categoryTable').classList.add('hidden');
  document.querySelector('.productDetails').classList.remove('hidden');

  console.log('Edit button clicked');
  fetchProductByCategory(name, sectionId);
  console.log('fetched details');
}

function deleteProduct(productId, name, sectionId) {
  fetch(`/deleteProduct/${productId}`, {
    method: 'Delete',
  })
    .then((response) => {
      if (response.ok) {
        fetchProductByCategory(name, sectionId);
      } else {
        console.log('Failed to delete Product');
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function editProductDetailSection(productName, productId, name, sectionId) {
  console.log('Edit product', productName, productId, name, sectionId);
  const overlay = document.querySelector('.overlay');
  const editProductDetailForm = document.getElementById(
    'editProductDetailForm'
  );
  editProductDetailForm.classList.remove('hidden');
  overlay.classList.remove('hidden');

  const editSectionId = document.getElementById('editSectionId');
  editSectionId.value = sectionId;
  const editProduct__heading = document.querySelector('.editProduct__heading');
  editProduct__heading.textContent = `Edit ${productName} details`;

  const saveBtn = document.querySelector('.editProductDetailForm__saveBtn');
  saveBtn.addEventListener('click', function (e) {
    e.preventDefault();
    editDetails(productId, name, sectionId);
    // fetchProductByCategory(name, sectionId);
  });

  const cancelBtn = document.querySelector('.editProductDetailForm__cancelBtn');
  cancelBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const editProductDetailForm = document.getElementById(
      'editProductDetailForm'
    );
    editProductDetailForm.classList.add('hidden');
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('hidden');
    editProductDetailForm.reset();
  });
}

async function editDetails(productId, name, sectionId) {
  try {
    const editProductDetailForm = document.getElementById(
      'editProductDetailForm'
    );
    editProductDetailForm.classList.add('hidden');
    const overlay = document.querySelector('.overlay');
    overlay.classList.add('hidden');
    const editProductName = document.getElementById('editProductName');
    const editManufactureDate = document.getElementById('editManufactureDate');
    const editExpiryDate = document.getElementById('editExpiryDate');
    const editRate = document.getElementById('editRate');
    const editImage = document.getElementById('editImage');

    const editProductData = {
      name: editProductName.value,
      manufactureDate: editManufactureDate.value,
      expiryDate: editExpiryDate.value,
      rate: editRate.value,
      image: editImage.value,
    };

    const response = await fetch(`/updateProduct/${productId}`, {
      method: 'Put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editProductData),
    });
    // Reset form fields
    editProductName.value = '';
    editManufactureDate.value = '';
    editExpiryDate.value = '';
    editRate.value = '';
    editImage.value = '';

    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    const data = await response.json();
    console.log('Product updated successfully:', data);
    fetchProductByCategory(name, sectionId);
  } catch (error) {
    console.error('Error updating product:', error);
  }
}

async function fetchUsername(userId) {
  try {
    const response = await fetch(`/getUsername/${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch username');
    }
    const user = await response.text();
    console.log(user);
    return user;
  } catch (error) {
    console.error('Error fetching username:', error);
    return null;
  }
}

async function viewOrderDetails(orderId) {
  try {
    const response = await fetch(`/orders/${orderId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch order details');
    }
    const orderDetails = await response.json();
    console.log(orderDetails);
    displayOrderDetailsModal(orderDetails);
  } catch (error) {
    console.error('Error fetching order details:', error);
  }
}

async function displayOrderDetailsModal(orderDetails) {
  // Get the modal and its content
  const modal = document.getElementById('orderDetailsModal');
  const modalContent = document.getElementById('orderDetailsContent');

  modalContent.innerHTML = '';
  for (const item of orderDetails) {
    try {
      const productResponse = await fetch(
        `/products/product/${item.productId}`
      );
      if (!productResponse.ok) {
        throw new Error(
          `Failed to fetch product details for product ID: ${item.productId}`
        );
      }
      const productDetails = await productResponse.json();
      console.log(productDetails);
      const itemElement = document.createElement('div');
      itemElement.classList.add('item');
      itemElement.innerHTML = `
        <p>Product: ${productDetails.name}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Price: ${item.unitPrice}</p>
        <hr>
      `;
      modalContent.appendChild(itemElement);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  }
  modal.style.display = 'block';

  const closeButton = modal.querySelector('.close');
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}

async function fetchCount(endpoint) {
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
}

async function updateDashboard() {
  const userCountData = await fetchCount('/userCount');
  const orderCountData = await fetchCount('/orderCount');
  const productCountData = await fetchCount('/productCount');
  const totalSalesData = await fetchCount('/totalSales');

  console.log(userCountData, orderCountData, productCountData, totalSalesData);

  // Update user count
  const userCountElement = document.querySelector('.userCount');
  userCountElement.textContent = userCountData !== null ? userCountData : 0;

  // Update order count
  const orderCountElement = document.querySelector('.orderCount');
  orderCountElement.textContent = orderCountData !== null ? orderCountData : 0;

  // Update product count
  const productCountElement = document.querySelector('.productCount');
  productCountElement.textContent =
    productCountData !== null ? productCountData : 0;

  const totalSalesElement = document.querySelector('.countSales');
  totalSalesElement.textContent = totalSalesData !== null ? totalSalesData : 0;
}

const statisticContent = document.querySelector('.statisticsDiv');
statisticContent.addEventListener('click', updateDashboard);

async function renderOrderList() {
  const orderListElem = document.getElementById('orderList');
  orderListElem.innerHTML = '';
  try {
    const response = await fetch('/orders');
    if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const orders = await response.json();
    console.log(orders);

    for (const order of orders) {
      try {
        const username = await fetchUsername(order.userId);
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${order.orderId}</td>
          <td>${username}</td>
          <td>${order.orderDate}</td>
          <td>${order.totalAmount}</td>
          <td id="orderStatus_${order.orderId}">${order.orderStatus}</td>
          <td>
            <div class="buttons">
            <button onclick="viewOrderDetails(${
              order.orderId
            })">View Details</button>
            ${
              order.orderStatus == 'Pending'
                ? `
              <button id="acceptBtn_${order.orderId}" onclick="acceptOrder(${order.orderId},${order.userId})">Accept Order</button>
              <button id="rejectBtn_${order.orderId}" onclick="rejectOrder(${order.orderId},${order.userId})">Reject Order</button>
            `
                : ''
            }
            <div>
          </td>
        `;
        orderListElem.appendChild(row);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    }
  } catch (err) {
    console.error('Error fetching orders:', err);
  }
}

async function acceptOrder(orderId, userId) {
  try {
    const status = 'Accepted';
    const response = await updateOrderStatus(orderId, status);
    console.log(response);
    if (response && response.ok) {
      updateStatusInTable(orderId, status);
      document.getElementById(`acceptBtn_${orderId}`).style.display = 'none';
      document.getElementById(`rejectBtn_${orderId}`).style.display = 'none';

      sendMessage(
        userId,
        orderId,
        `Your order with ID ${orderId} has been accepted and will be delivered in 10 minutes.`
      );

      // Automatically update status to delivered after 2sec
      setTimeout(() => {
        updateOrderStatusAndTable(orderId, 'Delivered');
        sendMessage(
          userId,
          orderId,
          `Your order with ID ${orderId} has been delivered.`
        );
      }, 2000);
    } else {
      throw new Error('Failed to accept order');
    }
  } catch (error) {
    console.error('Error accepting order:', error);
  }
}

async function rejectOrder(orderId, userId) {
  try {
    const status = 'Rejected';
    const response = await updateOrderStatus(orderId, status);
    console.log(response);
    if (response && response.ok) {
      updateStatusInTable(orderId, status);
      document.getElementById(`acceptBtn_${orderId}`).style.display = 'none';
      document.getElementById(`rejectBtn_${orderId}`).style.display = 'none';
      sendMessage(
        userId,
        orderId,
        `Your order with ID ${orderId} has been rejected.`
      );
    } else {
      throw new Error('Failed to reject order');
    }
  } catch (error) {
    console.error('Error rejecting order:', error);
  }
}

async function updateOrderStatus(orderId, status) {
  try {
    const response = await fetch(`/orders/${orderId}/${status}`, {
      method: 'PUT',
    });
    return response;
  } catch (error) {
    console.error('Error updating order status:', error);
  }
}

async function updateOrderStatusAndTable(orderId, status) {
  try {
    const response = await updateOrderStatus(orderId, status);
    console.log(response);
    if (response && response.ok) {
      updateStatusInTable(orderId, status);
    } else {
      throw new Error('Failed to update order status');
    }
  } catch (error) {
    console.error('Error updating order status:', error);
  }
}

function updateStatusInTable(orderId, status) {
  const statusCell = document.getElementById(`orderStatus_${orderId}`);
  if (statusCell) {
    statusCell.textContent = status;
  }
}

renderOrderList();

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
