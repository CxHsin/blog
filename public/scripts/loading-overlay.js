(function () {
  function shouldSkipOverlay(config) {
    if (!config.oncePerSite) {
      return false
    }

    try {
      return window.localStorage.getItem(config.storageKey || 'loading-overlay-seen') === 'true'
    } catch (_) {
      return false
    }
  }

  function markOverlaySeen(config) {
    if (!config.oncePerSite) {
      return
    }

    try {
      window.localStorage.setItem(config.storageKey || 'loading-overlay-seen', 'true')
    } catch (_) {
      // ignore storage failures
    }
  }

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

  function createOverlayFromTemplate(template) {
    const fragment = template.content.cloneNode(true)
    const shell = fragment.querySelector('.loading-overlay-shell')

    if (!(shell instanceof HTMLElement)) {
      return null
    }

    const background = template.getAttribute('data-loading-background')
    if (background) {
      shell.style.setProperty('--loading-background', background)
    }

    return shell
  }

  function initLoadingOverlay(template, config) {
    if (shouldSkipOverlay(config)) {
      return
    }

    const shell = createOverlayFromTemplate(template)
    if (!shell) {
      return
    }

    const overlay = shell.querySelector('[data-loading-overlay]')
    const progressBar = shell.querySelector('[data-loading-progress]')

    if (!(overlay instanceof HTMLElement) || !(progressBar instanceof HTMLElement)) {
      return
    }

    document.body.appendChild(shell)
    document.body.classList.add('loading-overlay-is-locked')

    animateProgress(progressBar, config.durationMs || 2200, function () {
      overlay.classList.add('is-hidden')
      document.body.classList.remove('loading-overlay-is-locked')
      markOverlaySeen(config)
      window.setTimeout(function () {
        shell.remove()
      }, 900)
    })
  }

  function boot() {
    document.querySelectorAll('[data-loading-overlay-template]').forEach(function (template, index) {
      if (!(template instanceof HTMLTemplateElement) || template.dataset.loadingOverlayInitialized === 'true') {
        return
      }

      const configElements = document.querySelectorAll('[data-loading-config]')
      const configElement = configElements[index]
      if (!configElement || !configElement.textContent) {
        return
      }

      template.dataset.loadingOverlayInitialized = 'true'
      initLoadingOverlay(template, JSON.parse(configElement.textContent))
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true })
  } else {
    boot()
  }
})()
