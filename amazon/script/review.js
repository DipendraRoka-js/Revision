const reviews = [
  {
    name: "John",
    rating: 5,
    comment: "Amazing product. Highly recommended!"
  },

  {
    name: "Sarah",
    rating: 4,
    comment: "Good quality and fast delivery."
  },

  {
    name: "Michael",
    rating: 5,
    comment: "Worth every penny."
  }
];

renderReviews();
updateStats();

document
  .getElementById("add-review-btn")
  .addEventListener("click", () => {

    const name =
      document.getElementById("name").value;

    const rating =
      Number(
        document.getElementById("rating").value
      );

    const comment =
      document.getElementById("comment").value;

    if(!name || !comment){
      alert("Please fill all fields");
      return;
    }

    reviews.unshift({
      name,
      rating,
      comment
    });

    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";

    renderReviews();
    updateStats();
  });

document
  .getElementById("filter-rating")
  .addEventListener("change", renderReviews);

function renderReviews(){

  const filterValue =
    document.getElementById("filter-rating")
    .value;

  let reviewsHTML = "";

  reviews.forEach((review) => {

    if(
      filterValue !== "all" &&
      review.rating !== Number(filterValue)
    ){
      return;
    }

    reviewsHTML += `
      <div class="review">

        <div class="review-top">

          <div class="review-name">
            ${review.name}
          </div>

          <div class="stars">
            ${"★".repeat(review.rating)}
            ${"☆".repeat(5-review.rating)}
          </div>

        </div>

        <p>${review.comment}</p>

      </div>
    `;
  });

  document.getElementById(
    "reviews-container"
  ).innerHTML = reviewsHTML;
}

function updateStats(){

  const totalReviews = reviews.length;

  let totalRating = 0;
  let fiveStarCount = 0;

  reviews.forEach((review) => {

    totalRating += review.rating;

    if(review.rating === 5){
      fiveStarCount++;
    }

  });

  const averageRating =
    (
      totalRating /
      totalReviews
    ).toFixed(1);

  document.getElementById(
    "total-reviews"
  ).innerText = totalReviews;

  document.getElementById(
    "average-rating"
  ).innerText = averageRating;

  document.getElementById(
    "five-star-count"
  ).innerText = fiveStarCount;
}

console.log("Amazon Customer Reviews Loaded");