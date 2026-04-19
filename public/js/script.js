// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    const ratingInputs = form.querySelectorAll('input[name="review[rating]"]');
    const ratingError = form.querySelector(".rating-error");
    const reviewSubmitBtn = form.querySelector("#reviewSubmitBtn");

    const hasSelectedRating = () =>
      Array.from(ratingInputs).some((input) => input.checked);

    const syncSubmitState = () => {
      if (reviewSubmitBtn && ratingInputs.length > 0) {
        reviewSubmitBtn.disabled = !hasSelectedRating();
      }
    };

    if (ratingInputs.length > 0) {
      ratingInputs.forEach((input) => {
        input.addEventListener("change", () => {
          if (ratingError) ratingError.classList.add("d-none");
          syncSubmitState();
        });
      });
      syncSubmitState();
    }

    form.addEventListener(
      "submit",
      (event) => {
        if (ratingInputs.length > 0 && !hasSelectedRating()) {
          event.preventDefault();
          event.stopPropagation();
          if (ratingError) ratingError.classList.remove("d-none");
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
