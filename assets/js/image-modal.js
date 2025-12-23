document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("imgModal");
    const modalImg = document.getElementById("imgModalContent");
    const closeBtn = document.querySelector(".img-close");

    document.querySelectorAll("img.zoomable").forEach(img => {
        img.addEventListener("click", () => {
        modalImg.src = img.src;
        modal.classList.add("show");
        });
    });

    function closeModal() {
        modal.classList.remove("show");
    }

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeModal();
    });
});
