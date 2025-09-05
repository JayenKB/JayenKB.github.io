document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("main section");
    const revealSections = () => {
        const triggerBottom = window.innerHeight * 0.85;
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < triggerBottom) {
                section.classList.add("visible");
            }
        });
    };
    window.addEventListener("scroll", revealSections);
    revealSections();
});

// Simple confetti animation on page load
function launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiCount = 120;
    const confetti = [];

    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width,
            y: Math.random() * -canvas.height,
            r: Math.random() * 6 + 4,
            d: Math.random() * confettiCount,
            color: `hsl(${Math.random() * 360}, 80%, 60%)`,
            tilt: Math.random() * 10 - 10,
            tiltAngleIncremental: (Math.random() * 0.07) + .05,
            tiltAngle: 0
        });
    }

    function drawConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        confetti.forEach(c => {
            ctx.beginPath();
            ctx.lineWidth = c.r;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + (c.r / 3), c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
            ctx.stroke();
        });
        updateConfetti();
    }

    function updateConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            let c = confetti[i];
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
            c.x += Math.sin(0.01 * c.d);
            c.tiltAngle += c.tiltAngleIncremental;
            c.tilt = Math.sin(c.tiltAngle) * 15;

            // Reset confetti when out of view
            if (c.y > canvas.height) {
                c.x = Math.random() * canvas.width;
                c.y = -10;
                c.tilt = Math.random() * 10 - 10;
            }
        }
    }

    let frame = 0;
    function animate() {
        drawConfetti();
        frame++;
        if (frame < 600) { // Confetti lasts for ~10 seconds
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    animate();
}

window.addEventListener('DOMContentLoaded', launchConfetti);