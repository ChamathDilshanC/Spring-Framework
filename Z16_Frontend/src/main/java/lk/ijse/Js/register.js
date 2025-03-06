$("#submit").click(function () {
    event.preventDefault();

    const name = $("#name").val();
    const email = $("#email").val();
    const password = $("#password").val();
    const role = "USER";


    $.ajax({
        url: "http://localhost:8080/api/v1/user/register",
        method: "POST",
        async: true,
        contentType: "application/json",
        data: JSON.stringify({
            email: email,
            password: password,
            name: name,
            role: role
        }),
        success: function (data) {
            sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("email", email);
            // set interval
            showToast("Register successful", "success");
            setInterval(function () {
                window.location.href = "index.html";
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
})

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
    $('body').append(toast);

    setTimeout(function() {
        toast.addClass('show');
    }, 100);
}