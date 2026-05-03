const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const droplets = [];
const ripples = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const surface = canvas.height * 0.75;

function ripple(x, y, color){
    ripples.push({
        x,
        y,
        radius: Math.random() * 7 + 3,
        opacity: Math.random() * .5 + 1,
        color
    });
}

function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < droplets.length; i++) {
        let d = droplets[i];
        d.y += d.speed;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI *2);
        ctx.fillStyle = d.color;
        ctx.fill();

        if (d.y >= surface) {
            ripple(d.x, surface, d.color);
            droplets.splice(i, 1);
            i--;
        }
    }
    for (let i = 0; i < ripples.length; i++){
            let r = ripples[i];
            r.radius += 2;
            r.opacity -= .01;

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
    requestAnimationFrame(animation);
}

document.addEventListener("keydown", (event) => {
    let size;
    let speed;
    let color;

    if (event.key >= "a" && event.key <= "z"){
        size = 10;
        speed = 3;
        color = "cyan";
    } else if (event.key >= "A" && event.key <= "Z"){
        size = 35;
        speed = 8;
        color = "darkblue";
    }

    droplets.push({
        x: Math.random() * canvas.width,
        y: 0,
        size: size,
        speed: speed,
        color: color
    });
});

animation();
