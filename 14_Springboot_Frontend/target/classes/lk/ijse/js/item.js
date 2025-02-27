$(document).ready(function() {
    loadItems();
    getNextItemId();
});

$("#searchInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#itemTableBody tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
    updateTotalItems();
});

$("#resetFormBtn").click(function() {
    resetForm();
});

function showToast(message, type) {
    const toast = $(`
        <div class="toast ${type}">
            <div class="toast-icon">
                <i class="fas ${type === 'success' ? 'fa-check' : 'fa-exclamation-triangle'}"></i>
            </div>
            <div class="toast-content">
                <div class="toast-title">${type === 'success' ? 'Success' : 'Error'}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `);

    $("#toastContainer").append(toast);
    setTimeout(() => toast.addClass('show'), 100);

    toast.find('.toast-close').click(function() {
        toast.removeClass('show');
        setTimeout(() => toast.remove(), 300);
    });

    setTimeout(() => {
        toast.removeClass('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function getNextItemId() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/item/generateNextId",
        success: function(response) {
            if(response.data) {
                $("#itemId").val(response.data);
            }
        },
        error: function(xhr, status, error) {
            showToast("Error getting next ID", "error");
        }
    });
}

function loadItems() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/item/getAll",
        success: function(response) {
            if(response.data) {
                $("#itemTableBody").empty();
                response.data.forEach(function(item) {
                    $("#itemTableBody").append(
                        `<tr>
                            <td>${item.itemCode}</td>
                            <td>${item.name}</td>
                            <td>${item.price}</td>
                            <td>${item.qty}</td>
                            <td class="action-cell">
                                <button class="btn btn-sm btn-icon" onclick='editItem(${JSON.stringify(item)})' style="background-color: #fbbf24">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-sm btn-icon btn-danger" onclick='deleteItem(${JSON.stringify(item)})'>
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>`
                    );
                });
                updateTotalItems();
            }
        },
        error: function(xhr, status, error) {
            showToast("Error loading items", "error");
        }
    });
}

function updateTotalItems() {
    const visibleRows = $("#itemTableBody tr:visible").length;
    $("#totalItems").text(`Total: ${visibleRows} items`);
}

$("#saveItemBtn").click(function(event) {
    event.preventDefault();

    if(!$("#itemName").val() || !$("#itemPrice").val() || !$("#itemQty").val()) {
        showToast("Please fill all the fields", "error");
        return;
    }

    var item = {
        "itemCode": $("#itemId").val(),
        "name": $("#itemName").val(),
        "price": $("#itemPrice").val(),
        "qty": $("#itemQty").val()
    }

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/api/v1/item/save",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function(response) {
            if(response.code === 201) {
                showToast("Item saved successfully", "success");
                $("#itemForm")[0].reset();
                loadItems();
                getNextItemId();
            } else {
                showToast("Failed to save item", "error");
            }
        },
        error: function(xhr, status, error) {
            showToast("Error saving item", "error");
        }
    });
});

function editItem(item) {
    $("#formTitle").text("Edit Item");
    $("#itemId").val(item.itemCode).prop("disabled", true);
    $("#itemName").val(item.name);
    $("#itemPrice").val(item.price);
    $("#itemQty").val(item.qty);
    $("#saveItemBtn").hide();
    $("#updateItemBtn").show();

    if (window.innerWidth < 992) {
        $("#itemForm")[0].scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteItem(item) {
    $("#formTitle").text("Delete Item");
    $("#itemId").val(item.itemCode).prop("disabled", true);
    $("#itemName").val(item.name);
    $("#itemPrice").val(item.price);
    $("#itemQty").val(item.qty);
    $("#saveItemBtn").prop("disabled", true);
    $("#confirmDelete").addClass("show");
}

$("#updateItemBtn").click(function(event) {
    event.preventDefault();

    if(!$("#itemName").val() || !$("#itemPrice").val() || !$("#itemQty").val()) {
        showToast("Please fill all the fields", "error");
        return;
    }

    var item = {
        "itemCode": $("#itemId").val(),
        "name": $("#itemName").val(),
        "price": $("#itemPrice").val(),
        "qty": $("#itemQty").val()
    }

    $.ajax({
        method: "PUT",
        url: "http://localhost:8080/api/v1/item/update",
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function(response) {
            if(response.code === 201) {
                showToast("Item updated successfully", "success");
                resetForm();
                loadItems();
            } else {
                showToast("Failed to update item", "error");
            }
        },
        error: function(xhr, status, error) {
            showToast("Error updating item", "error");
        }
    });
});

$("#confirmDeleteBtn").click(function() {
    var itemCode = $("#itemId").val();

    $.ajax({
        method: "DELETE",
        url: "http://localhost:8080/api/v1/item/delete/" + itemCode,
        success: function(response) {
            if(response.code === 201) {
                showToast("Item deleted successfully", "success");
                resetForm();
                loadItems();
            } else {
                showToast("Failed to delete item", "error");
            }
        },
        error: function(xhr, status, error) {
            showToast("Error deleting item", "error");
        }
    });
});

$("#cancelDeleteBtn").click(function() {
    resetForm();
});

function resetForm() {
    $("#formTitle").text("Add New Item");
    $("#itemForm")[0].reset();
    $("#itemId").prop("disabled", false);
    $("#saveItemBtn").show().prop("disabled", false);
    $("#updateItemBtn").hide();
    $("#confirmDelete").removeClass("show");
    getNextItemId();
}