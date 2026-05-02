const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const droplets = [];
const ripples = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const surface = canvas.height * 0.75;

function droplet(){
    droplets.push({
        x: Math.random() * canvas.width,
        y: 0,
        size: Math.random() * 25 + 5,
        speed: Math.random() * 6 + 1
    });
}

function ripple(x, y){
    ripples.push({
        x,
        y,
        radius: Math.random() * 7 + 3,
        opacity: Math.random() * .5 + 1
    });
}

function animation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < droplets.length; i++) {
        let d = droplets[i];
        d.y += d.speed;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size, 0, Math.PI *2);
        if (d.speed > 3) {
            ctx.fillStyle = "lightblue";
        } else {
            ctx.fillStyle = "blue";
        }
        ctx.fill();

        if (d.y >= surface) {
            ripple(d.x, surface);
            droplets.splice(i, 1);
            i--;
        }

        for (let i = 0; i < ripples.length; i++){
            let r = ripples[i];
            r.radius += 2;
            r.opacity -= .01;

            ctx.beginPath();
            ctx.arc(r.x, r.y, r.radius, 0, Math.PI*2);
            ctx.strokeStyle = `rgba(173,216,230,${r.opacity})`;
            ctx.stroke();

            if (r.opacity <= 0) {
                ripples.splice(i, 1);
                i--;
            }
        }
    }
    requestAnimationFrame(animation);
}

animation();

setInterval(() => {
    droplet();
}, 250);


