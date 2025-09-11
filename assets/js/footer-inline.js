// Injects the footer into <div data-footer></div>
document.addEventListener('DOMContentLoaded', () => {
  const mount = document.querySelector('[data-footer]');
  if (!mount) return;

  mount.innerHTML = `
  <footer class="site-footer">
    <div class="footer-container">

      <div class="footer-row">
        <!-- Brand -->
        <div class="footer-brand">
          <img class="footer-logo" src="assets/images/logo/logo.jpg" alt="Logo">
          <div>
            <p class="footer-name">Karolina Ogorzalek</p>
            <p class="footer-tag">UX/UI • Social Media Design • Motion Design</p>
          </div>
        </div>

        <!-- Nav -->
        <nav class="footer-nav" aria-label="Footer">
          <ul>
            <li><a href="projects.html">Projects</a></li>
            <li><a href="about-me.html">About me</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </nav>

        <!-- Contacts -->
        <div class="footer-right">
          <a class="contact-item" href="https://www.linkedin.com/in/karolinazaras" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="3" fill="none" stroke="currentColor" stroke-width="1.6"></rect>
              <rect x="7" y="10" width="2.5" height="7" rx=".5"></rect>
              <rect x="7" y="7" width="2.5" height="2.5" rx="1.2"></rect>
              <path d="M13 10.2c1.6 0 2.5.9 2.5 2.7V17h-2.5v-3.5c0-.8-.4-1.3-1.1-1.3s-1 .5-1 1.4V17H10v-6.8h2.5v1c.5-.7 1.2-1 2.5-1z"></path>
            </svg>
            <span class="contact-link">linkedin.com/in/karolinazaras</span>
          </a>

          <a class="contact-item" href="mailto:karogorza@gmail.com" aria-label="Email">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="3" stroke="currentColor" stroke-width="1.6"></rect>
              <path d="M5 7l7 5 7-5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <span class="contact-link" id="footer-email">karogorza@gmail.com</span>
            <span id="footer-email-tooltip" style="display:none; margin-left:8px; color:#95549c; font-size:13px;">Copied to clipboard!</span>
          </a>
        </div>
      </div>

      <div class="footer-bottom">
        <span>© <span data-year></span> Karolina Ogorzalek • All rights reserved</span>
      </div>
    </div>
  </footer>`;

  const y = mount.querySelector('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  // Email copy to clipboard
  const footerEmail = document.getElementById('footer-email');
  const footerTooltip = document.getElementById('footer-email-tooltip');
  if(footerEmail) {
    footerEmail.addEventListener('click', function(e) {
      e.preventDefault();
      navigator.clipboard.writeText(footerEmail.textContent.trim());
      if(footerTooltip) {
        footerTooltip.style.display = 'inline';
        setTimeout(() => { footerTooltip.style.display = 'none'; }, 1200);
      }
    });
    footerEmail.style.cursor = 'pointer';
  }
});
