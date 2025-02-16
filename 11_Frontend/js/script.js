$(document).ready(function() {
    // Load all customers when page loads
    loadCustomers();

    // Save customer
    $("#saveBtn").click(function() {
        let customer = {
            id: $("#customerId").val(),
            name: $("#customerName").val(),
            address: $("#customerAddress").val()
        };

        $.ajax({
            url: 'http://localhost:8080/10_BackEnd_Web_exploded/api/v1/customer/save',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(customer),
            success: function(response) {
                alert('Customer saved successfully!');
                loadCustomers();
                clearForm();
            },
            error: function(xhr, status, error) {
                alert('Error saving customer: ' + error);
            }
        });
    });

    // Update customer
    $("#updateBtn").click(function() {
        let customer = {
            id: $("#customerId").val(),
            name: $("#customerName").val(),
            address: $("#customerAddress").val()
        };

        $.ajax({
            url: 'http://localhost:8080/10_BackEnd_Web_exploded/api/v1/customer/update',
            method: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(customer),
            success: function(response) {
                alert('Customer updated successfully!');
                loadCustomers();
                clearForm();
            },
            error: function(xhr, status, error) {
                alert('Error updating customer: ' + error);
            }
        });
    });

    // Delete customer
    $("#deleteBtn").click(function() {
        let customerId = $("#customerId").val();

        $.ajax({
            url: `http://localhost:8080/10_BackEnd_Web_exploded/api/v1/customer/delete/${customerId}`,
            method: 'DELETE',
            success: function(response) {
                if(response) {
                    alert('Customer deleted successfully!');
                    loadCustomers();
                    clearForm();
                } else {
                    alert('Customer not found!');
                }
            },
            error: function(xhr, status, error) {
                alert('Error deleting customer: ' + error);
            }
        });
    });
});

// Function to load all customers
function loadCustomers() {
    $.ajax({
        url: 'http://localhost:8080/10_BackEnd_Web_exploded/api/v1/customer/getAll',
        method: 'GET',
        success: function(customers) {
            let tableBody = $("#customerTable tbody");
            tableBody.empty();

            customers.forEach(function(customer) {
                tableBody.append(`
                    <tr>
                        <td>${customer.id}</td>
                        <td>${customer.name}</td>
                        <td>${customer.address}</td>
                        <td>
                            <button class="action-btn edit-btn" onclick="editCustomer('${customer.id}', '${customer.name}', '${customer.address}')">Edit</button>
                            <button class="action-btn delete-btn" onclick="deleteCustomerRow('${customer.id}')">Delete</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function(xhr, status, error) {
            alert('Error loading customers: ' + error);
        }
    });
}

// Function to edit customer (populate form)
function editCustomer(id, name, address) {
    $("#customerId").val(id);
    $("#customerName").val(name);
    $("#customerAddress").val(address);
}

// Function to delete customer from row
function deleteCustomerRow(id) {
    if(confirm('Are you sure you want to delete this customer?')) {
        $.ajax({
            url: `http://localhost:8080/10_BackEnd_Web_exploded/api/v1/customer/delete/${id}`,
            method: 'DELETE',
            success: function(response) {
                if(response) {
                    alert('Customer deleted successfully!');
                    loadCustomers();
                } else {
                    alert('Customer not found!');
                }
            },
            error: function(xhr, status, error) {
                alert('Error deleting customer: ' + error);
            }
        });
    }
}

// Function to clear form
function clearForm() {
    $("#customerId").val('');
    $("#customerName").val('');
    $("#customerAddress").val('');
}