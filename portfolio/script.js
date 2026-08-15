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


        /* Close mobile menu after clicking a link */

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


        /* Load saved theme */

        if (savedTheme === "dark") {

            document.body.classList.add("dark-mode");

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        }


        /* Change theme */

        themeBtn.addEventListener("click", function () {

            document.body.classList.toggle("dark-mode");


            if (document.body.classList.contains("dark-mode")) {

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
       OPEN EMAIL APPLICATION
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* =========================
                   GET FORM VALUES
                ========================= */

                const name =
                    document.getElementById("name");

                const email =
                    document.getElementById("email");

                const message =
                    document.getElementById("message");


                const nameValue =
                    name.value.trim();

                const emailValue =
                    email.value.trim();

                const messageValue =
                    message.value.trim();


                /* =========================
                   VALIDATION
                ========================= */

                if (
                    !nameValue ||
                    !emailValue ||
                    !messageValue
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


                if (
                    !emailPattern.test(emailValue)
                ) {

                    formMessage.textContent =
                        "Please enter a valid email address.";

                    formMessage.className =
                        "form-message error";

                    return;

                }


                /* =========================
                   CREATE EMAIL SUBJECT
                ========================= */

                const subject =
                    encodeURIComponent(
                        "Portfolio Contact Message"
                    );


                /* =========================
                   CREATE EMAIL BODY
                ========================= */

                const body =
                    encodeURIComponent(

                        "Hello Millinda,\n\n" +

                        "Name: " +
                        nameValue +
                        "\n" +

                        "Email: " +
                        emailValue +
                        "\n\n" +

                        "Message:\n" +
                        messageValue +

                        "\n\n" +

                        "Sent from Millinda J Portfolio"

                    );


                /* =========================
                   OPEN EMAIL APPLICATION
                ========================= */

                window.location.href =
                    "mailto:millinjas6@gmail.com" +
                    "?subject=" +
                    subject +
                    "&body=" +
                    body;


                /* =========================
                   SHOW MESSAGE
                ========================= */

                formMessage.textContent =
                    "Opening your email application...";

                formMessage.className =
                    "form-message success";

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


                /* Close mobile menu */

                if (navLinks) {

                    navLinks.classList.remove("active");

                }


                /* Reset menu icon */

                if (menuBtn) {

                    const icon =
                        menuBtn.querySelector("i");


                    if (icon) {

                        icon.classList.remove(
                            "fa-xmark"
                        );

                        icon.classList.add(
                            "fa-bars"
                        );

                    }

                }

            }

        }
    );


});