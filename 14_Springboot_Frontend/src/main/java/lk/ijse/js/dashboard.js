$.ajax({
    method: "GET",
    url: "http://localhost:8080/api/v1/customer/getCustomerCount",
    contentType: "application/json",
    success: function(response) {
        if (response.code === 201) {
            console.log(response.data);
        } else {
            console.log('Failed to get the customer count');
        }
    },
    error: function(xhr, status, error) {
        showToast('Error saving customer: ' + error, 'error');
        console.error("AJAX Error: " + status + " - " + error);
    }
});