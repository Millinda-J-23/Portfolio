document.addEventListener("DOMContentLoaded", function () {


    /* =====================================================
       MOBILE MENU
    ===================================================== */

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (navLinks.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        navLinks.querySelectorAll("a").forEach(function (link) {

            link.addEventListener("click", function () {

                navLinks.classList.remove("active");

                const icon = menuBtn.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }



    /* =====================================================
       DARK / LIGHT MODE
    ===================================================== */

    const themeBtn = document.getElementById("themeBtn");

    if (themeBtn) {

        const icon = themeBtn.querySelector("i");

        const savedTheme = localStorage.getItem("theme");

        if (savedTheme === "dark") {

            document.body.classList.add("dark-mode");

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        }


        themeBtn.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");


            if (
                document.body.classList.contains("dark-mode")
            ) {

                localStorage.setItem("theme", "dark");

                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");

            } else {

                localStorage.setItem("theme", "light");

                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");

            }

        });

    }



    /* =====================================================
       BACK TO TOP
    ===================================================== */

    const topBtn = document.getElementById("topBtn");

    if (topBtn) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 500) {

                topBtn.classList.add("show");

            } else {

                topBtn.classList.remove("show");

            }

        });


        topBtn.addEventListener("click", function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        });

    }



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements = document.querySelectorAll(
        ".section-heading, " +
        ".skill-card, " +
        ".project-card, " +
        ".timeline-item, " +
        ".education-card, " +
        ".certificate-card, " +
        ".contact-grid"
    );


    const observer = new IntersectionObserver(

        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                }

            });

        },

        {
            threshold: 0.12
        }

    );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        observer.observe(element);

    });



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll("section[id]");

    const navItems = document.querySelectorAll(".nav-links a");


    window.addEventListener("scroll", function () {

        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 160;

            const sectionHeight =
                section.offsetHeight;


            if (
                window.scrollY >= sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navItems.forEach(function (link) {

            link.classList.remove("active");


            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    });



    /* =====================================================
       CONTACT FORM
       FORMSPREE
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");

    const submitBtn =
        document.getElementById("submitBtn");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();


                const name =
                    document.getElementById("name");

                const email =
                    document.getElementById("email");

                const message =
                    document.getElementById("message");


                /* =========================
                   VALIDATION
                ========================= */

                if (
                    !name.value.trim() ||
                    !email.value.trim() ||
                    !message.value.trim()
                ) {

                    formMessage.textContent =
                        "Please fill in all fields.";

                    formMessage.className =
                        "form-message error";

                    return;

                }


                /* =========================
                   EMAIL VALIDATION
                ========================= */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (!emailPattern.test(email.value.trim())) {

                    formMessage.textContent =
                        "Please enter a valid email address.";

                    formMessage.className =
                        "form-message error";

                    return;

                }


                /* =========================
                   LOADING STATE
                ========================= */

                const originalButton =
                    submitBtn.innerHTML;


                submitBtn.disabled = true;


                submitBtn.innerHTML = `
                    <i class="fa-solid fa-spinner fa-spin"></i>
                    Sending...
                `;


                formMessage.textContent = "";

                formMessage.className =
                    "form-message";


                try {


                    /* =========================
                       SEND TO FORMSPREE
                    ========================= */

                    const formData =
                        new FormData(contactForm);


                    const response =
                        await fetch(
                            contactForm.action,
                            {
                                method: "POST",

                                body: formData,

                                headers: {
                                    "Accept":
                                        "application/json"
                                }
                            }
                        );


                    /* =========================
                       SUCCESS
                    ========================= */

                    if (response.ok) {

                        formMessage.textContent =
                            "Message sent successfully! Thank you for contacting me.";

                        formMessage.className =
                            "form-message success";


                        contactForm.reset();

                    }


                    /* =========================
                       ERROR
                    ========================= */

                    else {

                        formMessage.textContent =
                            "Unable to send your message. Please try again.";

                        formMessage.className =
                            "form-message error";

                    }


                }


                /* =========================
                   NETWORK ERROR
                ========================= */

                catch (error) {

                    formMessage.textContent =
                        "Something went wrong. Please try again later.";

                    formMessage.className =
                        "form-message error";

                    console.error(
                        "Contact form error:",
                        error
                    );

                }


                /* =========================
                   RESTORE BUTTON
                ========================= */

                submitBtn.disabled = false;

                submitBtn.innerHTML =
                    originalButton;

            }
        );

    }



    /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(function (link) {


            link.addEventListener(
                "click",
                function (event) {


                    const targetId =
                        this.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(targetId);


                    if (target) {

                        event.preventDefault();


                        const header =
                            document.querySelector(".header");


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const position =
                            target.offsetTop -
                            headerHeight;


                        window.scrollTo({

                            top: position,

                            behavior: "smooth"

                        });

                    }

                }
            );

        });



    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {


                if (navLinks) {

                    navLinks.classList.remove("active");

                }


                if (menuBtn) {

                    const icon =
                        menuBtn.querySelector("i");


                    icon.classList.remove(
                        "fa-xmark"
                    );


                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        }
    );


});