// Matrix Background Animation
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = '01ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾙﾚﾜﾝ▓█░';
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(0);

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff00';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

function animateMatrix() {
    drawMatrix();
    requestAnimationFrame(animateMatrix);
}

animateMatrix();

// Fire Particles Animation
function initFireParticles() {
    const fireParticlesContainer = document.getElementById('fireParticles');
    
    if (!fireParticlesContainer) {
        console.warn('Fire particles container not found');
        return;
    }
    
    const particleTypes = ['small', 'medium', 'large'];

    function createFireParticle() {
        const particle = document.createElement('div');
        const type = particleTypes[Math.floor(Math.random() * particleTypes.length)];
        const size = type === 'small' ? 4 : type === 'medium' ? 6 : 8;
        
        particle.className = `fire-particle fire-particle-${type}`;
        
        // Random starting position across screen width
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        
        fireParticlesContainer.appendChild(particle);
        
        // Animation duration and drift
        const duration = Math.random() * 3000 + 2000; // 2-5 seconds
        const driftX = (Math.random() - 0.5) * 200; // Horizontal drift
        const endY = startY - window.innerHeight - 100;
        
        let startTime = Date.now();
        
        function animateParticle() {
            const elapsed = Date.now() - startTime;
            const progress = elapsed / duration;
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            const currentY = startY + (endY - startY) * progress;
            const currentX = startX + driftX * Math.sin(progress * Math.PI);
            const currentOpacity = (1 - progress) * (Math.random() * 0.7 + 0.3);
            
            particle.style.transform = `translate(${currentX}px, ${currentY}px)`;
            particle.style.opacity = currentOpacity;
            
            requestAnimationFrame(animateParticle);
        }
        
        animateParticle();
    }

    // Create particles continuously
    setInterval(() => {
        if (Math.random() > 0.3) {
            createFireParticle();
        }
    }, 300);

    // Create initial batch of particles
    for (let i = 0; i < 15; i++) {
        setTimeout(() => createFireParticle(), i * 100);
    }
}

// Initialize fire particles when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFireParticles);
} else {
    initFireParticles();
}

// Terminal Execute Button
const executeBtn = document.getElementById('executeBtn');
const terminalOutput = document.getElementById('terminalOutput');

if (executeBtn) {
    const outputMessages = [
        '$ npm run build',
        '> Building project...',
        '⚙️  Bundling files',
        '📦 Compiling modules',
        '🔧 Processing assets',
        '✓ Compiled successfully',
        '',
        '$ npm run test',
        '> Running tests...',
        '✓ 45 tests passed',
        '⏱️  Execution time: 2.3s',
        '',
        '$ npm run lint',
        '> Linting code...',
        '✓ No issues found',
        '',
        '$ npm run deploy',
        '> Deploying to production...',
        '📡 Uploading files (1/3)',
        '📡 Uploading files (2/3)',
        '📡 Uploading files (3/3)',
        '🔐 Securing assets',
        '🌐 DNS updated',
        '✓ Site deployed successfully',
        '',
        '$ echo "System Status: ONLINE"',
        'System Status: ONLINE',
        '',
        '$ echo "Performance: OPTIMIZED"',
        'Performance: OPTIMIZED',
        '',
        '$ echo "Security: PROTECTED"',
        'Security: PROTECTED',
        '',
        '$ whoami',
        'ELFAR.DEV',
        '',
        '$ echo "Welcome to the hacker portfolio"',
        'Welcome to the hacker portfolio',
        '',
        '$ cat portfolio.txt',
        '═══════════════════════════════════════',
        'ELFAR.DEV - Full Stack Developer',
        'Location: Karanganyar, Jawa Tengah',
        'Email: elfardev@elfar.my.id',
        'WhatsApp: +6283817779643',
        '═══════════════════════════════════════',
        '',
        '$ echo "All systems operational"',
        'All systems operational',
        '',
        '✓ Portfolio loaded successfully'
    ];

    executeBtn.addEventListener('click', function() {
        terminalOutput.innerHTML = '';
        this.disabled = true;
        
        let index = 0;
        const interval = setInterval(() => {
            if (index < outputMessages.length) {
                const p = document.createElement('p');
                p.textContent = outputMessages[index];
                
                // Add color classes based on message
                if (outputMessages[index].includes('✓') || outputMessages[index].includes('Successfully')) {
                    p.classList.add('success');
                } else if (outputMessages[index].includes('error') || outputMessages[index].includes('Error')) {
                    p.classList.add('error');
                }
                
                terminalOutput.appendChild(p);
                terminalOutput.scrollTop = terminalOutput.scrollHeight;
                index++;
            } else {
                clearInterval(interval);
                executeBtn.disabled = false;
            }
        }, 150);
    });
}

// Window Resize Handler
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.clientHeight;
        
        if (window.scrollY >= top - 100 && window.scrollY < top + height - 100) {
            navLinks.forEach(link => {
                link.style.color = '#cccccc';
                link.style.textShadow = 'none';
            });
            
            const activeLink = document.querySelector(
                `.nav-link[href="#${section.id}"]`
            );
            if (activeLink) {
                activeLink.style.color = '#00ff00';
                activeLink.style.textShadow = '0 0 10px #00ff00';
            }
        }
    });
});

// Typewriter Effect for Hero Terminal
const heroSection = document.querySelector('.hero');
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startTypewriter();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

observer.observe(heroSection);

function startTypewriter() {
    const typingElement = document.querySelector('.typing');
    const text = '$ whoami';
    typingElement.style.width = '100%';
    typingElement.style.animation = 'none';
}

// Parallax Effect on Scroll
window.addEventListener('scroll', () => {
    const floatingCode = document.querySelector('.floating-code');
    if (floatingCode) {
        const scrollY = window.scrollY;
        floatingCode.style.transform = `translateY(calc(-50% + ${scrollY * 0.5}px)) translateX(0)`;
    }
});

// Animate Project Cards on Scroll
const projectCards = document.querySelectorAll('.project-card');
const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            projectObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

projectCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    projectObserver.observe(card);
});

// Animate Skill Categories on Scroll
const skillCategories = document.querySelectorAll('.skill-category');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            skillObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

skillCategories.forEach(category => {
    category.style.opacity = '0';
    category.style.transform = 'translateY(20px)';
    category.style.transition = 'all 0.6s ease';
    skillObserver.observe(category);
});

// Stat Box Counter Animation
const statBoxes = document.querySelectorAll('.stat-box h3');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            animateCounter(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

statBoxes.forEach(box => statsObserver.observe(box));

function animateCounter(element) {
    const finalValue = parseInt(element.textContent);
    const duration = 2000;
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const currentValue = Math.floor(finalValue * progress);
        element.textContent = currentValue + (element.textContent.includes('+') ? '+' : element.textContent.includes('%') ? '%' : '');
        
        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = element.textContent.replace(/\d+/, finalValue);
        }
    }

    update();
}

// Add Glow Effect to Links on Hover
const links = document.querySelectorAll('a');
links.forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.textShadow = '0 0 10px currentColor';
    });
    link.addEventListener('mouseleave', function() {
        this.style.textShadow = 'none';
    });
});

// Keyboard Shortcuts
document.addEventListener('keydown', (e) => {
    // Alt + G: Go to top
    if (e.altKey && e.key === 'g') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    // Alt + P: Projects section
    if (e.altKey && e.key === 'p') {
        document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
    }
    // Alt + S: Skills section
    if (e.altKey && e.key === 's') {
        document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
    }
    // Alt + C: Contact section
    if (e.altKey && e.key === 'c') {
        document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    }
});

// Dynamic Glitch Effect
function createGlitch(element) {
    const originalText = element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let glitchActive = false;
    element.addEventListener('mouseenter', () => {
        if (glitchActive) return;
        glitchActive = true;
        
        let iterations = 0;
        const glitchInterval = setInterval(() => {
            let glitchedText = '';
            for (let char of originalText) {
                glitchedText += Math.random() > 0.7 
                    ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
                    : char;
            }
            element.textContent = glitchedText;
            iterations++;
            
            if (iterations > 5) {
                clearInterval(glitchInterval);
                element.textContent = originalText;
                glitchActive = false;
            }
        }, 50);
    });
}

// Apply Glitch to Project Headers
document.querySelectorAll('.project-card h3').forEach(h3 => {
    createGlitch(h3);
});

// Scroll-triggered animations
const observeElements = (selector, className) => {
    const elements = document.querySelectorAll(selector);
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(className);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    elements.forEach(el => observer.observe(el));
};

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c Dev.Hacker Portfolio v1.0', 'color: #00ff00; font-size: 14px; text-shadow: 0 0 10px #00ff00;');
    console.log('%c Keyboard Shortcuts: Alt+G (Top), Alt+P (Projects), Alt+S (Skills), Alt+C (Contact)', 'color: #0099ff; font-size: 12px;');
});

// Mobile Touch Optimization
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', () => {}, false);
}

// Hacker Code Rain Effect
function createCodeRain() {
    const colors = ['#00ff88', '#9933ff', '#0099ff'];
    const characters = '01ｦｧｨｩｪｫｬｭｮｯｰｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾙﾚﾜﾝ';
    const randomChar = () => characters[Math.floor(Math.random() * characters.length)];
    
    document.querySelectorAll('.section-title').forEach(title => {
        const originalText = title.textContent;
        
        title.addEventListener('mouseenter', function() {
            let i = 0;
            const interval = setInterval(() => {
                if (i < originalText.length) {
                    let glitched = '';
                    for (let j = 0; j <= i; j++) {
                        glitched += j === i ? randomChar() : originalText[j];
                    }
                    this.textContent = glitched;
                    i++;
                } else {
                    this.textContent = originalText;
                    clearInterval(interval);
                }
            }, 30);
        });
    });
}

createCodeRain();

// Cyber Line Animation
function createCyberLines() {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        if (title) {
            title.style.position = 'relative';
            const line = document.createElement('div');
            line.style.cssText = `
                position: absolute;
                bottom: -10px;
                left: 50%;
                transform: translateX(-50%);
                width: 0;
                height: 3px;
                background: linear-gradient(90deg, #9933ff, #00ff88, #0099ff);
                animation: expandWidth 0.8s ease-out forwards;
            `;
            title.appendChild(line);
        }
    });
}

createCyberLines();

// Add expandWidth animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes expandWidth {
        from {
            width: 0;
        }
        to {
            width: 100%;
        }
    }
    
    @keyframes typeCharacter {
        0% {
            color: #9933ff;
        }
        50% {
            color: #0099ff;
        }
        100% {
            color: #00ff88;
        }
    }
    
    @keyframes dataFlow {
        0% {
            transform: translateY(-100%);
        }
        100% {
            transform: translateY(100%);
        }
    }
`;
document.head.appendChild(style);

// Hologram Effect on Images
function createHologramEffect() {
    const cards = document.querySelectorAll('.project-card, .skill-category');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * 3;
            const rotateY = ((x - centerX) / centerX) * 3;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(10px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });
}

createHologramEffect();

// Radar Scan Effect
function createRadarScan() {
    const aboutSection = document.querySelector('.about');
    if (aboutSection) {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        canvas.style.cssText = `
            position: absolute;
            right: 20px;
            top: 20px;
            opacity: 0.3;
            z-index: 1;
        `;
        aboutSection.style.position = 'relative';
        aboutSection.prepend(canvas);
        
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;
        let angle = 0;
        
        function drawRadar() {
            ctx.fillStyle = 'rgba(10, 14, 39, 0.5)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.strokeStyle = '#00ff88';
            ctx.lineWidth = 1;
            
            // Draw circles
            for (let i = 1; i <= 3; i++) {
                ctx.beginPath();
                ctx.arc(centerX, centerY, (radius / 3) * i, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            // Draw crosshairs
            ctx.strokeStyle = '#9933ff';
            ctx.beginPath();
            ctx.moveTo(centerX, 0);
            ctx.lineTo(centerX, canvas.height);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(0, centerY);
            ctx.lineTo(canvas.width, centerY);
            ctx.stroke();
            
            // Draw scan line
            ctx.strokeStyle = '#0099ff';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius
            );
            ctx.stroke();
            
            angle += 0.02;
            requestAnimationFrame(drawRadar);
        }
        
        drawRadar();
    }
}

createRadarScan();

// Glitch Text Effect on Scroll
function createScrollGlitch() {
    const titleBrackets = document.querySelectorAll('.title-bracket');
    window.addEventListener('scroll', () => {
        titleBrackets.forEach(bracket => {
            const scrollProgress = (window.scrollY % 100) / 100;
            if (Math.random() > 0.95) {
                bracket.style.opacity = '0.5';
                setTimeout(() => {
                    bracket.style.opacity = '1';
                }, 50);
            }
        });
    });
}

createScrollGlitch();

// Terminal Command Effect
function createTerminalEffect() {
    const terminal = document.querySelector('.terminal-content');
    if (terminal) {
        const text = terminal.textContent;
        terminal.style.position = 'relative';
        
        const glowLine = document.createElement('div');
        glowLine.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #9933ff, transparent);
            animation: scanPulse 2s ease-in-out infinite;
        `;
        
        const scanPulseStyle = document.createElement('style');
        scanPulseStyle.innerHTML = `
            @keyframes scanPulse {
                0%, 100% {
                    top: 0;
                }
                50% {
                    top: 50%;
                }
            }
        `;
        document.head.appendChild(scanPulseStyle);
        terminal.appendChild(glowLine);
    }
}

createTerminalEffect();

// Add smooth 3D effect to navbar
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollProgress = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    
    if (navbar) {
        navbar.style.boxShadow = `0 0 ${20 + scrollProgress * 30}px rgba(153, 51, 255, ${0.3 + scrollProgress * 0.4})`;
    }
});
