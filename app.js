// ============================================================
// NIKHIL SR — PROFESSIONAL PORTFOLIO
// Smooth interactions, navigation & subtle animations
// ============================================================


// ============================================================
// ENABLE JAVASCRIPT MODE
// ------------------------------------------------------------
// This class is added immediately when JavaScript loads.
//
// CSS uses:
// html.js .element
//
// Therefore, if JavaScript fails completely, the portfolio
// content remains visible instead of becoming invisible.
// ============================================================

document.documentElement.classList.add("js");


document.addEventListener("DOMContentLoaded", () => {


    // ========================================================
    // ELEMENTS
    // ========================================================

    const header =
        document.getElementById("site-header");

    const navToggle =
        document.getElementById("nav-toggle");

    const navMenu =
        document.getElementById("nav-menu");

    const navLinks =
        document.querySelectorAll(".nav-link");

    const sections =
        document.querySelectorAll("main section[id]");


    // ========================================================
    // NAVIGATION
    // ========================================================

    if (navToggle && navMenu) {

        navToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navMenu.classList.toggle("active");


                navToggle.setAttribute(
                    "aria-expanded",
                    String(isOpen)
                );

            }
        );

    }


    // ========================================================
    // CLOSE MOBILE MENU
    // ========================================================

    navLinks.forEach((link) => {

        link.addEventListener(
            "click",
            () => {

                if (navMenu) {

                    navMenu.classList.remove(
                        "active"
                    );

                }


                if (navToggle) {

                    navToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }
        );

    });


    // ========================================================
    // ESCAPE KEY — CLOSE MENU
    // ========================================================

    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                navMenu?.classList.remove(
                    "active"
                );


                navToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    // ========================================================
    // NAVBAR SCROLL EFFECT
    // ========================================================

    const updateHeader = () => {

        if (!header) {
            return;
        }


        if (window.scrollY > 25) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    };


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    // ========================================================
    // SMOOTH SECTION SCROLLING
    // ========================================================

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#" ||
                        !document.querySelector(
                            targetId
                        )
                    ) {

                        return;

                    }


                    event.preventDefault();


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({

                        top:
                            targetPosition,

                        behavior:
                            "smooth"

                    });

                }
            );

        });


    // ========================================================
    // ACTIVE NAVIGATION
    // ========================================================

    const updateActiveNavigation = () => {

        const scrollPosition =
            window.scrollY +
            (header
                ? header.offsetHeight
                : 0) +
            100;


        let currentSection = "";


        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;


            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            const target =
                link.getAttribute("href");


            if (
                target ===
                `#${currentSection}`
            ) {

                link.classList.add(
                    "active"
                );

            } else {

                link.classList.remove(
                    "active"
                );

            }

        });

    };


    // ========================================================
    // OPTIMIZED SCROLL HANDLER
    // ========================================================

    let scrollTicking = false;


    window.addEventListener(
        "scroll",
        () => {

            if (!scrollTicking) {

                window.requestAnimationFrame(
                    () => {

                        updateActiveNavigation();

                        scrollTicking = false;

                    }
                );


                scrollTicking = true;

            }

        },
        {
            passive: true
        }
    );


    updateActiveNavigation();


    // ========================================================
    // PROFESSIONAL SCROLL REVEAL
    // ========================================================

    const revealElements =
        document.querySelectorAll(

            ".section-heading, " +
            ".about-card, " +
            ".experience-card, " +
            ".skill-group, " +
            ".skill-highlight, " +
            ".project-card, " +
            ".achievement-card, " +
            ".education-item, " +
            ".contact-panel"

        );


    if (
        "IntersectionObserver" in window
    ) {

        const revealObserver =
            new IntersectionObserver(

                (entries, observer) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "is-visible"
                                );


                                observer.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },

                {

                    threshold: 0.12,

                    rootMargin:
                        "0px 0px -45px 0px"

                }

            );


        revealElements.forEach(
            (element) => {

                revealObserver.observe(
                    element
                );

            }
        );


    } else {

        // Fallback for browsers without
        // IntersectionObserver.

        revealElements.forEach(
            (element) => {

                element.classList.add(
                    "is-visible"
                );

            }
        );

    }


    // ========================================================
    // STAGGERED CARD REVEAL
    // ========================================================

    const cardGroups = [

        ".about-card",
        ".skill-group",
        ".skill-highlight",
        ".achievement-card"

    ];


    cardGroups.forEach(
        (selector) => {

            const cards =
                document.querySelectorAll(
                    selector
                );


            cards.forEach(
                (card, index) => {

                    card.style.setProperty(

                        "--reveal-delay",

                        `${index * 80}ms`

                    );

                }
            );

        }
    );


    // ========================================================
    // EDUCATION TIMELINE REVEAL
    // ========================================================

    const educationItems =
        document.querySelectorAll(
            ".education-item"
        );


    educationItems.forEach(
        (item, index) => {

            item.style.setProperty(

                "--education-delay",

                `${index * 120}ms`

            );

        }
    );


    // ========================================================
    // PROJECT CARD INTERACTION
    // ========================================================

    const projectCards =
        document.querySelectorAll(
            ".project-card"
        );


    projectCards.forEach(
        (card) => {


            card.addEventListener(
                "mouseenter",
                () => {

                    card.classList.add(
                        "project-hover"
                    );

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.classList.remove(
                        "project-hover"
                    );

                }
            );


        }
    );


    // ========================================================
    // EXPERIENCE CARD INTERACTION
    // ========================================================

    const experienceCard =
        document.querySelector(
            ".experience-card"
        );


    if (experienceCard) {

        experienceCard.addEventListener(
            "mouseenter",
            () => {

                experienceCard.classList.add(
                    "experience-hover"
                );

            }
        );


        experienceCard.addEventListener(
            "mouseleave",
            () => {

                experienceCard.classList.remove(
                    "experience-hover"
                );

            }
        );

    }


    // ========================================================
    // EXTERNAL LINKS
    // ========================================================

    document
        .querySelectorAll(
            'a[target="_blank"]'
        )
        .forEach(
            (link) => {

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }
        );


    // ========================================================
    // RESPONSIVE NAVIGATION
    // ========================================================

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                navMenu
            ) {

                navMenu.classList.remove(
                    "active"
                );


                navToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    // ========================================================
    // CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    // ========================================================

    document.addEventListener(
        "click",
        (event) => {

            if (
                !navMenu ||
                !navToggle
            ) {
                return;
            }


            const clickedInsideMenu =
                navMenu.contains(
                    event.target
                );


            const clickedToggle =
                navToggle.contains(
                    event.target
                );


            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains(
                    "active"
                )
            ) {

                navMenu.classList.remove(
                    "active"
                );


                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );


    // ========================================================
    // PROFESSIONAL CONSOLE MESSAGE
    // ========================================================

    console.log(

        "%cNikhil SR | Software Developer",

        "color:#32b8c6;font-size:16px;font-weight:700;"

    );


    console.log(

        "%cPortfolio loaded successfully.",

        "color:#9db3b9;font-size:12px;"

    );

});