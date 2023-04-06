// SMOKE ANIMATION
let spans = document.querySelectorAll('span');

spans.forEach((span) => {
    span.addEventListener("mouseenter", function (e) {
        e.target.classList.add("active");

        setTimeout(() => {
            e.target.classList.remove("active");
        }, 2000);
    });
});