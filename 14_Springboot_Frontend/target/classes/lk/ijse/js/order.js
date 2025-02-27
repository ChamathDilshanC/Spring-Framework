let cartItems = [];

$(document).ready(function() {
    generateNextOrderId()
    loadCustomers();
    loadItems();
    initializeEventHandlers();

    // Initialize toast container if it doesn't exist
    if (!$('#toastContainer').length) {
        $('body').append('<div id="toastContainer"></div>');
    }
});

generateNextOrderId()

function generateNextOrderId() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/order/getNextId",
        success: function (response) {
            if (response.code === 200 && response.data) {
                $("#orderId").val(response.data);
                console.log("Next order ID:", response.data);
            } else {
                showError("Failed to generate order ID");
            }
        },
        error: function (xhr, status, error) {
            showError("Failed to generate order ID");
            console.error("Error details:", {xhr, status, error});
        }
    });
}
function loadCustomers() {
    $("#customerDetailsSelect").prop('disabled', true);
    $("#customerDetails").addClass('loading');

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/customer/getAll",
        success: function(response) {
            if (response.code === 200 && response.data) {
                const customers = response.data;

                $("#customerDetailsSelect")
                    .empty()
                    .append('<option value="">Select a customer...</option>');

                customers.forEach(customer => {
                    $("#customerDetailsSelect").append(
                        `<option value="${customer.id}">
                            ${customer.name} (ID: ${customer.id})
                        </option>`
                    );
                });

                window.customersData = customers;
            } else {
                showError("No customers found");
            }
        },
        error: function(xhr, status, error) {
            showError("Failed to load customers");
            console.error("Error details:", {xhr, status, error});
        },
        complete: function() {
            $("#customerDetailsSelect").prop('disabled', false);
            $("#customerDetails").removeClass('loading');
        }
    });
}

function loadItems() {
    $("#ItemDetailsSelect").prop('disabled', true);

    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/item/getAll",
        success: function(response) {
            if (response.code === 200 && response.data) {
                const items = response.data;

                $("#ItemDetailsSelect")
                    .empty()
                    .append('<option value="">Select an item...</option>');

                items.forEach(item => {
                    $("#ItemDetailsSelect").append(
                        `<option value="${item.itemCode}">
                            ${item.name} (Code: ${item.itemCode})
                        </option>`
                    );
                });

                window.itemsData = items;
            } else {
                showError("No items found");
            }
        },
        error: function(xhr, status, error) {
            showError("Failed to load items");
            console.error("Error details:", {xhr, status, error});
        },
        complete: function() {
            $("#ItemDetailsSelect").prop('disabled', false);
        }
    });
}

function initializeEventHandlers() {
    // Customer select change handler
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

    // Item select change handler
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

    // Add to cart button handler
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

        // Add item to cart
        const existingItem = cartItems.find(item => item.itemCode === selectedItem.itemCode);

        if (existingItem) {
            if (existingItem.quantity + 1 > selectedItem.qty) {
                showError("Not enough stock available");
                return;
            }
            existingItem.quantity += 1;
            existingItem.total = existingItem.quantity * existingItem.unitPrice;
        } else {
            if (selectedItem.qty < 1) {
                showError("Item out of stock");
                return;
            }
            cartItems.push({
                itemCode: selectedItem.itemCode,
                name: selectedItem.name,
                quantity: 1,
                unitPrice: selectedItem.price,
                total: selectedItem.price
            });
        }

        updateCartTable();
        updateTotalAmount();
        showSuccess("Item added to cart");
    });

    // Place order button handler
    $("#placeOrderButton").on('click', placeOrder);
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
    $("#ItemDetailsStock").text(item.qty || '0');
}

function clearItemDetails() {
    $("#ItemDetailsName").text('Select an item');
    $("#ItemDetailsPrice").text('Price will appear here');
    $("#ItemDetailsStock").text('Stock will appear here');
}

function updateCartTable() {
    const tbody = $("table tbody");
    tbody.empty();

    // Add table header
    tbody.append(`
        <tr>
            <th>Item Code</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Unit Price</th>
            <th>Total</th>
            <th>Action</th>
        </tr>
    `);

    cartItems.forEach(item => {
        tbody.append(`
            <tr>
                <td>${item.itemCode}</td>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.unitPrice.toFixed(2)}</td>
                <td>$${item.total.toFixed(2)}</td>
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
    cartItems = cartItems.filter(item => item.itemCode !== itemCode);
    updateCartTable();
    updateTotalAmount();
    showSuccess("Item removed from cart");
}

function updateTotalAmount() {
    const total = cartItems.reduce((sum, item) => sum + item.total, 0);
    $(".h4").text(`Total Amount: $${total.toFixed(2)}`);
}

function showToast(message, type = 'success') {
    const toast = $('<div>').addClass('toast').addClass(type);

    const iconClass = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    const toastIcon = $('<div>').addClass('toast-icon').append(
        $('<i>').addClass('fas ' + iconClass)
    );

    const toastContent = $('<div>').addClass('toast-content');
    const toastTitle = $('<div>').addClass('toast-title').text(
        type === 'success' ? 'Success' : 'Error'
    );
    const toastMessage = $('<div>').addClass('toast-message').text(message);
    toastContent.append(toastTitle, toastMessage);

    const closeBtn = $('<button>')
        .addClass('toast-close')
        .html('<i class="fas fa-times"></i>')
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
    if (!selectedCustomerId) {
        showError("Please select a customer");
        return;
    }

    if (cartItems.length === 0) {
        showError("Cart is empty. Please add items to cart");
        return;
    }

    const orderId = $("#orderId").val();
    if (!orderId) {
        showError("Invalid order ID");
        return;
    }

    const total = cartItems.reduce((sum, item) => sum + item.total, 0);

    const orderDetails = cartItems.map(item => ({
        item: {
            itemCode: item.itemCode
        },
        quantity: item.quantity,
        unitPrice: item.unitPrice
    }));

    const order = {
        orderId: orderId,
        customerId: selectedCustomerId,
        orderDetails: orderDetails,
        total: total
    };

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/order/save",
        contentType: "application/json",
        data: JSON.stringify(order),
        success: function(response) {
            if (response.code === 201) {
                showSuccess("Order placed successfully!");
                // Clear cart and reset form
                cartItems = [];
                updateCartTable();
                updateTotalAmount();
                clearCustomerDetails();
                clearItemDetails();
                $("#customerDetailsSelect").val("");
                $("#ItemDetailsSelect").val("");
                // Generate new order ID
                setOrderId();
            } else {
                showError("Failed to place order: " + (response.message || "Unknown error"));
            }
        },
        error: function(xhr, status, error) {
            showError("Failed to place order");
            console.error("Error details:", {xhr, status, error});
        }
    });
}