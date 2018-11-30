//create bas url
const baseUrl = "https://5bee92827839000013e6faed.mockapi.io/clane/api/v2";

//app container
const app = document.getElementById("root");

//the root container
const container = document.createElement("div");
container.setAttribute("class", "container");

//add the container to the root
app.appendChild(container);

// create a request variable
var request = new XMLHttpRequest();

function getNewsDetails(id){
    //alert(id);

    request.open("GET", baseUrl + "/news/" + id);

        request.onload = function(){

            const data = JSON.parse(this.response);
            if(request.status >= 200 && request.status < 400){

                container.innerHTML = "";

                console.log(JSON.stringify(data));
                const sliderImages = document.createElement("div");
                slider.setAttribute("id", "slider-images");

                const slider = document.createElement("div");
                slider.setAttribute("class", "img-slider");
                slider.setAttribute("id", "imgslider");
                slider.appendChild(sliderImages);

                const imgContainer = document.createElement("div");
                imgContainer.setAttribute("class", "img-container");

                const titleContainer = document.createElement("div");
                titleContainer.setAttribute("class", "title-container");

                const authorContainer = document.createElement("div");
                authorContainer.setAttribute("class", "author-container");

                const img = document.createElement("img");
                img.setAttribute("class", "news-image");
                img.src = `${data.avatar}`;

                imgContainer.appendChild(img);

                const h3 = document.createElement("h3");
                h3.setAttribute("class", "news-title");
                h3.textContent = `${data.title}`;

                titleContainer.appendChild(h3);

                const p = document.createElement("p");
                p.setAttribute("class", "news-author");
                p.textContent = `${data.author}`;

                authorContainer.appendChild(p);

                //container.appendChild(imgContainer);
                container.appendChild(sliderImages);
                container.appendChild(titleContainer);
                container.appendChild(authorContainer);


                
            }
            else{
                console.log("Error Occured! " . request.status)
            }

        }
        request.send();
}

function getNewsImages(id){
    //alert(id);

    request.open("GET", baseUrl + "/news/" + id + "/images");

        request.onload = function(){

            const data = JSON.parse(this.response);
            if(request.status >= 200 && request.status < 400){

                const sliderImages = document.getElementById('slider-images');
                data.forEach(image => {

                    const imageSlide = document.createElement("img");
                    imageSlide.setAttribute("class", "slider-image");
                    imageSlide.src = `${image.image}`;
                    sliderImages.appendChild(imageSlide);
                })
                


                
            }
            else{
                console.log("Error Occured! " . request.status)
            }

        }
        request.send();
}

//open connection
request.open("GET", baseUrl + "/news?page=1&limit=10");

request.onload = function(){

    const data = JSON.parse(this.response);
    if(request.status >= 200 && request.status < 400){

        data.forEach(news => {
            console.log(JSON.stringify(news));
            const card  = document.createElement("div");
            card.setAttribute("class", "card");
            card.onclick = function(){
                getNewsDetails(`${news.id}`);
                getNewsImages(`${news.id}`);
               
            };
            const imgContainer = document.createElement("div");
            imgContainer.setAttribute("class", "img-container");

            const titleContainer = document.createElement("div");
            titleContainer.setAttribute("class", "title-container");

            const authorContainer = document.createElement("div");
            authorContainer.setAttribute("class", "author-container");

            const img = document.createElement("img");
            img.setAttribute("class", "news-image");
            img.src = `${news.avatar}`;

            imgContainer.appendChild(img);

            const h3 = document.createElement("h3");
            h3.setAttribute("class", "news-title");
            h3.textContent = `${news.title}`;

            titleContainer.appendChild(h3);

            const p = document.createElement("p");
            p.setAttribute("class", "news-author");
            p.textContent = `${news.author}`;

            authorContainer.appendChild(p);

            card.appendChild(imgContainer);
            card.appendChild(titleContainer);
            card.appendChild(authorContainer);

            container.appendChild(card);

        })
    }
    else{
        console.log("Error Occured! " . request.status)
    }

}

request.send();

