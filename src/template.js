export const SERVICE_OPTIONS = [
  'Vocal Performance',
  'Lead Vocalist',
  'Background Vocals',
  'Choir / Ensemble',
  'Rehearsal',
  'Soundcheck'
];

export const SAMPLE_TERMS = `The Artist agrees to provide the services described in this agreement in a professional manner and to arrive prepared and on time. The parties agree that the compensation and schedule shown in this agreement represent the complete commercial terms for the engagement, subject to any additional written terms entered below.`;

const money = value => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(Number(value || 0));
const date = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString('en-CA', { year:'numeric', month:'long', day:'numeric' }) : '________________';

export function calculate(contract) {
  const rehearsalHours = (contract.rehearsals || []).reduce((sum, r) => sum + Number(r.hours || 0), 0);
  const rehearsalTotal = rehearsalHours * Number(contract.rehearsalRate || 0);
  const performance = Number(contract.performanceFee || 0);
  const travel = Number(contract.travelAmount || 0);
  const accommodation = Number(contract.accommodationAmount || 0);
  return { rehearsalHours, rehearsalTotal, total: performance + rehearsalTotal + travel + accommodation };
}

export function renderContract(contract) {
  const totals = calculate(contract);
  const services = contract.services?.length ? contract.services.map(s => `<li>${escapeHtml(s)}</li>`).join('') : '<li>Vocal performance services</li>';
  const rehearsals = contract.rehearsals?.length ? contract.rehearsals.map(r => `<tr><td>${date(r.date)}</td><td>${r.start || '—'}</td><td>${r.end || '—'}</td><td>${Number(r.hours || 0).toFixed(1)}</td></tr>`).join('') : '<tr><td colspan="4">No rehearsals specified.</td></tr>';
  const terms = contract.additionalTerms?.trim() || SAMPLE_TERMS;

  return `<article class="contract-paper">
    <header class="contract-header">
      <div><div class="eyebrow">VOCAL ARTIST AGREEMENT</div><h1>Performance Agreement</h1></div>
      <div class="contract-number">${escapeHtml(contract.number || 'DRAFT')}</div>
    </header>
    <p>This Vocal Artist Agreement (the “Agreement”) is entered into between <strong>${escapeHtml(contract.clientName || 'Client')}</strong> (the “Client”) and <strong>${escapeHtml(contract.artistName || 'Artist')}</strong> (the “Artist”).</p>
    <section><h2>1. Engagement</h2><p>The Artist will provide services for <strong>${escapeHtml(contract.eventName || 'the Event')}</strong> on <strong>${date(contract.eventDate)}</strong> at <strong>${escapeHtml(contract.venue || 'the venue')}</strong>${contract.location ? ` in ${escapeHtml(contract.location)}` : ''}.</p><p><strong>Performance time:</strong> ${escapeHtml(contract.performanceTime || 'To be confirmed')} &nbsp; <strong>Duration:</strong> ${escapeHtml(contract.duration || 'To be confirmed')}</p></section>
    <section><h2>2. Services</h2><ul>${services}</ul></section>
    <section><h2>3. Rehearsals</h2><table><thead><tr><th>Date</th><th>Start</th><th>End</th><th>Hours</th></tr></thead><tbody>${rehearsals}</tbody></table><p>Additional rehearsal hours beyond the scheduled hours are billed at <strong>${money(contract.rehearsalRate)}</strong> per hour.</p></section>
    <section><h2>4. Compensation</h2><table class="money-table"><tbody><tr><td>Performance fee</td><td>${money(contract.performanceFee)}</td></tr><tr><td>Rehearsals (${totals.rehearsalHours.toFixed(1)} hrs)</td><td>${money(totals.rehearsalTotal)}</td></tr><tr><td>Travel / expenses</td><td>${money(contract.travelAmount)}</td></tr><tr><td>Accommodation</td><td>${money(contract.accommodationAmount)}</td></tr><tr class="total"><td>Total compensation</td><td>${money(totals.total)}</td></tr></tbody></table></section>
    <section><h2>5. Additional Terms</h2><p>${escapeHtml(terms).replace(/\n/g, '<br>')}</p></section>
    <section><h2>6. Signatures</h2><div class="signature-grid"><div><div class="line"></div><strong>Client</strong><br>${escapeHtml(contract.clientName || '')}<br>Date: __________________</div><div><div class="line"></div><strong>Artist</strong><br>${escapeHtml(contract.artistName || '')}<br>Date: __________________</div></div></section>
  </article>`;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
