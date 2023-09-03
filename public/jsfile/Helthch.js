const programsContainer = document.getElementById("programsContainer");

const healthPrograms = [
    {
        title: "30-Day Fitness Challenge",
        description: "Join our 30-day fitness challenge to improve your strength and endurance. Daily workouts and tips...",
        duration: "30 days",
        cost: "$0"
    },
    {
        title: "Healthy Eating Program",
        description: "Embark on a healthy eating journey with our comprehensive program. Nutrition plans, recipes, and support...",
        duration: "8 weeks",
        cost: "$49"
    },
    {
        title: "Yoga and Meditation",
        description: "Discover inner peace and flexibility with our yoga and meditation program. Guided sessions and mindfulness...",
        duration: "6 weeks",
        cost: "$29"
    },
    {
        title: "Weight Loss Bootcamp",
        description: "Lose weight and transform your body with our intensive bootcamp. Intense workouts, nutrition guidance...",
        duration: "12 weeks",
        cost: "$99"
    },
    {
        title: "Strength Training Program",
        description: "Build muscle and increase strength with our targeted strength training program. Customized workouts and coaching...",
        duration: "10 weeks",
        cost: "$59"
    },
    {
        title: "Mindful Eating Workshop",
        description: "Develop a healthier relationship with food through our mindful eating workshop. Practices and techniques for...",
        duration: "2 weeks",
        cost: "$19"
    },
    {
        title: "Cardiovascular Health Program",
        description: "Improve heart health and endurance with our cardio-focused program. Cardio workouts, dietary recommendations...",
        duration: "8 weeks",
        cost: "$39"
    }
];

// Display health programs
healthPrograms.forEach(program => {
    const programDiv = document.createElement("div");
    programDiv.className = "program";
    programDiv.innerHTML = `
        <h2>${program.title}</h2>
        <p>${program.description}</p>
        <p><strong>Duration:</strong> ${program.duration}</p>
        <p><strong>Cost:</strong> ${program.cost}</p>
    `;
    programsContainer.appendChild(programDiv);
});