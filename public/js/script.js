// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  const ratingSlider = document.querySelector(".review-rating-slider");
  const ratingInput = document.querySelector("#ratingInput");
  const ratingValue = document.querySelector("#ratingValue");

  if (ratingSlider && ratingInput && ratingValue) {
    ratingInput.value = "";

    ratingSlider.addEventListener("input", () => {
      ratingInput.value = ratingSlider.value;
      ratingValue.textContent = ratingSlider.value;
    });
  }

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();
