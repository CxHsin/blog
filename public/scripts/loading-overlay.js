(function () {
  function animateProgress(progressBar, durationMs, onComplete) {
    const startTime = performance.now()

    function frame(now) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / durationMs, 1)
      progressBar.style.width = progress * 100 + '%'

      if (progress < 1) {
        window.requestAnimationFrame(frame)
      } else {
        onComplete()
      }
    }

    window.requestAnimationFrame(frame)
  }

  function initLoadingOverlay(rootElement, config) {
    const overlay = rootElement.querySelector('[data-loading-overlay]')
    const progressBar = rootElement.querySelector('[data-loading-progress]')

    if (!overlay || !progressBar) {
      return
    }

    document.body.classList.add('loading-overlay-is-locked')

    animateProgress(progressBar, config.durationMs || 2200, function () {
      overlay.classList.add('is-hidden')
      document.body.classList.remove('loading-overlay-is-locked')
    })
  }

  function boot() {
    document.querySelectorAll('.loading-overlay-shell').forEach(function (rootElement) {
      if (!(rootElement instanceof HTMLElement) || rootElement.dataset.loadingOverlayInitialized === 'true') {
        return
      }

      const configElement = rootElement.querySelector('[data-loading-config]')
      if (!configElement || !configElement.textContent) {
        return
      }

      rootElement.dataset.loadingOverlayInitialized = 'true'
      initLoadingOverlay(rootElement, JSON.parse(configElement.textContent))
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true })
  } else {
    boot()
  }
})()
