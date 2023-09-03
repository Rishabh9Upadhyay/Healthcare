const newsContainer = document.getElementById("newsContainer");

const apiKey = 'c7eabae9b1d84d648800112d5fba1185';
const apiUrl = `https://newsapi.org/v2/top-headlines?category=health&language=en&apiKey=${apiKey}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        const articles = data.articles;
        articles.forEach(article => {
            const newsArticle = document.createElement("div");
            newsArticle.className = "news-article";
            newsArticle.innerHTML = `
                <h2>${article.title}</h2>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank" rel="noopener noreferrer">Read more</a>
            `;
            newsContainer.appendChild(newsArticle);
        });
    })
    .catch(error => {
        console.error("Error fetching news:", error);
    });