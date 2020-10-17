;(function(app, glob){
    function addPaddingInMain(){
        let header = app.querySelector(".my-header");
        let section = app.querySelector(".top-section");
        let padding = header.clientHeight;
        section.style["padding-top"] = padding + "px";
    };

    function mobile() {
        let device = navigator.userAgent.match( /(Android|iPhone|iPod|iPad|webOS|BlackBerry|globs Phone)/ );
        let viewport = glob.innerWidth < 768;
        return device || viewport;
    };

    function scrolling(event) {
        if(!mobile()){
            let header = app.querySelector(".my-header");
            glob.scrollY > 49 ? header.classList.add("bg-white") : header.classList.remove("bg-white");
        }
    };

    function resizeing(event) {
        let header = app.querySelector(".my-header");
        if(mobile()) {
            header.classList.remove("position-fixed");
            header.classList.add("position-absolute");
        }else {
            header.classList.remove("position-absolute");
            header.classList.add("position-fixed");
        }
    };

    function addYear() {
        let cypress = app.querySelector(".year");
        let date = new Date();
        let year = date.getFullYear();
        cypress.innerText = year;
    };

    function loading(event) {
        scrolling(event);
        resizeing(event);
        addYear();
        addPaddingInMain();
    };

    glob.onscroll = scrolling;

    glob.onresize = resizeing;

    glob.onload = loading;
})(document, window);