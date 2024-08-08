(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    let bodyLockStatus = true;
    let bodyLockToggle = (delay = 500) => {
        if (document.documentElement.classList.contains("lock")) bodyUnlock(delay); else bodyLock(delay);
    };
    let bodyUnlock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            setTimeout((() => {
                for (let index = 0; index < lock_padding.length; index++) {
                    const el = lock_padding[index];
                    el.style.paddingRight = "0px";
                }
                body.style.paddingRight = "0px";
                document.documentElement.classList.remove("lock");
            }), delay);
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    let bodyLock = (delay = 500) => {
        let body = document.querySelector("body");
        if (bodyLockStatus) {
            let lock_padding = document.querySelectorAll("[data-lp]");
            for (let index = 0; index < lock_padding.length; index++) {
                const el = lock_padding[index];
                el.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            }
            body.style.paddingRight = window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
            document.documentElement.classList.add("lock");
            bodyLockStatus = false;
            setTimeout((function() {
                bodyLockStatus = true;
            }), delay);
        }
    };
    function menuInit() {
        if (document.querySelector(".icon-menu")) document.addEventListener("click", (function(e) {
            if (bodyLockStatus && e.target.closest(".icon-menu")) {
                bodyLockToggle();
                document.documentElement.classList.toggle("menu-open");
            }
        }));
    }
    let addWindowScrollEvent = false;
    function headerScroll() {
        addWindowScrollEvent = true;
        const header = document.querySelector("header.header");
        const headerShow = header.hasAttribute("data-scroll-show");
        const headerShowTimer = header.dataset.scrollShow ? header.dataset.scrollShow : 500;
        const startPoint = header.dataset.scroll ? header.dataset.scroll : 1;
        let scrollDirection = 0;
        let timer;
        document.addEventListener("windowScroll", (function(e) {
            const scrollTop = window.scrollY;
            clearTimeout(timer);
            if (scrollTop >= startPoint) {
                !header.classList.contains("_header-scroll") ? header.classList.add("_header-scroll") : null;
                if (headerShow) {
                    if (scrollTop > scrollDirection) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null; else !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    timer = setTimeout((() => {
                        !header.classList.contains("_header-show") ? header.classList.add("_header-show") : null;
                    }), headerShowTimer);
                }
            } else {
                header.classList.contains("_header-scroll") ? header.classList.remove("_header-scroll") : null;
                if (headerShow) header.classList.contains("_header-show") ? header.classList.remove("_header-show") : null;
            }
            scrollDirection = scrollTop <= 0 ? 0 : scrollTop;
        }));
    }
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    const script_elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver((entries => {
        entries.forEach((entry => {
            if (entry.isIntersecting) entry.target.querySelector(".child-element").classList.add("animated");
        }));
    }), {
        threshold: .5
    });
    script_elements.forEach((element => {
        observer.observe(element);
    }));
    const elementsSide = document.querySelectorAll(".animate-on-scroll-side");
    let observerSide = new IntersectionObserver((entries => {
        entries.forEach((entry => {
            if (entry.isIntersecting) {
                const leftElement = entry.target.querySelector(".child-element-left");
                const rightElement = entry.target.querySelector(".child-element-right");
                if (leftElement) leftElement.classList.add("animated-left");
                if (rightElement) rightElement.classList.add("animated-right");
            }
        }));
    }), {
        threshold: .5
    });
    elementsSide.forEach((element => {
        observerSide.observe(element);
    }));
    const lines = document.querySelectorAll(".lines");
    let observerLines = new IntersectionObserver((entries => {
        entries.forEach((entry => {
            if (entry.isIntersecting) entry.target.classList.add("anim");
        }));
    }), {
        threshold: .5
    });
    lines.forEach((element => {
        observerLines.observe(element);
    }));
    const accordionHeaders = document.querySelectorAll(".prices__item");
    accordionHeaders.forEach((header => {
        header.addEventListener("click", (() => {
            const currentItem = header.querySelector(".prices__subtext");
            const subtitle = header.querySelector(".prices__subtitle");
            currentItem.classList.toggle("open");
            if (currentItem.classList.contains("open")) {
                currentItem.style.maxHeight = currentItem.scrollHeight + "px";
                subtitle.style.color = "#CFAB4A";
            } else {
                currentItem.style.maxHeight = 0;
                subtitle.style.color = "#fff";
            }
        }));
    }));
    const projectsElements = document.querySelectorAll(".animate-images");
    const projectsObserver = new IntersectionObserver((entries => {
        entries.forEach((entry => {
            if (entry.isIntersecting) {
                const imgElements = entry.target.querySelectorAll(".img-element");
                imgElements.forEach((imgElement => {
                    imgElement.classList.add("img-anim");
                }));
            }
        }));
    }), {
        threshold: .5
    });
    projectsElements.forEach((element => {
        projectsObserver.observe(element);
    }));
    window["FLS"] = true;
    isWebp();
    menuInit();
    headerScroll();
})();