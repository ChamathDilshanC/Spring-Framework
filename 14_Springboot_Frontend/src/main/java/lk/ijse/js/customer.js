$("#saveCustomerBtn").click(function(event) {
    event.preventDefault();

    var customerID = $("#customerId").val();
    var customerName = $("#customerName").val();
    var customerAddress = $("#customerAddress").val();

    var customer = {
        "id": customerID,
        "name": customerName,
        "address": customerAddress
    }

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/customer/save",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success: function(data) {
            if (data) {
                showToast('Customer saved successfully', 'success');
                $("#customerForm")[0].reset();
                loadCustomers();
            } else {
                showToast('Failed to save the customer','error');
            }
        },
        error: function(xhr, status, error) {
            showToast('Error saving customer: ' + error, 'error');
            console.error("AJAX Error: " + status + " - " + error);
        }
    });
});

$("#updateCustomerBtn").click(function(event) {
    event.preventDefault();

    var customerID = $("#customerId").val();
    var customerName = $("#customerName").val();
    var customerAddress = $("#customerAddress").val();

    var customer = {
        "id": customerID,
        "name": customerName,
        "address": customerAddress
    }
    $.ajax({
        method: "PUT",
        url: "http://localhost:8080/api/v1/customer/update",
        contentType: "application/json",
        data: JSON.stringify(customer),
        success: function(data) {
            if (data) {
                showToast('Customer updated successfully', 'success');
                $("#customerForm")[0].reset();
                loadCustomers();
            } else {
                showToast('Failed to update the customer', 'error');
            }
        }
    })
});

function loadCustomers() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/customer/getAll",
        success: function(response) {
            const customers = response.data;
            if (customers && customers.length > 0) {
                $("#emptyTable").hide();
                $("#customerTable").show();

                var tbody = $("#customerTableBody");
                tbody.empty();

                $.each(customers, function(index, customer) {
                    var row = $("<tr>");
                    row.append($("<td>").text(customer.id || "-"));
                    row.append($("<td>").text(customer.name || "-"));
                    row.append($("<td>").text(customer.address || "-"));

                    var actionsCell = $("<td>").addClass("action-cell");

                    var editBtn = $("<button>")
                        .addClass("btn btn-sm btn-icon")
                        .html('<i class="fas fa-edit"></i>')
                        .click(function() {
                            editCustomer(customer);
                        });

                    var deleteBtn = $("<button>")
                        .addClass("btn btn-sm btn-icon btn-danger")
                        .html('<i class="fas fa-trash"></i>')
                        .click(function() {
                            deleteCustomer(customer);
                        });

                    actionsCell.append(editBtn, deleteBtn);
                    row.append(actionsCell);

                    tbody.append(row);
                });
            } else {
                $("#customerTable").hide();
                $("#emptyTable").show();
            }
        },
        error: function(xhr, status, error) {
            showToast('Error loading customers: ' + error, 'error');
            $("#customerTable").hide();
            $("#emptyTable").show();
        }
    });
}

$(document).ready(function() {
    loadCustomers();

    $("#resetFormBtn").click(function() {
        $("#customerForm")[0].reset();
        $("#formTitle").text("Add New Customer");
        $("#customerId").prop("disabled", false);
        $("#confirmDelete").removeClass("show");
    });

    $("#searchInput").on("input", function() {
        var searchTerm = $(this).val().toLowerCase();
        $("#customerTableBody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchTerm) > -1);
        });

        if ($("#customerTableBody tr:visible").length === 0) {
            $("#emptyTable").show();
        } else {
            $("#emptyTable").hide();
        }
    });
});

function editCustomer(customer) {
    $("#formTitle").text("Edit Customer");
    $("#customerId").val(customer.id).prop("disabled", true);
    $("#customerName").val(customer.name);
    $("#customerAddress").val(customer.address);
    $("#confirmDelete").removeClass("show");

    if (window.innerWidth < 992) {
        $("#customerForm")[0].scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteCustomer(customer) {
    $("#formTitle").text("Delete Customer");
    $("#customerId").val(customer.id).prop("disabled", true);
    $("#customerName").val(customer.name).prop("disabled", true);
    $("#customerAddress").val(customer.address).prop("disabled", true);
    $("#saveCustomerBtn").prop("disabled", true);
    $("#confirmDelete").addClass("show");

    $("#confirmDeleteBtn").off("click").on("click", function() {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:8080/api/v1/customer/delete/" + customer.id,
            success: function(data) {
                if (data) {
                    showToast("Customer deleted successfully", "success");
                    resetForm();
                    loadCustomers();
                } else {
                    showToast("Failed to delete the customer", "error");
                }
            },
            error: function(xhr, status, error) {
                showToast("Error deleting customer: " + error, "error");
                console.error("Delete error: " + error);
            }
        });
    });

    $("#cancelDeleteBtn").off("click").on("click", function() {
        resetForm();
    });

    if (window.innerWidth < 992) {
        $("#customerForm")[0].scrollIntoView({ behavior: 'smooth' });
    }
}

function resetForm() {
    $("#customerForm")[0].reset();
    $("#formTitle").text("Add New Customer");
    $("#customerId").prop("disabled", false);
    $("#customerName").prop("disabled", false);
    $("#customerAddress").prop("disabled", false);
    $("#saveCustomerBtn").prop("disabled", false).html('<i class="fas fa-save"></i> Save Customer');
    $("#confirmDelete").removeClass("show");
}

// Toast notification functions
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
    }, 10)

    setTimeout(function() {
        toast.removeClass('show');
        setTimeout(function() {
            toast.remove();
        }, 300);
    }, 5000);
}
