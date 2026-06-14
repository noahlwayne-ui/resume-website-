// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Page switching functionality
function switchPage(pageId) {
    // Hide all page contents
    const allPages = document.querySelectorAll('.page-content');
    allPages.forEach(page => {
        page.classList.remove('active');
    });

    // Remove active class from all buttons
    const allButtons = document.querySelectorAll('.tab-button');
    allButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Add active class to clicked button
    event.target.classList.add('active');

    // Animate sections in the new page
    animateSections();

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Toggle job details dropdown
function toggleJobDetails(headerElement) {
    headerElement.classList.toggle('active');
    const detailsElement = headerElement.nextElementSibling.nextElementSibling;
    if (detailsElement && detailsElement.classList.contains('job-details')) {
        detailsElement.classList.toggle('active');
    }
}

// Animate sections on page load and page switch
function animateSections() {
    const sections = document.querySelectorAll('.page-content.active .section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, 50);
    });
}

// Add fade-in animation on page load
window.addEventListener('load', () => {
    animateSections();
    
    const statsCards = document.querySelectorAll('.stat-card');
    statsCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 50);
    });
});

// Print functionality - Downloads as PDF
function printResume() {
    const filename = 'Noah_Wayne_Resume_' + new Date().getFullYear() + '.pdf';
    window.print();
}

// Optional: Add copy to clipboard functionality for contact info
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copied to clipboard!');
    }).catch(() => {
        showToast('Failed to copy', true);
    });
}

// Toast notification function
function showToast(message, isError = false) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: ${isError ? '#e74c3c' : '#27ae60'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideInUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add scroll-to-top button
const scrollToTopButton = document.createElement('button');
scrollToTopButton.innerHTML = '⬆️';
scrollToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    background-color: #2c5aa0;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    z-index: 999;
    opacity: 0;
    transition: all 0.3s ease;
    display: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`;

scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.style.display = 'block';
        scrollToTopButton.style.opacity = '1';
    } else {
        scrollToTopButton.style.opacity = '0';
        setTimeout(() => scrollToTopButton.style.display = 'none', 300);
    }
});

document.body.appendChild(scrollToTopButton);

// Add keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + P for print
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printResume();
    }

    // Number keys for tab switching (1=Overview, 2=Experience, 3=Skills, 4=Education)
    const tabMap = {
        '1': 'overview',
        '2': 'experience',
        '3': 'skills',
        '4': 'education'
    };

    if (tabMap[e.key]) {
        switchPage(tabMap[e.key]);
    }
});

// Smooth animations on element visibility
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe job cards, education items, skill items
document.querySelectorAll('.job, .education-item, .skill-item, .domain-card, .certification-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(10px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Initialize first page with animations
document.addEventListener('DOMContentLoaded', () => {
    animateSections();
});