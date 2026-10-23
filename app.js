/* โค้ดหน้าเว็บที่ทุกหน้าใช้ร่วมกัน (โหลดก่อนไฟล์หน้าใน button_X/) */

const STATUS = { PENDING: 'รออนุมัติ', APPROVED: 'อนุมัติ', REJECTED: 'ไม่อนุมัติ' };
const TH_MONTHS = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
const TH_MONTHS_SHORT = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
const TH_DAYS = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];

const ICONS = {
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
  checkin: '<rect x="8" y="2" width="8" height="4" rx="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
  receipt: '<path d="M5 2v20l2.3-1.5L9.7 22l2.3-1.5 2.3 1.5 2.4-1.5L19 22V2l-2.3 1.5L14.3 2 12 3.5 9.7 2 7.3 3.5Z"/><path d="M8.5 8h7M8.5 12h7M8.5 16h4"/>',
  back: '<path d="m15 18-6-6 6-6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z"/>',
  speaker: '<path d="M11 5 6 9H2v6h4l5 4V5Z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14"/>',
  light: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2Z"/>',
  camera: '<path d="M3 7h12l4-2v10l-4-2H3Z"/><path d="M7 13v6M4 19h6"/>',
};

const $ = (id) => document.getElementById(id);

/** สร้าง element แบบปลอดภัย (ข้อความใส่ผ่าน textContent เสมอ) */
function h(tag, attrs, ...children) {
  const el = document.createElement(tag);
  Object.entries(attrs || {}).forEach(([k, v]) => {
    if (v == null || v === false) return;
    if (k === 'class') el.className = v;
    else if (k === 'text') el.textContent = v;
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  });
  children.flat().forEach((c) => {
    if (c == null || c === false) return;
    el.append(c.nodeType ? c : document.createTextNode(String(c)));
  });
  return el;
}

/** แทนที่เนื้อหาใน el (รองรับ array และข้าม null) */
function fill(el, ...kids) {
  el.replaceChildren(...kids.flat(Infinity).filter((k) => k != null && k !== false));
}

function fillIcons(root) {
  (root || document).querySelectorAll('svg[data-icon]').forEach((svg) => {
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.8');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = ICONS[svg.dataset.icon] || '';
  });
}

/** ไอคอนสำหรับ element ที่สร้างด้วย h() (สร้างผ่าน parser เพื่อให้เป็น SVG จริง) */
function icon(name) {
  const t = document.createElement('template');
  t.innerHTML = `<svg data-icon="${name}"></svg>`;
  fillIcons(t.content);
  return t.content.firstChild;
}

function parseIso(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3])) : null;
}

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/** "วันเสาร์ที่ 7 พฤศจิกายน 2569" */
function fmtDateLong(iso) {
  const d = parseIso(iso);
  if (!d) return iso || '';
  return `วัน${TH_DAYS[d.getDay()]}ที่ ${d.getDate()} ${TH_MONTHS[d.getMonth()]} ${d.getFullYear() + 543}`;
}

function money(n) {
  return Number(n || 0).toLocaleString('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function formatPhone(p) {
  const d = String(p || '').replace(/\D/g, '');
  return d.length === 10 ? `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}` : d;
}

function setPlate(el, houseNo) {
  el.textContent = houseNo || '–';
  el.classList.toggle('empty', !houseNo);
}

function loadingBox(text) {
  return h('div', { class: 'loading', text: text || 'กำลังโหลด…' });
}

function errorBox(message) {
  return h('div', { class: 'status bad' }, h('p', { text: message }));
}

/** การ์ดการประชุม ใช้ร่วมกันในหน้าปฏิทินและหน้าลงชื่อ */
function meetingCard(m, opts) {
  const o = opts || {};
  const d = parseIso(m.date);
  const card = h('div', { class: 'card' + (o.past ? ' past' : '') },
    h('div', { class: 'meeting' },
      h('div', { class: 'date-block' },
        h('b', { text: d ? d.getDate() : '–' }),
        h('span', { text: d ? `${TH_MONTHS_SHORT[d.getMonth()]} ${String(d.getFullYear() + 543).slice(-2)}` : '' })),
      h('div', { style: 'flex:1;min-width:0' },
        h('h3', { text: m.title }),
        h('p', { text: fmtDateLong(m.date) }),
        m.time ? h('p', { text: `เวลา ${m.time} น.` }) : null,
        m.place ? h('p', { text: `สถานที่ ${m.place}` }) : null,
        m.attended
          ? h('span', { class: 'badge ok', text: 'บ้านคุณลงชื่อแล้ว' })
          : (m.open ? h('span', { class: 'badge open', text: 'เปิดลงชื่ออยู่' }) : null),
        m.detail && !o.hideDetail
          ? h('details', {}, h('summary', { text: 'วาระและรายละเอียด' }), h('div', { class: 'detail', text: m.detail }))
          : null)));
  if (o.action) card.append(o.action);
  return card;
}

/** รายการเบอร์โทร กดทั้งแถวเพื่อโทรออก ใช้ในหน้าแรกและหน้าแจ้งเหตุฉุกเฉิน
 *  hideNumber: ไม่แสดงเบอร์บนจอ (เบอร์ส่วนตัว) ยังโทรออกได้ตามปกติ */
function callList(contacts, hideNumber) {
  return h('ul', { class: 'calls' }, contacts.map((c) => h('li', {},
    h('a', { href: 'tel:' + c.phone },
      icon('phone'),
      h('span', {}, h('strong', { text: c.name }), c.detail ? h('small', { text: c.detail }) : null),
      h('b', { text: hideNumber ? 'โทร' : formatPhone(c.phone) })))));
}

/** ค่าที่ได้ตอนเปิดเว็บ: session หลังเข้าสู่ระบบ, sos = เบอร์ฉุกเฉินภายนอก (ปุ่ม C) */
const BOOT = { session: '', sos: [] };

/** ส่งคำสั่งไป Apps Script (doPost) — ใช้ text/plain เพื่อไม่ให้เบราว์เซอร์ต้องถาม CORS ก่อน */
async function callApi(body) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 30000);
  let res;
  try {
    const r = await fetch(CONFIG.API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
    res = await r.json();
  } catch (e) {
    throw new Error(e.name === 'AbortError'
      ? 'ระบบไม่ตอบสนอง กรุณาลองใหม่อีกครั้ง'
      : 'เชื่อมต่อระบบไม่สำเร็จ กรุณาลองใหม่อีกครั้ง');
  } finally {
    clearTimeout(timer);
  }
  if (!res || !res.ok) throw new Error((res && res.message) || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
  return res;
}

const App = {
  pages: {},
  me: null,
  fields: [],

  register(name, page) { this.pages[name] = page; },

  isMember() { return !!this.me && this.me.status === STATUS.APPROVED; },

  show(id) {
    document.querySelectorAll('main > section').forEach((s) => { s.hidden = s.id !== id; });
    window.scrollTo(0, 0);
  },

  go(name, params) {
    let page = this.pages[name];
    if (!page) return;
    if (page.memberOnly && !this.isMember()) { name = 'menu'; page = this.pages.menu; params = {}; }
    this.show('page-' + name);
    if (page.enter) page.enter(params || {});
  },

  fatal(message) {
    $('error-text').textContent = message || 'กรุณาลองใหม่อีกครั้ง';
    this.show('view-error');
  },

  api(action, payload) {
    return callApi({ action, session: BOOT.session, payload: payload || null });
  },
};

// ปุ่ม/ลิงก์ที่มี data-go="ชื่อหน้า" ใช้เปลี่ยนหน้า
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-go]');
  if (!t) return;
  e.preventDefault();
  App.go(t.dataset.go);
});
