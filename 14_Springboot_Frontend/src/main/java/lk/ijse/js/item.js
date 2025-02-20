$("#saveItemBtn").click(function(event) {
    event.preventDefault();
    var itemId = $("#itemId").val();
    var itemName = $("#itemName").val();
    var itemPrice = $("#itemPrice").val();
    var itemQty = $("#itemQty").val();

    var isEditing = $("#itemId").prop("disabled");

    var item = {
        "itemCode": itemId,
        "name": itemName,
        "price": itemPrice,
        "qty": itemQty
    };

    var url = isEditing ?
        "http://localhost:8080/api/v1/item/update" :
        "http://localhost:8080/api/v1/item/save";

    console.log("Operation: " + (isEditing ? "Update" : "Save"));
    console.log("URL: " + url);
    console.log("Item data:", item);

    $.ajax({
        method: "POST",
        url: url,
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function(data) {
            if (data) {
                showToast("Item " + (isEditing ? "updated" : "saved") + " successfully", "success");
                resetForm();
                loadItems();
            } else {
                showToast("Failed to " + (isEditing ? "update" : "save") + " the item", "error");
            }
        },
        error: function(xhr, status, error) {
            showToast("Error " + (isEditing ? "updating" : "saving") + " item: " + error, "error");
            console.error("AJAX Error: " + status + " - " + error);
            console.error("Response: ", xhr.responseText);
        }
    });
});

$("#updateItemBtn").click(function(event) {
    event.preventDefault();
    var itemId = $("#itemId").val();
    var itemName = $("#itemName").val();
    var itemPrice = $("#itemPrice").val();
    var itemQty = $("#itemQty").val();
    var item = {
        "itemCode": itemId,
        "name": itemName,
        "price": itemPrice,
        "qty": itemQty
    }
    var url = "http://localhost:8080/api/v1/item/update";
    $.ajax({
        method: "PUT",
        url: url,
        contentType: "application/json",
        data: JSON.stringify(item),
        success: function(data) {
            if (data) {
                showToast("Item updated successfully", "success");
                $("#itemForm")[0].reset();
                loadItems();
            } else {
                showToast("Failed to update the item", "error");
            }
        }
    })
});

function loadItems() {
    $.ajax({
        method: "GET",
        url: "http://localhost:8080/api/v1/item/getAll",
        success: function(response) {
            const data = response.data
            if (data && data.length > 0) {
                $("#emptyTable").hide();
                $("#itemTable").show();
                $("#totalItems").text("Total: " + data.length + " items");

                var tbody = $("#itemTableBody");
                tbody.empty();

                $.each(data, function(index, item) {
                    var row = $("<tr>");
                    row.append($("<td>").text(item.itemCode || "-"));
                    row.append($("<td>").text(item.name || "-"));
                    row.append($("<td>").text(item.price ? "$" + item.price : "-"));
                    row.append($("<td>").text(item.qty || "-"));

                    var actionsCell = $("<td>").addClass("action-cell");

                    var editBtn = $("<button>")
                        .addClass("btn btn-sm btn-icon")
                        .html('<i class="fas fa-edit"></i>')
                        .click(function() {
                            editItem(item);
                        });

                    var deleteBtn = $("<button>")
                        .addClass("btn btn-sm btn-icon btn-danger")
                        .html('<i class="fas fa-trash"></i>')
                        .click(function() {
                            deleteItem(item);
                        });

                    actionsCell.append(editBtn, deleteBtn);
                    row.append(actionsCell);

                    tbody.append(row);
                });
            } else {
                $("#itemTable").hide();
                $("#emptyTable").show();
                $("#totalItems").text("Total: 0 items");
            }
        },
        error: function(xhr, status, error) {
            showToast("Error loading items: " + error, "error");
            $("#itemTable").hide();
            $("#emptyTable").show();
        }
    });
}

$(document).ready(function() {
    loadItems();

    $("#resetFormBtn").click(function() {
        resetForm();
    });

    $("#searchInput").on("input", function() {
        var searchTerm = $(this).val().toLowerCase();
        $("#itemTableBody tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(searchTerm) > -1);
        });

        if ($("#itemTableBody tr:visible").length === 0) {
            $("#emptyTable").show();
        } else {
            $("#emptyTable").hide();
        }
    });
});

function editItem(item) {
    $("#formTitle").text("Edit Item");

    $("#itemId").val(item.itemCode).prop("disabled", false);
    $("#itemName").val(item.name);
    $("#itemPrice").val(item.price);
    $("#itemQty").val(item.qty);
    $("#itemName").prop("disabled", false);
    $("#itemPrice").prop("disabled", false);
    $("#itemQty").prop("disabled", false);
    $("#saveItemBtn").prop("disabled", false);
    $("#confirmDelete").removeClass("show");

    if (window.innerWidth < 992) {
        $("#itemForm")[0].scrollIntoView({ behavior: 'smooth' });
    }
}

function deleteItem(item) {
    $("#formTitle").text("Delete Item");
    $("#itemId").val(item.itemCode).prop("disabled", true);
    $("#itemName").val(item.name).prop("disabled", true);
    $("#itemPrice").val(item.price).prop("disabled", true);
    $("#itemQty").val(item.qty).prop("disabled", true);
    $("#saveItemBtn").prop("disabled", true);
    $("#confirmDelete").addClass("show");

    $("#confirmDeleteBtn").off("click").on("click", function() {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:8080/api/v1/item/delete/" + item.itemCode,
            success: function(data) {
                if (data) {
                    showToast("Item deleted successfully", "success");
                    resetForm();
                    loadItems();
                } else {
                    showToast("Failed to delete the item", "error");
                }
            },
            error: function(xhr, status, error) {
                showToast("Error deleting item: " + error, "error");
                console.error("Delete error: " + error);
            }
        });
    });

    $("#cancelDeleteBtn").off("click").on("click", function() {
        resetForm();
    });

    if (window.innerWidth < 992) {
        $("#itemForm")[0].scrollIntoView({ behavior: 'smooth' });
    }
}

function resetForm() {
    $("#itemForm")[0].reset();
    $("#formTitle").text("Add New Item");
    $("#itemId").prop("disabled", false);
    $("#itemName").prop("disabled", false);
    $("#itemPrice").prop("disabled", false);
    $("#itemQty").prop("disabled", false);
    $("#saveItemBtn").prop("disabled", false).html('<i class="fas fa-save"></i> Save Item');
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