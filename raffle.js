/* ============================================================
   BINGE XPERIENCE — raffle.js
   ============================================================ */

// ── PASSWORD GATE ──
const PASSWORD = 'bingeX@2026';

const overlay = document.createElement('div');
overlay.innerHTML = `
<div id="gate-overlay" style="position:fixed;inset:0;z-index:9999;background:#120826;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center;">
<div style="font-size:3rem;margin-bottom:1rem;">🔐</div>
<div style="font-family:'Lilita One',cursive;font-size:2rem;color:#ffd000;margin-bottom:0.5rem;">ME Only</div>
<div style="color:rgba(255,255,255,0.5);font-size:0.9rem;margin-bottom:2rem;">Enter password to access Raffle Draw</div>
<div style="position:relative;width:100%;max-width:320px;margin-bottom:1rem;">
<input id="gate-input" type="password" placeholder="Enter password" style="width:100%;padding:0.85rem 3rem 0.85rem 1.2rem;border-radius:10px;border:1.5px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.05);color:#fff;font-size:1rem;font-family:'Nunito',sans-serif;outline:none;" />
<span id="toggle-pw" style="position:absolute;right:1rem;top:50%;transform:translateY(-50%);cursor:pointer;font-size:1.1rem;user-select:none;">👁️</span>
</div>
<div id="gate-error" style="color:#ff2d78;font-size:0.85rem;margin-bottom:1rem;opacity:0;">Wrong password. Try again.</div>
<button id="gate-btn" style="background:#ffd000;color:#120826;font-family:'Lilita One',cursive;font-size:1.1rem;border:none;border-radius:50px;padding:0.85rem 2.5rem;cursor:pointer;box-shadow:0 4px 0 #ff7a00;">Enter</button>
<a href="index.html" style="margin-top:1.5rem;color:rgba(255,255,255,0.3);font-size:0.8rem;text-decoration:none;">← Back to Site</a>
</div>
`;
document.body.appendChild(overlay);

document.getElementById('gate-btn').addEventListener('click', checkPassword);
document.getElementById('gate-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') checkPassword();
});
document.getElementById('toggle-pw').addEventListener('click', () => {
  const input = document.getElementById('gate-input');
  const toggle = document.getElementById('toggle-pw');
  if (input.type === 'password') {
    input.type = 'text';
    toggle.textContent = '🙈';
  } else {
    input.type = 'password';
    toggle.textContent = '👁️';
  }
});

function checkPassword() {
  const val = document.getElementById('gate-input').value;
  const error = document.getElementById('gate-error');
  if (val === PASSWORD) {
    document.getElementById('gate-overlay').remove();
  } else {
    error.style.opacity = '1';
    document.getElementById('gate-input').value = '';
    document.getElementById('gate-input').focus();
  }
}

// ── TICKET IDs ──
// Replace these with real Spotix ticket IDs before the event
const allTickets = [
  'BX-2026-001', 'BX-2026-002', 'BX-2026-003', 'BX-2026-004', 'BX-2026-005',
  'BX-2026-006', 'BX-2026-007', 'BX-2026-008', 'BX-2026-009', 'BX-2026-010',
  'BX-2026-011', 'BX-2026-012', 'BX-2026-013', 'BX-2026-014', 'BX-2026-015',
  'BX-2026-016', 'BX-2026-017', 'BX-2026-018', 'BX-2026-019', 'BX-2026-020',
  'BX-2026-021', 'BX-2026-022', 'BX-2026-023', 'BX-2026-024', 'BX-2026-025',
  'BX-2026-026', 'BX-2026-027', 'BX-2026-028', 'BX-2026-029', 'BX-2026-030',
  'BX-2026-031', 'BX-2026-032', 'BX-2026-033', 'BX-2026-034', 'BX-2026-035',
  'BX-2026-036', 'BX-2026-037', 'BX-2026-038', 'BX-2026-039', 'BX-2026-040',
  'BX-2026-041', 'BX-2026-042', 'BX-2026-043', 'BX-2026-044', 'BX-2026-045',
  'BX-2026-046', 'BX-2026-047', 'BX-2026-048', 'BX-2026-049', 'BX-2026-050',
];

const COLORS = [
  '#6a0fd4', '#ff7a00', '#ffd000', '#4dc8ff', '#3ddc5b',
  '#9b4dff', '#ff2d78', '#ffd000', '#6a0fd4', '#ff7a00',
  '#3ddc5b', '#4dc8ff', '#ff2d78', '#9b4dff', '#ffd000',
  '#ff7a00', '#6a0fd4', '#3ddc5b', '#4dc8ff', '#ff2d78',
];

const MAX_WINNERS = 5;
let tickets = [...allTickets];
let winners = [];
let spinning = false;
let currentAngle = 0;

const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const SIZE = 420;
canvas.width = SIZE;
canvas.height = SIZE;

// ── DRAW WHEEL ──
function drawWheel() {
  ctx.clearRect(0, 0, SIZE, SIZE);
  const cx = SIZE / 2, cy = SIZE / 2, r = SIZE / 2 - 4;
  const total = tickets.length;

  if (total === 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,0.05)';
    ctx.fill();
    return;
  }

  const arc = (Math.PI * 2) / total;

  tickets.forEach((ticket, i) => {
    const start = currentAngle + i * arc;
    const end = start + arc;

    // Slice
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, r, start, end);
    ctx.closePath();
    ctx.fillStyle = COLORS[i % COLORS.length];
    ctx.fill();
    ctx.strokeStyle = 'rgba(18,8,38,0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Text
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(start + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#fff';
    ctx.font = `bold ${total > 12 ? 11 : 13}px Nunito, sans-serif`;
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 4;
    ctx.fillText(ticket, r - 10, 5);
    ctx.restore();
  });

  // Center circle
  ctx.beginPath();
  ctx.arc(cx, cy, 36, 0, Math.PI * 2);
  ctx.fillStyle = '#120826';
  ctx.fill();
  ctx.strokeStyle = 'rgba(255,208,0,0.6)';
  ctx.lineWidth = 3;
  ctx.stroke();

  // Center text
  ctx.fillStyle = '#ffd000';
  ctx.font = `bold 11px Nunito, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('BINGE', cx, cy - 6);
  ctx.fillText('XPERIENCE', cx, cy + 8);
}

// ── SPIN ──
function spinWheel() {
  if (spinning || tickets.length === 0 || winners.length >= MAX_WINNERS) return;
  spinning = true;
  document.getElementById('spinBtn').disabled = true;

  const extraSpins = (Math.floor(Math.random() * 10) + 10) * Math.PI * 2;
  const randomStop = Math.random() * Math.PI * 2;
  const totalRotation = extraSpins + randomStop;
  const duration = 3000 + Math.random() * 3000;
  const start = performance.now();
  const startAngle = currentAngle;

  function easeOut(t) {
    return 1 - Math.pow(1 - t, 4);
  }

  function animate(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    currentAngle = startAngle + totalRotation * easeOut(progress);
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      spinning = false;
      determineWinner();
    }
  }

  requestAnimationFrame(animate);
}

// ── DETERMINE WINNER ──
function determineWinner() {
  const arc = (Math.PI * 2) / tickets.length;
  const normalized = ((Math.PI * 1.5) - (currentAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const index = Math.floor(normalized / arc) % tickets.length;
  const winner = tickets[index];

  tickets.splice(index, 1);
  winners.push(winner);

  drawWheel();
  showResult(winner);
  updateWinnersBoard();
}

// ── SHOW RESULT ──
function showResult(id) {
  document.getElementById('resultId').textContent = id;
  document.getElementById('resultIdSmall').textContent = id;
  document.getElementById('resultOverlay').classList.add('show');
  launchConfetti();
}

// ── CLOSE RESULT ──
function closeResult() {
  document.getElementById('resultOverlay').classList.remove('show');

  if (winners.length >= MAX_WINNERS || tickets.length === 0) {
    document.getElementById('spinBtn').disabled = true;
    document.getElementById('allDone').classList.add('show');
  } else {
    document.getElementById('spinBtn').disabled = false;
  }
}

// ── UPDATE WINNERS BOARD ──
function updateWinnersBoard() {
  const list = document.getElementById('winnersList');
  const count = document.getElementById('winnerCount');
  count.textContent = `${winners.length} / ${MAX_WINNERS}`;

  if (winners.length === 0) {
    list.innerHTML = '<span class="no-winners">No winners yet — spin to start!</span>';
    return;
  }

  list.innerHTML = winners.map((w, i) =>
    `<div class="winner-chip">🏆 #${i + 1} &nbsp; ${w}</div>`
  ).join('');
}

// ── CONFETTI ──
function launchConfetti() {
  const colors = ['#ffd000', '#ff7a00', '#6a0fd4', '#4dc8ff', '#3ddc5b', '#ff2d78'];
  for (let i = 0; i < 80; i++) {
    const el = document.createElement('div');
    el.className = 'confetti';
    el.style.left = Math.random() * 100 + 'vw';
    el.style.top = '-20px';
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.width = (Math.random() * 8 + 6) + 'px';
    el.style.height = (Math.random() * 8 + 6) + 'px';
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.animationDuration = (Math.random() * 2 + 2) + 's';
    el.style.animationDelay = Math.random() * 0.5 + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 4000);
  }
}

// ── RESET ──
function resetDraw() {
  if (spinning) return;
  tickets = [...allTickets];
  winners = [];
  currentAngle = 0;
  document.getElementById('spinBtn').disabled = false;
  document.getElementById('allDone').classList.remove('show');
  document.getElementById('resultOverlay').classList.remove('show');
  updateWinnersBoard();
  drawWheel();
}

// ── INIT ──
drawWheel();
