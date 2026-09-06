export const SERVICE_OPTIONS = [
  'Vocal Performance',
  'Lead Vocalist',
  'Background Vocals',
  'Choir / Ensemble',
  'Rehearsal',
  'Soundcheck'
];

// SAMPLE CONTRACT TEMPLATE — replace the language here with counsel-approved language
// when the final artist agreement is established. This template is intentionally
// artist-protective and is written for general Canadian use; it is not legal advice.
export const SAMPLE_TERMS = `1. SCOPE OF ENGAGEMENT
The Artist will provide only the services expressly listed in this Agreement. No additional performance, rehearsal, recording, promotional appearance, media interview, travel, administrative work, or other service is included unless agreed to in writing by the Artist. Any material change to the scope, schedule, venue, repertoire, production requirements, or number of performances must be agreed to by both parties in writing and may result in additional compensation.

2. COMPENSATION AND PAYMENT
The Client agrees to pay all amounts stated in this Agreement in full. Unless a different payment schedule is expressly stated in writing, the performance fee and all approved expenses are due no later than the conclusion of the Artist's services on the event date. Rehearsal and overtime charges are payable in addition to the base performance fee. The Artist is not required to continue providing services while undisputed amounts are overdue. Any payment processing fees, wire fees, bank charges, or similar deductions are the Client's responsibility unless otherwise agreed in writing.

3. ADDITIONAL TIME AND OVERTIME
The Artist is engaged only for the performance and rehearsal periods specified in this Agreement. Any requested work outside those periods, including extended performances, additional rehearsals, soundcheck extensions, waiting time caused by the Client or venue, additional performances, or other requested services, requires the Artist's agreement and will be charged at the applicable additional rate or another rate agreed in writing before the additional work is performed.

4. CANCELLATION OR POSTPONEMENT BY CLIENT
If the Client cancels or materially postpones the engagement after this Agreement has been accepted, the Artist is entitled to retain any non-refundable deposit and to receive reasonable cancellation compensation for the date and preparation time that the Artist reserved. Unless the parties agree to different written terms, cancellation within 30 days of the event will require payment of 50% of the performance fee, cancellation within 14 days will require payment of 75%, and cancellation within 72 hours or a failure to appear will require payment of 100%, plus any non-refundable approved expenses already incurred by the Artist. A postponed event is treated as a cancellation unless the Artist agrees in writing to the new date and confirms availability.

5. CANCELLATION BY ARTIST
The Artist may cancel where circumstances outside the Artist's reasonable control make performance impossible or unsafe, including serious illness, injury, emergency, transportation disruption, government restriction, or other force majeure event. Where reasonably possible, the Artist will provide prompt notice. The Artist will not be liable for consequential or indirect losses arising from a permitted cancellation.

6. FORCE MAJEURE
Neither party will be responsible for failure or delay caused by circumstances beyond reasonable control, including severe weather, natural disaster, epidemic or pandemic restrictions, fire, labour disruption, government action, venue closure, transportation disruption, war, civil disorder, or similar events. The parties will make reasonable efforts to reschedule where practical. Any amounts already earned by the Artist and approved non-refundable expenses remain payable.

7. VENUE, WORKING CONDITIONS, AND SAFETY
The Client is responsible for providing a lawful, safe, professional, and reasonably suitable environment for the Artist and for ensuring that the venue has all required permits, licences, insurance, equipment, staffing, security, and production arrangements. The Artist may refuse or stop performance if conditions present a reasonable risk to health or safety, or if the Artist is subjected to harassment, discrimination, threats, violence, or unsafe working conditions. A safety-related interruption does not constitute a breach by the Artist.

8. TRAVEL, ACCOMMODATION, AND EXPENSES
Unless expressly included in the performance fee, the Client is responsible for agreed travel, transportation, parking, accommodation, meals or per diem, baggage, and other approved engagement expenses. The Client will provide suitable accommodation where accommodation is required and will not require the Artist to share accommodation with unrelated persons unless expressly agreed in writing.

9. RECORDING, PHOTOGRAPHY, LIVESTREAMING, AND MEDIA RIGHTS
No audio recording, video recording, livestream, broadcast, commercial release, synchronization, advertising use, AI training/use, voice cloning, digital replica, or other fixation or exploitation of the Artist's performance is permitted unless the Artist has expressly authorized that use in writing. Ordinary non-commercial event photography and short promotional clips are permitted only to the extent specifically agreed with the Artist. Any broader use requires a separate written licence or additional compensation. The Client receives no ownership of the Artist's performance merely by paying the performance fee. Canadian law recognizes rights in performers' performances, including rights concerning fixation and reproduction, and performer moral rights in qualifying circumstances.

10. ARTIST NAME, IMAGE, AND LIKENESS
The Client may identify the Artist by the professional name provided in this Agreement solely in connection with the agreed engagement. Use of the Artist's name, image, likeness, biography, voice, or other identity for advertising, endorsement, sponsorship, merchandise, political or advocacy purposes, or unrelated commercial activity requires the Artist's prior written approval.

11. ARTIST'S RIGHTS AND NON-EXCLUSIVITY
This Agreement is limited to the engagement described here and does not create an exclusive relationship. The Artist remains free to perform, record, promote, contract with, or provide services to other clients, provided doing so does not prevent the Artist from fulfilling this Agreement.

12. PROFESSIONAL CONDUCT
Both parties agree to act professionally and respectfully. The Client will not require the Artist to perform material or participate in conduct that is unlawful or that the Artist reasonably believes would create a serious reputational, safety, or ethical concern. The Artist may decline a requested change that materially alters the agreed engagement.

13. INDEPENDENT CONTRACTOR
Unless applicable law requires otherwise, the Artist is engaged as an independent contractor and is responsible for the Artist's own income tax, insurance, registrations, and statutory obligations arising from compensation received under this Agreement. Nothing in this Agreement creates a partnership, employment relationship, joint venture, or agency relationship between the parties.

14. LIABILITY
Each party is responsible for its own acts and omissions. To the extent permitted by law, neither party will be liable to the other for indirect, incidental, special, punitive, or consequential damages, including lost profits or reputational losses. Nothing in this Agreement excludes liability that cannot lawfully be excluded or limited.

15. INDEMNIFICATION
The Client will be responsible for claims, losses, or expenses arising from the Client's breach of this Agreement, the venue's unsafe conditions, or the Client's unauthorized use of the Artist's name, image, recording, or performance. The Artist will be responsible for claims directly arising from the Artist's intentional misconduct or material breach of this Agreement, subject to applicable law.

16. CHANGES TO THE AGREEMENT
Any amendment, additional service, schedule change, fee change, or waiver must be confirmed in writing by both parties. Email confirmation is sufficient unless the parties agree otherwise. A verbal request does not amend the financial or material terms of this Agreement.

17. ENTIRE AGREEMENT
This Agreement and any written attachments or amendments expressly incorporated into it constitute the agreement between the parties concerning the engagement and supersede prior discussions about the same engagement. If a conflict exists between this Agreement and an informal message or verbal statement, this Agreement controls unless the parties have subsequently agreed in writing to amend it.

18. SEVERABILITY
If any provision of this Agreement is found unenforceable, the remaining provisions will continue to the extent permitted by law, and the parties will seek in good faith to replace the unenforceable provision with a lawful provision that most closely reflects the original intent.

19. GOVERNING LAW
Unless otherwise specified in writing, this Agreement is governed by the laws of the province or territory identified as the governing jurisdiction below and the applicable federal laws of Canada. The parties will first attempt in good faith to resolve disputes informally before commencing proceedings, except where urgent relief is reasonably required.

20. ELECTRONIC SIGNATURES AND COUNTERPARTS
The parties may sign this Agreement electronically and in counterparts. Each signed counterpart is deemed an original and together they form one agreement, to the extent permitted by applicable law.

21. ARTIST ACKNOWLEDGEMENT
The Artist's signature confirms acceptance of the engagement described in this Agreement and does not constitute a waiver of rights that cannot lawfully be waived. Nothing in this Agreement is intended to transfer ownership of the Artist's underlying professional identity, unrelated creative work, or rights in performances beyond the specific permissions expressly stated here.`;

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
  const terms = [SAMPLE_TERMS, contract.additionalTerms?.trim() ? `ADDITIONAL AGREED TERMS\n${contract.additionalTerms.trim()}` : ''].filter(Boolean).join('\n\n');

  return `<article class="contract-paper">
    <header class="contract-header">
      <div><div class="eyebrow">VOCAL ARTIST AGREEMENT</div><h1>Performance Agreement</h1></div>
      <div class="contract-number">${escapeHtml(contract.number || 'DRAFT')}</div>
    </header>
    <p>This Vocal Artist Agreement (the “Agreement”) is entered into between <strong>${escapeHtml(contract.clientName || 'Client')}</strong> (the “Client”) and <strong>${escapeHtml(contract.artistName || 'Artist')}</strong> (the “Artist”).</p>
    <section><h2>1. Engagement</h2><p>The Artist will provide the services listed below for <strong>${escapeHtml(contract.eventName || 'the Event')}</strong> on <strong>${date(contract.eventDate)}</strong> at <strong>${escapeHtml(contract.venue || 'the venue')}</strong>${contract.location ? ` in ${escapeHtml(contract.location)}` : ''}.</p><p><strong>Performance time:</strong> ${escapeHtml(contract.performanceTime || 'To be confirmed')} &nbsp; <strong>Duration:</strong> ${escapeHtml(contract.duration || 'To be confirmed')}</p></section>
    <section><h2>2. Services</h2><ul>${services}</ul></section>
    <section><h2>3. Rehearsals</h2><table><thead><tr><th>Date</th><th>Start</th><th>End</th><th>Hours</th></tr></thead><tbody>${rehearsals}</tbody></table><p>Additional rehearsal hours beyond the scheduled hours are billed at <strong>${money(contract.rehearsalRate)}</strong> per hour.</p></section>
    <section><h2>4. Compensation</h2><table class="money-table"><tbody><tr><td>Performance fee</td><td>${money(contract.performanceFee)}</td></tr><tr><td>Rehearsals (${totals.rehearsalHours.toFixed(1)} hrs)</td><td>${money(totals.rehearsalTotal)}</td></tr><tr><td>Travel / expenses</td><td>${money(contract.travelAmount)}</td></tr><tr><td>Accommodation</td><td>${money(contract.accommodationAmount)}</td></tr><tr class="total"><td>Total stated compensation</td><td>${money(totals.total)}</td></tr></tbody></table></section>
    <section><h2>5. Terms and Conditions</h2><div class="contract-terms">${escapeHtml(terms).replace(/\n/g, '<br>')}</div></section>
    <section><h2>6. Signatures</h2><p>By signing below, each party acknowledges that it has read and understood this Agreement and agrees to its terms.</p><div class="signature-grid"><div><div class="line"></div><strong>Client</strong><br>${escapeHtml(contract.clientName || '')}<br>Date: __________________</div><div><div class="line"></div><strong>Artist</strong><br>${escapeHtml(contract.artistName || '')}<br>Date: __________________</div></div></section>
  </article>`;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[char]));
}
