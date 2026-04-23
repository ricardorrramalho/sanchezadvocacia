document.addEventListener('DOMContentLoaded', () => {

    // 1. ANIMAÇÃO DE NÚMEROS (CONTADORES)
    const counters = document.querySelectorAll('.counter');
    const speed = 100;

    const startCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/\D/g, ''); // Limpa caracteres
                const inc = target / speed;

                if (count < target) {
                    const nextVal = Math.ceil(count + inc);
                    // Formata a exibição baseada no tipo de dado
                    if (counter.innerText.includes('R$')) {
                        counter.innerText = `R$ ${nextVal}M+`;
                    } else if (counter.innerText.includes('%')) {
                        counter.innerText = `${nextVal}%`;
                    } else if (counter.innerText.includes('h')) {
                        counter.innerText = `${nextVal}h`;
                    } else {
                        counter.innerText = `+${nextVal}`;
                    }
                    setTimeout(updateCount, 20);
                } else {
                    // Valor final exato
                    if (counter.innerText.includes('R$')) counter.innerText = `R$ ${target}M+`;
                    else if (counter.innerText.includes('%')) counter.innerText = `${target}%`;
                    else if (counter.innerText.includes('h')) counter.innerText = `${target}h`;
                    else counter.innerText = `+${target.toLocaleString()}`;
                }
            };
            updateCount();
        });
    };

    // 2. FAQ ACCORDION
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');
            
            // Fecha todos antes de abrir o novo
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.faq-answer').style.display = 'none';
            });

            if (!isActive) {
                item.classList.add('active');
                item.querySelector('.faq-answer').style.display = 'block';
            }
        });
    });

    // 3. NAVBAR STICKY EFFECT
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(5, 5, 5, 0.98)';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.5)';
        } else {
            navbar.style.padding = '25px 0';
            navbar.style.background = 'rgba(5, 5, 5, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // 4. INTERSECTION OBSERVER PARA OS NÚMEROS
    // Faz os números começarem a contar só quando o usuário chega na seção
    const observerOptions = { threshold: 0.6 };
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const statsSection = document.querySelector('.numbers');
    if (statsSection) statsObserver.observe(statsSection);

});