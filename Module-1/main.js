/*
 * Exercise 1: JavaScript Basics & Setup
 * - Script inclusion in HTML
 * - Console logging
 * - Page load notification
 */
const PORTAL_NAME = "Local Community Event Portal";
console.log(`Welcome to ${PORTAL_NAME}`);

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    console.log('Community Event Portal loaded successfully');
});

/*
 * Exercise 2: Syntax, Data Types, and Operators
 * Exercise 5: Objects and Prototypes
 * - Event class with properties and methods
 * - Data types for event properties
 * - Seat management operators
 */
class Event {
    constructor(id, name, date, location, category, seats, description) {
        this.id = id;
        this.name = name;
        this.date = new Date(date);
        this.location = location;
        this.category = category;
        this.seats = seats;
        this.description = description;
    }

    checkAvailability() {
        return this.seats > 0 && this.date > new Date();
    }

    toString() {
        return `${this.name} on ${this.date.toLocaleDateString()} at ${this.location}`;
    }
}

// Mock Events Data
let events = [
    new Event(1, "Annual Summer Festival", "2025-07-15", "Central Park", "festival", 100,
        "Join us for a day of music, food, and fun! Local artists and vendors will showcase their talents and products."),
    new Event(2, "Food & Culture Fair", "2025-08-05", "Community Center", "fair", 50,
        "Experience diverse cuisines and cultural performances from our multicultural community."),
    new Event(3, "Concert in the Park", "2025-09-01", "Riverside Amphitheater", "concert", 200,
        "An evening of live music featuring local bands and musicians.")
];

// Event Management Functions
function addEvent(event) {
    events.push(event);
    renderEvents();
}

function removeEvent(eventId) {
    events = events.filter(event => event.id !== eventId);
    renderEvents();
}

function filterEventsByCategory(category) {
    return category ? events.filter(event => event.category === category) : events;
}

// Closure for tracking registrations
function createRegistrationTracker() {
    const registrations = new Map();

    return {
        addRegistration: (category) => {
            registrations.set(category, (registrations.get(category) || 0) + 1);
            return registrations.get(category);
        },
        getRegistrations: (category) => registrations.get(category) || 0
    };
}

const registrationTracker = createRegistrationTracker();

// DOM Manipulation Functions
function renderEvents(filterCategory = '', eventList = events) {
    const eventsContainer = document.querySelector('.row.g-4');
    if (!eventsContainer) return;

    const filteredEvents = filterEventsByCategory(filterCategory);

    eventsContainer.innerHTML = eventList.map(event => `
        <div class="col-12 col-md-6 col-lg-4">
            <div class="card h-100 shadow-sm" data-event-id="${event.id}">
                <div class="card-body">
                    <h3 class="card-title">${event.name}</h3>
                    <p class="card-text">${event.description}</p>
                    <p class="card-text">
                        <i class="bi bi-calendar"></i> <strong>Date:</strong> ${event.date.toLocaleDateString()}<br>
                        <i class="bi bi-geo-alt"></i> <strong>Location:</strong> ${event.location}<br>
                        <i class="bi bi-ticket"></i> <strong>Available Seats:</strong> ${event.seats}
                    </p>
                    <button class="btn btn-primary ${event.checkAvailability() ? '' : 'disabled'}"
                            onclick="handleRegistration(${event.id})">
                        ${event.checkAvailability() ? 'Register Now' : 'Event Full'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Form Handling
async function handleRegistration(eventId) {
    try {
        const event = events.find(e => e.id === eventId);
        if (!event) throw new Error('Event not found');

        if (!event.checkAvailability()) {
            throw new Error('Event is full or expired');
        }

        // Show registration form modal
        const modal = new bootstrap.Modal(document.getElementById('registrationModal'));
        document.getElementById('eventName').value = event.name;
        modal.show();
    } catch (error) {
        showAlert('error', error.message);
    }
}

async function submitRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');

    try {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Registering...';

        const formData = new FormData(form);
        const registrationData = Object.fromEntries(formData.entries());

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock API endpoint
        const response = await fetch('https://api.example.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        }).catch(() => {
            // Simulate successful response since this is a mock API
            return new Response(JSON.stringify({ success: true }));
        });

        const result = await response.json();

        if (result.success) {
            const eventName = formData.get('eventName');
            const event = events.find(e => e.name === eventName);

            if (event) {
                event.seats--;
                registrationTracker.addRegistration(event.category);
                renderEvents();
            }

            const modal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
            modal.hide();
            showAlert('success', 'Registration successful! You will receive a confirmation email shortly.');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showAlert('error', 'Registration failed. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Register';
    }
}

// Utility Functions
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : 'success'} alert-dismissible fade show position-fixed top-0 end-0 m-3`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
}

/*
 * Exercise 8: Event Handling
 * Exercise 9: Async JS, Promises, Async/Await
 * - Quick search functionality
 * - Loading spinner
 * - Async operations
 */
async function searchEvents(query) {
    const spinner = document.createElement('div');
    spinner.className = 'spinner-border text-primary';
    spinner.setAttribute('role', 'status');
    spinner.innerHTML = '<span class="visually-hidden">Loading...</span>';

    const eventsContainer = document.querySelector('.row.g-4');
    eventsContainer.prepend(spinner);

    try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const searchResults = events.filter(event =>
            event.name.toLowerCase().includes(query.toLowerCase()) ||
            event.description.toLowerCase().includes(query.toLowerCase()) ||
            event.location.toLowerCase().includes(query.toLowerCase())
        );

        renderEvents('', searchResults);
    } catch (error) {
        showAlert('error', 'Search failed. Please try again.');
    } finally {
        spinner.remove();
    }
}

// Add search handler
const searchForm = document.querySelector('form.d-flex');
if (searchForm) {
    searchForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const searchInput = this.querySelector('input[type="search"]');
        searchEvents(searchInput.value);
    });

    // Quick search on keydown
    const searchInput = searchForm.querySelector('input[type="search"]');
    searchInput.addEventListener('keydown', function (e) {
        if (this.value.length >= 3) {
            clearTimeout(this.searchTimeout);
            this.searchTimeout = setTimeout(() => {
                searchEvents(this.value);
            }, 500);
        }
    });
}

/*
 * Exercise 10: Modern JavaScript Features
 * - Destructuring
 * - Spread operator
 * - Template literals
 */
function formatEventDetails(event) {
    const { name, date, location, seats } = event;
    return `${name} at ${location} on ${date.toLocaleDateString()} (${seats} seats left)`;
}

function cloneEvents() {
    return [...events];
}

/*
 * Exercise 11: Working with Forms
 * Exercise 12: AJAX & Fetch API
 * - Form validation
 * - Mock API calls
 * - Loading states
 */
async function submitRegistration(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');

    try {
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm"></span> Registering...';

        const formData = new FormData(form);
        const registrationData = Object.fromEntries(formData.entries());

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock API endpoint
        const response = await fetch('https://api.example.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(registrationData)
        }).catch(() => {
            // Simulate successful response since this is a mock API
            return new Response(JSON.stringify({ success: true }));
        });

        const result = await response.json();

        if (result.success) {
            const eventName = formData.get('eventName');
            const event = events.find(e => e.name === eventName);

            if (event) {
                event.seats--;
                registrationTracker.addRegistration(event.category);
                renderEvents();
            }

            const modal = bootstrap.Modal.getInstance(document.getElementById('registrationModal'));
            modal.hide();
            showAlert('success', 'Registration successful! You will receive a confirmation email shortly.');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showAlert('error', 'Registration failed. Please try again.');
    } finally {
        submitButton.disabled = false;
        submitButton.innerHTML = 'Register';
    }
}

/*
 * Exercise 13: Debugging and Testing
 * - Console logging
 * - Error tracking
 */
function debug(message, data = null) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] ${message}`, data || '');
}

// Track form submission steps
function logFormSubmission(step, data) {
    debug(`Form submission - ${step}`, data);
}

/*
 * Exercise 14: jQuery and Modern Alternatives
 * Note: Instead of using jQuery, we've used modern vanilla JavaScript which offers:
 * 1. Better performance (no additional library overhead)
 * 2. Modern DOM APIs that are just as convenient as jQuery
 * 3. Native support for promises and async/await
 * 4. Built-in animation support with CSS transitions
 *
 * For more complex applications, modern frameworks like React or Vue would offer:
 * - Component-based architecture
 * - Virtual DOM for efficient updates
 * - State management
 * - Rich ecosystem of tools and libraries
 */
// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portal initialized');
    renderEvents();

    // Set up event listeners
    const eventTypeSelect = document.getElementById('eventType');
    if (eventTypeSelect) {
        eventTypeSelect.addEventListener('change', function () {
            renderEvents(this.value);
        });
    }

    // Add form validation
    const forms = document.querySelectorAll('.needs-validation');
    forms.forEach(form => {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });


});



// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize tooltips
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
});

// Simple search functionality
const searchBox = document.querySelector('.search-box');
if (searchBox) {
    searchBox.addEventListener('input', function () {
        if (this.value.length >= 3) {
            searchEvents(this.value);
        } else if (this.value.length === 0) {
            renderEvents(); // Show all events when search is cleared
        }
    });
}
