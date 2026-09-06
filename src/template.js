export const SERVICE_OPTIONS = [
  'Vocal Performance',
  'Lead Vocalist',
  'Background Vocals',
  'Choir / Ensemble',
  'Rehearsal',
  'Soundcheck'
];

// GENERAL CANADIAN STARTING TEMPLATE — not legal advice. Have counsel review
// the final version before commercial reliance, especially for unusual or high-value engagements.
const money = value => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(Number(value || 0));
const date = value => value ? new Date(`${value}T12:00:00`).toLocaleDateString('en-CA', { year:'numeric', month:'long', day:'numeric' }) : '________________';
const yesNo = value => value ? 'Yes' : 'No';

export function calculate(contract) {
  const rehearsalHours = (contract.rehearsals || []).reduce((sum, r) => sum + Number(r.hours || 0), 0);
  const rehearsalTotal = rehearsalHours * Number(contract.rehearsalRate || 0);
  const performance = Number(contract.performanceFee || 0);
  const travel = Number(contract.travelAmount || 0);
  const accommodation = Number(contract.accommodationAmount || 0);
  const perDiem = Number(contract.perDiem || 0);
  const parking = Number(contract.parkingAmount || 0);
  const media = Number(contract.mediaCompensation || 0);
  return { rehearsalHours, rehearsalTotal, total: performance + rehearsalTotal + travel + accommodation + perDiem + parking + media };
}

export function validateContract(contract) {
  const required = [];
  if (!contract.clientName?.trim()) required.push('Client / organization');
  if (!contract.clientEmail?.trim()) required.push('Client email');
  if (!contract.artistName?.trim()) required.push('Artist name');
  if (!contract.eventName?.trim()) required.push('Event name');
  if (!contract.eventDate) required.push('Event date');
  if (!contract.performanceTime) required.push('Performance time');
  if (!contract.venue?.trim()) required.push('Venue');
  if (!contract.location?.trim()) required.push('City / location');
  if (Number(contract.performanceFee || 0) <= 0) required.push('Performance fee');
  if (Number(contract.rehearsalRate || 0) < 0) required.push('Rehearsal rate');
  if (Number(contract.overtimeRate || 0) <= 0) required.push('Overtime / additional time rate');
  if (!contract.governingJurisdiction?.trim()) required.push('Governing jurisdiction');
  if (contract.cancellationSchedule === 'custom' && !contract.cancellationCustom?.trim()) required.push('Custom cancellation terms');
  if (contract.depositAmount && Number(contract.depositAmount) > Number(contract.performanceFee || 0)) required.push('Deposit cannot exceed performance fee');
  if (contract.depositAmount && !contract.depositDue) required.push('Deposit due date');
  if (contract.allowCommercialUse && !contract.mediaCompensation) required.push('Media compensation when commercial use is enabled');
  if (contract.allowAI || contract.allowVoiceCloning) required.push('AI / voice-cloning permission requires a lawyer-reviewed, project-specific rider');
  return required;
}

function cancellationTerms(contract) {
  if (contract.cancellationSchedule === 'custom' && contract.cancellationCustom?.trim()) return contract.cancellationCustom.trim();
  return `Unless the parties agree to a different written schedule, if the Client cancels: (a) more than 30 days before the event, any agreed non-refundable deposit and approved non-refundable expenses remain payable; (b) 30 days or fewer but more than 14 days before the event, 50% of the performance fee is payable; (c) 14 days or fewer but more than 72 hours before the event, 75% is payable; and (d) within 72 hours, on the event date, or by no-show, 100% is payable, plus approved non-refundable expenses already incurred. A postponement is not an automatic transfer of the booking: the Artist must agree in writing to the new date and confirm availability. The parties may agree in writing to apply an amount already paid toward a mutually accepted replacement date.`;
}

function mediaTerms(contract) {
  const permissions = [];
  if (contract.allowPhotography) permissions.push('ordinary event photography');
  if (contract.allowVideo) permissions.push('video recording');
  if (contract.allowLivestream) permissions.push('livestreaming');
  if (contract.allowBroadcast) permissions.push('broadcast/retransmission');
  if (contract.allowPromoClips) permissions.push('short promotional clips');
  if (contract.allowCommercialUse) permissions.push('commercial advertising use');
  const scope = permissions.length ? permissions.join(', ') : 'none';
  const prohibited = [];
  if (!contract.allowAI) prohibited.push('AI training or generative-AI use');
  if (!contract.allowVoiceCloning) prohibited.push('voice cloning or digital replicas');
  if (!contract.allowCommercialUse) prohibited.push('commercial advertising or endorsement use');
  return `Authorized media: ${scope}. ${prohibited.length ? `Unless separately authorized in a written rider signed by the Artist, the following are prohibited: ${prohibited.join(', ')}.` : 'Commercial use is permitted only within the specific written scope of this Agreement and does not transfer ownership of the Artist’s performance, voice, name, image, likeness, or underlying rights.'} ${contract.mediaCompensation ? `Additional media compensation stated in this Agreement: ${money(contract.mediaCompensation)}.` : ''}`;
}

export function renderContract(contract) {
  const totals = calculate(contract);
  const services = contract.services?.length ? contract.services.map(s => `<li>${escapeHtml(s)}</li>`).join('') : '<li>Vocal performance services</li>';
  const rehearsals = contract.rehearsals?.length ? contract.rehearsals.map(r => `<tr><td>${date(r.date)}</td><td>${r.start || '—'}</td><td>${r.end || '—'}</td><td>${Number(r.hours || 0).toFixed(1)}</td></tr>`).join('') : '<tr><td colspan="4">No rehearsals specified.</td></tr>';
  const travelItems = [
    contract.travelProvided ? 'Client-provided transportation' : '',
    contract.accommodationProvided ? `${contract.singleOccupancy ? 'Single-occupancy' : 'Agreed'} accommodation provided by Client` : '',
    contract.perDiem ? `Per diem / meals: ${money(contract.perDiem)}` : '',
    contract.mileageRate ? `Mileage: ${money(contract.mileageRate)} per km` : '',
    contract.parkingAmount ? `Parking / approved travel: ${money(contract.parkingAmount)}` : ''
  ].filter(Boolean);
  const additionalTerms = contract.additionalTerms?.trim() ? `<h3>Additional negotiated terms</h3><p>${escapeHtml(contract.additionalTerms.trim()).replace(/\n/g, '<br>')}</p>` : '';
  const safety = contract.safetyRequirements?.trim() ? `<p><strong>Production / safety requirements:</strong> ${escapeHtml(contract.safetyRequirements)}</p>` : '';
  const media = mediaTerms(contract);

  return `<article class="contract-paper">
    <header class="contract-header">
      <div><div class="eyebrow">VOCAL ARTIST AGREEMENT</div><h1>Performance Agreement</h1><p class="document-subtitle">Professional engagement terms</p></div>
      <div class="contract-number">${escapeHtml(contract.number || 'DRAFT')}<br><span>${contract.status === 'finalized' ? 'FINALIZED' : 'DRAFT'}</span></div>
    </header>
    <div class="contract-notice"><strong>Important:</strong> This Agreement records the parties’ specific booking terms. It does not waive rights that cannot lawfully be waived.</div>

    <section><h2>1. Parties & engagement</h2><p>This Vocal Artist Agreement (the “Agreement”) is entered into between <strong>${escapeHtml(contract.clientName || 'Client')}</strong> (the “Client”) and <strong>${escapeHtml(contract.artistName || 'Artist')}</strong> (the “Artist”).</p><p>The Artist will provide only the services expressly listed in this Agreement for <strong>${escapeHtml(contract.eventName || 'the Event')}</strong> on <strong>${date(contract.eventDate)}</strong> at <strong>${escapeHtml(contract.venue || 'the venue')}</strong>${contract.location ? ` in ${escapeHtml(contract.location)}` : ''}.</p><p><strong>Performance:</strong> ${escapeHtml(contract.performanceTime || 'To be confirmed')} &nbsp; <strong>Call time:</strong> ${escapeHtml(contract.callTime || 'To be confirmed')} &nbsp; <strong>Duration:</strong> ${escapeHtml(contract.duration || 'To be confirmed')} &nbsp; <strong>Sets:</strong> ${escapeHtml(contract.sets || '1')}</p>${contract.breakMinutes ? `<p><strong>Breaks:</strong> ${escapeHtml(contract.breakMinutes)} minutes between sets.</p>` : ''}</section>

    <section><h2>2. Services & scope</h2><ul>${services}</ul><p>No additional performance, rehearsal, recording, media interview, promotional appearance, administrative work, travel duty, or other service is included unless agreed in writing. Material changes to scope, schedule, venue, repertoire, production requirements, or number of performances require written agreement and may result in additional compensation.</p></section>

    <section><h2>3. Rehearsals & soundcheck</h2><table><thead><tr><th>Date</th><th>Start</th><th>End</th><th>Hours</th></tr></thead><tbody>${rehearsals}</tbody></table><p>Scheduled rehearsal hours are included only as shown. Additional rehearsal time is billed at <strong>${money(contract.rehearsalRate)}</strong> per hour. ${contract.soundcheckIncluded ? `Soundcheck of up to ${escapeHtml(contract.soundcheckMinutes || '30')} minutes is included.` : 'Soundcheck is not included unless separately agreed in writing.'} Any additional soundcheck or production call time is additional work.</p></section>

    <section><h2>4. Compensation & payment</h2><table class="money-table"><tbody><tr><td>Performance fee</td><td>${money(contract.performanceFee)}</td></tr><tr><td>Rehearsals (${totals.rehearsalHours.toFixed(1)} hrs)</td><td>${money(totals.rehearsalTotal)}</td></tr><tr><td>Travel / expenses</td><td>${money(contract.travelAmount)}</td></tr><tr><td>Accommodation</td><td>${money(contract.accommodationAmount)}</td></tr>${contract.perDiem ? `<tr><td>Per diem / meals</td><td>${money(contract.perDiem)}</td></tr>`:''}${contract.parkingAmount ? `<tr><td>Parking / approved travel</td><td>${money(contract.parkingAmount)}</td></tr>`:''}${contract.mediaCompensation ? `<tr><td>Media compensation</td><td>${money(contract.mediaCompensation)}</td></tr>`:''}<tr class="total"><td>Total stated compensation</td><td>${money(totals.total)}</td></tr></tbody></table><p><strong>Deposit:</strong> ${contract.depositAmount ? `${money(contract.depositAmount)} due ${date(contract.depositDue)}` : 'No deposit specified.'}</p><p><strong>Balance:</strong> ${escapeHtml(contract.balanceDue || 'Event date')}. Undisputed amounts are not subject to unilateral deductions, offsets, or chargebacks.</p><p>Payment processing fees, wire fees, bank charges, and similar costs are the Client’s responsibility unless expressly agreed otherwise. The Artist may pause or decline additional services where undisputed amounts are overdue.</p></section>

    <section><h2>5. Overtime & additional time</h2><p>The Artist is engaged only for the periods specified in this Agreement. Extended performances, additional sets, extra rehearsals, extended soundcheck, waiting time caused by the Client or venue, additional performances, production delays attributable to the Client, or other requested work are additional services. Unless a different rate is agreed in writing, additional time is billed at <strong>${money(contract.overtimeRate)}</strong> per hour, with any partial hour billed proportionately or at the applicable minimum agreed by the parties. The Artist is not required to provide additional services without agreeing to the additional compensation.</p></section>

    <section><h2>6. Cancellation & postponement by Client</h2><p>${escapeHtml(cancellationTerms(contract))}</p></section>

    <section><h2>7. Cancellation by Artist & force majeure</h2><p>The Artist may cancel or interrupt performance where circumstances outside the Artist’s reasonable control make performance impossible or unsafe, including serious illness, injury, emergency, transportation disruption, government restriction, venue closure, severe weather, natural disaster, epidemic or pandemic restrictions, fire, labour disruption, war, civil disorder, or similar force majeure events. Where reasonably possible, the Artist will provide prompt notice and the parties will make reasonable efforts to reschedule. The Artist will not be liable for consequential or indirect losses arising from a permitted cancellation or interruption.</p></section>

    <section><h2>8. Venue, production & safety</h2><p>The Client is responsible for a lawful, safe, professional and reasonably suitable working environment, including required permits, licences, insurance, equipment, staffing, security, access, stage conditions, sound support and venue operations. The Artist may refuse or stop work if conditions present a reasonable risk to health or safety or if the Artist is subjected to harassment, discrimination, threats, violence, or unsafe working conditions. A safety-related interruption does not constitute a breach by the Artist.</p>${contract.dressingRoomRequired ? '<p><strong>Dressing / private preparation space:</strong> Client will provide a clean, reasonably secure and appropriate dressing or preparation area.</p>' : ''}${safety}${contract.venueContact || contract.productionContact ? `<p><strong>Contacts:</strong> ${escapeHtml(contract.venueContact || 'Venue contact not provided')}${contract.productionContact ? `; ${escapeHtml(contract.productionContact)}` : ''}.</p>` : ''}</section>

    <section><h2>9. Travel, accommodation & expenses</h2>${travelItems.length ? `<ul>${travelItems.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul>` : '<p>No separate travel arrangements are specified; only stated travel/expense amounts are included.'}<p>Unless expressly included in the performance fee, agreed travel, transportation, parking, accommodation, meals or per diem, baggage and approved engagement expenses are the Client’s responsibility. Where overnight accommodation is required, the Artist will not be required to share accommodation with unrelated persons unless expressly agreed in writing.</p></section>

    <section><h2>10. Recording, media, AI & performance rights</h2><p>${escapeHtml(media)}</p><p>No payment for the live engagement alone transfers ownership of the Artist’s performance, voice, name, image, likeness, or unrelated creative work. Any broader recording, fixation, reproduction, broadcast, synchronization, advertising, endorsement, licensing, distribution, AI training, synthetic voice, digital replica, or other exploitation must be specifically authorized in writing and should state the media, territory, term, permitted purpose, compensation, and approval process.</p></section>

    <section><h2>11. Artist name, image & likeness</h2><p>The Client may identify the Artist by the professional name provided in this Agreement solely in connection with the agreed engagement and any media permission expressly granted above. Advertising, sponsorship, endorsement, merchandise, political or advocacy use, unrelated commercial use, or use implying the Artist’s affiliation with a product, cause or organization requires the Artist’s prior written approval.</p></section>

    <section><h2>12. Non-exclusivity & professional conduct</h2><p>This Agreement is non-exclusive. The Artist remains free to accept other engagements provided doing so does not prevent performance of this Agreement. Both parties will act professionally and respectfully. The Artist may decline material changes that create a serious safety, reputational, ethical or professional concern.</p></section>

    <section><h2>13. Independent contractor</h2><p>Unless applicable law requires otherwise, the Artist is engaged as an independent contractor and is responsible for the Artist’s own taxes, insurance, registrations and statutory obligations arising from compensation. Nothing creates a partnership, employment relationship, joint venture or agency relationship.</p></section>

    <section><h2>14. Liability & indemnification</h2><p>Each party is responsible for its own acts and omissions. To the extent permitted by law, neither party will be liable for indirect, incidental, special, punitive or consequential damages, including lost profits or reputational losses. Nothing excludes liability that cannot lawfully be excluded or limited. The Client is responsible for claims arising from the Client’s breach, unsafe venue conditions, or unauthorized use of the Artist’s identity or performance. The Artist is responsible for claims directly arising from intentional misconduct or material breach, subject to applicable law.</p></section>

    <section><h2>15. Changes, entire agreement & severability</h2><p>Any amendment, additional service, schedule change, fee change, media permission, cancellation arrangement or waiver must be confirmed in writing by both parties; email confirmation is sufficient unless the parties agree otherwise. This Agreement and its written attachments constitute the complete agreement for this engagement. If a provision is unenforceable, the remaining provisions continue to the extent permitted by law and the parties will seek a lawful replacement that most closely reflects the original intent.</p>${additionalTerms}</section>

    <section><h2>16. Governing law & electronic signatures</h2><p>This Agreement is governed by the laws of <strong>${escapeHtml(contract.governingJurisdiction || 'Alberta, Canada')}</strong> and applicable federal laws of Canada. The parties will first attempt in good faith to resolve disputes informally before commencing proceedings, except where urgent relief is reasonably required. Electronic signatures and counterparts are permitted to the extent allowed by applicable law.</p></section>

    <section><h2>17. Signatures</h2><p>By signing below, each party confirms that it has reviewed the engagement details and agrees to the terms of this Agreement. The Artist’s signature does not waive rights that cannot lawfully be waived.</p><div class="signature-grid"><div><div class="line"></div><strong>Client</strong><br>${escapeHtml(contract.clientName || '')}<br>Date: __________________</div><div><div class="line"></div><strong>Artist</strong><br>${escapeHtml(contract.artistName || '')}<br>Date: __________________</div></div></section>
  </article>`;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
