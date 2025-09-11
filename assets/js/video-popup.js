<script>
(function(){
  const triggers = document.querySelectorAll('.js-open-video');
  const modal    = document.getElementById('videoModal');
  const box      = modal.querySelector('.video-modal__box');
  const player   = document.getElementById('videoPlayer');
  const btnClose = modal.querySelector('.video-modal__close');
  const btnMute  = modal.querySelector('.video-modal__mute');

  function openFrom(el){
    const src    = el.dataset.videoSrc || el.currentSrc || el.src;
    const poster = el.dataset.videoPoster || el.getAttribute('poster') || '';

    player.src = src;
    if (poster) player.poster = poster;

    player.loop  = true;
    player.muted = false; // start z dźwiękiem
    btnMute.classList.toggle('is-muted', player.muted);

    modal.classList.add('is-open');
    document.body.classList.add('modal-open');

    const p = player.play();
    if (p && p.catch) {
      p.catch(() => { player.controls = true; }); // iOS fallback
    }
  }

  function closeModal(){
    player.pause();
    player.removeAttribute('src'); // zwalniamy stream
    player.load();
    player.controls = false;

    modal.classList.remove('is-open');
    document.body.classList.remove('modal-open');
  }

  // otwieranie z kafla
  triggers.forEach(v => v.addEventListener('click', () => openFrom(v)));

  // zamykanie: krzyżyk, klik w tło, ESC
  btnClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });

  // Mute / Unmute
  btnMute.addEventListener('click', () => {
    player.muted = !player.muted;
    btnMute.classList.toggle('is-muted', player.muted);
  });
})();
</script>
