var e=[`orange`,`pink`,`cyan`,`purple`],t=(t,n,r,i=``)=>`<div class="t c-${e[(t-1)%e.length]} ${i}" style="--i:${t}">${r}<span class="t__label"><span class="n">${t}</span><span class="l">${n}</span></span></div>`,n=window.DOCS=(()=>{let e={tenk:{src:`table/Goldman Sachs 10-k_page79.pdf`,file:`northwind-2024-form-10k.pdf`,page:`p. 76`,page_html:`
        ${t(1,`Header`,`<div><div class="doc__kicker" style="font-weight:400">The Northwind Group, Inc. and subsidiaries</div><div class="doc__h2">Management’s Discussion and Analysis</div></div>`)}
        ${t(2,`Text`,`<p>The table below presents our Asset &amp; Wealth Management assets.</p>`)}
        ${t(3,`Table`,`<table class="k10"><thead><tr><th>$ in millions<span class="unit">&nbsp;</span></th><th><span class="unit">As of December</span>2024</th><th><span class="unit">&nbsp;</span>2023</th></tr></thead><tbody>
          <tr><td>Cash and cash equivalents</td><td>$ 36,364</td><td>$ 48,677</td></tr>
          <tr><td>Collateralized agreements</td><td>12,126</td><td>14,020</td></tr>
          <tr><td>Trading assets</td><td>41,724</td><td>27,324</td></tr>
          <tr><td>Loans</td><td>46,694</td><td>45,866</td></tr>
          <tr><td>Other assets</td><td>13,291</td><td>16,630</td></tr>
          <tr class="total"><td>Total</td><td>$ 193,328</td><td>$ 191,863</td></tr></tbody></table>`)}
        ${t(4,`Text`,`<p>The average Asset &amp; Wealth Management gross loans were $45.84 billion for 2024 and $51.98 billion for 2023.</p>`)}
        ${t(5,`Table`,`<table class="k10"><thead><tr><th>$ in millions</th><th>2024</th><th>2023</th><th>2022</th></tr></thead><tbody>
          <tr><td>Management and other fees</td><td>$ 10,425</td><td>$ 9,486</td><td>$ 8,781</td></tr>
          <tr><td>Private banking and lending</td><td>2,881</td><td>2,576</td><td>2,458</td></tr>
          <tr class="sum"><td>Total net revenues</td><td>16,142</td><td>13,880</td><td>13,376</td></tr>
          <tr><td>Pre-tax earnings</td><td>4,549</td><td>1,359</td><td>1,307</td></tr>
          <tr class="total"><td>Net earnings to common</td><td>$ 3,386</td><td>$ 952</td><td>$ 979</td></tr>
          <tr><td><b>Return on average common equity</b></td><td>12.8%</td><td>3.2%</td><td>3.1%</td></tr></tbody></table>`)}
        ${t(6,`Footer`,`<div class="doc__run"><span><b>76</b> &nbsp;Northwind 2024 Form 10-K</span></div>`)}`,md:[{tag:1,code:`THE NORTHWIND GROUP, INC. AND SUBSIDIARIES
# Management’s Discussion and Analysis`},{tag:2,code:`The table below presents our Asset & Wealth
Management assets.`},{tag:3,code:`| $ in millions        |      2024 |      2023 |
| -------------------- | --------: | --------: |
| Cash and equivalents |  $ 36,364 |  $ 48,677 |
| Trading assets       |    41,724 |    27,324 |
| Loans                |    46,694 |    45,866 |
| **Total**            | $ 193,328 | $ 191,863 |`},{tag:4,code:`Average gross loans: $45.84 billion (2024),
$51.98 billion (2023).`},{tag:5,code:`| $ in millions        |   2024 |   2023 |   2022 |
| -------------------- | -----: | -----: | -----: |
| Total net revenues   | 16,142 | 13,880 | 13,376 |
| Pre-tax earnings     |  4,549 |  1,359 |  1,307 |
| Net earnings to comm.|  3,386 |    952 |    979 |
| Return on avg equity |  12.8% |   3.2% |   3.1% |`},{tag:6,code:`76 · Northwind 2024 Form 10-K`}],json:[{tag:0,code:`{
  "document_type": "form_10k",
  "page": 76,`},{tag:1,code:`  "section": "Management’s Discussion and Analysis",`,conf:`0.99`},{tag:3,code:`  "awm_assets_usd_m": { "2024": 193328, "2023": 191863 },
  "loans_usd_m": 46694,`,conf:`0.98`},{tag:4,code:`  "avg_gross_loans_usd_bn": { "2024": 45.84, "2023": 51.98 },`,conf:`0.96`},{tag:5,code:`  "net_revenues_usd_m": [16142, 13880, 13376],
  "roe": [0.128, 0.032, 0.031],`,conf:`0.97`},{tag:6,code:`  "filing": "Form 10-K 2024"
}`,conf:`0.93`}]},research:{src:`chart/Goldman_Sachs_BUY_report_p10.pdf`,file:`harbor-fields-northwind-buy.pdf`,page:`p. 10`,page_html:`
        <div class="doc__run" style="border-bottom:calc(.6 * var(--p)) solid #939393;padding-bottom:calc(3 * var(--p))"><span><b>HARBOR FIELDS</b> · Portfolio Management Program</span><span>10</span></div>
        ${t(1,`Heading`,`<div><div class="doc__h2" style="font-weight:400">Strategic direction</div><div class="doc__h3" style="margin-top:calc(4 * var(--p))">The Northwind Group</div></div>`)}
        ${t(2,`Text`,`<p>The Company has deployed (and is continuing to deploy) a franchise mix strategy that minimizes its exposure to the riskiness of trading revenues in FICC, focusing more on investment banking and investment management (Exhibit 3). Investment banking revenues now match that of the FICC business.</p>`)}
        ${t(3,`Chart`,`<div><div class="doc__h3" style="font-weight:400;font-size:calc(9 * var(--p))">Exhibit 3</div><div class="doc__frame" style="margin-top:calc(3 * var(--p))"><span class="doc__caption">Historical revenue mix</span>
          <div class="stk">${[[7,5,21,35,19,13],[8,7,29,31,7,17],[9,6,24,29,17,15],[12,6,21,25,21,16],[12,7,20,25,20,17],[11,10,23,22,16,18]].map(e=>`<div class="stk__c">${e.map(e=>`<i style="--h:${e}%">${e}%</i>`).join(``)}</div>`).join(``)}</div>
          <div class="stk__x"><span>FY 2010A</span><span>FY 2011A</span><span>FY 2012A</span><span>FY 2013A</span><span>FY 2014A</span><span>FY 2015A</span></div>
          <div class="doc__legend"><span style="--k:#000000">Underwriting</span><span style="--k:#939393">Financial advisory</span><span style="--k:#939393">Equities</span><span style="--k:#D9D9D5">FICC</span><span style="--k:#D9D9D5">Investing and lending</span><span style="--k:#D9D9D5">Investment management</span></div></div></div>`)}
        ${t(4,`Text`,`<p>On a geographic level, revenues are derived primarily from North America; on a profit level, the Company has strong earnings power in the EMEA and Asia segments (Exhibit 4).</p>`)}`,md:[{tag:1,code:`# Strategic direction
## The Northwind Group`},{tag:2,code:`The Company has deployed a franchise mix strategy
that minimizes its exposure to trading revenues
in FICC (Exhibit 3).`},{tag:3,code:`**Exhibit 3 · Historical revenue mix**
| Segment            | FY10 | FY11 | FY12 | FY13 | FY14 | FY15 |
| ------------------ | ---: | ---: | ---: | ---: | ---: | ---: |
| Underwriting       |   7% |   8% |   9% |  12% |  12% |  11% |
| Financial advisory |   5% |   7% |   6% |   6% |   7% |  10% |
| Equities           |  21% |  29% |  24% |  21% |  20% |  23% |
| FICC               |  35% |  31% |  29% |  25% |  25% |  22% |
| Investing/lending  |  19% |   7% |  17% |  21% |  20% |  16% |
| Investment mgmt    |  13% |  17% |  15% |  16% |  17% |  18% |`},{tag:4,code:`Revenues come primarily from North America;
profits are strong in EMEA and Asia (Exhibit 4).`}]},court:{src:`text/text_ocr__strikeout.pdf`,file:`revised-judgment-15-170.pdf`,page:`p. 1`,page_html:`
        <div class="doc__run" style="font-size:calc(5.8 * var(--p));color:#111"><span>Case 1:15-cv-00170-RGA &nbsp;Document 322 &nbsp;Filed 12/05/19 &nbsp;Page 1 of 2</span></div>
        ${t(1,`Header`,`<p class="doc__court">In the United States District Court<br>for the District of Delaware</p>`)}
        ${t(2,`Parties`,`<div class="doc__caption-grid">
          <div class="par"><span>NORTHWIND MEDICAL PRODUCTS IP LTD., HARBOR THERAPEUTICS LLC and ARDEN, INC.,</span><em>Plaintiffs,</em><em>v.</em><span>KESSLER GAS DISTRIBUTION, INC. and KESSLER GAS, INC.,</span><em>Defendants.</em></div>
          <div class="br">${`)<br>`.repeat(10)})</div>
          <div class="no">C.A. No.: 15-170-<span class="doc__fix"><s>GMS</s><span class="doc__hand">RGA</span></span></div></div>`)}
        ${t(3,`Strikeout`,`<p class="doc__court-title"><s>[PROPOSED]</s> REVISED JUDGMENT</p>`)}
        ${t(4,`Text`,`<p class="doc__legal">This action came before the Court for a seven-day bench trial on March 13, 2017. The court issued a Memorandum and Order (“Opinion”) on September 5, 2017 (D.I. 308, 309). Plaintiffs appealed the judgment to the United States Court of Appeals for the Federal Circuit, which remanded for correction of the judgment to limit its ruling to the asserted claims before it. Therefore,</p>`)}
        ${t(5,`Text`,`<p class="doc__legal">IT IS HEREBY ORDERED AND ADJUDGED that final judgment is hereby entered in favor of defendants Kessler Gas Distribution, Inc., and Kessler Gas, Inc. (“Defendants”), and against plaintiffs (“Plaintiffs”) finding that:</p>`)}`,md:[{tag:1,code:`IN THE UNITED STATES DISTRICT COURT
FOR THE DISTRICT OF DELAWARE`},{tag:2,code:`| Northwind Medical Products IP Ltd., Harbor
|   Therapeutics LLC and Arden, Inc., Plaintiffs,
| v. Kessler Gas Distribution, Inc. and
|   Kessler Gas, Inc., Defendants.
C.A. No.: 15-170-~~GMS~~ RGA`},{tag:3,code:`## ~~[PROPOSED]~~ REVISED JUDGMENT`},{tag:4,code:`This action came before the Court for a seven-day
bench trial on March 13, 2017. …`},{tag:5,code:`IT IS HEREBY ORDERED AND ADJUDGED that final
judgment is hereby entered in favor of defendants …`}],split:[{tag:0,code:`{
  "file": "inbox-batch-0412.pdf", "pages": 14,
  "segments": [`},{tag:1,code:`    { "pages": "1–2", "type": "court_order",`,conf:`0.98`},{tag:2,code:`      "parties": ["Northwind Medical", "Kessler Gas"],`},{tag:3,code:`      "title": "Revised judgment", "case": "15-170" },`},{tag:4,code:`    { "pages": "3–8", "type": "contract" },`,conf:`0.95`},{tag:5,code:`    { "pages": "9–14", "type": "invoice" }
  ]
}`,conf:`0.93`}]},notes:{src:`text/text_handwritting__handwritting.pdf`,file:`lecture-notes-derivatives.jpg`,page:`scan`,page_html:`
        ${t(1,`Heading`,`<p class="doc__hand hw2__title">Derivace složené funkce</p>`)}
        ${t(2,`Handwriting`,`<p class="doc__hand">Má-li funkce <i>g</i> v bodě <i>a</i> derivaci <i>g′(a)</i> a má-li <i>h</i> v bodě <i>g(a)</i> derivaci <i>h′(g(a))</i> a je-li <i>f = h(g)</i>, má <i>f</i> v bodě <i>a</i> derivaci a platí</p>`)}
        ${t(3,`Formula`,`<p class="doc__hand hw2__box">f′(a) = (h(g))′(a) = h′(g(a)) · g′(a)</p>`)}
        ${t(4,`Examples`,`<div class="doc__hand hw2__ex"><span class="hw2__lbl">Příklady:</span>
          <p>(sin(x<sup>2</sup>+1))′ = cos(x<sup>2</sup>+1) · 2x</p>
          <p>(e<sup>x³</sup>)′ = (e<sup>(x³)</sup>)′ = e<sup>x³</sup> · 3x<sup>2</sup></p>
          <p>(ln(3x−1))′ = <span class="hw2__frac"><span>1</span><span>3x−1</span></span> · 3 &nbsp;(3x−1 &gt; 0)</p></div>`)}`,md:[{tag:1,code:`# Derivace složené funkce`},{tag:2,code:`Má-li funkce g v bodě a derivaci g′(a)
a má-li h v bodě g(a) derivaci h′(g(a))
a je-li f = h(g), má f v bodě a derivaci a platí`},{tag:3,code:`$$f'(a) = (h(g))'(a) = h'(g(a)) \\cdot g'(a)$$`},{tag:4,code:`## Příklady
$$(\\sin(x^2+1))' = \\cos(x^2+1) \\cdot 2x$$
$$(e^{x^3})' = e^{x^3} \\cdot 3x^2$$
$$(\\ln(3x-1))' = \\frac{3}{3x-1}$$`}]},datasheet:{src:`table/DS5795A-06_page4.pdf`,file:`nw5795a-datasheet.pdf`,page:`p. 4`,page_html:`
        ${t(1,`Header`,`<div class="doc__ds"><b>NW5795A</b><span>NORTHWIND</span></div>`)}
        ${t(2,`List`,`<div><div class="doc__h3">Recommended Operating Conditions <span class="doc__muted" style="font-weight:400;font-size:.75em">(Note 4)</span></div>
          <ul class="doc__spec" style="margin-top:calc(3 * var(--p))"><li>Supply Input Voltage, V<sub>IN</sub><i></i>2.5V to 5.5V</li><li>Junction Temperature Range<i></i>−40°C to 125°C</li><li>Ambient Temperature Range<i></i>−40°C to 85°C</li></ul></div>`)}
        ${t(3,`Heading`,`<div><div class="doc__h3" style="font-size:calc(9.6 * var(--p))">Electrical Characteristics</div><p class="doc__small doc__muted">(V<sub>IN</sub> = 3.6V, T<sub>A</sub> = 25°C, unless otherwise specified)</p></div>`)}
        ${t(4,`Table`,`<table class="grid"><thead><tr><th>Parameter</th><th>Symbol</th><th>Test Conditions</th><th>Min</th><th>Typ</th><th>Max</th><th>Unit</th></tr></thead><tbody>
          <tr><td>Under-Voltage Lockout Threshold</td><td>V<sub>UVLO</sub></td><td>V<sub>CC</sub> rising</td><td>2.28</td><td>2.35</td><td>2.48</td><td>V</td></tr>
          <tr><td>Shutdown Supply Current</td><td>I<sub>SHDN</sub></td><td>EN = 0V</td><td>--</td><td>--</td><td>1</td><td>μA</td></tr>
          <tr><td>Quiescent Current</td><td>I<sub>Q</sub></td><td>Active, no switching</td><td>--</td><td>30</td><td>--</td><td>μA</td></tr>
          <tr><td>Voltage Reference</td><td>V<sub>REF</sub></td><td></td><td>0.441</td><td>0.45</td><td>0.459</td><td>V</td></tr>
          <tr><td>Current Limit · High-Side</td><td rowspan="2">I<sub>LIM</sub></td><td>Peak current</td><td>2.5</td><td>3.2</td><td>4</td><td rowspan="2">A</td></tr>
          <tr><td>Current Limit · Low-Side</td><td>Valley current</td><td>2</td><td>2.4</td><td>2.9</td></tr>
          <tr><td>Enable Rising Threshold</td><td>V<sub>ENR</sub></td><td>Rising</td><td>1</td><td>--</td><td>--</td><td>V</td></tr>
          <tr><td>Enable Falling Threshold</td><td>V<sub>ENF</sub></td><td>Falling</td><td>--</td><td>--</td><td>0.4</td><td>V</td></tr></tbody></table>`)}
        ${t(5,`Footer`,`<div class="doc__run" style="border-top:calc(1.2 * var(--p)) solid #222;padding-top:calc(2 * var(--p))"><span>www.northwind-semi.com · 4</span><span>DS5795A-06 · November 2019</span></div>`)}`,md:[{tag:1,code:`# NW5795A`},{tag:2,code:`## Recommended Operating Conditions (Note 4)
- Supply Input Voltage, VIN: 2.5V to 5.5V
- Junction Temperature Range: −40°C to 125°C
- Ambient Temperature Range: −40°C to 85°C`},{tag:3,code:`## Electrical Characteristics
(VIN = 3.6V, TA = 25°C, unless otherwise specified)`},{tag:4,code:`| Parameter         | Symbol | Min   | Typ  | Max   | Unit |
| ----------------- | ------ | ----: | ---: | ----: | ---- |
| UVLO Threshold    | VUVLO  | 2.28  | 2.35 | 2.48  | V    |
| Voltage Reference | VREF   | 0.441 | 0.45 | 0.459 | V    |
| Current Limit, HS | ILIM   | 2.5   | 3.2  | 4     | A    |`},{tag:5,code:`DS5795A-06 · November 2019 · p. 4`}],json:[{tag:0,code:`{
  "part": "NW5795A",`},{tag:1,code:`  "vendor": "Northwind",`,conf:`0.99`},{tag:2,code:`  "vin_range_v": [2.5, 5.5],
  "tj_range_c": [-40, 125],`,conf:`0.98`},{tag:3,code:`  "conditions": { "vin_v": 3.6, "ta_c": 25 },`,conf:`0.97`},{tag:4,code:`  "uvlo_v": { "min": 2.28, "typ": 2.35, "max": 2.48 },
  "vref_v": { "min": 0.441, "typ": 0.45, "max": 0.459 },
  "ilim_peak_a": { "min": 2.5, "typ": 3.2, "max": 4 },
  "iq_ua": 30,`,conf:`0.95`},{tag:5,code:`  "revision": "DS5795A-06"
}`,conf:`0.92`}]},rates:{src:`table/FBLB-134215544_page162.pdf`,file:`northwind-farm-liability-rates.pdf`,page:`p. 162`,page_html:`
        ${t(1,`Heading`,`<div class="doc__h2" style="text-align:center">Liability Section Rates and Factors</div>`)}
        ${t(2,`Table`,`<div><div class="doc__band">Personal Liability and Medical Base Rate Tables</div>
          <div class="doc__pair" style="margin-top:calc(5 * var(--p))">
          <table class="grid c1"><thead><tr><th colspan="2">Liability Base Rates</th></tr></thead><tbody>
            <tr class="sub"><td colspan="2">Household/Organizational Liability</td></tr><tr><td>Per Household/Organization</td><td class="hl">$29.75</td></tr>
            <tr class="sub"><td colspan="2">Residence Liability</td></tr><tr><td>Insured is Owner</td><td class="hl">$21.25</td></tr><tr><td>Insured is Tenant</td><td class="hl">$21.25</td></tr>
            <tr class="sub"><td colspan="2">Additional Locations</td></tr><tr><td>Excess of 1, up to 8</td><td class="hl">$25.25</td></tr></tbody></table>
          <table class="grid c1"><thead><tr><th colspan="2">Medical Base Rates</th></tr></thead><tbody>
            <tr class="sub"><td colspan="2">Household/Organizational Medical</td></tr><tr><td>Per Household/Organization</td><td class="hl">$2.90</td></tr>
            <tr class="sub"><td colspan="2">Residence Medical</td></tr><tr><td>Insured is Owner</td><td class="hl">$2.79</td></tr><tr><td>Insured is Tenant</td><td class="hl">$2.79</td></tr></tbody></table></div></div>`)}
        ${t(3,`Table`,`<div><div class="doc__band">Personal Liability and Medical Increased Limit Factors</div>
          <div class="doc__pair" style="margin-top:calc(5 * var(--p))">
          <table class="grid c1"><thead><tr><th colspan="2">Increased Liability Limit Factors</th></tr><tr class="sub"><td>Limit</td><td>Factor</td></tr></thead><tbody>
            <tr><td>$65,000</td><td>0.94</td></tr><tr><td>$100,000</td><td>1.00</td></tr><tr><td>$300,000</td><td>1.40</td></tr><tr><td>$500,000</td><td>1.90</td></tr><tr><td>$750,000</td><td>2.10</td></tr><tr><td>$1,000,000</td><td>2.80</td></tr></tbody></table>
          <table class="grid c1"><thead><tr><th colspan="2">Increased Personal Injury Limit Factors</th></tr><tr class="sub"><td>Limit</td><td>Factor</td></tr></thead><tbody>
            <tr><td>$65,000</td><td>0.90</td></tr><tr><td>$100,000</td><td>1.00</td></tr><tr><td>$300,000</td><td>1.29</td></tr><tr><td>$500,000</td><td>1.58</td></tr><tr><td>$750,000</td><td>2.06</td></tr><tr><td>$1,000,000</td><td>2.30</td></tr></tbody></table></div></div>`)}
        ${t(4,`Footer`,`<p class="doc__small" style="text-align:center">Northwind Agricultural Insurance Company (Utah)<br>MEMBER’S CHOICE POLICY · LIABILITY SECTION · 01/23/2025</p>`)}`,md:[{tag:1,code:`# Liability Section Rates and Factors`},{tag:2,code:`## Personal Liability and Medical Base Rate Tables
| Liability base rates        | Rate   |
| --------------------------- | -----: |
| Per household/organization  | $29.75 |
| Residence, owner / tenant   | $21.25 |
| Additional locations (1–8)  | $25.25 |`},{tag:3,code:`## Increased Limit Factors
| Limit      | Liability | Personal injury |
| ---------- | --------: | --------------: |
| $100,000   |      1.00 |            1.00 |
| $500,000   |      1.90 |            1.58 |
| $1,000,000 |      2.80 |            2.30 |`},{tag:4,code:`Northwind Agricultural Insurance Company (Utah)`}],json:[{tag:0,code:`{
  "document_type": "rate_manual",
  "page": 162,`},{tag:1,code:`  "section": "liability",`,conf:`0.99`},{tag:2,code:`  "base_rates": {
    "liability_per_household": 29.75,
    "residence_owner": 21.25, "residence_tenant": 21.25,
    "medical_per_household": 2.90
  },`,conf:`0.97`},{tag:3,code:`  "liability_limit_factors": {
    "65000": 0.94, "100000": 1.00, "300000": 1.40,
    "500000": 1.90, "750000": 2.10, "1000000": 2.80
  },`,conf:`0.96`},{tag:4,code:`  "insurer": "Northwind Agricultural Insurance Co.",
  "effective": "2025-01-23"
}`,conf:`0.91`}],classify:[{tag:0,code:`{
  "file": "northwind-farm-liability-rates.pdf",`},{tag:1,code:`  "label": "rate_manual",`,conf:`0.97`},{tag:2,code:`  "signals": ["base rate tables",`},{tag:3,code:`              "limit factor tables",`},{tag:4,code:`              "insurer and policy footer"],
  "runners_up": { "policy": 0.02, "claim_form": 0.01 }
}`}]},contract:{src:`text/text_ocr__contract.pdf`,file:`general-conditions-of-contract.pdf`,page:`p. 9`,page_html:`
        ${t(1,`Clause`,`<dl class="doc__cl"><dt>16. Payment</dt><dd>
          <p><span>16.1</span><span>The method and conditions of payment to be made to the supplier under this contract shall be specified in SCC.</span></p>
          <p><span>16.2</span><span>The supplier shall furnish the purchaser with an invoice accompanied by a copy of the delivery note and upon fulfillment of other obligations stipulated in the contract.</span></p>
          <p><span>16.3</span><span>Payments shall be made promptly by the purchaser, but in no case later than thirty (30) days after submission of an invoice or claim by the supplier.</span></p>
          <p><span>16.4</span><span>Payment will be made in Rand unless otherwise stipulated in SCC.</span></p></dd></dl>`)}
        ${t(2,`Clause`,`<dl class="doc__cl"><dt>17. Prices</dt><dd><p><span>17.1</span><span>Prices charged by the supplier for goods delivered and services performed under the contract shall not vary from the prices quoted by the supplier in his bid, with the exception of any price adjustments authorized in SCC.</span></p></dd></dl>`)}
        ${t(3,`Clause`,`<dl class="doc__cl"><dt>18. Contract amendments</dt><dd><p><span>18.1</span><span>No variation in or modification of the terms of the contract shall be made except by written amendment signed by the parties concerned.</span></p></dd></dl>`)}
        ${t(4,`Clause`,`<dl class="doc__cl"><dt>19. Assignment</dt><dd><p><span>19.1</span><span>The supplier shall not assign, in whole or in part, its obligations to perform under the contract, except with the purchaser’s prior written consent.</span></p></dd></dl>`)}
        ${t(5,`Page no.`,`<p class="doc__pageno" style="text-align:right">9</p>`)}`,json:[{tag:0,code:`{
  "document_type": "contract_conditions",`},{tag:1,code:`  "payment": {
    "due_days_after_invoice": 30,
    "invoice_requires": ["delivery_note"],
    "currency": "ZAR"
  },`,conf:`0.97`},{tag:2,code:`  "price_adjustment": "only_as_authorized_in_scc",`,conf:`0.92`},{tag:3,code:`  "amendments": "written_signed_by_parties",`,conf:`0.95`},{tag:4,code:`  "assignment": "prior_written_consent",`,conf:`0.94`},{tag:5,code:`  "page": 9
}`,conf:`0.99`}]},tax:{src:`text/text_simple__underlineLaw.pdf`,file:`finance-bill-overview.pdf`,page:`p. 8`,page_html:`
        ${t(1,`Heading`,`<div class="doc__h3">1.16. Cars: increasing the diesel supplement</div>`)}
        ${t(2,`Text`,`<p class="doc__law">As announced at Autumn Budget 2017, the government will legislate in Finance Bill 2017-18 to increase the diesel supplement, from 3% to 4%. The supplement is used to calculate company car tax and car fuel benefit charge. This will apply to all diesel cars registered on and after 1 January 1998 that do not meet the RDE2 standards. The change will have effect on and after 6 April 2018. A <span class="u">tax information and impact note</span> is published at Annex B.</p>`)}
        ${t(3,`Heading`,`<div class="doc__h3">1.17. Company car tax and Vehicle Excise Duty: carbon dioxide emission regime</div>`)}
        ${t(4,`Text`,`<p class="doc__law">The government will legislate in Finance Bill 2017-18 to confirm that carbon dioxide figures compatible with the current NEDC test procedure will be used for collecting company car tax until April 2020. A <span class="u">tax information and impact note</span> is published at Annex B.</p>`)}
        ${t(5,`Heading`,`<div><div class="doc__h3" style="font-weight:400;font-size:calc(9 * var(--p))">Pensions Tax</div><div class="doc__h3" style="margin-top:calc(5 * var(--p))">1.18. Master trust tax registration</div></div>`)}
        ${t(6,`Text`,`<p class="doc__law">The government will legislate in Finance Bill 2017-18 to introduce powers to register and de-register master trust pension schemes. <span class="u">Draft legislation</span> and a <span class="u">tax information and impact note</span> were published on 13 September 2017.</p>`)}`,md:[{tag:1,code:`### 1.16. Cars: increasing the diesel supplement`},{tag:2,code:`The diesel supplement rises from 3% to 4%, on and
after 6 April 2018. A [tax information and impact
note](#annex-b) is published at Annex B.`},{tag:3,code:`### 1.17. Company car tax and VED: CO2 regime`},{tag:4,code:`NEDC-compatible CO2 figures are used for company
car tax until April 2020.`},{tag:5,code:`## Pensions Tax
### 1.18. Master trust tax registration`},{tag:6,code:`Powers to register and de-register master trust
pension schemes. [Draft legislation](#) published
13 September 2017.`}]}},n={md:[`Parse`,`Parsing`,`Parsed`],json:[`Extract`,`Extracting`,`Extracted`],classify:[`Classify`,`Classifying`,`Classified`],split:[`Split`,`Splitting`,`Split`]};return{get:(t,r,i={})=>{let a=e[t],[o,s,c]=n[r];return Object.assign({file:a.file,page:a.page,note:a.note,page_html:a.page_html,fmt:r===`md`?`Markdown`:`JSON`,blocks:a[r],app:`LlamaParse · `+o,doing:s,done:c},i)}}})();export{n as t};