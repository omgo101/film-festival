// cursor.js - Desktop-only custom cursor
document.addEventListener('DOMContentLoaded', function () {

    function isDesktop() {
        return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    }

    if (isDesktop()) {

        // Create ONLY one cursor element
        const cursorHTML = `<div class="cursor"></div>`;
        document.body.insertAdjacentHTML('beforeend', cursorHTML);

        // Add CSS
        const style = document.createElement('style');
        style.textContent = `
            body {
                cursor: none;
            }

            .cursor {
                position: fixed;
                top: 0;
                left: 0;
                pointer-events: none;
                z-index: 9999;
                user-select: none;
                transform: translate(-50%, -50%);
                display: none;

                /* ---- PNG Cursor ---- */
                width: 65px;
                height: 65px;
                background-image: url('./assets/img/logon.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;

                /* Keep image sharp */
                image-rendering: crisp-edges;
                image-rendering: -webkit-optimize-contrast;
                transition: transform 0.15s ease-out;
            }
        `;
        document.head.appendChild(style);

        // Cursor element
        const cursor = document.querySelector(".cursor");

        // GSAP smooth movement
        const cursorXTo = gsap.quickTo(cursor, "x", { duration: 0.12, ease: "power3.out" });
        const cursorYTo = gsap.quickTo(cursor, "y", { duration: 0.12, ease: "power3.out" });

        function updatePosition(x, y) {
            cursorXTo(x);
            cursorYTo(y);
        }

        function showCursor() {
            gsap.set(cursor, { display: 'block', opacity: 1 });
        }

        function hideCursor() {
            gsap.to(cursor, {
                opacity: 0,
                duration: 0.3,
                onComplete: () => gsap.set(cursor, { display: 'none' })
            });
        }

        // Follow mouse
        window.addEventListener("mousemove", (e) => {
            showCursor();
            updatePosition(e.clientX, e.clientY);
        });

        // Hide on leave
        document.addEventListener("mouseleave", hideCursor);

        // Start hidden
        gsap.set(cursor, { opacity: 0, display: 'none' });
    }
});
