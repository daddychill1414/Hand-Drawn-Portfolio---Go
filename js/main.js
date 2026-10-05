/* ===================================================
   JEAN RANIEL GO — HAND-DRAWN PORTFOLIO SCRIPT
   Interconnected 3-Page Website Logic with Dynamic Live Previews
   =================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ── DYNAMIC SCALE FOR ACTUAL LIVE LANDING PAGE IFRAMES ──
  function resizeLandingIframes() {
    document.querySelectorAll('.live-landing-viewport').forEach(vp => {
      const scaler = vp.querySelector('.live-landing-scaler');
      if (scaler) {
        const vpWidth = vp.offsetWidth;
        // Standard virtual desktop width 1200px
        const scale = vpWidth / 1200;
        scaler.style.transform = `scale(${scale})`;
      }
    });
  }

  resizeLandingIframes();
  window.addEventListener('resize', resizeLandingIframes);

  // ── MOBILE MENU TOGGLE ──
  const mobileToggle = document.getElementById('sketchMobileToggle');
  const mobileDrawer = document.getElementById('sketchMobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.textContent = isOpen ? 'Close ✕' : 'Menu ☰';
    });
  }

  // ── PROJECT DOSSIER DATA (Used on projects.html) ──
  const projectDetails = {
    'marci-metzger': {
      title: 'Marci Metzger Redesign',
      category: 'Real Estate Platform 🏡',
      desc: 'A complete website redesign and rebuild for Marci Metzger and The Ridge Realty Group in Pahrump, NV. Features an interactive property search widget, photo galleries, testimonials, and contact consultation workflows.',
      features: [
        'Live property search with filtering by type and price',
        'Animated property photo showcase gallery',
        'Direct consultation inquiry form flow',
        'Deployed to production on Vercel with optimized assets'
      ],
      tags: ['HTML5', 'CSS3', 'JavaScript', 'CSS Animations', 'Vercel'],
      liveUrl: 'https://marci-metzger-redesign.vercel.app/'
    },
    'golden-whisk': {
      title: 'Golden Whisk Bakery',
      category: 'Bakery E-Commerce 🎂',
      desc: 'A boutique bakery e-commerce showcase built for Gina Ygo\'s artisan cake brand. Highlights include an interactive "Build Your Own Cake" customizer, signature pastry catalog, and custom order request workflows.',
      features: [
        'Interactive cake builder and flavor selector',
        'Signature product showcase grid with descriptions',
        'Custom order form with client validation',
        'Warm, inviting visual branding and typography'
      ],
      tags: ['HTML5', 'CSS3', 'JavaScript', 'CSS Grid', 'Flexbox', 'Vercel'],
      liveUrl: 'https://goldenwhisk-flax.vercel.app/'
    },
    'gameteract': {
      title: 'Gameteract Platform',
      category: 'Gaming Community 🎮',
      desc: 'A full-stack gaming community platform connecting competitive players with compatible teammates. Features matchmaking algorithms based on playstyle, gaming circles, and real-time Firestore chat.',
      features: [
        'Squad matchmaking algorithm based on playstyle & ranks',
        'Gaming circles — private and public community hubs',
        'Real-time Firestore chat and notifications',
        'Player profiles with stats, favorite games, and badges'
      ],
      tags: ['React', 'Firebase', 'Firestore', 'Real-time DB', 'Vercel'],
      liveUrl: 'https://gameteract.vercel.app/'
    },
    'marci-alt': {
      title: 'Marci Metzger (Alt. Build)',
      category: 'Real Estate · Design Variant 🏠',
      desc: 'An alternative design exploration for Marci Metzger featuring a darker, more premium visual direction with enhanced property galleries, staggered layout grids, and multi-directional scroll reveals.',
      features: [
        'Dark luxury aesthetic with subtle contrast accents',
        'Enhanced property gallery with dynamic categories',
        'Multi-directional scroll reveal animations',
        'Staggered grid card layouts and smooth hover interactions'
      ],
      tags: ['HTML5', 'CSS3', 'JavaScript', 'Vercel', 'IntersectionObserver'],
      liveUrl: 'https://marcimetzgerredesign-pczjm68oj-a20-30518-9381s-projects.vercel.app/'
    }
  };

  const modalOverlay = document.getElementById('projectModalOverlay');
  const modalClose = document.getElementById('projectModalClose');

  window.openProjectModal = function(projectId) {
    const data = projectDetails[projectId];
    if (!data || !modalOverlay) return;

    document.getElementById('modalProjectCategory').textContent = data.category;
    document.getElementById('modalProjectTitle').textContent = data.title;
    document.getElementById('modalProjectDesc').textContent = data.desc;

    // Embed the live landing page inside the modal banner
    const bannerContainer = document.getElementById('modalPreviewBanner');
    bannerContainer.innerHTML = `
      <iframe src="${data.liveUrl}" style="width:100%;height:100%;border:none;background:#ffffff;" loading="lazy" title="${data.title} Live Landing Page Preview"></iframe>
    `;

    const featContainer = document.getElementById('modalFeaturesList');
    featContainer.innerHTML = data.features.map(f => `
      <div class="sketch-feature-item">
        <span>${f}</span>
      </div>
    `).join('');

    const tagsContainer = document.getElementById('modalTagsContainer');
    tagsContainer.innerHTML = data.tags.map(t => `<span class="sketch-tag-chip">${t}</span>`).join('');

    const liveBtn = document.getElementById('modalLiveBtn');
    if (liveBtn) {
      if (data.liveUrl && data.liveUrl !== '#') {
        liveBtn.href = data.liveUrl;
        liveBtn.style.display = 'inline-flex';
      } else {
        liveBtn.style.display = 'none';
      }
    }

    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeProjectModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const bannerContainer = document.getElementById('modalPreviewBanner');
    if (bannerContainer) bannerContainer.innerHTML = '';
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeProjectModal();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      if (mobileDrawer && mobileDrawer.classList.contains('open')) {
        mobileDrawer.classList.remove('open');
        if (mobileToggle) mobileToggle.textContent = 'Menu ☰';
      }
    }
  });

  // ── PROJECT CLASSIFICATION TABS (projects.html) ──
  const filterBtns = document.querySelectorAll('.sketch-filter-btn');
  const projectCards = document.querySelectorAll('.sketch-project-card[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      // Re-trigger scale recalculation after filtering
      setTimeout(resizeLandingIframes, 50);
    });
  });
});
