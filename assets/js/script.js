document.addEventListener('DOMContentLoaded', () => {
    const main = document.querySelector('main');
    const links = document.querySelectorAll('.nav-item a, .footer-links a');
    const themeToggleBtn = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');

    const navbar = document.querySelector('.navbar');

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('bg-dark');
        document.body.classList.toggle('text-white');




        // Define iconColor basado en el tema activo
        const iconColor = document.body.classList.contains('bg-dark') ? 'text-white' : 'text-dark';

        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.classList.remove('text-dark', 'text-white');
            link.classList.add(iconColor);
        });

        const tables = document.querySelectorAll('.table'); // Selecciona todas las tablas

        tables.forEach(table => {
            // Verifica si la tabla ya tiene la clase table-dark o table-light
            if (table.classList.contains('table-dark')) {
                table.classList.remove('table-dark');
                table.classList.add('table-light');
            } else {
                table.classList.remove('table-light');
                table.classList.add('table-dark');
            }
        });

        // Alternar clases en la barra de navegación
        navbar.classList.toggle('navbar-light');
        navbar.classList.toggle('bg-light');
        navbar.classList.toggle('navbar-dark');
        navbar.classList.toggle('bg-dark');

        if (document.body.classList.contains('bg-dark')) {
            themeIcon.className = 'fas fa-sun text-white';
        } else {
            themeIcon.className = 'fas fa-moon text-dark';
        }




    });


    applyInitialTheme();

    function applyInitialTheme() {
        const iconColor = document.body.classList.contains('bg-dark') ? 'text-white' : 'text-dark';

        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.classList.add(iconColor);
        });
    }
    // Función para cargar el contenido
    function loadContent(url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                main.innerHTML = html;
                updateActiveLink(url);

            })
            .catch(error => {
                console.error('Error loading content', error);
            });
    }

    // Actualizar la clase 'active' en el enlace
    function updateActiveLink(activeUrl) {
        links.forEach(link => {
            if (link.getAttribute('href') === activeUrl) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Evento delegado para manejar clics en 'main'
    main.addEventListener('click', (event) => {
        let target = event.target.closest('a');
        if (target && (target.getAttribute('href').startsWith('pages/') || target.getAttribute('href') === 'index.html')) {
            event.preventDefault();
            loadContent(target.getAttribute('href'));
        }
    });

    // Eventos para enlaces en la cabecera y el pie de página
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            let href = link.getAttribute('href');
            if (href.startsWith('pages/') || href === 'index.html') {
                event.preventDefault();
                loadContent(href);
            }
        });
    });



    // Cargar el contenido inicial si es necesario
    if (!main.innerHTML.trim()) {
        loadContent('pages/home.html');
    }
});



