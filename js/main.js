(function(){
  const header = document.querySelector('.header');
  const menuBtn = document.querySelector('[data-menu-btn]');
  const mobile = document.querySelector('[data-mobile-nav]');
  const toTop = document.querySelector('[data-to-top]');

  function setScrolled(){
    if(!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 10);
  }

  function setToTop(){
    if(!toTop) return;
    toTop.classList.toggle('is-visible', window.scrollY > 400);
  }

  window.addEventListener('scroll', function(){
    setScrolled();
    setToTop();
  }, {passive:true});
  setScrolled();
  setToTop();

  if(menuBtn && mobile){
    menuBtn.addEventListener('click', function(){
      const open = mobile.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });

    // close menu after clicking a link
    mobile.addEventListener('click', function(e){
      const t = e.target;
      if(t && t.tagName === 'A'){
        mobile.classList.remove('is-open');
        menuBtn.setAttribute('aria-expanded','false');
        menuBtn.setAttribute('aria-label','Open menu');
      }
    });
  }

  if(toTop){
    toTop.addEventListener('click', function(){
      window.scrollTo({top:0, behavior:'smooth'});
    });
  }

  // mailto builders
  function buildMailto(form, to){
    const subject = form.getAttribute('data-mailto-subject') || 'Website enquiry';
    const lines = [];
    const fields = form.querySelectorAll('[data-mailto]');
    fields.forEach(el => {
      const label = el.getAttribute('data-mailto-label') || el.name || el.id;
      let value = '';
      if(el.type === 'checkbox') value = el.checked ? 'Yes' : 'No';
      else value = (el.value || '').trim();
      lines.push(label + ': ' + (value || ''));
    });
    const body = lines.join('\n');
    const url = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  }

  document.querySelectorAll('form[data-mailto-form]').forEach(form => {
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const to = form.getAttribute('data-mailto-to') || 'info@mwanga.co.uk';
      buildMailto(form, to);
    });
  });

  // Copy email
  document.querySelectorAll('[data-copy-email]').forEach(btn => {
    btn.addEventListener('click', async function(){
      const email = btn.getAttribute('data-copy-email');
      try{
        await navigator.clipboard.writeText(email);
        btn.textContent = 'Copied';
        setTimeout(()=>{btn.textContent='Copy email';}, 1200);
      }catch(_){
        window.prompt('Copy email:', email);
      }
    });
  });
})();
