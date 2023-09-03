const jobApplicationForm = document.getElementById("jobApplicationForm");
const submissionStatus = document.getElementById("submissionStatus");

jobApplicationForm.addEventListener("submit", function (event) {
    event.preventDefault();

    // Simulate form submission process
    setTimeout(() => {
        submissionStatus.textContent = "Application submitted successfully!";
        jobApplicationForm.reset();
    }, 1500);
});

