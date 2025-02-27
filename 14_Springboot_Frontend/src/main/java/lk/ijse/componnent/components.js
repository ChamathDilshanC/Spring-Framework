// Define your navigation component HTML
const navComponent = `
<style>
:root {
  --primary: #4f46e5;    /* Indigo color */
  --secondary: #0ea5e9;  /* Sky blue color */
}

.navbar-nav.nav-gap {
  gap: 2rem;
}
.navbar-brand {
    font-weight: 700;
    letter-spacing: -0.5px;
}

.navbar {
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
    border-radius: 25px;
}

.gradient-text {
    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
}
.container {
    max-width: 1200px;
    margin: 0 auto;
}
.containerFull {
    padding-bottom: 50px;
}
</style>
<div class="containerFull">
<nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
        <a class="navbar-brand" href="#">
            <i class="bi bi-box-seam text-primary me-2"></i>
            <span class="gradient-text">Chama Store</span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto nav-gap">
                <li class="nav-item">
                    <a class="nav-link" href="dashboard.html">
                        <i class="bi bi-speedometer2 me-1"></i> Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="order.html">
                        <i class="bi bi-cart-plus me-1"></i> New Order
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="customer.html">
                        <i class="bi bi-people me-1"></i> Customers
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="item.html">
                        <i class="bi bi-box me-1"></i> Item
                    </a>
                </li>
            </ul>
        </div>
    </div>
</nav>
</div>
`;

// Function to load components
function loadComponents() {
    // Insert navigation
    const navPlaceholder = document.getElementById('nav-placeholder');
    if (navPlaceholder) {
        navPlaceholder.innerHTML = navComponent;
    }

    // Set active link based on current page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Load components when DOM is ready
document.addEventListener('DOMContentLoaded', loadComponents);