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

    // Confetti setup
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

    // Firecracker setup
    const firecrackers = [];
    function spawnFirecracker() {
        const x = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
        const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
        const particles = [];
        const particleCount = 24;
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount;
            const speed = Math.random() * 3 + 2;
            particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                alpha: 1,
                color: `hsl(${Math.random() * 360}, 90%, 60%)`
            });
        }
        firecrackers.push({ particles });
    }

    setInterval(spawnFirecracker, 1200); // Firecracker every 1.2s

    function drawConfetti() {
        confetti.forEach(c => {
            ctx.beginPath();
            ctx.lineWidth = c.r;
            ctx.strokeStyle = c.color;
            ctx.moveTo(c.x + c.tilt + (c.r / 3), c.y);
            ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r);
            ctx.stroke();
        });
    }

    function updateConfetti() {
        for (let i = 0; i < confettiCount; i++) {
            let c = confetti[i];
            c.y += (Math.cos(c.d) + 3 + c.r / 2) / 2;
            c.x += Math.sin(0.01 * c.d);
            c.tiltAngle += c.tiltAngleIncremental;
            c.tilt = Math.sin(c.tiltAngle) * 15;
            if (c.y > canvas.height) {
                c.x = Math.random() * canvas.width;
                c.y = -10;
                c.tilt = Math.random() * 10 - 10;
            }
        }
    }

    function drawFirecrackers() {
        for (let i = firecrackers.length - 1; i >= 0; i--) {
            const fc = firecrackers[i];
            let allGone = true;
            fc.particles.forEach(p => {
                if (p.alpha > 0.05) {
                    ctx.save();
                    ctx.globalAlpha = p.alpha;
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, 3, 0, 2 * Math.PI);
                    ctx.fillStyle = p.color;
                    ctx.shadowColor = p.color;
                    ctx.shadowBlur = 10;
                    ctx.fill();
                    ctx.restore();
                    allGone = false;
                }
            });
            if (allGone) {
                firecrackers.splice(i, 1);
            }
        }
    }

    function updateFirecrackers() {
        firecrackers.forEach(fc => {
            fc.particles.forEach(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vx *= 0.96;
                p.vy *= 0.96;
                p.vy += 0.04; // gravity
                p.alpha *= 0.96;
            });
        });
    }

    let startTime = null;
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = (timestamp - startTime) / 15000; // seconds

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConfetti();
        drawFirecrackers();
        updateConfetti();
        updateFirecrackers();

        if (elapsed < 10) {
            requestAnimationFrame(animate);
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
    }
    requestAnimationFrame(animate);
}

window.addEventListener('DOMContentLoaded', launchConfetti);