// Gestion du formulaire de contact
document.getElementById("contactForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const data = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      reason: document.getElementById("reason").value,
      message: document.getElementById("message").value,
      gdpr: document.getElementById("gdpr").checked
    };

    try {
      await fetch("https://hook.eu2.make.com/gd9329oow7s4xau6nbf0pmsj3fourub2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const feedback = document.createElement('div');
        feedback.className = 'feedback success';
        feedback.textContent = '✅ Votre message a été envoyé avec succès !';

        this.appendChild(feedback); // ajoute le message au formulaire
        this.reset(); // réinitialise le formulaire

        setTimeout(() => {
        feedback.remove(); // supprime après 5s
        }, 5000);

    } 
    
    catch (error) {
      const feedback = document.createElement('div');
        feedback.className = 'feedback error';
        feedback.textContent = '❌ Une erreur est survenue. Veuillez réessayer.';
        this.appendChild(feedback);

        setTimeout(() => {
        feedback.remove();
        }, 5000);

    }
});

// Animation sections
const sections = document.querySelectorAll('.section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => observer.observe(section));

// Gestion du thème sombre
const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Vérifier si un thème est déjà sauvegardé
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

// Fonction pour basculer le thème
themeIcon.addEventListener('click', () => {
    // Basculer la classe dark-mode
    body.classList.toggle('dark-mode');
    
    // Changer l'icône
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});