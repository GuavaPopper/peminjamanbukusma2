(() => {
  'use strict';

  /* ── Utilitas ────────────────────────────────────────────── */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
  const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = () => reduceMQ.matches;
  const DAY = 864e5;
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const bookById = (id) => BOOKS.find((b) => b.id === id);
  const today0 = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d.getTime(); };
  const fmtShort = (t) => new Date(t).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
  const fmtDay = (t) => new Date(t).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
  const fmtLong = (t) => new Date(t).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const initials = (n) => n.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const code = () => 'PJM-' + String(Math.floor(1000 + Math.random() * 9000));
  const ago = (m) => (m < 60 ? `${m} menit lalu` : `${Math.round(m / 60)} jam lalu`);

  /* ── Ikon (garis 1.5px, gaya lucide) ─────────────────────── */
  const P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    more: '<circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>',
    share: '<path d="M12 3v12"/><path d="m8 7 4-4 4 4"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8.5 12 2.5 2.5 4.5-5"/>',
    chat: '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>',
    chev: '<path d="m6 9 6 6 6-6"/>',
    pin: '<path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    heart: '<path d="M19.5 12.6 12 20l-7.5-7.4A5 5 0 0 1 12 6a5 5 0 0 1 7.5 6.6z"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 16v-4M12 8h.01"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    renew: '<path d="M3 12a9 9 0 0 1 15.5-6.2L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15.5 6.2L3 16"/><path d="M3 21v-5h5"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    bookmark: '<path d="M19 21 12 16 5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
    desk: '<rect x="3" y="4" width="18" height="12" rx="1"/><path d="M8 20h8M12 16v4"/>',
    star: '<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1 6.2L12 17.3 6.5 20.2l1-6.2L3 9.6l6.2-.9z"/>',
    calendar: '<rect x="3" y="5" width="18" height="16" rx="1"/><path d="M16 3v4M8 3v4M3 10h18"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
    scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2"/><path d="M7 12h10"/>',
    qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3h-3zM21 14v.01M14 21h.01M17 21h4v-4"/>',
    printer: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="1"/><path d="M6 14h12v7H6z"/>'
  };
  const ic = (n) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;

  /* ── Sampul buku (CSS) ───────────────────────────────────── */
  function cover(b) {
    const c = b.cover;
    const style = `--c-bg:${c.bg};--c-fg:${c.fg};--c-ac:${c.accent}`;
    const t = esc(b.title), a = esc(b.author);
    let inner = '';
    if (c.layout === 'band') inner = `<p class="ct">${t}</p><div class="band"><p class="ca">${a}</p></div>`;
    else if (c.layout === 'plain') inner = `<div><p class="ct">${t}</p><div class="rule"></div></div><p class="ca">${a}</p>`;
    else if (c.layout === 'frame') inner = `<div class="fr"><p class="ct">${t}</p><p class="ca">${a}</p></div>`;
    else if (c.layout === 'stripe') inner = `<p class="ct">${t}</p><p class="ca">${a}</p>`;
    else inner = `<span class="circ"></span><span class="gr">KELAS ${b.grade}</span><div><p class="ct">${t}</p><p class="ca">Kurikulum Merdeka</p></div>`;
    return `<div class="cover" style="${style}" role="img" aria-label="Sampul ${t}"><div class="ci l-${c.layout}">${inner}</div></div>`;
  }
  const thumb = (b, cls = 'thumb') => `<span class="${cls}">${cover(b)}</span>`;

  /* ── Label QR tiap eksemplar buku ────────────────────────── */
  // Isi QR = tautan ke halaman buku, jadi kamera HP biasa pun langsung membukanya.
  const SITE = location.href.split('#')[0];
  const bookCode = (b, copy = 1) => `BK-${String(BOOKS.indexOf(b) + 1).padStart(3, '0')}-${String(copy).padStart(2, '0')}`;
  const bookUrl = (b, copy = 1) => `${SITE}#/buku/${b.id}/${copy}`;
  function qrSVG(text) {
    if (typeof qrcode !== 'function') return '<p class="qr-missing">QR gagal dimuat</p>';
    const q = qrcode(0, 'M'); q.addData(text); q.make();
    const n = q.getModuleCount(); let d = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (q.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
    return `<svg class="qr-svg" viewBox="-2 -2 ${n + 4} ${n + 4}" shape-rendering="crispEdges" role="img" aria-label="Kode QR"><rect x="-2" y="-2" width="${n + 4}" height="${n + 4}" fill="#fff"/><path d="${d}" fill="#111"/></svg>`;
  }
  // Terima isi QR (URL situs), kode label (BK-001-02), atau id buku
  function parseBookQR(text) {
    const t = String(text).trim();
    let m = t.match(/#\/buku\/([\w-]+)(?:\/(\d+))?/);
    if (m && bookById(m[1])) return { book: bookById(m[1]), copy: +(m[2] || 1) };
    m = t.toUpperCase().match(/^BK-?(\d{1,3})(?:-(\d{1,2}))?$/);
    if (m && BOOKS[+m[1] - 1]) return { book: BOOKS[+m[1] - 1], copy: +(m[2] || 1) };
    const b = bookById(t.toLowerCase());
    return b ? { book: b, copy: 1 } : null;
  }

  /* ── State (disimpan di localStorage bila tersedia) ──────── */
  const KEY = 'pinjam-proto-v3';
  const MAX_LOANS = 3;            // batas buku bacaan per siswa (buku paket tidak dihitung)
  const FINE = 500;               // denda per hari keterlambatan
  const isPaket = (b) => b.category === 'Pelajaran';
  // Buku paket dipinjam sampai akhir semester
  const SEM_END = (() => {
    const d = new Date(), y = d.getFullYear();
    const e = d.getMonth() < 6 ? new Date(y, 5, 19) : new Date(y, 11, 18);
    return e.getTime();
  })();
  const studentByNisn = (n) => ROSTER.find((x) => x.nisn === n) || null;

  function seed() {
    const t = today0();
    return {
      // Pinjaman milik Alya (siswa yang sedang login)
      loans: [
        { id: 'L1', bookId: 'filosofi-teras', copy: 2, start: t - 10 * DAY, due: t + 4 * DAY, renewed: false, code: 'PJM-3107' },
        { id: 'L2', bookId: 'bumi-manusia', copy: 1, start: t - 15 * DAY, due: t - 1 * DAY, renewed: true, code: 'PJM-2984' }
      ],
      history: [
        { bookId: 'negeri-5-menara', start: t - 60 * DAY, returned: t - 47 * DAY },
        { bookId: 'atomic-habits', start: t - 40 * DAY, returned: t - 29 * DAY },
        { bookId: 'matematika-xii', start: t - 90 * DAY, returned: t - 70 * DAY }
      ],
      saved: ['sapiens', 'kosmos', 'laut-bercerita', 'hujan'],
      copies: {},
      goal: { target: 12, done: 3 },
      hideRules: false,
      liked: {},
      notifRead: false,
      // Pinjaman siswa lain (dicatat petugas lewat NISN)
      desk: [
        { id: 'D3', nisn: '0091234502', bookId: 'hujan', copy: 1, start: t - 13 * DAY, due: t + 1 * DAY, code: 'PJM-4471' },
        { id: 'D4', nisn: '0081234503', bookId: 'kosmos', copy: 2, start: t - 16 * DAY, due: t - 2 * DAY, code: 'PJM-4388' }
      ],
      log: []
    };
  }
  // Tiap eksemplar: null = di rak, atau { t: 'me' | 'desk', id } = sedang dipinjam
  function seedCopies(st) {
    const t = today0();
    const pool = ROSTER.filter((x) => x.active && !x.me);
    let kb = 0, kp = 0;
    BOOKS.forEach((b) => {
      const arr = Array(b.total).fill(null);
      st.loans.forEach((l) => { if (l.bookId === b.id) arr[l.copy - 1] = { t: 'me', id: l.id }; });
      st.desk.forEach((e) => { if (e.bookId === b.id) arr[e.copy - 1] = { t: 'desk', id: e.id }; });
      let out = (b.total - b.stock) - arr.filter(Boolean).length;
      for (let i = b.total - 1; i >= 0 && out > 0; i--) {
        if (arr[i]) continue;
        const paket = isPaket(b);
        const who = pool[(paket ? kp : kb) % pool.length];
        const due = paket ? SEM_END : t + ((((kb * 7) + 4) % 17) - 3) * DAY;
        const e = { id: `S${b.id}-${i + 1}`, nisn: who.nisn, bookId: b.id, copy: i + 1, start: paket ? t - 60 * DAY : due - 14 * DAY, due, code: 'PJM-' + (4000 + kb + kp) };
        st.desk.push(e);
        arr[i] = { t: 'desk', id: e.id };
        paket ? kp++ : kb++;
        out--;
      }
      st.copies[b.id] = arr;
    });
    return st;
  }
  const fresh = () => seedCopies(seed());
  let state;
  try { state = JSON.parse(localStorage.getItem(KEY)); } catch { state = null; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* mode privat */ } };
  if (!state) { state = fresh(); save(); }

  /* ── Eksemplar & peminjam ────────────────────────────────── */
  const copiesOf = (b) => state.copies[b.id];
  const freeCount = (b) => copiesOf(b).filter((h) => !h).length;
  const stockOf = freeCount;
  function holderOf(b, n) {
    const h = copiesOf(b)[n - 1];
    if (!h) return null;
    if (h.t === 'me') {
      const l = state.loans.find((x) => x.id === h.id);
      return { ...studentByNisn(ME.nisn), due: l.due, start: l.start, entryId: 'me-' + l.id };
    }
    const e = state.desk.find((x) => x.id === h.id);
    return { ...studentByNisn(e.nisn), due: e.due, start: e.start, entryId: e.id };
  }
  // Semua pinjaman aktif (milik Alya + siswa lain) dalam satu bentuk
  function allLoans() {
    return [
      ...state.loans.map((l) => ({ ...l, id: 'me-' + l.id, nisn: ME.nisn, me: true })),
      ...state.desk
    ];
  }
  const loansOfNisn = (nisn) => allLoans().filter((l) => l.nisn === nisn);
  const activeLoans = () => state.loans;
  const loanOf = (id) => state.loans.find((l) => l.bookId === id);
  const lateDays = (due) => Math.max(0, Math.round((today0() - due) / DAY));
  const rupiah = (n) => 'Rp' + n.toLocaleString('id-ID');

  function loanStatus(l) {
    const d = Math.round((l.due - today0()) / DAY);
    if (d < 0) return { cls: 'late', pill: 'late', text: `Terlambat ${-d} hari`, short: 'Terlambat' };
    if (d === 0) return { cls: 'warn', pill: 'warn', text: 'Kembalikan hari ini', short: 'Hari ini' };
    if (d <= 2) return { cls: 'warn', pill: 'warn', text: `Kembali dalam ${d} hari`, short: `${d} hari lagi` };
    return { cls: '', pill: 'ok', text: `Kembali dalam ${d} hari`, short: `${d} hari lagi` };
  }

  /* ── Animasi bantu ───────────────────────────────────────── */
  function enter(root) {
    const items = $$('[data-s]', root);
    const r = reduced();
    items.forEach((el, i) => {
      el.animate(
        r ? [{ opacity: 0 }, { opacity: 1 }]
          : [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'translateY(0)' }],
        { duration: r ? 160 : 360, delay: r ? 0 : Math.min(i, 10) * 40, easing: EASE_OUT, fill: 'backwards' }
      );
    });
  }
  // Tutup elemen dengan menyusutkan tinggi + fade (untuk baris yang dihapus)
  function collapse(el) {
    const h = el.offsetHeight;
    const a = el.animate(
      [{ height: h + 'px', opacity: 1 }, { height: '0px', opacity: 0, paddingTop: '0px', paddingBottom: '0px' }],
      { duration: reduced() ? 1 : 260, easing: EASE_OUT, fill: 'forwards' }
    );
    el.style.overflow = 'hidden';
    return a.finished;
  }
  // Ubah isi sambil menganimasikan tinggi wadah (modal antar-langkah)
  function morph(box, content, update) {
    const h1 = box.offsetHeight;
    update();
    const h2 = box.offsetHeight;
    if (reduced()) { content.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 160 }); return; }
    box.animate([{ height: h1 + 'px' }, { height: h2 + 'px' }], { duration: 300, easing: EASE_OUT });
    content.animate(
      [{ opacity: 0, filter: 'blur(4px)', transform: 'translateY(4px)' }, { opacity: 1, filter: 'blur(0px)', transform: 'translateY(0)' }],
      { duration: 300, easing: EASE_OUT }
    );
  }
  function bump(el) {
    if (!el || reduced()) return;
    el.animate([{ transform: 'translateY(-6px)', opacity: 0, filter: 'blur(2px)' }, { transform: 'none', opacity: 1, filter: 'blur(0)' }], { duration: 280, easing: EASE_OUT });
  }

  /* ── Popover ─────────────────────────────────────────────── */
  function closePops(except) {
    $$('.pop.is-open').forEach((p) => {
      if (p === except) return;
      p.classList.remove('is-open');
      const t = $(`[data-pop="${p.id}"]`);
      if (t) t.setAttribute('aria-expanded', 'false');
    });
  }
  function togglePop(trigger) {
    const pop = document.getElementById(trigger.dataset.pop);
    if (!pop) return;
    const open = !pop.classList.contains('is-open');
    closePops(pop);
    pop.classList.toggle('is-open', open);
    trigger.setAttribute('aria-expanded', String(open));
    if (open && pop.id === 'notif-pop' && !state.notifRead) {
      state.notifRead = true; save();
      $('#bell').classList.add('is-read');
    }
  }

  /* ── Bar bawah (toast gaya Literal) ──────────────────────── */
  let barTimer = null, barRemaining = 0, barStarted = 0;
  const bar = $('#bar');
  function showBar(html, ms = 5000) {
    clearTimeout(barTimer);
    const wasOpen = bar.classList.contains('is-open');
    bar.innerHTML = html;
    bar.classList.add('is-open');
    if (wasOpen) bump(bar.firstElementChild);
    barRemaining = ms; startBarTimer();
  }
  function startBarTimer() { barStarted = Date.now(); barTimer = setTimeout(hideBar, barRemaining); }
  function pauseBar() { clearTimeout(barTimer); barRemaining -= Date.now() - barStarted; }
  function hideBar() { bar.classList.remove('is-open'); }
  bar.addEventListener('mouseenter', () => bar.classList.contains('is-open') && pauseBar());
  bar.addEventListener('mouseleave', () => bar.classList.contains('is-open') && startBarTimer());
  document.addEventListener('visibilitychange', () => {
    if (!bar.classList.contains('is-open')) return;
    document.hidden ? pauseBar() : startBarTimer();
  });
  const barBook = (b, tag, link = true) => `${thumb(b)}<div class="grow"><p class="row-t">${esc(b.title)}</p><p class="row-a">${esc(b.author)}</p></div>${link ? `<a class="btn btn-ghost" href="#/pustaka">Lihat</a>` : ''}<span class="bar-tag">${tag}</span>`;
  const barMsg = (msg) => `<p class="bar-msg grow">${msg}</p><button class="btn btn-ghost" data-action="bar-close">Tutup</button>`;

  /* ── Modal ───────────────────────────────────────────────── */
  const modal = $('#modal'), modalInner = $('#modal-inner'), modalBox = $('.modal-box');
  let lastFocus = null;
  function openModal(html) {
    lastFocus = document.activeElement;
    modalInner.innerHTML = html;
    modal.setAttribute('aria-hidden', 'false');
    modal.classList.add('is-open');
    closePops();
    requestAnimationFrame(() => { const f = $('button, a', modalInner); f && f.focus({ preventScroll: true }); });
  }
  function closeModal() {
    if (!modal.classList.contains('is-open')) return;
    stopScanner();
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
  }

  /* ── Cara meminjam (siswa) ────────────────────────────────── */
  // Peminjaman dicatat petugas di meja sirkulasi: pindai QR buku, lalu isi NISN.
  function openHowTo(id) {
    const b = bookById(id);
    openModal(`<div class="m-step">
      <h3 class="serif m-title"><em>Pinjam</em><br>${esc(b.title)}<br><em>di perpustakaan</em></h3>
      <ol class="steps">
        <li><b>Ambil bukunya di Rak ${esc(b.shelf)}</b><span>${stockOf(b)} eksemplar sedang di rak</span></li>
        <li><b>Bawa ke meja sirkulasi</b><span>Sen–Kam 07.00–15.30 · Jum 07.00–12.00</span></li>
        <li><b>Sebutkan NISN kamu</b><span>Petugas memindai QR di sampul belakang, lalu pinjamanmu langsung muncul di Pustakaku</span></li>
      </ol>
      <p class="m-note">NISN kamu: <b class="copy-code">${ME.nisn}</b></p>
      <div class="m-actions"><button class="btn btn-black btn-sm" data-close>Mengerti</button></div></div>`);
  }

  /* ── Header: pencarian, notifikasi, menu ─────────────────── */
  const sInput = $('#search-input'), sPop = $('#search-pop'), sBtn = $('#search-clear');
  let sIndex = 0, sResults = [];
  sBtn.innerHTML = ic('search');
  $('#bell').innerHTML = ic('bell');
  $('#kebab').innerHTML = ic('more');
  if (state.notifRead) $('#bell').classList.add('is-read');

  function highlight(text, q) {
    const i = text.toLowerCase().indexOf(q.toLowerCase());
    if (!q || i < 0) return esc(text);
    return esc(text.slice(0, i)) + '<mark>' + esc(text.slice(i, i + q.length)) + '</mark>' + esc(text.slice(i + q.length));
  }
  function renderSearch() {
    const q = sInput.value.trim();
    sBtn.innerHTML = ic(q ? 'x' : 'search');
    sBtn.setAttribute('aria-label', q ? 'Hapus pencarian' : 'Cari');
    if (!q) { sPop.classList.remove('is-open'); sInput.setAttribute('aria-expanded', 'false'); return; }
    const ql = q.toLowerCase();
    sResults = BOOKS.filter((b) => (b.title + ' ' + b.author + ' ' + b.category + ' ' + b.tags.join(' ')).toLowerCase().includes(ql)).slice(0, 6);
    sIndex = 0;
    sPop.innerHTML = sResults.length
      ? sResults.map((b, i) => `<a class="sr-item" role="option" href="#/buku/${b.id}" aria-selected="${i === 0}" data-i="${i}">${thumb(b)}<div><p class="t">${highlight(b.title, q)}${b.grade ? ' · Kelas ' + b.grade : ''}</p><p class="a">${esc(b.author)} · ${stockOf(b) > 0 ? stockOf(b) + ' tersedia' : 'habis dipinjam'}</p></div></a>`).join('') +
        `<div class="sr-foot"><span><span class="kbd">↑</span><span class="kbd">↓</span>pilih</span><span><span class="kbd">↵</span>buka</span><span><span class="kbd">esc</span>tutup</span></div>`
      : `<p class="sr-empty">Tidak ada buku yang cocok dengan “${esc(q)}”.</p>`;
    closePops(sPop);
    sPop.classList.add('is-open');
    sInput.setAttribute('aria-expanded', 'true');
  }
  function clearSearch() { sInput.value = ''; renderSearch(); }
  sInput.addEventListener('input', renderSearch);
  sInput.addEventListener('focus', () => sInput.value && renderSearch());
  sInput.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { clearSearch(); sInput.blur(); return; }
    if (!sResults.length) return;
    // Navigasi keyboard: tanpa animasi (aksi berfrekuensi tinggi)
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      sIndex = (sIndex + (e.key === 'ArrowDown' ? 1 : -1) + sResults.length) % sResults.length;
      $$('.sr-item', sPop).forEach((el, i) => el.setAttribute('aria-selected', String(i === sIndex)));
    }
    if (e.key === 'Enter') { location.hash = `#/buku/${sResults[sIndex].id}`; clearSearch(); sInput.blur(); }
  });
  sPop.addEventListener('mousemove', (e) => {
    const it = e.target.closest('.sr-item'); if (!it) return;
    sIndex = +it.dataset.i;
    $$('.sr-item', sPop).forEach((el, i) => el.setAttribute('aria-selected', String(i === sIndex)));
  });
  sPop.addEventListener('click', (e) => { if (e.target.closest('.sr-item')) setTimeout(clearSearch, 0); });
  sBtn.addEventListener('click', () => { sInput.value ? clearSearch() : null; sInput.focus(); });

  const RULES = `Pinjam di meja sirkulasi dengan NISN · maks. ${MAX_LOANS} buku bacaan, 7 atau 14 hari · buku paket 1 semester · perpanjang 1 kali · denda ${rupiah(FINE)}/hari.`;
  function renderHeaderPops() {
    const late = state.loans.filter((l) => loanStatus(l).pill === 'late');
    const soon = state.loans.filter((l) => loanStatus(l).pill === 'warn');
    const items = [
      ...late.map((l) => ({ dot: 'red', t: `<b>${esc(bookById(l.bookId).title)}</b> terlambat dikembalikan. Denda berjalan Rp500/hari.`, s: 'Hari ini' })),
      ...soon.map((l) => ({ dot: '', t: `<b>${esc(bookById(l.bookId).title)}</b> jatuh tempo ${fmtDay(l.due)}.`, s: 'Pengingat' })),
      { dot: '', t: 'Perpustakaan tutup pukul 12.00 setiap hari Jumat.', s: 'Pengumuman · 2 hari lalu' }
    ];
    $('#notif-pop').innerHTML = `<div class="notif-head"><b>Notifikasi</b><span class="count">${items.length}</span></div>` +
      items.map((n) => `<div class="notif-item"><span class="dot ${n.dot}"></span><p>${n.t}<small>${n.s}</small></p></div>`).join('');
    $('#help-pop').innerHTML = `
      <button class="menu-item" data-action="info" data-msg="Jam buka: Senin–Kamis 07.00–15.30, Jumat 07.00–12.00.">${ic('clock')}Jam buka</button>
      <button class="menu-item" data-action="info" data-msg="${RULES}">${ic('info')}Tata tertib</button>
      <button class="menu-item" data-action="reset">${ic('renew')}Atur ulang data demo</button>`;
    $('#me-pop').innerHTML = `<div class="menu-head"><b>${ME.name}</b><span>${ME.cls} · NISN ${ME.nisn}</span></div><div class="menu-sep"></div>
      <a class="menu-item" href="#/pustaka">${ic('book')}Pustakaku</a>
      <a class="menu-item" href="#/petugas">${ic('desk')}Mode petugas</a>
      <div class="menu-sep"></div>
      <button class="menu-item" data-action="info" data-msg="Ini prototipe — fitur masuk/keluar belum aktif.">${ic('logout')}Keluar</button>`;
  }

  /* ── Tampilan: Beranda ───────────────────────────────────── */
  function ring(pct, label, big) {
    const r = big ? 54 : 14, c = 2 * Math.PI * r;
    const s = big ? 112 : 30;
    return `<div class="ring ${big ? 'big' : ''}"><svg viewBox="0 0 ${s} ${s}"><circle class="bg" cx="${s / 2}" cy="${s / 2}" r="${r}"/><circle class="fg" cx="${s / 2}" cy="${s / 2}" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${c}" data-offset="${c * (1 - pct)}"/></svg><span>${label}</span></div>`;
  }
  function loanRow(l) {
    const b = bookById(l.bookId), st = loanStatus(l);
    return `<div class="loan-row" data-loan="${l.id}">
      <a class="loan-main" href="#/buku/${b.id}">${thumb(b)}<div style="min-width:0"><p class="row-t">${esc(b.title)}</p><p class="row-a">${esc(b.author)}</p><p class="row-due ${st.cls}">${st.text}</p></div></a>
      <div class="pop-wrap"><button class="icon-btn" data-pop="lm-${l.id}" aria-label="Opsi">${ic('more')}</button>
        <div class="pop pop-right" id="lm-${l.id}">
          <button class="menu-item" data-action="renew" data-id="${l.id}" ${canRenew(l) ? '' : 'disabled style="opacity:.4;pointer-events:none"'}>${ic('renew')}Perpanjang 7 hari</button>
          <a class="menu-item" href="#/buku/${b.id}">${ic('book')}Lihat detail</a>
        </div></div></div>`;
  }
  const canRenew = (l) => !l.renewed && !isPaket(bookById(l.bookId)) && loanStatus(l).pill !== 'late';

  function feedItem(f) {
    const liked = state.liked[f.who];
    const actions = `<div class="feed-actions"><button class="text-btn like ${liked ? 'is-on' : ''}" data-action="like" data-who="${esc(f.who)}">${ic('heart')}<span>Suka</span></button><button class="text-btn">${ic('chat')}Komentar</button><button class="text-btn push" data-action="copy-link" data-id="${f.bookId || ''}" aria-label="Bagikan">${ic('share')}</button></div>`;
    const top = `<div class="feed-top"><span class="avatar sm" style="--av:${f.av}">${f.kind === 'new' ? 'P*' : initials(f.who)}</span><p><b>${esc(f.who)}</b> ${f.verb}</p><time>${ago(f.mins)}</time></div>`;
    if (f.kind === 'new') {
      const t = today0();
      return `<article class="feed-item" data-s>${top}<div class="feed-new">${ring(0.5, `${f.count}<small>buku</small>`, true)}<div><p class="dates">${fmtShort(t - 6 * DAY)} ${ic('arrow')} ${fmtShort(t)}</p><h4>Koleksi baru<br>minggu ini</h4><a class="btn btn-ghost" style="margin-top:12px" href="#/jelajah">Lihat semua</a></div></div>${actions}</article>`;
    }
    const b = bookById(f.bookId);
    return `<article class="feed-item" data-s>${top}<div class="feed-card"><a class="thumb-md" href="#/buku/${b.id}">${cover(b)}</a><div><h4>${esc(b.title)}</h4><p class="row-a">${esc(b.author)}</p>${primaryAction(b, true)}</div></div>${actions}</article>`;
  }

  function viewHome() {
    const loans = activeLoans();
    const g = state.goal;
    const newBooks = ['kosmos', 'dilan-1990', 'hujan'].map(bookById);
    return `<div class="home-wrap">
      <section>
        <div class="sec-head" data-s><h2 class="serif h-sec">Sedang dipinjam</h2><span class="count">${loans.length} Buku</span></div>
        ${loans.length ? `<div class="list-box" data-s id="home-loans">${loans.map(loanRow).join('')}</div>`
          : `<div class="dashed" data-s><a class="btn btn-ghost" href="#/jelajah">Cari buku</a></div>`}
        <div class="soft-card" data-s>${ring(g.done / g.target, g.done)}<div class="grow"><small>Target</small>Baca ${g.target} buku di 2026</div></div>
        ${state.hideRules ? '' : `<div class="soft-card collapse" data-s id="rules">${ic('info')}<div class="grow">Pinjam di meja sirkulasi · sebutkan NISN</div><button class="link-muted" data-action="hide-rules">Sembunyikan</button></div>`}
        <h2 class="serif h-sec mt" data-s>Jelajahi</h2>
        <a class="promo-card" href="#/jelajah" data-s><div><small>Baru di perpustakaan</small><p>Lihat buku yang masuk<br>minggu ini</p></div><div class="stack">${newBooks.map((b) => thumb(b)).join('')}</div></a>
        <a class="soft-card" href="#/jelajah" data-s>${ic('bookmark')}<div class="grow">Rak pilihan guru</div>${ic('arrow')}</a>
        <nav class="foot" data-s><a href="#/">Tentang</a><a href="#/" data-action="info" data-msg="${RULES}">Tata tertib</a><a href="#/" data-action="info" data-msg="Senin–Kamis 07.00–15.30, Jumat 07.00–12.00.">Jam buka</a><a href="#/petugas">Petugas</a></nav>
      </section>
      <section>
        <div class="sec-head" data-s><h2 class="serif h-sec">Aktivitas</h2></div>
        ${FEED.map(feedItem).join('')}
      </section>
    </div>`;
  }

  /* Tombol aksi utama buku (dipakai di feed & detail) */
  function primaryAction(b, compact) {
    const l = loanOf(b.id);
    const size = compact ? 'btn-sm' : '';
    if (l) return `<a class="btn btn-outline ${size}" href="#/pustaka">Sedang kamu pinjam</a>`;
    if (stockOf(b) > 0) return `<button class="btn btn-green ${size}" data-action="howto" data-id="${b.id}">Cara pinjam</button>`;
    return `<span class="btn btn-outline ${size}" aria-disabled="true">Semua eksemplar dipinjam</span>`;
  }

  /* ── Tampilan: Detail buku ───────────────────────────────── */
  function saveControl(b) {
    const saved = state.saved.includes(b.id);
    if (!saved) {
      return `<div class="split"><button class="btn btn-black" data-action="save" data-id="${b.id}">Simpan</button>
        <div class="pop-wrap"><button class="btn btn-black" data-pop="save-pop" aria-label="Opsi simpan">${ic('more')}</button>
          <div class="pop" id="save-pop"><button class="menu-item" data-action="save" data-id="${b.id}">${ic('bookmark')}Simpan ke “Ingin dibaca”</button><a class="menu-item" href="#/pustaka/disimpan">${ic('book')}Buka daftar simpanan</a></div></div></div>`;
    }
    return `<div class="pop-wrap"><button class="btn btn-outline" data-pop="save-pop">Disimpan${ic('chev').replace('<svg', '<svg class="chev"')}</button>
      <div class="pop" id="save-pop"><a class="menu-item" href="#/pustaka/disimpan">${ic('book')}Buka daftar simpanan</a><button class="menu-item danger" data-action="unsave" data-id="${b.id}">${ic('trash')}Hapus dari simpanan</button></div></div>`;
  }
  function viewDetail({ id, copy }) {
    const b = bookById(id);
    if (!b) return `<div class="container" style="padding:80px 24px;text-align:center"><p class="serif h-sec">Buku tidak ditemukan</p><a class="btn btn-black" style="margin-top:16px" href="#/jelajah">Kembali ke katalog</a></div>`;
    const st = stockOf(b);
    const related = BOOKS.filter((x) => x.category === b.category && x.id !== b.id).slice(0, 5);
    const cp = Math.min(Math.max(+copy || 1, 1), b.total);
    return `<div class="detail-bg"><div class="container detail">
      ${copy ? `<p class="scanned" data-s>${ic('qr')}Dipindai dari label <b>${bookCode(b, cp)}</b> · eksemplar ${cp} dari ${b.total}</p>` : ''}
      <div class="detail-top">
        <div class="detail-cover" data-s>${cover(b)}</div>
        <div>
          <div class="chips" data-s>${b.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
          <h1 class="serif detail-title" data-s>${esc(b.title)}</h1>
          <p class="meta" data-s>${esc(b.author)} — ${b.year}</p>
          <div class="desc" data-s id="desc"><div class="desc-body">${esc(b.desc)}</div><button class="desc-more" data-action="more">Selengkapnya</button></div>
          <div class="actions" data-s id="actions">
            <span id="primary">${primaryAction(b)}</span>
            <span id="save-ctl">${saveControl(b)}</span>
            <span class="gap"></span>
            <div class="pop-wrap"><button class="text-btn" data-pop="share-pop">${ic('share')}Bagikan</button>
              <div class="pop" id="share-pop">
                <button class="menu-item" data-action="info" data-msg="Menu bagikan bawaan perangkat akan muncul di sini.">${ic('share')}Bagikan via…</button>
                <button class="menu-item" data-action="copy" data-id="${b.id}"><span class="swap"><span class="a">${ic('link')}Salin tautan</span><span class="b">${ic('checkCircle')}Tersalin</span></span></button>
                <button class="menu-item" data-action="info" data-msg="Terkirim ke obrolan kelas (simulasi).">${ic('chat')}Kirim ke teman</button>
              </div></div>
            <button class="text-btn" data-action="to-loc">${ic('pin')}Lokasi</button>
          </div>
        </div>
      </div>
      <div class="stats" data-s>
        <div class="stat ${st === 0 ? 'late' : ''}"><b id="stat-stock">${st}</b><span>Tersedia</span></div>
        <div class="stat"><b>${b.total}</b><span>Eksemplar</span></div>
        <div class="stat"><b>${b.total - freeCount(b)}</b><span>Sedang dipinjam</span></div>
        <div class="stat"><b>${b.borrowedTotal}</b><span>Kali dipinjam</span></div>
        <div class="stat"><b>${b.rating.toFixed(1)}</b><span>${b.reviews} ulasan</span></div>
      </div>
      ${copiesSection(b, cp, !!copy)}
      <section class="loc" id="loc" data-s>
        <h3 class="serif">Temukan di rak</h3>
        <div class="shelf-badge">${ic('pin')}Rak ${esc(b.shelf)}</div>
        <p>${b.category === 'Pelajaran' ? 'Ruang buku paket, sebelah meja sirkulasi' : 'Lantai 1, dekat area baca'}</p>
        <div class="mini-row">${related.map((r) => `<a href="#/buku/${r.id}" aria-label="${esc(r.title)}">${cover(r)}</a>`).join('')}</div>
      </section>
      <section class="qr-card" data-s>
        <div class="qr">${qrSVG(bookUrl(b, cp))}</div>
        <div class="qr-info"><small>Label QR · eksemplar ${cp} dari ${b.total}</small><b>${bookCode(b, cp)}</b>
          <p>Tertempel di sampul belakang buku. Pindai dengan kamera HP untuk membuka halaman ini, atau dipindai petugas saat meminjam dan mengembalikan.</p>
          <a class="btn btn-ghost" href="#/label">${ic('printer')}Cetak label</a></div>
      </section>
    </div></div>`;
  }

  // Status tiap eksemplar (tanpa nama peminjam — ini tampilan siswa)
  function copiesSection(b, cp, scanned) {
    const LIMIT = 8;
    const rows = copiesOf(b).map((_, i) => {
      const n = i + 1, h = holderOf(b, n), cur = scanned && n === cp;
      let pill = '<span class="pill ok">Di rak</span>', note = '';
      if (h) {
        const late = h.due < today0();
        pill = h.kind === 'me' ? '<span class="pill wait">Kamu pinjam</span>' : `<span class="pill ${late ? 'late' : 'done'}">${late ? 'Terlambat' : 'Dipinjam'}</span>`;
        note = `kembali ${fmtShort(h.due)}`;
      }
      return `<div class="copy-row${cur ? ' is-current' : ''}${i >= LIMIT && !cur ? ' is-extra' : ''}"><code>${bookCode(b, n)}</code>${pill}<span class="copy-note">${cur ? 'eksemplar yang kamu pindai' : note}</span></div>`;
    }).join('');
    return `<section class="copies${b.total > LIMIT ? '' : ' is-all'}" id="copies" data-s>
      <div class="copies-head"><h3 class="serif">Eksemplar</h3><span class="count">${freeCount(b)} dari ${b.total} di rak</span></div>
      <div class="list-box copy-list">${rows}</div>
      ${b.total > LIMIT ? `<button class="link-muted copies-more" data-action="copies-more">Lihat semua ${b.total} eksemplar</button>` : ''}
    </section>`;
  }

  /* ── Tampilan: Jelajahi ──────────────────────────────────── */
  let exFilter = 'Semua';
  const CATS = ['Semua', 'Fiksi', 'Nonfiksi', 'Sains', 'Pelajaran'];
  function shelvesHTML() {
    const shelves = SHELVES.filter((s) => exFilter === 'Semua' || s.category === exFilter || s.books.some((id) => bookById(id).category === exFilter));
    const books = BOOKS.filter((b) => exFilter === 'Semua' || b.category === exFilter);
    return shelves.map((s) => `<section class="shelf" data-s>
        <h2 class="serif shelf-title">Rak <em>${esc(s.title)}</em></h2>
        <div class="curator"><span class="avatar sm" style="--av:${s.av}">${initials(s.curator.replace(/^(Bu|Pak) /, ''))}</span><div><b>${esc(s.curator)}</b><span>${esc(s.role)}</span></div></div>
        <div class="shelf-row">${s.books.slice(0, 6).map((id) => { const b = bookById(id); return `<a href="#/buku/${b.id}" aria-label="${esc(b.title)}">${cover(b)}<span class="tip">${esc(b.title)}</span></a>`; }).join('')}</div>
      </section>`).join('') +
      `<div class="grid-title" data-s><h2 class="serif h-sec">Semua koleksi</h2><span class="count">${books.length} judul</span></div>
      <div class="book-grid" data-s>${books.map(cell).join('')}</div>`;
  }
  function cell(b) {
    const st = stockOf(b);
    return `<a class="cell" href="#/buku/${b.id}"><span class="hover-chips"><span class="chip">${st > 0 ? st + ' tersedia' : 'Habis'}</span><span class="chip">${ic('star')}${b.rating.toFixed(1)}</span></span><span class="cv">${cover(b)}</span><p class="row-t">${esc(b.title)}</p><p class="row-a">${esc(b.author)}</p></a>`;
  }
  function viewExplore() {
    return `<div class="explore-bg"><div class="container explore">
      <header class="ex-head" data-s><h1 class="serif">Jelajahi rak</h1><p>Koleksi Perpustakaan SMA, dikurasi oleh pustakawan dan guru.</p></header>
      <div class="filters" role="group" aria-label="Filter kategori" data-s>${CATS.map((c) => `<button class="filter" data-action="filter" data-cat="${c}" aria-pressed="${c === exFilter}">${c}</button>`).join('')}</div>
      <div id="shelves">${shelvesHTML()}</div>
    </div></div>`;
  }

  /* ── Tampilan: Pustakaku ─────────────────────────────────── */
  const TABS = [['dipinjam', 'Dipinjam'], ['riwayat', 'Riwayat'], ['disimpan', 'Disimpan']];
  let libQuery = '';
  function libBody(tab) {
    const q = libQuery.toLowerCase();
    const match = (b) => !q || (b.title + ' ' + b.author).toLowerCase().includes(q);
    if (tab === 'dipinjam') {
      const rows = state.loans.filter((l) => match(bookById(l.bookId)));
      if (!state.loans.length) return `<div class="dashed" data-s>Kamu belum meminjam buku.<a class="btn btn-ghost" href="#/jelajah">Cari buku</a></div>`;
      if (!rows.length) return emptySearch();
      return `<div class="list-box" data-s>${rows.map((l) => {
        const b = bookById(l.bookId), st = loanStatus(l);
        const dateLine = `<b class="copy-code">${bookCode(b, l.copy)}</b> · ${fmtShort(l.start)} ${ic('arrow')} <span class="due-date">${fmtShort(l.due)}</span>${isPaket(b) ? ' · 1 semester' : ''}${l.renewed ? ' · sudah diperpanjang' : ''}`;
        const btn = `<button class="btn btn-ghost" data-action="renew" data-id="${l.id}" ${canRenew(l) ? '' : 'disabled'}>Perpanjang</button>`;
        return `<div class="lib-row" data-loan="${l.id}"><a href="#/buku/${b.id}">${thumb(b)}</a>
          <div style="min-width:0"><p class="row-t">${esc(b.title)}</p><p class="row-a">${esc(b.author)}</p><p class="dates">${dateLine}</p></div>
          <div class="right"><span class="pill ${st.pill}">${st.short}</span>${btn}<span class="code-sm">${l.code}</span></div></div>`;
      }).join('')}</div>${state.loans.some((l) => loanStatus(l).pill === 'late') ? `<p class="empty-note">Buku yang terlambat tidak bisa diperpanjang. Denda ${rupiah(FINE)}/hari dibayar di meja sirkulasi.</p>` : ''}`;
    }
    if (tab === 'riwayat') {
      const rows = state.history.filter((h) => match(bookById(h.bookId)));
      if (!state.history.length) return `<div class="dashed" data-s>Belum ada riwayat peminjaman.</div>`;
      if (!rows.length) return emptySearch();
      return `<div class="list-box" data-s>${rows.map((h) => {
        const b = bookById(h.bookId);
        return `<div class="lib-row"><a href="#/buku/${b.id}">${thumb(b)}</a>
          <div style="min-width:0"><p class="row-t">${esc(b.title)}</p><p class="row-a">${esc(b.author)}</p><p class="dates">${fmtShort(h.start)} ${ic('arrow')} ${fmtShort(h.returned)} · dikembalikan</p></div>
          <div class="right"><span class="pill done">Selesai</span><a class="btn btn-ghost" href="#/buku/${b.id}">Pinjam lagi</a></div></div>`;
      }).join('')}</div>`;
    }
    const books = state.saved.map(bookById).filter(match);
    if (!state.saved.length) return `<div class="dashed" data-s>Kamu belum menyimpan buku.<a class="btn btn-ghost" href="#/jelajah">Jelajahi rak</a></div>`;
    if (!books.length) return emptySearch();
    return `<div class="book-grid lib-grid" data-s>${books.map(cell).join('')}</div>`;
  }
  const emptySearch = () => `<div class="dashed" data-s>Tidak ada yang cocok dengan “${esc(libQuery)}”.</div>`;
  function viewLibrary({ tab }) {
    tab = TABS.some((t) => t[0] === tab) ? tab : 'dipinjam';
    const counts = { dipinjam: state.loans.length, riwayat: state.history.length, disimpan: state.saved.length };
    return `<div class="container lib">
      <div class="lib-head" data-s>
        <div class="tabs" role="tablist">${TABS.map(([k, v]) => `<a class="tab" role="tab" href="#/pustaka/${k}" aria-selected="${k === tab}">${v}<sup>${counts[k]}</sup></a>`).join('')}</div>
        <div class="lib-tools"><label class="field">${ic('search')}<input id="lib-q" placeholder="Cari di pustakamu…" value="${esc(libQuery)}" /></label><a class="btn btn-black" href="#/jelajah">Cari buku</a></div>
      </div>
      <div class="lib-body" id="lib-body" data-tab="${tab}">${libBody(tab)}</div>
    </div>`;
  }

  /* ── Tampilan: Petugas (meja sirkulasi) ──────────────────── */
  let deskQuery = '', deskKind = 'bacaan', deskAll = false;
  const DESK_LIMIT = 12;
  function deskRow(e) {
    const b = bookById(e.bookId), p = studentByNisn(e.nisn);
    const late = e.due < today0();
    return `<div class="desk-row" data-entry="${e.id}"><span class="avatar lg" style="--av:${p.av}">${initials(p.name)}</span>
      <div class="grow"><p class="who">${esc(p.name)}<span>${esc(p.cls)} · ${p.nisn}</span></p>
        <div class="bk">${thumb(b)}<span>${esc(b.title)} · <b class="copy-code">${bookCode(b, e.copy)}</b> · ${isPaket(b) ? 's.d.' : 'jatuh tempo'} ${fmtShort(e.due)}</span></div></div>
      ${late ? '<span class="pill late">Terlambat</span>' : ''}
      <button class="btn btn-sm hold" data-action="hold-return" data-id="${e.id}" aria-label="Tahan untuk menerima kembali"><span>Terima</span><span class="hold-fill" aria-hidden="true">${ic('check')}Terima</span></button></div>`;
  }
  function deskListHTML() {
    const q = deskQuery.trim().toLowerCase();
    const rows = allLoans()
      .filter((e) => (deskKind === 'paket') === isPaket(bookById(e.bookId)))
      .filter((e) => {
        if (!q) return true;
        const b = bookById(e.bookId), p = studentByNisn(e.nisn);
        return `${p.name} ${p.nisn} ${b.title} ${bookCode(b, e.copy)}`.toLowerCase().includes(q);
      })
      .sort((a, b) => a.due - b.due);
    if (!rows.length) return `<div class="dashed">${q ? `Tidak ada yang cocok dengan “${esc(deskQuery)}”.` : 'Tidak ada pinjaman aktif.'}</div>`;
    const shown = deskAll ? rows : rows.slice(0, DESK_LIMIT);
    return `<div class="list-box">${shown.map(deskRow).join('')}</div>
      ${rows.length > DESK_LIMIT ? `<button class="link-muted copies-more" data-action="desk-more">${deskAll ? 'Tampilkan lebih sedikit' : `Tampilkan semua (${rows.length})`}</button>` : ''}`;
  }
  function logItem(g) {
    const b = bookById(g.bookId), p = studentByNisn(g.nisn);
    const time = new Date(g.at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const verb = g.t === 'pinjam' ? 'meminjam' : 'mengembalikan';
    return `<div class="log-item"><span class="log-dot ${g.t}">${ic(g.t === 'pinjam' ? 'arrow' : 'check')}</span>
      <p><b>${esc(p.name)}</b> ${verb} <b>${esc(b.title)}</b><small>${bookCode(b, g.copy)}${g.fine ? ` · denda ${rupiah(g.fine)}` : ''}</small></p><time>${time}</time></div>`;
  }
  function viewDesk() {
    const all = allLoans();
    const t = today0();
    const todayLog = state.log.filter((g) => g.at >= t);
    const late = all.filter((e) => e.due < t).length;
    const avail = BOOKS.reduce((n, b) => n + freeCount(b), 0);
    const kindCount = (k) => all.filter((e) => (k === 'paket') === isPaket(bookById(e.bookId))).length;
    return `<div class="container desk">
      <header class="desk-head" data-s><div><h1 class="serif">Meja sirkulasi</h1><p>${fmtLong(Date.now())} · Petugas: Bu Ratna</p></div><div class="desk-tools"><a class="btn btn-ghost" href="#/label">${ic('printer')}Label QR</a></div></header>
      <div class="stats" data-s>
        <div class="stat"><b>${todayLog.filter((g) => g.t === 'pinjam').length}</b><span>Dipinjam hari ini</span></div>
        <div class="stat"><b>${todayLog.filter((g) => g.t === 'kembali').length}</b><span>Kembali hari ini</span></div>
        <div class="stat ${late ? 'late' : ''}"><b>${late}</b><span>Terlambat</span></div>
        <div class="stat"><b>${avail}</b><span>Eksemplar di rak</span></div>
      </div>
      <div class="desk-grid">
        <section data-s>
          <button class="scan-cta" data-action="scan" data-mode="desk">${ic('scan')}<b>Pindai QR buku</b><span>Untuk meminjam atau mengembalikan</span></button>
          <form class="scan-manual" data-scan-form data-mode="desk" data-outside><input id="desk-code" placeholder="atau ketik kode label, mis. BK-002-01" autocomplete="off" aria-label="Kode label buku" /><button class="btn btn-black btn-sm" type="submit">Cari</button></form>
          <p class="desk-code-msg" id="desk-code-msg" aria-live="polite"></p>
          <div class="sec-head mt"><h2 class="serif h-sec">Aktivitas hari ini</h2><span class="count">${todayLog.length}</span></div>
          ${todayLog.length ? `<div class="list-box log">${todayLog.map(logItem).join('')}</div>` : `<div class="dashed">Belum ada transaksi hari ini.</div>`}
        </section>
        <section data-s>
          <div class="sec-head"><h2 class="serif h-sec">Sedang dipinjam</h2><span class="count">${all.length}</span></div>
          <div class="desk-filters">
            <label class="field">${ic('search')}<input id="desk-q" placeholder="Cari nama, NISN, judul, kode…" value="${esc(deskQuery)}" /></label>
            <div class="seg" role="group" aria-label="Jenis buku">
              <button class="seg-btn" data-action="desk-kind" data-kind="bacaan" aria-pressed="${deskKind === 'bacaan'}">Bacaan <sup>${kindCount('bacaan')}</sup></button>
              <button class="seg-btn" data-action="desk-kind" data-kind="paket" aria-pressed="${deskKind === 'paket'}">Buku paket <sup>${kindCount('paket')}</sup></button>
            </div>
          </div>
          <div id="desk-list">${deskListHTML()}</div>
          <p class="hold-hint">Tahan tombol “Terima” untuk mengonfirmasi tanpa memindai.</p>
        </section>
      </div>
    </div>`;
  }

  /* ── Tampilan: Cetak label QR ────────────────────────────── */
  let labelCat = 'Semua';
  function labelsHTML() {
    return BOOKS.filter((b) => labelCat === 'Semua' || b.category === labelCat).map((b) =>
      Array.from({ length: b.total }, (_, i) => `<div class="label"><div class="qr">${qrSVG(bookUrl(b, i + 1))}</div>
        <div class="label-t"><b>${esc(b.title)}</b><span>${esc(b.author)}</span><code>${bookCode(b, i + 1)}</code><em>Rak ${esc(b.shelf)}${copiesOf(b)[i] ? '<span class="label-out no-print"> · dipinjam</span>' : ''}</em></div></div>`).join('')
    ).join('');
  }
  function viewLabels() {
    const count = BOOKS.filter((b) => labelCat === 'Semua' || b.category === labelCat).reduce((n, b) => n + b.total, 0);
    return `<div class="container labels-page">
      <header class="desk-head no-print" data-s><div><h1 class="serif">Label QR buku</h1><p>Satu label per eksemplar · tempel di sampul belakang · <span id="label-count">${count}</span> label</p></div>
        <button class="btn btn-black" data-action="print">${ic('printer')}Cetak</button></header>
      <div class="filters no-print" style="justify-content:flex-start" data-s>${CATS.map((c) => `<button class="filter" data-action="label-filter" data-cat="${c}" aria-pressed="${c === labelCat}">${c}</button>`).join('')}</div>
      <div class="label-grid" id="label-grid" data-s>${labelsHTML()}</div>
    </div>`;
  }

  /* ── Pemindai QR (kamera) ────────────────────────────────── */
  let scanner = null;
  function loadJsQR() {
    if (window.jsQR) return Promise.resolve();
    return new Promise((res, rej) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
      s.onload = res; s.onerror = () => rej(new Error('jsqr'));
      document.head.appendChild(s);
    });
  }
  function scanStep(mode) {
    return `<div class="m-step">
      <h3 class="serif m-title"><em>Pindai</em> label QR buku</h3>
      <p class="m-body">${mode === 'desk' ? 'Arahkan kamera ke label di sampul belakang buku yang akan dipinjam atau dikembalikan.' : 'Arahkan kamera ke label di sampul belakang buku.'}</p>
      <div class="scan-box" id="scan-box"><video id="scan-video" playsinline muted></video><span class="scan-frame"></span><span class="scan-line"></span><p class="scan-msg" id="scan-msg">Menyalakan kamera…</p></div>
      <form class="scan-manual" data-scan-form data-mode="${mode}"><input id="scan-input" placeholder="atau ketik kode, mis. BK-001-01" autocomplete="off" aria-label="Kode label buku" /><button class="btn btn-black btn-sm" type="submit">Cari</button></form>
    </div>`;
  }
  function openScanner(mode) {
    openModal(scanStep(mode));
    startCamera(mode);
  }
  async function startCamera(mode) {
    const msg = $('#scan-msg'), video = $('#scan-video'), box = $('#scan-box');
    const fail = (t) => { if (!msg || !msg.isConnected) return; msg.textContent = t; msg.classList.add('is-err'); box.classList.add('no-cam'); };
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) return fail('Kamera tidak tersedia di sini. Ketik kode label di bawah.');
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
      await loadJsQR();
    } catch (err) {
      if (stream) stream.getTracks().forEach((t) => t.stop());
      return fail(err && err.name === 'NotAllowedError' ? 'Izin kamera ditolak. Ketik kode label di bawah.' : 'Kamera tidak bisa dibuka. Ketik kode label di bawah.');
    }
    // Modal sudah ditutup sebelum kamera siap
    if (!video.isConnected || !modal.classList.contains('is-open')) { stream.getTracks().forEach((t) => t.stop()); return; }
    video.srcObject = stream;
    try { await video.play(); } catch { /* autoplay diblokir */ }
    msg.textContent = '';
    box.classList.add('is-live');
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    let last = 0;
    scanner = { stream, raf: 0 };
    const tick = (now) => {
      if (!scanner) return;
      scanner.raf = requestAnimationFrame(tick);
      if (now - last < 120 || video.readyState < 2 || !video.videoWidth) return;
      last = now;
      const w = 480, h = Math.round((video.videoHeight / video.videoWidth) * w);
      canvas.width = w; canvas.height = h;
      ctx.drawImage(video, 0, 0, w, h);
      const res = jsQR(ctx.getImageData(0, 0, w, h).data, w, h, { inversionAttempts: 'dontInvert' });
      if (res && res.data) handleScan(res.data, mode);
    };
    scanner.raf = requestAnimationFrame(tick);
  }
  function stopScanner() {
    if (!scanner) return;
    cancelAnimationFrame(scanner.raf);
    scanner.stream.getTracks().forEach((t) => t.stop());
    scanner = null;
  }
  function handleScan(text, mode) {
    const hit = parseBookQR(text);
    if (!hit) {
      const msg = $('#scan-msg');
      if (msg) { msg.textContent = 'Ini bukan label buku perpustakaan.'; msg.classList.add('is-err'); }
      return;
    }
    stopScanner();
    if (navigator.vibrate) navigator.vibrate(30);
    if (mode !== 'desk') { closeModal(); location.hash = `#/buku/${hit.book.id}/${hit.copy}`; return; }
    const b = hit.book, n = hit.copy, h = holderOf(b, n);
    morph(modalBox, modalInner, () => { modalInner.innerHTML = h ? returnStep(b, n, h) : lendStep(b, n); });
    const input = $('#nisn');
    if (input) input.focus({ preventScroll: true });
  }

  const hitHead = (b, n, status) => `<div class="scan-hit">${thumb(b, 'thumb-md')}<div><small>Eksemplar ${n} dari ${b.total}</small><h4 class="serif">${esc(b.title)}</h4><p class="row-a"><b class="copy-code">${bookCode(b, n)}</b></p></div></div>${status}`;
  const personCard = (p, sub) => `<div class="person"><span class="avatar lg" style="--av:${p.av}">${initials(p.name)}</span><div class="grow"><p class="who">${esc(p.name)}<span>${esc(p.cls)}</span></p><p class="row-a">${sub}</p></div></div>`;
  const doneActions = `<div class="m-actions"><button class="btn btn-black btn-sm" data-action="scan-again" data-mode="desk">${ic('scan')}Pindai buku berikutnya</button><button class="btn btn-outline btn-sm" data-close>Selesai</button></div>`;
  const checkSVG = '<svg class="check-draw" viewBox="0 0 44 44" aria-hidden="true"><circle cx="22" cy="22" r="20"/><path d="m14 22.5 5.5 5.5L30 17"/></svg>';

  // Eksemplar di rak → petugas mengisi NISN peminjam
  function lendStep(b, n) {
    const t = today0(), paket = isPaket(b);
    const dur = paket
      ? `<p class="dur-fixed">${ic('calendar')}Buku paket · 1 semester, kembali ${fmtDay(SEM_END)}</p>`
      : `<div class="seg dur" role="group" aria-label="Lama pinjam">${[7, 14].map((d) => `<button type="button" class="seg-btn" data-action="dur" data-days="${d}" aria-pressed="${d === 14}">${d} hari · ${fmtShort(t + d * DAY)}</button>`).join('')}</div>`;
    const demo = ROSTER.filter((x) => !x.me).slice(0, 3).concat(ROSTER.filter((x) => !x.active)).concat([studentByNisn(ME.nisn)]);
    return `<div class="m-step">
      ${hitHead(b, n, `<p class="copy-status in">${ic('check')}Di rak · siap dipinjam</p>`)}
      <form class="nisn-form" data-nisn-form data-book="${b.id}" data-copy="${n}" data-days="14" novalidate>
        <label class="field-label" for="nisn">NISN peminjam</label>
        <input id="nisn" class="nisn-input" inputmode="numeric" autocomplete="off" placeholder="10 digit" aria-describedby="nisn-result" />
        <div class="nisn-result" id="nisn-result" aria-live="polite"></div>
        ${dur}
        <button class="btn btn-green nisn-submit" type="submit" disabled>Catat peminjaman</button>
      </form>
      <p class="demo-nisn">Contoh NISN untuk demo:${demo.map((x) => `<button type="button" class="demo-chip" data-action="demo-nisn" data-nisn="${x.nisn}">${esc(x.name.split(' ')[0])}</button>`).join('')}</p>
    </div>`;
  }
  // Cek NISN: terdaftar, aktif, belum melebihi batas, tidak ada yang terlambat
  function checkNisn(nisn, b) {
    if (!/^\d{10}$/.test(nisn)) return { ok: false, html: nisn ? `<p class="nisn-hint">${10 - nisn.length} digit lagi</p>` : '' };
    const p = studentByNisn(nisn);
    if (!p) return { ok: false, html: `<p class="nisn-err">${ic('info')}NISN ${nisn} tidak terdaftar di data siswa.</p>` };
    if (!p.active) return { ok: false, html: `${personCard(p, `<b class="late-txt">Tidak aktif</b> · ${esc(p.note || 'sudah tidak terdaftar')}`)}<p class="nisn-err">${ic('info')}Siswa tidak aktif tidak bisa meminjam.</p>` };
    const mine = loansOfNisn(nisn);
    const bacaan = mine.filter((l) => !isPaket(bookById(l.bookId))).length;
    const late = mine.filter((l) => l.due < today0());
    const sub = `<span class="ok-txt">Aktif</span> · ${bacaan} dari ${MAX_LOANS} buku bacaan dipinjam`;
    if (late.length) {
      const l = late[0], lb = bookById(l.bookId);
      return { ok: false, html: `${personCard(p, sub)}<p class="nisn-err">${ic('info')}Masih ada buku terlambat: ${esc(lb.title)} (${bookCode(lb, l.copy)}). Kembalikan dulu sebelum meminjam.</p>` };
    }
    if (!isPaket(b) && bacaan >= MAX_LOANS) return { ok: false, html: `${personCard(p, sub)}<p class="nisn-err">${ic('info')}Sudah meminjam ${MAX_LOANS} buku bacaan.</p>` };
    return { ok: true, html: personCard(p, sub) };
  }
  function onNisnInput(input) {
    const form = input.closest('[data-nisn-form]');
    input.value = input.value.replace(/\D/g, '').slice(0, 10);
    const res = checkNisn(input.value, bookById(form.dataset.book));
    const box = $('#nisn-result');
    const changed = box.dataset.state !== input.value.length + ':' + res.ok + ':' + (input.value.length === 10 ? input.value : '');
    box.innerHTML = res.html;
    box.dataset.state = input.value.length + ':' + res.ok + ':' + (input.value.length === 10 ? input.value : '');
    if (changed && input.value.length === 10) bump(box.firstElementChild);
    $('.nisn-submit', form).disabled = !res.ok;
    form.dataset.valid = res.ok ? '1' : '';
  }

  // Eksemplar sedang dipinjam → pengembalian
  function returnStep(b, n, h) {
    const days = lateDays(h.due);
    return `<div class="m-step">
      ${hitHead(b, n, `<p class="copy-status out">${ic('book')}Sedang dipinjam</p>`)}
      ${personCard(h, `NISN ${h.nisn}`)}
      <dl class="m-detail"><dt>Dipinjam</dt><dd>${fmtDay(h.start)}</dd><dt>Jatuh tempo</dt><dd>${fmtDay(h.due)}</dd>
        ${days ? `<dt>Terlambat</dt><dd class="late-txt">${days} hari · denda ${rupiah(days * FINE)}</dd>` : '<dt>Status</dt><dd class="ok-txt">Tepat waktu</dd>'}</dl>
      <div class="m-actions"><button class="btn btn-black btn-sm" data-action="return-go" data-id="${h.entryId}">Terima kembali</button><button class="btn btn-outline btn-sm" data-action="scan-again" data-mode="desk">Pindai lagi</button></div>
    </div>`;
  }

  /* ── Router + transisi halaman ───────────────────────────── */
  const view = $('#view');
  let current = null, navToken = 0;
  function parse() {
    const parts = (location.hash.replace(/^#\/?/, '') || '').split('/').filter(Boolean);
    if (!parts.length) return { name: 'home' };
    if (parts[0] === 'buku') return { name: 'detail', id: parts[1], copy: parts[2] };
    if (parts[0] === 'label') return { name: 'labels' };
    if (parts[0] === 'jelajah') return { name: 'explore' };
    if (parts[0] === 'pustaka') return { name: 'library', tab: parts[1] };
    if (parts[0] === 'petugas') return { name: 'desk' };
    return { name: 'home' };
  }
  const VIEWS = { home: viewHome, detail: viewDetail, explore: viewExplore, library: viewLibrary, desk: viewDesk, labels: viewLabels };

  function afterRender() {
    $$('.ring .fg', view).forEach((c) => requestAnimationFrame(() => requestAnimationFrame(() => { c.style.strokeDashoffset = c.dataset.offset; })));
    const q = $('#lib-q', view);
    if (q) q.addEventListener('input', () => { libQuery = q.value; swapLibBody($('#lib-body').dataset.tab, true); });
    const dq = $('#desk-q', view);
    if (dq) dq.addEventListener('input', () => { deskQuery = dq.value; deskAll = false; $('#desk-list').innerHTML = deskListHTML(); });
    renderHeaderPops();
    $$('.topnav a').forEach((a) => (a.dataset.nav === current.name ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')));
  }

  function swapLibBody(tab, fromSearch) {
    const body = $('#lib-body');
    body.dataset.tab = tab;
    body.innerHTML = libBody(tab);
    if (!fromSearch) enter(body);
  }

  function route() {
    const next = parse();
    closePops(); hideSearchOnNav();
    // Pindah tab di Pustakaku: hanya isi yang berganti, bukan seluruh halaman
    if (current && current.name === 'library' && next.name === 'library') {
      current = next;
      const tab = TABS.some((t) => t[0] === next.tab) ? next.tab : 'dipinjam';
      $$('.tab', view).forEach((t) => t.setAttribute('aria-selected', String(t.getAttribute('href').endsWith('/' + tab))));
      swapLibBody(tab);
      return;
    }
    const token = ++navToken;
    const first = !current;
    current = next;
    const paint = () => {
      if (token !== navToken) return;
      view.innerHTML = VIEWS[next.name](next);
      window.scrollTo(0, 0);
      afterRender();
      enter(view);
    };
    if (first || reduced()) return paint();
    // Keluar cepat (120ms), masuk dengan stagger — keluar lebih cepat dari masuk
    const out = view.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 120, easing: 'ease', fill: 'forwards' });
    out.finished.then(() => { paint(); out.cancel(); }).catch(() => {});
  }
  function hideSearchOnNav() { sPop.classList.remove('is-open'); }

  // Render ulang tanpa transisi halaman (setelah perubahan data)
  function rerenderSoft() {
    if (!current) return;
    const y = window.scrollY;
    view.innerHTML = VIEWS[current.name](current);
    afterRender();
    window.scrollTo(0, y);
  }

  /* ── Aksi ────────────────────────────────────────────────── */
  const actions = {
    howto: (el) => openHowTo(el.dataset.id),
    save(el) {
      const b = bookById(el.dataset.id);
      if (!state.saved.includes(b.id)) state.saved.unshift(b.id);
      save(); closePops();
      replaceSave(b);
      showBar(barBook(b, 'Disimpan', false));
    },
    unsave(el) {
      const b = bookById(el.dataset.id);
      state.saved = state.saved.filter((x) => x !== b.id);
      save(); closePops(); replaceSave(b);
      showBar(barMsg(`<b>${esc(b.title)}</b> dihapus dari simpanan.`));
    },
    copy(el) {
      const url = location.href.split('#')[0] + '#/buku/' + el.dataset.id;
      try { navigator.clipboard && navigator.clipboard.writeText(url); } catch { /* abaikan */ }
      const sw = $('.swap', el);
      sw.classList.add('on');
      setTimeout(() => sw.classList.remove('on'), 1600);
    },
    'copy-link'(el) {
      if (el.dataset.id) { try { navigator.clipboard && navigator.clipboard.writeText(location.href.split('#')[0] + '#/buku/' + el.dataset.id); } catch { /* abaikan */ } }
      showBar(barMsg('Tautan disalin.'), 2500);
    },
    more(el) {
      const d = $('#desc'); const body = $('.desc-body', d);
      const open = !d.classList.contains('is-open');
      if (open) { body.style.maxHeight = body.scrollHeight + 'px'; d.classList.add('is-open'); el.textContent = 'Lebih sedikit'; }
      else { body.style.maxHeight = ''; d.classList.remove('is-open'); el.textContent = 'Selengkapnya'; }
    },
    'to-loc'() { $('#loc').scrollIntoView({ behavior: reduced() ? 'auto' : 'smooth', block: 'center' }); },
    renew(el) {
      const l = state.loans.find((x) => x.id === el.dataset.id);
      if (!l || !canRenew(l)) return;
      l.due += 7 * DAY; l.renewed = true; save(); closePops();
      rerenderSoft();
      const row = $(`[data-loan="${l.id}"]`);
      bump(row && ($('.due-date', row) || $('.row-due', row)));
      showBar(barBook(bookById(l.bookId), `Kembali ${fmtShort(l.due)}`, false));
    },
    'hide-rules'() {
      const el = $('#rules');
      collapse(el).then(() => { state.hideRules = true; save(); el.remove(); });
    },
    like(el) {
      const who = el.dataset.who;
      state.liked[who] = !state.liked[who]; save();
      el.classList.toggle('is-on', state.liked[who]);
      if (state.liked[who]) { el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop'); }
    },
    filter(el) {
      if (exFilter === el.dataset.cat) return;
      exFilter = el.dataset.cat;
      $$('.filter', view).forEach((f) => f.setAttribute('aria-pressed', String(f.dataset.cat === exFilter)));
      const box = $('#shelves');
      box.innerHTML = shelvesHTML();
      enter(box);
    },
    scan(el) { openScanner(el.dataset.mode || 'student'); },
    'scan-again'(el) {
      const mode = el.dataset.mode || 'student';
      morph(modalBox, modalInner, () => { modalInner.innerHTML = scanStep(mode); });
      startCamera(mode);
    },
    dur(el) {
      const form = el.closest('[data-nisn-form]');
      form.dataset.days = el.dataset.days;
      $$('.dur .seg-btn', form).forEach((x) => x.setAttribute('aria-pressed', String(x === el)));
    },
    'demo-nisn'(el) {
      const input = $('#nisn');
      input.value = el.dataset.nisn;
      onNisnInput(input);
      input.focus({ preventScroll: true });
    },
    'return-go'(el) {
      const r = giveBack(el.dataset.id);
      morph(modalBox, modalInner, () => {
        modalInner.innerHTML = `<div class="m-step">${checkSVG}
          <h3 class="serif m-title">Kembali ke rak</h3>
          <p class="m-body"><b>${bookCode(r.b, r.n)}</b> dari ${esc(r.p.name)} sudah tercatat kembali.</p>
          ${r.fine ? `<p class="fine-note">Terlambat ${r.days} hari · denda <b>${rupiah(r.fine)}</b></p>` : ''}
          ${doneActions}</div>`;
      });
      rerenderSoft();
    },
    'desk-kind'(el) {
      deskKind = el.dataset.kind; deskAll = false;
      $$('[data-action="desk-kind"]', view).forEach((x) => x.setAttribute('aria-pressed', String(x === el)));
      const list = $('#desk-list'); list.innerHTML = deskListHTML(); enter(list);
    },
    'desk-more'() { deskAll = !deskAll; $('#desk-list').innerHTML = deskListHTML(); },
    print() { window.print(); },
    'copies-more'(el) {
      const sec = $('#copies');
      const open = sec.classList.toggle('is-all');
      el.textContent = open ? 'Tampilkan lebih sedikit' : `Lihat semua ${sec.querySelectorAll('.copy-row').length} eksemplar`;
    },
    'label-filter'(el) {
      labelCat = el.dataset.cat;
      $$('.filter', view).forEach((f) => f.setAttribute('aria-pressed', String(f.dataset.cat === labelCat)));
      const grid = $('#label-grid');
      grid.innerHTML = labelsHTML();
      $('#label-count').textContent = grid.children.length;
      enter(grid);
    },
    info(el) { closePops(); showBar(barMsg(el.dataset.msg), 4500); },
    reset() { state = fresh(); save(); closePops(); $('#bell').classList.remove('is-read'); rerenderSoft(); showBar(barMsg('Data demo dikembalikan ke awal.'), 2500); },
    'bar-close': hideBar
  };

  // Catat peminjaman eksemplar n oleh siswa ber-NISN tertentu
  function lend(b, n, nisn, days) {
    const p = studentByNisn(nisn), t = today0();
    const rec = { id: (p.me ? 'L' : 'D') + Date.now(), bookId: b.id, copy: n, start: t, due: isPaket(b) ? SEM_END : t + days * DAY, renewed: false, code: code() };
    if (p.me) {
      state.loans.push(rec);
      state.saved = state.saved.filter((x) => x !== b.id);
      copiesOf(b)[n - 1] = { t: 'me', id: rec.id };
    } else {
      rec.nisn = nisn;
      state.desk.push(rec);
      copiesOf(b)[n - 1] = { t: 'desk', id: rec.id };
    }
    state.log.unshift({ t: 'pinjam', nisn, bookId: b.id, copy: n, at: Date.now() });
    save();
    return { rec, p };
  }
  // Terima kembali pinjaman (id dari allLoans) → eksemplar kembali ke rak
  function giveBack(id) {
    let rec, nisn;
    if (id.startsWith('me-')) {
      rec = state.loans.find((x) => 'me-' + x.id === id);
      state.loans = state.loans.filter((x) => x !== rec);
      state.history.unshift({ bookId: rec.bookId, start: rec.start, returned: today0() });
      nisn = ME.nisn;
    } else {
      rec = state.desk.find((x) => x.id === id);
      state.desk = state.desk.filter((x) => x !== rec);
      nisn = rec.nisn;
    }
    const b = bookById(rec.bookId), n = rec.copy, days = lateDays(rec.due), fine = days * FINE;
    copiesOf(b)[n - 1] = null;
    state.log.unshift({ t: 'kembali', nisn, bookId: b.id, copy: n, at: Date.now(), fine });
    save();
    return { b, n, days, fine, p: studentByNisn(nisn) };
  }
  // Tombol "Terima" (tahan) di daftar meja sirkulasi
  async function doReturn(id) {
    const row = $(`[data-entry="${id}"]`);
    if (row) await collapse(row);
    const r = giveBack(id);
    rerenderSoft();
    showBar(barMsg(`<b>${bookCode(r.b, r.n)}</b> kembali ke rak${r.fine ? ` · denda ${rupiah(r.fine)}` : ''}.`));
  }

  function replacePrimary(b) {
    const slot = $('#primary');
    if (slot) { slot.innerHTML = primaryAction(b); bump(slot.firstElementChild); }
    else rerenderSoft();
  }
  function replaceSave(b) {
    const slot = $('#save-ctl');
    if (slot) { slot.innerHTML = saveControl(b); bump(slot.firstElementChild); }
    else rerenderSoft();
  }

  /* Hold-to-confirm: tekan lama → selesai; lepas cepat → batal */
  let holdTimer = null;
  function startHold(btn) {
    btn.classList.add('is-holding');
    btn.addEventListener('pointerleave', () => endHold(btn), { once: true });
    holdTimer = setTimeout(() => {
      btn.classList.remove('is-holding');
      doReturn(btn.dataset.id);
    }, 1100);
  }
  function endHold(btn) { clearTimeout(holdTimer); btn && btn.classList.remove('is-holding'); }
  document.addEventListener('pointerdown', (e) => {
    const h = e.target.closest('[data-action="hold-return"]');
    if (h) { e.preventDefault(); startHold(h); }
  });
  ['pointerup', 'pointercancel'].forEach((t) => document.addEventListener(t, () => {
    const h = $('.hold.is-holding'); if (h) endHold(h);
  }));
  document.addEventListener('keydown', (e) => {
    const h = document.activeElement && document.activeElement.closest && document.activeElement.closest('[data-action="hold-return"]');
    if (h && (e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); startHold(h); }
  });
  document.addEventListener('keyup', (e) => { if (e.key === ' ' || e.key === 'Enter') { const h = $('.hold.is-holding'); if (h) endHold(h); } });

  /* ── Delegasi klik global ────────────────────────────────── */
  document.addEventListener('click', (e) => {
    const closer = e.target.closest('[data-close]');
    if (closer) { closeModal(); if (closer.tagName !== 'A') return; }
    const pt = e.target.closest('[data-pop]');
    if (pt) { e.preventDefault(); togglePop(pt); return; }
    const a = e.target.closest('[data-action]');
    if (a && actions[a.dataset.action] && a.dataset.action !== 'hold-return') {
      if (a.tagName === 'A') e.preventDefault();
      actions[a.dataset.action](a, e);
      return;
    }
    if (!e.target.closest('.pop')) closePops();
    if (!e.target.closest('#search')) sPop.classList.remove('is-open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { if (modal.classList.contains('is-open')) closeModal(); else closePops(); }
    // "/" untuk fokus ke pencarian — tanpa animasi
    if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); sInput.focus(); }
    // Jaga fokus tetap di dalam modal
    if (e.key === 'Tab' && modal.classList.contains('is-open')) {
      const f = $$('button:not([aria-disabled="true"]):not([disabled]), a[href], input', modal);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  document.addEventListener('submit', (e) => {
    const nf = e.target.closest('[data-nisn-form]');
    if (nf) {
      e.preventDefault();
      if (!nf.dataset.valid) return;
      const b = bookById(nf.dataset.book), n = +nf.dataset.copy;
      const { rec, p } = lend(b, n, $('#nisn', nf).value, +nf.dataset.days);
      morph(modalBox, modalInner, () => {
        modalInner.innerHTML = `<div class="m-step">${checkSVG}
          <h3 class="serif m-title">Peminjaman tercatat</h3>
          <p class="m-body"><b>${bookCode(b, n)}</b> · ${esc(b.title)}<br>dipinjam ${esc(p.name)} (${esc(p.cls)})</p>
          <dl class="m-detail"><dt>NISN</dt><dd>${p.nisn}</dd><dt>Kembali paling lambat</dt><dd>${fmtDay(rec.due)}</dd></dl>
          ${doneActions}</div>`;
      });
      rerenderSoft();
      return;
    }
    const f = e.target.closest('[data-scan-form]');
    if (!f) return;
    e.preventDefault();
    const input = $('input', f);
    // Form di halaman meja (di luar modal) punya tempat pesan sendiri
    const msg = f.hasAttribute('data-outside') ? $('#desk-code-msg') : $('#scan-msg');
    if (!parseBookQR(input.value)) {
      msg.textContent = `Kode “${input.value.trim()}” tidak ditemukan.`;
      msg.classList.add('is-err');
      input.select();
      return;
    }
    if (f.hasAttribute('data-outside')) {
      msg.textContent = '';
      openModal('<div class="m-step"></div>');
      const v = input.value; input.value = '';
      handleScan(v, 'desk');
      return;
    }
    handleScan(input.value, f.dataset.mode);
  });
  document.addEventListener('input', (e) => { if (e.target.id === 'nisn') onNisnInput(e.target); });

  $('#scan-btn').innerHTML = ic('scan');
  $('.modal-x').innerHTML = ic('x');
  window.addEventListener('hashchange', route);
  route();
})();
