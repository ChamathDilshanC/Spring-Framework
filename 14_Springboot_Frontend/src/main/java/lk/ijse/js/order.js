let cartItems = [];

$(document).ready(function() {
    initializeApp();

    if (!$('#toastContainer').length) {
        $('body').append('<div id="toastContainer"></div>');
    }
});

function initializeApp() {
    generateNextOrderId();

    loadCustomers();
    loadItems();

    initializeEventHandlers();

    updateCartTable();
}

function generateNextOrderId() {
    $("#orderIdDisplay").html('<span class="spinner-border spinner-border-sm me-2"></span>Generating...');

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/order/generateNextId",
        success: function (response) {
            if (response.code === 201 && response.data) {
                $("#orderId").val(response.data);
                $("#orderIdDisplay").text(response.data);
                console.log("Next order ID:", response.data);
            } else {
                showError("Failed to generate order ID");
                $("#orderIdDisplay").text("Error");
                console.error("Error response:", response);
            }
        },
        error: function (xhr, status, error) {
            showError("Failed to generate order ID");
            $("#orderIdDisplay").text("Error");
            console.error("Error details:", {xhr, status, error});
        }
    });
}

function loadCustomers() {
    $("#customerDetailsSelect")
        .prop('disabled', true)
        .html('<option value="">Loading customers...</option>');

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/customer/getAll",
        success: function(response) {
            if (response.code === 200 && response.data && response.data.length > 0) {
                const customers = response.data;

                $("#customerDetailsSelect")
                    .empty()
                    .append('<option value="">Select a customer...</option>');

                customers.forEach(customer => {
                    $("#customerDetailsSelect").append(
                        `<option value="${customer.id}">${customer.name} (ID: ${customer.id})</option>`
                    );
                });

                window.customersData = customers;
            } else {
                $("#customerDetailsSelect")
                    .empty()
                    .append('<option value="">No customers available</option>');

                showError("No customers found in the system");
            }
        },
        error: function(xhr, status, error) {
            $("#customerDetailsSelect")
                .empty()
                .append('<option value="">Error loading customers</option>');

            showError("Failed to load customers. Please check server connection.");
            console.error("Error details:", {xhr, status, error});
        },
        complete: function() {
            $("#customerDetailsSelect").prop('disabled', false);
        }
    });
}

function loadItems() {
    $("#ItemDetailsSelect")
        .prop('disabled', true)
        .html('<option value="">Loading items...</option>');

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/item/getAll",
        success: function(response) {
            if (response.code === 200 && response.data && response.data.length > 0) {
                const items = response.data;

                $("#ItemDetailsSelect")
                    .empty()
                    .append('<option value="">Select an item...</option>');

                items.forEach(item => {
                    $("#ItemDetailsSelect").append(
                        `<option value="${item.itemCode}">${item.name} (Code: ${item.itemCode})</option>`
                    );
                });

                window.itemsData = items;
            } else {
                $("#ItemDetailsSelect")
                    .empty()
                    .append('<option value="">No items available</option>');

                showError("No items found in the system");
            }
        },
        error: function(xhr, status, error) {
            $("#ItemDetailsSelect")
                .empty()
                .append('<option value="">Error loading items</option>');

            showError("Failed to load items. Please check server connection.");
            console.error("Error details:", {xhr, status, error});
        },
        complete: function() {
            $("#ItemDetailsSelect").prop('disabled', false);
        }
    });
}

function initializeEventHandlers() {
    $("#customerDetailsSelect").on('change', function() {
        const selectedId = $(this).val();

        if (!selectedId) {
            clearCustomerDetails();
            return;
        }

        const selectedCustomer = window.customersData?.find(
            c => c.id.toString() === selectedId
        );

        if (selectedCustomer) {
            updateCustomerDetails(selectedCustomer);
        } else {
            showError("Customer data not found");
            clearCustomerDetails();
        }
    });

    $("#ItemDetailsSelect").on('change', function() {
        const selectedCode = $(this).val();

        if (!selectedCode) {
            clearItemDetails();
            return;
        }

        const selectedItem = window.itemsData?.find(
            i => i.itemCode.toString() === selectedCode
        );

        if (selectedItem) {
            updateItemDetails(selectedItem);
        } else {
            showError("Item data not found");
            clearItemDetails();
        }
    });

    $("#addToCartBtn").on('click', function() {
        const selectedItemCode = $("#ItemDetailsSelect").val();
        if (!selectedItemCode) {
            showError("Please select an item first");
            return;
        }

        const selectedItem = window.itemsData?.find(
            i => i.itemCode.toString() === selectedItemCode
        );

        if (!selectedItem) {
            showError("Selected item not found");
            return;
        }

        const existingItem = cartItems.find(item => item.itemCode === selectedItem.itemCode);

        if (existingItem) {
            if (existingItem.quantity + 1 > selectedItem.qty) {
                showError(`Not enough stock available for ${selectedItem.name}`);
                return;
            }
            existingItem.quantity += 1;
            existingItem.total = existingItem.quantity * existingItem.unitPrice;
            showSuccess(`Increased ${selectedItem.name} quantity to ${existingItem.quantity}`);
        } else {
            if (selectedItem.qty < 1) {
                showError(`${selectedItem.name} is out of stock`);
                return;
            }
            cartItems.push({
                itemCode: selectedItem.itemCode,
                name: selectedItem.name,
                quantity: 1,
                unitPrice: selectedItem.price,
                total: selectedItem.price
            });
            showSuccess(`Added ${selectedItem.name} to cart`);
        }

        updateCartTable();
        updateTotalAmount();
    });

    $("#placeOrderButton").on('click', function() {
        if (validateOrder()) {
            $(this).html('<span class="spinner-border spinner-border-sm me-2"></span>Processing...').prop('disabled', true);
            placeOrder();
        }
    });
}

function validateOrder() {
    const selectedCustomerId = $("#customerDetailsSelect").val();
    if (!selectedCustomerId) {
        showError("Please select a customer");
        return false;
    }

    if (cartItems.length === 0) {
        showError("Cart is empty. Please add items to cart");
        return false;
    }

    const orderId = $("#orderId").val();
    if (!orderId) {
        showError("Invalid order ID");
        return false;
    }

    return true;
}

function updateCustomerDetails(customer) {
    $("#customerDetailsName").text(customer.name || 'N/A');
    $("#customerDetailsAddress").text(customer.address || 'N/A');
}

function clearCustomerDetails() {
    $("#customerDetailsName").text('Select a customer');
    $("#customerDetailsAddress").text('Address will appear here');
}

function updateItemDetails(item) {
    $("#ItemDetailsName").text(item.name || 'N/A');
    $("#ItemDetailsPrice").text(`$${item.price.toFixed(2)}` || 'N/A');

    const stockLevel = item.qty || 0;
    let stockBadge = '';

    if (stockLevel > 10) {
        stockBadge = `<span class="badge bg-success-subtle text-success">${stockLevel} in stock</span>`;
    } else if (stockLevel > 0) {
        stockBadge = `<span class="badge bg-warning-subtle text-warning">Low stock: ${stockLevel}</span>`;
    } else {
        stockBadge = `<span class="badge bg-danger-subtle text-danger">Out of stock</span>`;
    }

    $("#ItemDetailsStock").html(stockBadge);
}

function clearItemDetails() {
    $("#ItemDetailsName").text('Select an item');
    $("#ItemDetailsPrice").text('Price will appear here');
    $("#ItemDetailsStock").text('Stock will appear here');
}

function updateCartTable() {
    const tbody = $("#cartTableBody");
    tbody.empty();

    if (cartItems.length === 0) {
        tbody.html(`
            <tr>
                <td colspan="6">
                    <div class="empty-cart">
                        <i class="bi bi-cart"></i>
                        <p>Your cart is empty</p>
                        <span class="text-muted">Select items to add to your order</span>
                    </div>
                </td>
            </tr>
        `);
        return;
    }

    cartItems.forEach((item, index) => {
        tbody.append(`
            <tr>
                <td>
                    <span class="badge bg-primary-subtle text-primary">${item.itemCode}</span>
                </td>
                <td>
                    <span class="fw-medium">${item.name}</span>
                </td>
                <td>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-light me-2" onclick="updateQuantity('${item.itemCode}', -1)">
                            <i class="bi bi-dash"></i>
                        </button>
                        <span class="fw-medium">${item.quantity}</span>
                        <button class="btn btn-sm btn-light ms-2" onclick="updateQuantity('${item.itemCode}', 1)">
                            <i class="bi bi-plus"></i>
                        </button>
                    </div>
                </td>
                <td>$${item.unitPrice.toFixed(2)}</td>
                <td>
                    <span class="fw-semibold">$${item.total.toFixed(2)}</span>
                </td>
                <td>
                    <button class="remove-btn" onclick="removeFromCart('${item.itemCode}')">
                        <i class="bi bi-trash me-1"></i>
                        Remove
                    </button>
                </td>
            </tr>
        `);
    });
}

function removeFromCart(itemCode) {
    const itemToRemove = cartItems.find(item => item.itemCode === itemCode);
    if (itemToRemove) {
        cartItems = cartItems.filter(item => item.itemCode !== itemCode);
        updateCartTable();
        updateTotalAmount();
        showSuccess(`Removed ${itemToRemove.name} from cart`);
    }
}

function updateQuantity(itemCode, change) {
    const selectedItem = cartItems.find(item => item.itemCode === itemCode);
    if (!selectedItem) return;

    const inventoryItem = window.itemsData?.find(i => i.itemCode.toString() === itemCode);
    if (!inventoryItem) return;

    const newQuantity = selectedItem.quantity + change;

    if (newQuantity < 1) {
        return;
    }

    if (change > 0 && newQuantity > inventoryItem.qty) {
        showError(`Not enough stock available for ${selectedItem.name}`);
        return;
    }

    selectedItem.quantity = newQuantity;
    selectedItem.total = selectedItem.quantity * selectedItem.unitPrice;

    updateCartTable();
    updateTotalAmount();
}

function updateTotalAmount() {
    const total = cartItems.reduce((sum, item) => sum + item.total, 0);
    $("#totalAmount").text(`Total: $${total.toFixed(2)}`);

    $("#placeOrderButton").prop('disabled', cartItems.length === 0);
}

function showToast(message, type = 'success') {
    const toast = $('<div>').addClass('toast').addClass(type);

    const iconClass = type === 'success' ? 'bi-check-circle' : 'bi-exclamation-triangle';
    const toastIcon = $('<i>').addClass(`bi ${iconClass} me-2`);

    const toastContent = $('<div>').addClass('toast-content');
    const toastTitle = $('<div>').addClass('fw-semibold mb-1').text(
        type === 'success' ? 'Success' : 'Error'
    );
    const toastMessage = $('<div>').addClass('text-secondary small').text(message);
    toastContent.append(toastTitle, toastMessage);

    const closeBtn = $('<button>')
        .addClass('toast-close')
        .html('<i class="bi bi-x"></i>')
        .click(function() {
            toast.removeClass('show');
            setTimeout(function() {
                toast.remove();
            }, 300);
        });

    toast.append(toastIcon, toastContent, closeBtn);
    $('#toastContainer').append(toast);

    setTimeout(function() {
        toast.addClass('show');
    }, 10);

    setTimeout(function() {
        toast.removeClass('show');
        setTimeout(function() {
            toast.remove();
        }, 300);
    }, 5000);
}

function showSuccess(message) {
    showToast(message, 'success');
}

function showError(message) {
    showToast(message, 'error');
}

function placeOrder() {
    const selectedCustomerId = $("#customerDetailsSelect").val();
    const orderId = $("#orderId").val();
    const total = cartItems.reduce((sum, item) => sum + item.total, 0);

    const orderDetails = cartItems.map(item => ({
        itemCode: item.itemCode,
        quantity: item.quantity,
        unitPrice: item.unitPrice
    }));

    const order = {
        orderId: orderId,
        customerId: selectedCustomerId,
        orderDetails: orderDetails,
        total: total
    };

    console.log("Sending order to backend:", JSON.stringify(order, null, 2));

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/order/save",
        contentType: "application/json",
        data: JSON.stringify(order),
        success: function(response) {
            console.log("Order response:", response);
            if (response.code === 201) {

                cartItems = [];
                updateCartTable();
                updateTotalAmount();
                clearCustomerDetails();
                showSuccess("Your Order "+ orderId + " placed successfully");
                clearItemDetails();
                $("#customerDetailsSelect").val("");
                $("#ItemDetailsSelect").val("");

                generateNextOrderId();
            } else {
                showError("Failed to place order: " + (response.message || "Unknown error"));
                console.error("Order save failed:", response);
            }
        },
        error: function(xhr, status, error) {
            showError("Failed to place order");
            console.error("Error details:", {
                status: xhr.status,
                statusText: xhr.statusText,
                responseText: xhr.responseText
            });
        },
        complete: function() {
            $("#placeOrderButton")
                .html('<i class="bi bi-check-circle"></i> Place Order')
                .prop('disabled', false);
        }
    });
}
