 // Smooth scrolling
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

        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(26, 26, 26, 0.98)';
                header.style.boxShadow = '0 2px 20px rgba(106, 90, 205, 0.3)';
            } else {
                header.style.background = 'rgba(26, 26, 26, 0.95)';
                header.style.boxShadow = 'none';
            }
        });

        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all elements with fade-in class
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // Parallax effect for floating pets
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.floating-pet');
            
            parallax.forEach((element, index) => {
                const speed = 0.5 + (index * 0.2);
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });

        // Service cards hover effect
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // Product cards animation
        document.querySelectorAll('.product-card').forEach((card, index) => {
            card.addEventListener('mouseenter', function() {
                this.style.animationDelay = `${index * 0.1}s`;
                this.style.animation = 'pulse 0.6s ease-in-out';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.animation = 'none';
            });
        });

        // Form submission
        document.querySelector('.contact-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Animate button
            const button = this.querySelector('.cta-button');
            const originalText = button.textContent;
            
            button.textContent = 'Enviando...';
            button.style.background = 'linear-gradient(135deg, #32CD32, #228B22)';
            
            setTimeout(() => {
                button.textContent = 'Enviado! ✓';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.background = 'linear-gradient(135deg, var(--primary-purple), var(--primary-blue))';
                    this.reset();
                }, 2000);
            }, 1500);
        });

        // Add typing effect to hero text
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            
            type();
        }

        // Initialize typing effect when page loads
        window.addEventListener('load', () => {
            const heroTitle = document.querySelector('.hero h1');
            const heroSubtitle = document.querySelector('.hero p');
            
            setTimeout(() => {
                typeWriter(heroTitle, 'Seu Pet Merece o Melhor', 80);
            }, 1000);
            
            setTimeout(() => {
                typeWriter(heroSubtitle, 'Cuidado premium para seus amigos de quatro patas', 50);
            }, 3000);
        });

        // Stats counter animation
        function animateCounter(element, target, duration = 2000) {
            let start = 0;
            const increment = target / (duration / 16);
            
            function updateCounter() {
                start += increment;
                if (start < target) {
                    element.textContent = Math.floor(start) + '+';
                    requestAnimationFrame(updateCounter);
                } else {
                    element.textContent = target + '+';
                }
            }
            
            updateCounter();
        }

        // Trigger counter animation when stats section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counters = entry.target.querySelectorAll('.stat-number');
                    const targets = [5000, 15, 50];
                    
                    counters.forEach((counter, index) => {
                        animateCounter(counter, targets[index]);
                    });
                    
                    statsObserver.unobserve(entry.target);
                }
            });
        });

        const statsSection = document.querySelector('.about-stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }

        // Add random floating animation to pets
        function randomFloat() {
            document.querySelectorAll('.floating-pet').forEach(pet => {
                const randomX = (Math.random() - 0.5) * 20;
                const randomY = (Math.random() - 0.5) * 20;
                
                pet.style.transform += ` translate(${randomX}px, ${randomY}px)`;
                
                setTimeout(() => {
                    pet.style.transform = pet.style.transform.replace(` translate(${randomX}px, ${randomY}px)`, '');
                }, 3000);
            });
        }

        setInterval(randomFloat, 5000);

        // Add mouse trail effect
        let mouseTrail = [];
        const maxTrailLength = 20;

        document.addEventListener('mousemove', (e) => {
            mouseTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
            
            if (mouseTrail.length > maxTrailLength) {
                mouseTrail.shift();
            }
            
            // Remove old trail points
            mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown') {
                window.scrollBy(0, 100);
            } else if (e.key === 'ArrowUp') {
                window.scrollBy(0, -100);
            }
        });