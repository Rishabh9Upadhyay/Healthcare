async function fetchData() {
    const url = "https://newsapi.org/v2/top-headlines?country=in&category=health&apiKey=dd531709c99b4021b745352edca5e214";
  
    const response = await fetch(url);
    const vlue = await response.json();
  
    const maindib1 = document.getElementById("maindib1");
    let ihtml = "";
  
    vlue.articles.forEach(item => {
      ihtml += `
        <div class="dibcont">
          <img src="${item.urlToImage}" alt="">
          <h2>Title:<h4>${item.title}</h4></h2>
          <span><b>Author:</b>${item.author}</span>
          <span><b>Description:</b>${item.description}</span>
          <span><b>Contents: </b>${item.content}</span>
          <span><b>Published At:</b>${item.publishedAt}</span>
          <button><a href="${item.url}" target="_blank" >click here</a></button>
        </div>
      `;
      maindib1.innerHTML = ihtml;
    });
  
  }
  
fetchData();
  