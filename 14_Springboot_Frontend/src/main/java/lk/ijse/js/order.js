$(document).ready(function() {
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    $('#orderDate').val(today);

    // Initialize order items array
    let orderItems = [];
    let customers = [];
    let items = [];

    // Load customers and items when page loads
    loadCustomers();
    loadItems();
    updateOrderSummary();

    // Event listeners
    $('#customerSearch').on('focus', function() {
        $('#customerDropdown').addClass('show');
        filterCustomers();
    });

    $('#itemSearch').on('focus', function() {
        $('#itemDropdown').addClass('show');
        filterItems();
    });

    $('#customerSearch').on('input', filterCustomers);
    $('#itemSearch').on('input', filterItems);
    $('#placeOrderBtn').click(placeOrder);
    $('#clearOrderBtn').click(clearOrder);

    // Load all customers from API
    function loadCustomers() {
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/api/v1/customer/getAll",
            success: function(data) {
                customers = data;
                renderCustomerDropdown();
                console.log("Customers loaded:", customers.length);
            },
            error: function(xhr, status, error) {
                showToast("Error", "Failed to load customers: " + error, "error");
                console.error("Customer loading error:", xhr.responseText);
            }
        });
    }

    // Load all items from API
    function loadItems() {
        $.ajax({
            method: "GET",
            url: "http://localhost:8080/api/v1/item/getAll",
            success: function(data) {
                items = data;
                renderItemDropdown();
                console.log("Items loaded:", items.length);
            },
            error: function(xhr, status, error) {
                showToast("Error", "Failed to load items: " + error, "error");
                console.error("Item loading error:", xhr.responseText);
            }
        });
    }

    // Render customer dropdown options
    function renderCustomerDropdown() {
        const dropdown = $('#customerDropdown');
        dropdown.empty();

        if (customers.length === 0) {
            dropdown.append('<div class="dropdown-item">No customers found</div>');
            return;
        }

        customers.forEach(customer => {
            const element = $(`<div class="dropdown-item" data-id="${customer.id}">
                <div style="font-weight: 500;">${customer.id} - ${customer.name}</div>
                <div style="font-size: 0.8rem; color: #64748b;">${customer.address || 'No address'}</div>
            </div>`);

            element.click(function() {
                selectCustomer(customer);
                dropdown.removeClass('show');
            });

            dropdown.append(element);
        });
    }

    // Render item dropdown options
    function renderItemDropdown() {
        const dropdown = $('#itemDropdown');
        dropdown.empty();

        if (items.length === 0) {
            dropdown.append('<div class="dropdown-item">No items found</div>');
            return;
        }

        items.forEach(item => {
            const element = $(`<div class="dropdown-item" data-id="${item.itemCode}">
                <div style="font-weight: 500;">${item.itemCode} - ${item.name}</div>
                <div style="font-size: 0.8rem; display: flex; justify-content: space-between; align-items: center;">
                    <span style="color: #059669;">$${parseFloat(item.price).toFixed(2)}</span>
                    <span style="color: #64748b;">Stock: ${item.qty}</span>
                    <button class="add-to-cart-btn">
                        <i class="fas fa-plus"></i> Add
                    </button>
                </div>
            </div>`);

            // Target just the add button to prevent dropdown item click issues
            element.find('.add-to-cart-btn').click(function(e) {
                e.stopPropagation(); // Prevent the dropdown item click event
                addItemToOrder(item);
                // Don't close dropdown to allow multiple additions
            });

            // Click on the item (not the button) selects it and closes dropdown
            element.click(function(e) {
                if (!$(e.target).hasClass('add-to-cart-btn') && !$(e.target).parent().hasClass('add-to-cart-btn')) {
                    $('#itemSearch').val(`${item.itemCode} - ${item.name}`);
                    dropdown.removeClass('show');
                }
            });

            dropdown.append(element);
        });
    }

    // Filter customers based on search input
    function filterCustomers() {
        const searchTerm = $('#customerSearch').val().toLowerCase();
        let hasResults = false;

        if (!$('#customerDropdown').hasClass('show')) {
            $('#customerDropdown').addClass('show');
        }

        $('#customerDropdown .dropdown-item').each(function() {
            const text = $(this).text().toLowerCase();
            const matches = text.indexOf(searchTerm) > -1;
            $(this).toggle(matches);
            if (matches) hasResults = true;
        });

        // If no results, show a message
        if (!hasResults) {
            if ($('#customerDropdown .no-results').length === 0) {
                $('#customerDropdown').append('<div class="no-results">No matching customers found</div>');
            }
        } else {
            $('#customerDropdown .no-results').remove();
        }
    }

    // Filter items based on search input
    function filterItems() {
        const searchTerm = $('#itemSearch').val().toLowerCase();
        let hasResults = false;

        if (!$('#itemDropdown').hasClass('show')) {
            $('#itemDropdown').addClass('show');
        }

        $('#itemDropdown .dropdown-item').each(function() {
            const text = $(this).text().toLowerCase();
            const matches = text.indexOf(searchTerm) > -1;
            $(this).toggle(matches);
            if (matches) hasResults = true;
        });

        // If no results, show a message
        if (!hasResults) {
            if ($('#itemDropdown .no-results').length === 0) {
                $('#itemDropdown').append('<div class="no-results">No matching items found</div>');
            }
        } else {
            $('#itemDropdown .no-results').remove();
        }
    }

    // Select a customer for the order
    function selectCustomer(customer) {
        $('#customerId').val(customer.id);
        $('#customerSearch').val(`${customer.id} - ${customer.name}`);
        $('#customerName').text(`${customer.name}`);
        $('#customerAddress').text(`${customer.address || 'No address'}`);
        $('#selectedCustomerInfo').show();
    }

    // Add an item to the order
    function addItemToOrder(item) {
        console.log("Adding item to order:", item);

        // Check if the item is already in the order
        const existingItemIndex = orderItems.findIndex(orderDetail =>
            orderDetail.item && orderDetail.item.itemCode === item.itemCode);

        if (existingItemIndex !== -1) {
            // If item already exists, increment quantity if stock allows
            const currentQty = orderItems[existingItemIndex].quantity;
            if (currentQty < item.qty) {
                orderItems[existingItemIndex].quantity += 1;
                orderItems[existingItemIndex].total = orderItems[existingItemIndex].unitPrice *
                    orderItems[existingItemIndex].quantity;
                showToast("Success", `Increased quantity of ${item.name}`, "success");
            } else {
                showToast("Warning", "Cannot exceed available stock", "error");
                return;
            }
        } else {
            // Add new item to order
            orderItems.push({
                item: item,
                quantity: 1,
                unitPrice: parseFloat(item.price),
                total: parseFloat(item.price)
            });
            showToast("Success", `Added ${item.name} to order`, "success");
        }

        renderOrderItems();
        updateOrderSummary();
    }

    // Render order items in the table
    function renderOrderItems() {
        const tableBody = $('#orderItemsTableBody');
        tableBody.empty();

        if (orderItems.length === 0) {
            $('#orderItemsTable').hide();
            $('#emptyOrderMessage').show();
            return;
        }

        $('#orderItemsTable').show();
        $('#emptyOrderMessage').hide();

        orderItems.forEach((orderDetail, index) => {
            const item = orderDetail.item;
            const row = $(`<tr>
                <td>
                    <div style="font-weight: 500;">${item.name}</div>
                    <div style="font-size: 0.75rem; color: #64748b;">${item.itemCode}</div>
                </td>
                <td>$${orderDetail.unitPrice.toFixed(2)}</td>
                <td>
                    <div class="quantity-control">
                        <button type="button" class="quantity-btn decrease-btn">-</button>
                        <input type="text" class="quantity-input form-control" value="${orderDetail.quantity}" readonly>
                        <button type="button" class="quantity-btn increase-btn">+</button>
                    </div>
                </td>
                <td>$${(orderDetail.unitPrice * orderDetail.quantity).toFixed(2)}</td>
                <td class="action-cell">
                    <button type="button" class="btn btn-sm btn-danger remove-item">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>`);

            // Decrease quantity button
            row.find('.decrease-btn').click(function() {
                if (orderDetail.quantity > 1) {
                    orderDetail.quantity -= 1;
                    orderDetail.total = orderDetail.unitPrice * orderDetail.quantity;
                    renderOrderItems();
                    updateOrderSummary();
                }
            });

            // Increase quantity button
            row.find('.increase-btn').click(function() {
                // Check available stock
                if (orderDetail.quantity < item.qty) {
                    orderDetail.quantity += 1;
                    orderDetail.total = orderDetail.unitPrice * orderDetail.quantity;
                    renderOrderItems();
                    updateOrderSummary();
                } else {
                    showToast("Warning", "Cannot exceed available stock", "error");
                }
            });

            // Remove item button
            row.find('.remove-item').click(function() {
                orderItems.splice(index, 1);
                renderOrderItems();
                updateOrderSummary();
                showToast("Success", `Removed ${item.name} from order`, "success");
            });

            tableBody.append(row);
        });
    }

    // Update order summary calculations
    function updateOrderSummary() {
        const subtotal = orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
        const totalItems = orderItems.reduce((sum, item) => sum + item.quantity, 0);

        $('#subtotal').text('$' + subtotal.toFixed(2));
        $('#totalItems').text(totalItems);
        $('#totalAmount').text('$' + subtotal.toFixed(2));

        // Enable/disable place order button based on if we have items and a customer
        const hasCustomer = $('#customerId').val() !== '';
        const hasItems = orderItems.length > 0;
        $('#placeOrderBtn').prop('disabled', !(hasCustomer && hasItems));
    }

    // Place the order
    function placeOrder() {
        const orderId = $('#orderId').val();
        const customerId = $('#customerId').val();
        const orderDateStr = $('#orderDate').val();

        // Validation
        if (!orderId) {
            showToast("Error", "Order ID is required", "error");
            return;
        }

        if (!customerId) {
            showToast("Error", "Please select a customer", "error");
            return;
        }

        if (orderItems.length === 0) {
            showToast("Error", "Please add at least one item to the order", "error");
            return;
        }

        // Calculate total
        const total = orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);

        // Format datetime for backend (ISO format)
        const orderDate = new Date(orderDateStr);
        const formattedDate = orderDate.toISOString();

        // Prepare order details according to entity structure
        const orderDetails = orderItems.map(orderDetail => ({
            item: {
                itemCode: orderDetail.item.itemCode
            },
            quantity: orderDetail.quantity,
            unitPrice: orderDetail.unitPrice
        }));

        // Create order object matching the server-side entity structure
        const order = {
            orderId: orderId,
            orderDate: formattedDate,
            customer: {
                id: customerId
            },
            orderDetails: orderDetails,
            total: total
        };

        console.log("Sending order:", JSON.stringify(order));

        // Send order to API
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/api/v1/order/save",
            contentType: "application/json",
            data: JSON.stringify(order),
            success: function(response) {
                console.log("Order response:", response);
                if (response.code === 201) {
                    showToast("Success", "Order placed successfully", "success");
                    clearOrder();
                } else {
                    showToast("Error", response.message || "Failed to place order", "error");
                }
            },
            error: function(xhr, status, error) {
                let errorMessage = "Failed to place order";
                try {
                    const response = JSON.parse(xhr.responseText);
                    errorMessage = response.message || errorMessage;
                } catch (e) {
                    // Use default error message
                }
                showToast("Error", errorMessage, "error");
                console.error("Order error:", xhr.responseText);
            }
        });
    }

    // Clear the current order
    function clearOrder() {
        $('#orderForm')[0].reset();
        $('#orderDate').val(today);
        $('#customerId').val('');
        $('#selectedCustomerInfo').hide();
        orderItems = [];
        renderOrderItems();
        updateOrderSummary();
    }

    // Show toast notification
    function showToast(title, message, type = "success") {
        const toast = $(`<div class="toast ${type}">
            <div class="toast-icon">
                <i class="fas ${type === 'success' ? 'fa-check' : 'fa-exclamation-triangle'}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        </div>`);

        // Add close functionality
        toast.find('.toast-close').click(function() {
            toast.removeClass('show');
            setTimeout(() => toast.remove(), 300);
        });

        $('#toastContainer').append(toast);

        // Show toast with animation
        setTimeout(() => toast.addClass('show'), 10);

        // Auto-remove after 4 seconds
        setTimeout(() => {
            toast.removeClass('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // Close dropdowns when clicking outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.search-dropdown, .dropdown-menu').length) {
            $('.dropdown-menu').removeClass('show');
        }
    });
});