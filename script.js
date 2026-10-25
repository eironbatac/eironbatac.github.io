const yearElement = document.getElementById("current-year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

// =========================
// ABOUT ME PHOTO SLIDESHOW
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const aboutSection = document.querySelector("#about");

    if (!aboutSection) return;

    const slides = aboutSection.querySelectorAll(".about-slide");
    const dots = aboutSection.querySelectorAll(".about-dot");

    if (slides.length === 0 || slides.length !== dots.length) {
        console.warn("About slideshow: Check that each image has a matching navigation dot.");
        return;
    }

    let currentSlide = 0;
    let slideshowInterval;

    function showSlide(index) {
        slides[currentSlide].classList.remove("active");
        dots[currentSlide].classList.remove("active");
        dots[currentSlide].setAttribute("aria-pressed", "false");

        currentSlide = index;

        slides[currentSlide].classList.add("active");
        dots[currentSlide].classList.add("active");
        dots[currentSlide].setAttribute("aria-pressed", "true");
    }

    function startSlideshow() {
        clearInterval(slideshowInterval);

        slideshowInterval = setInterval(() => {
            const nextSlide = (currentSlide + 1) % slides.length;
            showSlide(nextSlide);
        }, 3000);
    }

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            showSlide(index);
            startSlideshow();
        });
    });

    // Display the first image initially.
    showSlide(0);

    // Automatically change images every three seconds.
    startSlideshow();
});

/* =========================
CERTIFICATE IMAGE PREVIEW
========================= */

document.addEventListener("DOMContentLoaded", () => {
const modal = document.getElementById("certificateModal");
const modalImage = document.getElementById("certificateModalImage");
const closeButton = document.querySelector(".certificate-modal-close");
const previewButtons = document.querySelectorAll(".certificate-preview-button");

if (!modal || !modalImage || !closeButton) {
    return;
}

let previouslyFocusedElement = null;

function openCertificate(button) {
    const imagePath = button.dataset.certificate;
    const thumbnail = button.querySelector("img");

    if (!imagePath) {
        return;
    }

    previouslyFocusedElement = button;

    modalImage.src = imagePath;
    modalImage.alt = thumbnail
        ? thumbnail.alt
        : "Full certificate preview";

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    closeButton.focus();
}

function closeCertificate() {
    if (!modal.classList.contains("is-open")) {
        return;
    }

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
    document.body.style.overflow = "";

    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
    }
}

previewButtons.forEach((button) => {
    button.addEventListener("click", () => {
        openCertificate(button);
    });
});

closeButton.addEventListener("click", closeCertificate);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeCertificate();
    }
});

document.addEventListener("keydown", (event) => {
    if (
        event.key === "Escape" &&
        modal.classList.contains("is-open")
    ) {
        closeCertificate();
    }
});

});

// =========================
// NAVBAR ACTIVE LINK ON SCROLL
// =========================

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-links a[href^='#']");
    const sections = Array.from(navLinks)
        .map((link) => {
            const sectionId = link.getAttribute("href");
            return document.querySelector(sectionId);
        })
        .filter((section) => section !== null);

    if (navLinks.length === 0 || sections.length === 0) {
        return;
    }

    function updateActiveLink() {
        const scrollPosition = window.scrollY + 150;
        let currentSection = sections[0];

        sections.forEach((section) => {
            if (section.offsetTop <= scrollPosition) {
                currentSection = section;
            }
        });

        navLinks.forEach((link) => {
            const isActive =
                link.getAttribute("href") === `#${currentSection.id}`;

            link.classList.toggle("active", isActive);
        });
    }

    window.addEventListener("scroll", updateActiveLink, {
        passive: true
    });

    window.addEventListener("load", updateActiveLink);

    updateActiveLink();
});