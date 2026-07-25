const API_KEY = "UvE8iyKLFQK6rZARb5fN8ui3";

const imageInput = document.getElementById("imageInput");
const originalImage = document.getElementById("originalImage");
const resultImage = document.getElementById("resultImage");
const loadingText = document.getElementById("loadingText");
const downloadBtn = document.getElementById("downloadBtn");
const originalContainer = document.getElementById("originalContainer");
const resultContainer = document.getElementById("resultContainer");
const successToast = document.getElementById("successToast");

imageInput.addEventListener("change", async (e) => {

    const file = e.target.files[0];
    if (!file) return;

    // عرض الصورة الأصلية
    const originalUrl = URL.createObjectURL(file);
    originalImage.src = originalUrl;
    originalContainer.style.display = "flex";

    // إخفاء النتيجة السابقة
    resultContainer.style.display = "none";
    downloadBtn.style.display = "none";
    loadingText.style.display = "block";

    const formData = new FormData();
    formData.append("image_file", file);
    formData.append("size", "auto");

    try {

        const response = await fetch("https://api.remove.bg/v1.0/removebg", {
            method: "POST",
            headers: {
                "X-Api-Key": API_KEY
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.errors[0].title || "فشلت المعالجة");
        }

        const blob = await response.blob();
        const resultUrl = URL.createObjectURL(blob);

        resultImage.src = resultUrl;
        downloadBtn.href = resultUrl;

        loadingText.style.display = "none";
        resultContainer.style.display = "flex";
        downloadBtn.style.display = "inline-flex";

        // النزول إلى النتيجة
        setTimeout(() => {
            resultContainer.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 200);

    } catch (error) {
        console.error(error);
        loadingText.style.display = "none";
        alert("حدث خطأ: " + error.message);
    }

});

// عند الضغط على زر التحميل
downloadBtn.addEventListener("click", () => {

    successToast.classList.add("show");

    setTimeout(() => {
        successToast.classList.remove("show");
    }, 2500);

});
const homeText = document.querySelector(".home-text");

setInterval(() => {
    homeText.classList.toggle("hide");
}, 1000);