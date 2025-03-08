$("#submit").click(function (event) {
    event.preventDefault();

    const email = $("#email").val();
    const password = $("#password").val();

    $.ajax({
        url: "http://localhost:8080/api/v1/auth/authenticate",
        method: "POST",
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            email: email,
            password: password
        }),
        success: function (data) {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("email", email);
            showToast("Login successful", "success");
            setInterval(function () {
                window.location.href = "dashboard.html";
            }, 1000);

        },
        error: function (response) {
            if (response.status === 401) {
                showToast("Invalid credentials. Please try again.", "error");
            } else if (response.status === 500) {
                showToast("Internal server error. Please try again later.", "error");
            } else {
                showToast("Failed to login", "error");
            }
        }
    });
});


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