// ========================
// MESSAGE NOTIFICATION SYSTEM
// ========================

const notificationContainer = document.getElementById('notificationContainer');
let notificationCounter = 0;

// Function to show notification
function showNotification(type, title, message) {
    notificationCounter++;
    const notificationId = `notification-${notificationCounter}`;

    // Get current time
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // Determine icon and class based on type
    let iconClass, notificationClass, icon;
    switch (type) {
        case 'success':
            iconClass = 'success';
            notificationClass = 'notification-success';
            icon = 'fa-check-circle';
            break;
        case 'error':
            iconClass = 'error';
            notificationClass = 'notification-error';
            icon = 'fa-exclamation-circle';
            break;
        case 'warning':
            iconClass = 'warning';
            notificationClass = 'notification-warning';
            icon = 'fa-exclamation-triangle';
            break;
        default:
            iconClass = 'info';
            notificationClass = '';
            icon = 'fa-info-circle';
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.id = notificationId;
    notification.className = `message-notification ${notificationClass}`;
    notification.innerHTML = `
                <div class="notification-icon ${iconClass}">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="notification-content">
                    <div class="notification-title">${title}</div>
                    <div class="notification-message">${message}</div>
                    <div class="notification-time">${timeString}</div>
                </div>
                <button class="close-notification" onclick="removeNotification('${notificationId}')">
                    <i class="fas fa-times"></i>
                </button>
            `;

    // Add to container
    notificationContainer.appendChild(notification);

    // Auto-remove after 5 seconds
    setTimeout(() => {
        removeNotification(notificationId);
    }, 5000);

    // Play notification sound (optional)
    playNotificationSound();

    return notificationId;
}

// Function to remove notification
function removeNotification(id) {
    const notification = document.getElementById(id);
    if (notification) {
        notification.style.animation = 'slideOut 0.3s ease-out forwards';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }
}

// Function to play notification sound
function playNotificationSound() {
    // Create audio context for simple beep
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log("Audio not supported in this browser");
    }
}

// Demo message data
const demoMessages = [
    {
        type: 'info',
        title: 'Message Sent',
        message: 'Your message has been delivered successfully!'
    },
    {
        type: 'info',
        title: 'New Message Received',
        message: 'John: "Hey, are we still meeting for lunch today?"'
    },
    {
        type: 'success',
        title: 'Message Delivered',
        message: 'Your message was read at 2:30 PM'
    },
    {
        type: 'warning',
        title: 'Message Pending',
        message: 'Your message is waiting for network connection'
    },
    {
        type: 'error',
        title: 'Failed to Send',
        message: 'Could not deliver your message. Please try again.'
    }
];

// Get random message
function getRandomMessage() {
    return demoMessages[Math.floor(Math.random() * demoMessages.length)];
}

// ========================
// SCROLL BUTTON SYSTEM
// ========================

const scrollTopBtn = document.getElementById('scrollTopBtn');
const scrollBottomBtn = document.getElementById('scrollBottomBtn');

// Show/hide scroll buttons based on scroll position
function toggleScrollButtons() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Show top button when scrolled down 200px
    if (scrollPosition > 200) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    // Show bottom button when near top (not at bottom)
    if (scrollPosition < documentHeight - windowHeight - 200) {
        scrollBottomBtn.classList.add('visible');
    } else {
        scrollBottomBtn.classList.remove('visible');
    }
}

// Scroll to top
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Scroll to bottom
function scrollToBottom() {
    window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
    });
}

// ========================
// EVENT LISTENERS
// ========================

// Message buttons
document.getElementById('sendMessageBtn').addEventListener('click', () => {
    const msg = getRandomMessage();
    showNotification('info', 'Message Sent', 'Your message has been delivered to the recipient.');
});

document.getElementById('receiveMessageBtn').addEventListener('click', () => {
    const users = ['John', 'Sarah', 'Mike', 'Emma', 'Alex'];
    const messages = [
        "Hey there! How's it going?",
        "Are we still meeting tomorrow?",
        "I've sent you the documents",
        "Can you give me a call when you're free?",
        "Thanks for your help with the project!"
    ];
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];

    showNotification('info', `Message from ${randomUser}`, randomMessage);
});

document.getElementById('sendSuccessBtn').addEventListener('click', () => {
    showNotification('success', 'Message Delivered', 'Your message has been read by the recipient.');
});

document.getElementById('sendErrorBtn').addEventListener('click', () => {
    showNotification('error', 'Delivery Failed', 'Unable to deliver message. Please check your connection.');
});

document.getElementById('clearNotificationsBtn').addEventListener('click', () => {
    notificationContainer.innerHTML = '';
});

// Scroll buttons
scrollTopBtn.addEventListener('click', scrollToTop);
scrollBottomBtn.addEventListener('click', scrollToBottom);

// Scroll event listener
window.addEventListener('scroll', toggleScrollButtons);

// Initialize scroll buttons on load
document.addEventListener('DOMContentLoaded', toggleScrollButtons);

// Keyboard shortcuts (optional)
document.addEventListener('keydown', (e) => {
    // Ctrl + T = Scroll to top
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        scrollToTop();
    }
    // Ctrl + B = Scroll to bottom
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        scrollToBottom();
    }
    // Esc = Clear notifications
    if (e.key === 'Escape') {
        notificationContainer.innerHTML = '';
    }
});

// Initial notification demo
setTimeout(() => {
    showNotification('info', 'Welcome!', 'Click the buttons to test message notifications.');
}, 1000);

// Administrator Data
const administrators = [
    {
        id: 1,
        name: "SANDRA jerry",
        role: "General Manager",
        department: "Operations",
        email: "sandra@vanilla palacerestaurant.com",
        phone: "(555) 123-4001",
        extension: "101",
        availability: "Mon-Fri, 9AM-6PM",
        initials: "SJ",
        color: "#6c0102"
    },
    {
        id: 2,
        name: "calvin kafumbe",
        role: "Head Chef",
        department: "Kitchen",
        email: "calvin@vanilla palace restaurant.com",
        phone: "(555) 123-4002",
        extension: "102",
        availability: "Tue-Sat, 10AM-8PM",
        initials: "MC",
        color: "#c0d6ff"
    },
    {
        id: 3,
        name: "doreen rwebembera",
        role: "Customer Relations",
        department: "Service",
        email: "elena@restaurant.com",
        phone: "(555) 123-4003",
        extension: "103",
        availability: "Mon-Sun, 11AM-9PM",
        initials: "ER",
        color: "#e94e77"
    },
    {
        id: 4,
        name: "David Wilson",
        role: "Events Coordinator",
        department: "Catering",
        email: "david@restaurant.com",
        phone: "(555) 123-4004",
        extension: "104",
        availability: "Mon-Fri, 10AM-7PM",
        initials: "DW",
        color: "#37bc9b"
    },
    {
        id: 5,
        name: "Lisa Thompson",
        role: "Marketing Director",
        department: "Marketing",
        email: "lisa@restaurant.com",
        phone: "(555) 123-4005",
        extension: "105",
        availability: "Mon-Fri, 9AM-5PM",
        initials: "LT",
        color: "#8e44ad"
    },
    {
        id: 6,
        name: "Robert Kim",
        role: "Finance Manager",
        department: "Finance",
        email: "robert@restaurant.com",
        phone: "(555) 123-4006",
        extension: "106",
        availability: "Mon-Fri, 8AM-4PM",
        initials: "RK",
        color: "#f6bb42"
    }
];

// DOM Elements
const adminCardsContainer = document.getElementById('adminCards');
const contactForm = document.getElementById('contactForm');
const recipientField = document.getElementById('recipient');
const formHeader = document.getElementById('formHeader');
const adminSearch = document.getElementById('adminSearch');
const searchButton = document.getElementById('searchButton');

// Initialize with General Inquiry
let selectedAdmin = null;

// Render Administrator Cards
function renderAdminCards(filter = '') {
    adminCardsContainer.innerHTML = '';

    const filteredAdmins = administrators.filter(admin =>
        admin.name.toLowerCase().includes(filter.toLowerCase()) ||
        admin.role.toLowerCase().includes(filter.toLowerCase()) ||
        admin.department.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredAdmins.length === 0) {
        adminCardsContainer.innerHTML = `
                    <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #777;">
                        <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 15px;"></i>
                        <h3>No administrators found</h3>
                        <p>Try a different search term</p>
                    </div>
                `;
        return;
    }

    filteredAdmins.forEach(admin => {
        const card = document.createElement('div');
        card.className = `admin-card ${selectedAdmin?.id === admin.id ? 'selected-admin' : ''}`;
        card.innerHTML = `
                    <div class="admin-avatar" style="background-color: ${admin.color}">
                        ${admin.initials}
                    </div>
                    <div class="admin-name">${admin.name}</div>
                    <div class="admin-role">${admin.role}</div>
                    <div class="admin-details">
                        <strong>Department:</strong> ${admin.department}<br>
                        <strong>Available:</strong> ${admin.availability}
                    </div>
                    <div class="admin-contact">
                        <div class="contact-item">
                            <i class="fas fa-envelope"></i>
                            <span>${admin.email}</span>
                        </div>
                        <div class="contact-item">
                            <i class="fas fa-phone"></i>
                            <span>${admin.phone} ext. ${admin.extension}</span>
                        </div>
                    </div>
                    <button class="search-btn" style="position: static; margin-top: 15px; width: 100%; border-radius: 6px;" 
                            onclick="selectAdmin(${admin.id})" title="Contact ${admin.name}">
                        <i class="fas fa-paper-plane"></i> Contact ${admin.name.split(' ')[0]}
                    </button>
                `;
        adminCardsContainer.appendChild(card);
    });
}

// Select Administrator and Update Form
window.selectAdmin = function (adminId) {
    selectedAdmin = administrators.find(admin => admin.id === adminId);

    // Update form fields
    recipientField.value = `${selectedAdmin.name} (${selectedAdmin.role})`;
    formHeader.innerHTML = `Send a message directly to <strong>${selectedAdmin.name}</strong>, our ${selectedAdmin.role}. They'll respond personally within their availability.`;

    // Update subject placeholder
    document.getElementById('subject').placeholder = `Message for ${selectedAdmin.name.split(' ')[0]} regarding...`;

    // Re-render cards to highlight selected
    renderAdminCards(adminSearch.value);

    // Scroll to form smoothly
    document.querySelector('.form-section').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });

    // Focus on name field for user convenience
    document.getElementById('name').focus();
};

// Search Functionality
function handleSearch() {
    renderAdminCards(adminSearch.value);
}

// Form Submission
contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
        recipient: recipientField.value,
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toLocaleString()
    };

    // In a real application, you would send this data to a server
    // For demo purposes, we'll just show an alert
    const adminName = selectedAdmin ? selectedAdmin.name : 'General Inquiry';

    alert(`Thank you, ${formData.name}!\n\nYour message to ${adminName} has been sent successfully.\n\nWe'll respond to ${formData.email} within 24 hours.`);

    // Reset form (but keep recipient)
    contactForm.reset();
    recipientField.value = selectedAdmin ?
        `${selectedAdmin.name} (${selectedAdmin.role})` :
        'General Inquiry';

    // Reset to general inquiry
    selectedAdmin = null;
    formHeader.innerHTML = "Send a message to our team. We'll respond within 24 hours.";
    renderAdminCards(adminSearch.value);
});

// Event Listeners
adminSearch.addEventListener('input', handleSearch);
searchButton.addEventListener('click', handleSearch);

// Allow Enter key in search
adminSearch.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleSearch();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    renderAdminCards();
});

// Add some animation to form submission
contactForm.addEventListener('submit', function () {
    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        submitBtn.disabled = false;
    }, 1500);
});

const canvas = document.getElementById('my-canvas');
        const span = document.querySelector('span');
        const button = document.getElementById('submit');

        function getRandomColor() {
            const letters = '0123456789ABCDEF';
            let color = '#';
            for (let i = 0; i < 6; i++) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }

        function updateColor() {
            const newColor = getRandomColor();
            canvas.style.backgroundColor = newColor;
            span.textContent = newColor;
        }

        button.addEventListener('click', updateColor);

        // Initialize with a random color
        updateColor();