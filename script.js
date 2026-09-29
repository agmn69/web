(function(){

  /* ============================================
     DATA
     Nothing here
     invents content — arrays render only what's here.
     ============================================ */

  var projectsData = [
    {
      num: "01",
      tag: "C++ /MiniDB v0.1",
      desc: "MiniDB is a lightweight key-value database built from scratch in C++.",
      status: "v0.1",
      detail: "I wanted to understand what actually happens underneath a simple database operation. Instead of using an existing database library, I decided to build a small one from scratch. MiniDB started as a small C++ project, but building it changed how I think about software. A system isn't just a collection of functions. The interesting part is how the components interact, where responsibilities belong, and what happens when the system has to persist beyond a single execution.",
      stack: ["C++"],
      repoUrl: "https://github.com/agmn69/miniDB",
      image: "workingStr.png", 
      terminal: {
        title: "  v0.1 — terminal",
        lines: [
          { type: "command", text: "set name Aagaman" },
          { type: "output",  text: "OK" },
          { type: "command", text: "get name" },
          { type: "output",  text: "Aagaman" },
          { type: "command", text: "set language C++" },
          { type: "output",  text: "OK" },
          { type: "command", text: "get language" },
          { type: "output",  text: "C++" }
        ]
      }
    },

    {
      num: "02",
      tag: "C++ /Flight-ManagementSystem",
      desc: "Flight Management System is a simple CLI airline ticket booking system.",
      status: "Completed",
      detail: "This was my first project in C++. Through this, I wanted to test my OOPs knowledge and explore file handling in C++.",
      stack: ["C++"],
      repoUrl: "https://github.com/agmn69/Flight-Management-System",
      image: "SC2.png", 
      terminal: {
        title: "  FMS — terminal",
        lines: [
          { type: "output", text: "Welcome to Flight Management System" },
          { type: "output",  text: "************************************" },
          { type: "output", text: "[1] Book flight" },
          { type: "output",  text: "================" },
          { type: "output", text: "[2] Cancel Booking" },
          { type: "output",  text: "==================" },
          { type: "output", text: "[3] Exit]" },
          { type: "output",  text: "==========" },
          {type: "command", text: "Enter your choice: " }
        ]
      }
    }
  ];

  
  var reservedSlotsCount = 1;

  var principlesData = [
    { num: "01", title: "Observe", desc: "Understand the system before changing it." },
    { num: "02", title: "Decompose", desc: "Break complexity into smaller, understandable parts." },
    { num: "03", title: "Improve", desc: "Find the bottleneck. Change the system. Measure the result." }
  ];

  
  var timelineData = [
    { year: "2023", events: ["First exposure: Got introduced, seemed fascinating, dreams: quick money, freedom..."] },
    { year: "2024", events: ["Reality hit: Started paper trading", "Built patience and tested strategies", "Studied market structure", "Everything confusing..."] },
    { year: "2026", events: ["Simplified the approach", "Focused the process", "Continued testing and learning..."] }
  ];

  var taughtData = [
    { num: "01", title: "PROBABILITY", desc: "A good decision can still produce a bad outcome." },
    { num: "02", title: "RISK", desc: "Survival comes before optimization." },
    { num: "03", title: "SYSTEMS", desc: "Rules matter more than individual decisions." },
    { num: "04", title: "ITERATION", desc: "A strategy isn't finished when it's created. It's refined through observation." }
  ];

  // Empty by design — add real entries as they exist. Renders nothing until then.
  var labData = [];

  /* ============================================
     HELPERS
     ============================================ */

  function el(html){
    var t = document.createElement('template');
    t.innerHTML = html.trim();
    return t.content.firstChild;
  }

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var pointerFine = window.matchMedia('(pointer: fine)').matches;

  /* ============================================
     RENDER — PROJECTS
     ============================================ */
  var projectList = document.getElementById('projectList');

  projectsData.forEach(function(p, i){
    var card = el(
      '<div class="project-card" role="button" tabindex="0" aria-haspopup="dialog">' +
        '<div class="project-num mono">' + p.num + '</div>' +
        '<div>' +
          '<div class="project-tag">' + p.tag + '</div>' +
          '<div class="project-desc">' + p.desc + '</div>' +
        '</div>' +
        '<div class="project-meta">' +
          '<span class="project-status">STATUS: ' + p.status + '</span>' +
          '<span class="project-arrow" aria-hidden="true">↗</span>' +
        '</div>' +
      '</div>'
    );
    card.addEventListener('click', function(){ openProjectModal(i); });
    card.addEventListener('keydown', function(e){
      if(e.key === 'Enter' || e.key === ' '){
        e.preventDefault();
        openProjectModal(i);
      }
    });
    projectList.appendChild(card);
  });

  // Reserved / future project slots — visual only, no invented content.
  for(var r = 0; r < reservedSlotsCount; r++){
    projectList.appendChild(el(
      '<div class="project-card is-reserved">' +
        '<div class="project-num mono">' + String(projectsData.length + r + 1).padStart(2, '0') + '</div>' +
        '<div>' +
          '<div class="project-tag">RESERVED</div>' +
          '<div class="project-desc">A future system is being planned here.</div>' +
        '</div>' +
        '<div class="project-meta">' +
          '<span class="project-status">STATUS: PLANNED</span>' +
        '</div>' +
      '</div>'
    ));
  }

  /* ============================================
     PROJECT DETAIL MODAL
     ============================================ */
  var modalOverlay = document.getElementById('modalOverlay');
  var modalPanel = document.getElementById('modalPanel');
  var modalClose = document.getElementById('modalClose');
  var modalImageWrap = document.getElementById('modalImage');
  var modalTerminalWrap = document.getElementById('modalTerminal');
  var lastFocusedEl = null;

  function renderTerminal(term){
    var linesHtml = term.lines.map(function(line){
      if(line.type === 'command'){
        return '<div class="term-line"><span class="term-prompt">›</span><span class="term-command">' + line.text + '</span></div>';
      }
      return '<div class="term-line term-output">' + line.text + '</div>';
    }).join('');

    linesHtml += '<div class="term-line"><span class="term-prompt">›</span><span class="term-cursor"></span></div>';

    return (
      '<div class="term-window">' +
        '<div class="term-titlebar">' +
          '<div class="term-dots"><span></span><span></span><span></span></div>' +
          '<div class="term-title">' + term.title + '</div>' +
        '</div>' +
        '<div class="term-body">' + linesHtml + '</div>' +
      '</div>'
    );
  }

  function openProjectModal(i){
    var p = projectsData[i];
    document.getElementById('modalNum').textContent = p.num;
    document.getElementById('modalTag').textContent = p.tag;
    document.getElementById('modalDesc').textContent = p.desc;
    document.getElementById('modalDetail').textContent = p.detail || '';
    document.getElementById('modalStatus').textContent = 'STATUS: ' + p.status;

    // image or placeholder
    modalImageWrap.innerHTML = p.image
      ? '<img src="' + p.image + '" alt="' + p.tag + ' screenshot">'
      : '<div class="modal-image-placeholder">PROJECT IMAGE<br>ADD A SCREENSHOT OR DIAGRAM</div>';

    // terminal demo (only for projects that define one)
    if(p.terminal){
      modalTerminalWrap.innerHTML = renderTerminal(p.terminal);
      modalTerminalWrap.style.display = 'block';
    } else {
      modalTerminalWrap.innerHTML = '';
      modalTerminalWrap.style.display = 'none';
    }

    var stackEl = document.getElementById('modalStack');
    stackEl.innerHTML = '';
    (p.stack || []).forEach(function(s){
      stackEl.appendChild(el('<span>' + s + '</span>'));
    });

    var linkEl = document.getElementById('modalLink');
    if(p.repoUrl){
      linkEl.href = p.repoUrl;
      linkEl.style.display = 'inline-flex';
    } else {
      linkEl.style.display = 'none';
    }

    lastFocusedEl = document.activeElement;
    modalOverlay.classList.add('is-open');
    modalClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeProjectModal(){
    modalOverlay.classList.remove('is-open');
    document.body.style.overflow = '';
    if(lastFocusedEl){ lastFocusedEl.focus(); }
  }

  modalClose.addEventListener('click', closeProjectModal);
  modalOverlay.addEventListener('click', function(e){
    if(e.target === modalOverlay){ closeProjectModal(); }
  });
  document.addEventListener('keydown', function(e){
    if(e.key === 'Escape' && modalOverlay.classList.contains('is-open')){
      closeProjectModal();
    }
  });
  // basic focus trap
  modalPanel.addEventListener('keydown', function(e){
    if(e.key !== 'Tab') return;
    var focusable = modalPanel.querySelectorAll('button, a[href]');
    if(!focusable.length) return;
    var first = focusable[0], last = focusable[focusable.length - 1];
    if(e.shiftKey && document.activeElement === first){
      e.preventDefault(); last.focus();
    } else if(!e.shiftKey && document.activeElement === last){
      e.preventDefault(); first.focus();
    }
  });

  /* ============================================
     RENDER — REMAINING SECTIONS
     ============================================ */
  var principlesEl = document.getElementById('principles');
  principlesData.forEach(function(p){
    principlesEl.appendChild(el(
      '<div class="principle">' +
        '<div class="principle-num mono">' + p.num + '</div>' +
        '<div class="principle-title">' + p.title + '</div>' +
        '<div class="principle-desc">' + p.desc + '</div>' +
      '</div>'
    ));
  });

  var timelineEl = document.getElementById('timeline');
  timelineData.forEach(function(t){
    timelineEl.appendChild(el(
      '<div class="timeline-year">' +
        '<div class="timeline-year-label">' + t.year + '</div>' +
        '<div class="timeline-events">' +
          t.events.map(function(e){ return '<div class="timeline-event">' + e + '</div>'; }).join('') +
        '</div>' +
      '</div>'
    ));
  });

  var taughtEl = document.getElementById('taughtGrid');
  taughtData.forEach(function(t){
    taughtEl.appendChild(el(
      '<div class="taught-item">' +
        '<div class="taught-num mono">' + t.num + '</div>' +
        '<div class="taught-title">' + t.title + '</div>' +
        '<div class="taught-desc">' + t.desc + '</div>' +
      '</div>'
    ));
  });

  var labEntriesEl = document.getElementById('labEntries');
  labData.forEach(function(l){
    labEntriesEl.appendChild(el(
      '<div class="lab-entry"><span>' + l.title + '</span><span>' + l.year + '</span></div>'
    ));
  });

  /* ============================================
     NAV SCROLL STATE
     ============================================ */
  var nav = document.getElementById('nav');
  function onScroll(){
    if(window.scrollY > 24){ nav.classList.add('is-scrolled'); }
    else { nav.classList.remove('is-scrolled'); }
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ============================================
     MOBILE NAV
     ============================================ */
  var toggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  toggle.addEventListener('click', function(){
    var open = navLinks.classList.toggle('is-open');
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      navLinks.classList.remove('is-open');
      toggle.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ============================================
     SCROLL REVEAL
     ============================================ */
  var revealEls = document.querySelectorAll('.reveal');
  if(reduceMotion || !('IntersectionObserver' in window)){
    revealEls.forEach(function(elx){ elx.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(elx){ io.observe(elx); });
  }

  /* ============================================
     CURSOR GLOW
     Desktop only (pointer: fine) and skipped entirely
     under prefers-reduced-motion.
     ============================================ */
  if(!reduceMotion && pointerFine){
    var glow = document.getElementById('cursorGlow');
    var glowX = 0, glowY = 0, glowTicking = false;

    document.addEventListener('mousemove', function(e){
      glowX = e.clientX;
      glowY = e.clientY;
      glow.classList.add('is-active');
      if(!glowTicking){
        glowTicking = true;
        requestAnimationFrame(function(){
          glow.style.transform = 'translate(' + glowX + 'px,' + glowY + 'px) translate(-50%,-50%)';
          glowTicking = false;
        });
      }
    }, { passive: true });

    document.addEventListener('mouseleave', function(){
      glow.classList.remove('is-active');
    });
  }

  /* ============================================
     MAGNETIC CTA
     Applies to elements with class="magnetic".
     Skipped under prefers-reduced-motion or on
     touch devices (no fine pointer).
     ============================================ */
  if(!reduceMotion && pointerFine){
    document.querySelectorAll('.magnetic').forEach(function(m){
      m.addEventListener('mousemove', function(e){
        var r = m.getBoundingClientRect();
        var relX = e.clientX - r.left - r.width / 2;
        var relY = e.clientY - r.top - r.height / 2;
        m.style.transform = 'translate(' + (relX * 0.3) + 'px,' + (relY * 0.3) + 'px)';
      });
      m.addEventListener('mouseleave', function(){
        m.style.transform = '';
      });
    });
  }

})();
