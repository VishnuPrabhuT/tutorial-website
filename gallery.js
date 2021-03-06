~async function () {
    // const KEY = 'c0GKHq2Y3TfRirBUKJGFNZkVDnz_cx5QIGc1XadAcbQ';
    // const SECRET_KEY = 'U8j_3ntx8HHxdg07y36hvVcNqAlx9gjm4kbTYveI5nI';

    // let res = await fetch(`https://api.unsplash.com/photos/random?client_id=${KEY}&content_filter=high&count=30&orientation=landscape`);
    // let data = await res.json();

    let data = window.base;
    //console.log(data)

    let container = document.querySelector(".gallery-container")

    data.forEach(async item => {
        //console.log(item.links.download, " ", item.id);
        let li = document.createElement("li");
        let div = document.createElement("div");
        let figure = document.createElement("figure");
        let figurecaption = document.createElement("figurecaption");
        let img = document.createElement("img");

        li.classList.add("photo");
        figurecaption.innerText = getDescription(item?.alt_description);

        img.src = `images/gallery/${item.id}.jpg`;
        img.alt = item.description || item.alt_description;
        div.innerText = (item.description || item.alt_description).slice(0, 40);

        figure.appendChild(div)
        figure.appendChild(img)
        figure.appendChild(figurecaption);

        figure.classList.add("lightbox-toggle");
        li.appendChild(figure);

        container.appendChild(li);

    });

    function getDescription(desc) {
        if (!desc) {
            return "Sample Text".toUpperCase();
        }
        return desc.slice(0, 25).toUpperCase();
    }

    document.querySelectorAll(".gallery-container figure > div").forEach(d => {
        d.addEventListener("click", (e) => {
            let container = document.querySelector(".modal-container");
            let header = document.querySelector(".modal-container .modal-header");
            container.classList.toggle("visible");

            header.innerText = e.target.parentElement.querySelector("figurecaption").innerText;
        });
    });

    document.querySelector(".modal-close").addEventListener("click", (e) => {
        let container = document.querySelector(".modal-container");
        container.classList.toggle("visible");
    })
}();

$(document).ready(function () {

    /* Open lightbox on button click */
    $('.lightbox-toggle img').click(function (e) {
        $('.backdrop').animate({ 'opacity': '.8' }, 300, 'linear').css('display', 'block');
        $('.box').fadeIn();

        //Check if lightbox has an image
        if ($('.box').contents('img')) {
            $('.box').contents().remove('img'); //If true, clear image
        }

        //Get text content in attribute
        var $altvalue = $(this).attr('alt'); //or var altvalue = $(this).attr('alt');


        var img = $(e.target).clone(); //Duplicate DOM element
        img.width = "200px";
        $('.box').append(img); //Insert duplicated element in another element

    });

    /* Click to close lightbox */
    $('.close, .backdrop').click(function () {
        $('.backdrop').animate({ 'opacity': '0' }, 300, 'linear', function () {
            $('.backdrop').css('display', 'none');
        });
        $('.box').fadeOut();
    });

});
