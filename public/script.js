const imageInput = document.getElementById("imageInput");
const previewImage = document.getElementById("previewImage");
const resultImage = document.getElementById("resultImage");
const removeBtn = document.getElementById("removeBtn");

let selectedFile = null;

// عرض الصورة المختارة
imageInput.addEventListener("change", function () {

    selectedFile = this.files[0];

    if (!selectedFile) return;

    const reader = new FileReader();

    reader.onload = function (e) {
        previewImage.src = e.target.result;
        resultImage.src = "";
    };

    reader.readAsDataURL(selectedFile);

});

// زر إزالة الخلفية
removeBtn.addEventListener("click", async () => {

    if (!selectedFile) {
        alert("اختر صورة أولاً");
        return;
    }

    alert("الخطوة القادمة سنربط الذكاء الاصطناعي الحقيقي 😊");

});