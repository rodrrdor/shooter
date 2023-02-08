const FPS = 60;
var cnv, ctx;
var mouse = {}, target = {x: 0, y: 0, r: 100, touched: false, dead: true};
var score = 0, hipo, strHipo, click = true, clicks = 0;

window.onload = function() {
    cnv = document.getElementById("canvas");
    ctx = cnv.getContext("2d");
    setInterval(main, 1000 / FPS);
};
function main() {
    cnv.width = window.innerWidth;
    cnv.height = window.innerHeight;
    events();
    draw();
};
function events() {
    click = true;
    hipo = target.r - Math.sqrt((mouse.x - target.x) * (mouse.x - target.x)  + (mouse.y - target.y) * (mouse.y - target.y));
    strHipo = hipo.toString();
    strHipo = strHipo.indexOf(".") > 0 ? strHipo.slice(0, strHipo.indexOf(".")) : hipo;

    window.addEventListener("click", (e) => {
        mouse = {
            x: e.clientX,
            y: e.clientY
        };
        if (hipo > 0 && click == true) {
            score += Math.round(hipo);
            target.dead = true;
            click = false;
            clicks++;
    };});
    window.addEventListener("mousemove", (e) => {
        mouse = {
            x: e.clientX,
            y: e.clientY
    };});
    if (target.dead) {
        target.x = Math.random() * (cnv.width - target.r * 2) + target.r;
        target.y = Math.random() * (cnv.height - target.r * 2) + target.r;
        target.dead = false;
    };
};
function draw () {
    for (let arc = target.r; arc >= 10; arc -= 10){
        ctx.strokeStyle=arc % 20 == 0 ? "red" : "white";
        ctx.fillStyle=arc % 20 == 0 ? "red" : "white";  
        ctx.beginPath();
        ctx.arc(target.x, target.y, arc, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    };
    ctx.fillStyle="white";
    ctx.textAlign="center";
    ctx.font="30px Comic Sans MS";
    ctx.fillText("SCORE: " + score, cnv.width / 2, 40);
    ctx.fillText("CLICKS: " + clicks, cnv.width / 2, 80);
};
