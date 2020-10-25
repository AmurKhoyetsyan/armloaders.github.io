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

;(function(glob){
    function init(selector){
        if(selector === null){
            return false;
        }
        
        let clock = glob.createElement('div');
        clock.classList.add('clock');
        
        for(let i = 1; i <= 12; i++) {
            let counter = glob.createElement('div');
            if(i % 3 === 0) {
                counter.classList.add('item-hour');
                counter.setAttribute('data-count', i);
            }else {
                counter.classList.add('item');
            }
            counter.classList.add('item-count');
            clock.appendChild(counter);
        }

        let hour = glob.createElement('div');
        hour.classList.add('hour');
        let min = glob.createElement('div');
        min.classList.add('min');
        let sec = glob.createElement('div');
        sec.classList.add('sec');

        clock.appendChild(hour);
        clock.appendChild(min);
        clock.appendChild(sec);

        selector.appendChild(clock);

        positionItem();
    };

    function positionItem() {
        let circle = glob.querySelector('.clock'),
            items = glob.querySelectorAll('.item-count'),
            len = items.length,
            diam, radius2, itemW,
            item = [];

        for(let key of items){
            item.push(key);
        }

        let replace = item[len - 1];
        item.pop();
        item.unshift(replace);

        diam = parseInt(window.getComputedStyle(circle).getPropertyValue('width'));
        let radius = (diam - 8) / 2; // 8 = border * 2

        itemW = item[0].getBoundingClientRect().width;
        radius2 = radius - itemW;

        let alpha = Math.PI / 2,
            corner = 2 * Math.PI / len;

        for(let i = 0; i < len; i++) {
            item[i].style.left = parseInt((radius - itemW / 2) + (radius2 * Math.cos(alpha))) + "px";
            item[i].style.top = parseInt((radius - itemW / 2) - (radius2 * Math.sin(alpha))) + "px";
            alpha -= corner;
        }

        runClock();
    };

    function runClock() {
        let deg = 6;

        let hour = glob.querySelector('.hour');
        let min = glob.querySelector('.min');
        let sec = glob.querySelector('.sec');

        setInterval(function() {
            let date = new Date();
            let hh = date.getHours() * 30;
            let mm = date.getMinutes() * deg;
            let ss = date.getSeconds() * deg;

            hour.style.transform = "rotateZ(" + (hh + (mm / 12)) + "deg)";
            min.style.transform = "rotateZ(" + mm + "deg)";
            sec.style.transform = "rotateZ(" + ss + "deg)";
        }, 1000);
    };

    init(glob.querySelector('.clock-parent'));
})(document);