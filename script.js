const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const droplets = [];
const ripples = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let surface = canvas.height * 0.75;
const mode = document.getElementById("mode");
const time = document.getElementById("time");
let isSnow = false;
let isDay = false;
let gravityDown = true;
let rainbowMode = false;
let rainbowHue = 0;

document.getElementById("rainbow").addEventListener("click", () => {
    rainbowMode = !rainbowMode;
});

document.getElementById("gravity").addEventListener("click", () => {
    gravityDown = !gravityDown;
    surface = gravityDown ? canvas.height *.75 : canvas.height * .25;
});

time.addEventListener("click", () => {
    isDay = !isDay;
    if (isDay){
        document.body.style.background = "linear-gradient(#87CEEB, #FFD27F)";
        time.classList.remove("night");
        time.classList.add("day");
    } else {
        document.body.style.background = "linear-gradient(#000015, #001133)";
        time.classList.remove("day");
        time.classList.add("night");
    }
});

mode.addEventListener("click", () =>{
    isSnow = !isSnow
});

function ripple(x, y, color, size){
    ripples.push({
        x,
        y,
        radius: size * 0.5,
        growth: size * .15,
        decay: size * .003,
        opacity: Math.random() * .5 +.5,
        color: rainbowMode ? `hsl(${rainbowHue}, 100%, 70%)` : color
    });
}

function animation() {
    ctx.fillStyle = isDay ? "#87CEEB" : "#000015";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < droplets.length; i++) {
        let d = droplets[i];
        d.y += gravityDown ? d.speed : -d.speed;
        d.size *= .985;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI *2);
        ctx.fillStyle = d.color;
        ctx.fill();

        if ((gravityDown && d.y >= surface) || (!gravityDown && d.y <= surface)) {
            ripple(d.x, surface, d.color, d.size);
            droplets.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < ripples.length; i++){
            let r = ripples[i];
            r.radius += r.growth;
            r.opacity -= r.decay;

            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI*2);
            ctx.strokeStyle = r.color;
            ctx.globalAlpha = r.opacity;
            ctx.stroke();
            ctx.globalAlpha = 1;
            if (r.opacity <= 0) {
                ripples.splice(i, 1);
                i--;
            }
        }
    if (rainbowMode) {
        rainbowHue = (rainbowHue + 2) % 360;
    }
    requestAnimationFrame(animation);
}

document.addEventListener("keydown", (event) => {
    let size;
    let speed;
    let color;
    let x;

    if (event.key >= "a" && event.key <= "m"){
        x = Math.random() * canvas.width/2;
        size = 10;
        speed = 3;
        if (isSnow){
            color = rainbowMode ? `hsl(${rainbowHue}, 100%, 90%)` : "white";
        } else {
            color = rainbowMode ? `hsl(${rainbowHue}, 100%, 60%)` : "cyan";
        }
    } else if (event.key >= "n" && event.key <= "z"){
        x = Math.random() * (canvas.width - canvas.width/2)  + canvas.width/2;
        size = 10;
        speed = 3;
        if (isSnow){
            color = rainbowMode ? `hsl(${rainbowHue}, 100%, 90%)` : "white";
        } else {
            color = rainbowMode ? `hsl(${rainbowHue}, 100%, 60%)` : "cyan";
        }
    } else if (event.key >= "A" && event.key <= "M"){
        x = Math.random() * canvas.width/2;
        size = 40;
        speed = 20;
        if (isSnow){
            color = rainbowMode ? `hsl(${rainbowHue}, 100%, 90%)` : "white";
        } else {
            color = rainbowMode ? `hsl(${rainbowHue}, 100%, 40%)` : "darkblue";
        }
    } else if (event.key >= "N" && event.key <= "Z"){
        x = Math.random() * (canvas.width - canvas.width/2) + canvas.width/2;
        size = 40;
        speed = 20;
        if (isSnow){
            color = rainbowMode ? `hsl(${rainbowHue}, 100%, 90%)` : "white";
        } else {
            color = rainbowMode ? `hsl(${rainbowHue}, 100%, 40%)` : "darkblue";
        }
    } else if (event.key == "1"){
        x = Math.random() * canvas.width;
        size = 2;
        speed = 2;
        if (isSnow){
            color = "white"
        } else {
            color = "blue"
        }
    } else if (event.key == "2"){
        x = Math.random() * canvas.width;
        size = 4;
        speed = 4;
        if (isSnow){
            color = "white"
        } else {
            color = "blue"
        }
    } else if (event.key == "3"){
        x = Math.random() * canvas.width;
        size = 6;
        speed = 6;
        if (isSnow){
            color = "white"
        } else {
            color = "blue"
        }
    } else if (event.key == "4"){
        x = Math.random() * canvas.width;
        size = 8;
        speed = 8;
        if (isSnow){
            color = "white"
        } else {
            color = "blue"
        }
    } else if (event.key == "5"){
        x = Math.random() * canvas.width;
        size = 10;
        speed = 10;
        if (isSnow){
            color = "white"
        } else {
            color = "blue"
        }
    } else if (event.key == "6"){
        x = Math.random() * canvas.width;
        size = 12;
        speed = 12;
        if (isSnow){
            color = "white"
        } else {
            color = "blue"
        }
    } else if (event.key == "7"){
        x = Math.random() * canvas.width;
        size = 14;
        speed = 14;
        if (isSnow){
            color = "white"
        } else {
            color = "blue"
        }
    } else if (event.key == "8"){
        x = Math.random() * canvas.width;
        size = 16;
        speed = 16;
        if (isSnow){
            color = "white"
        } else {
            color = "blue"
        }
    } else if (event.key == "9"){
        x = Math.random() * canvas.width;
        size = 18;
        speed = 18;
        if (isSnow){
            color = "white"
        } else {
            color = "blue"
        }
    }
    droplets.push({
        x: x,
        y: gravityDown ? 0 : canvas.height,
        size: size,
        speed: speed,
        color: color
    });
});

canvas.addEventListener("wheel", (event) => {
    ripples.push({
        x: event.clientX,
        y: event.clientY,
        growth: 1.5,
        decay: .03,
        radius: Math.random() * 7 + 3,
        opacity: Math.random() * .5 + .5,
        color: rainbowMode ? `hsl(${rainbowHue}, 100%, 70%)` : "seagreen"
    });
});

animation();
