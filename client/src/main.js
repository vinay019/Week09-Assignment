const userGuestForm = document.getElementById("user-book-entry-form");
const feedbackList = document.getElementById("feedback-list");

userGuestForm.addEventListener("submit", handleSubmit);

async function handleSubmit(event) {
  event.preventDefault();

  const data = new FormData(userGuestForm);
  const formValues = Object.fromEntries(data);
  console.log(formValues);

  const serverResponse = await fetch(
    "https://week09-assignment-server.onrender.com/feedback",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formValues),
    }
  );

  console.log(serverResponse);
  const parsedResponse = await serverResponse.json();
  console.log(parsedResponse);

  if (serverResponse.ok) {
    userGuestForm.reset();
    getAllFeedback();
  }
}

async function getAllFeedback() {
  feedbackList.innerHTML = "";

  const response = await fetch(
    "https://week09-assignment-server.onrender.com/feedback"
  );
  const feedbackData = await response.json();
  console.log("Guest feedback", feedbackData);

  feedbackData.reverse();

  feedbackData.forEach((feedback) => {
    const li = document.createElement("li");

    const userName = document.createElement("h3");
    userName.textContent = feedback.name;

    const userFeedback = document.createElement("p");
    userFeedback.textContent = feedback.comment;

    const userRating = document.createElement("p");
    userRating.textContent = "Rating: " + feedback.rating;

    li.appendChild(userName);
    li.appendChild(userFeedback);
    li.appendChild(userRating);

    feedbackList.appendChild(li);
  });
}

getAllFeedback();
