// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  const ratingSlider = document.querySelector(".review-rating-slider");
  const ratingInput = document.querySelector("#ratingInput");
  const ratingValue = document.querySelector("#ratingValue");
  const ratingError = document.querySelector(".rating-error");
  const reviewSubmitBtn = document.querySelector("#reviewSubmitBtn");

  if (ratingSlider && ratingInput && ratingValue) {
    ratingInput.value = "";
    if (reviewSubmitBtn) reviewSubmitBtn.disabled = true;

    ratingSlider.addEventListener("input", () => {
      ratingInput.value = ratingSlider.value;
      ratingValue.textContent = ratingSlider.value;
      ratingSlider.classList.remove("is-invalid");
      if (ratingError) ratingError.classList.add("d-none");
      if (reviewSubmitBtn) reviewSubmitBtn.disabled = false;
    });
  }

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        const formRatingInput = form.querySelector("#ratingInput");
        const formRatingSlider = form.querySelector(".review-rating-slider");
        const formRatingError = form.querySelector(".rating-error");

        if (formRatingInput && !formRatingInput.value) {
          event.preventDefault();
          event.stopPropagation();
          if (formRatingSlider) formRatingSlider.classList.add("is-invalid");
          if (formRatingError) formRatingError.classList.remove("d-none");
        }

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
