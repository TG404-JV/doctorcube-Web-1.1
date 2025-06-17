document.addEventListener("DOMContentLoaded", function () {
    if (window.location.hash) {
        let target = document.querySelector(window.location.hash);
        if (target) {
            setTimeout(() => {
                window.scrollTo({
                    top: target.offsetTop - 80, // Adjust based on header height
                    behavior: "smooth",
                });
            }, 500);
        }
    }
});
