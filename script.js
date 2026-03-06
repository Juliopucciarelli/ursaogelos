document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================
       Set Current Year in Footer
       ========================================== */
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /* ==========================================
       Sticky Header
       ========================================== */
    const header = document.getElementById('header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.classList.remove('not-scrolled');
        } else {
            header.classList.remove('scrolled');
            header.classList.add('not-scrolled');
        }
        
        // Highlight active nav link along with scroll
        highlightNav();
    };
    
    // Initial check
    if (window.scrollY <= 50) header.classList.add('not-scrolled');
    window.addEventListener('scroll', handleScroll);

    /* ==========================================
       Mobile Menu Toggle
       ========================================== */
    const menuToggle = document.getElementById('mobile-menu');
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            navbar.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });

        // Close menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.classList.remove('menu-open');
            });
        });
    }

    /* ==========================================
       Active Link Highlighting on Scroll
       ========================================== */
    const sections = document.querySelectorAll('section');
    
    function highlightNav() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Allow active link to switch a bit before reaching exact section start
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    /* ==========================================
       Form Submission Simulation
       ========================================== */
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            // Simple animation
            btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Enviando...";
            btn.style.pointerEvents = 'none';
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = "<i class='bx bx-check'></i> Mensagem Enviada!";
                btn.style.backgroundColor = "#10B981"; // Green success
                
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = "";
                    btn.style.pointerEvents = 'auto';
                }, 3000);
            }, 1500);
        });
    }
});
