let arr = ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-tNk36iIQ6-rN4ZcFowo5CvYq0Pe3a0ul0Q&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzsNKyP09Aqnq8cDVEwRRds3veHUJvK3Eg-A&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBbUF67ozcisiW1LZuBvtLn2pnayxxm08yOw&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmgPH9d7_ZUjgju6AISWGhx-Swf8WWKThvvA&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTunslcjl2MDXHeNBnMY3Vkdf_5UySp1Lp09w&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8nSUcJNg4drpW8MU-PW90fQtkzvBKJbcPAQ&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7RNMoxtjwgsYOHpLuylfPN-7tpkm6gV1wOA&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_iGSTGWfTbV6wv56G8URJonHxnR8-iepiDw&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwWv8qybDrrOvYi8GlZh1LZ8iCgE0J6ZWYYg&usqp=CAU','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqKxyw9fIdbKhuo3EGfh412elzNz8VGSNe8A&usqp=CAU']


const res = fetch('./jsfile/exerci.json')
const exer = document.getElementById("exer");
res.then((v)=>{
    return v.json();
}).then((content)=>{
    // console.log(content);
    ihtml = "";
    let i = 0;
    for(item in content){
        // console.log(content[item]);
        ihtml+=`
        <div class="boxserE">
            <img src="${arr[i]}" alt="">
            <h2>${content[item].name}</h2>
            <h3>equipment: <span style:" font-size: 0.8rem">${content[item].equipment}</span></h3>
            <h3>difficulty: <span style:" font-size: 0.8rem">${content[item].difficulty}</span></h3>
            <h3>muscle: <span style:" font-size: 0.8rem">${content[item].muscle}</span></h3>
            <h3>type: <span style:" font-size: 0.8rem">${content[item].type}</span></h3>

            <h3>instructions: </h3><p>${content[item].instructions}</p>
            </div>
        `
        i++;
    }
    exer.innerHTML = ihtml;

})