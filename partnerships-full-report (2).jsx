import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Clash+Display:wght@600;700&family=Cabinet+Grotesk:wght@400;500;700;800&display=swap');`;

const C = {
  navy: "#0b1f45", blue: "#1d4ed8", sky: "#3b82f6", teal: "#0891b2",
  green: "#059669", amber: "#d97706", red: "#dc2626", purple: "#7c3aed",
  pink: "#db2777", bg: "#f0f4ff", card: "#ffffff", border: "#e2e8f0",
  muted: "#64748b", text: "#0f172a",
};

const INIT = {
  period: "April 22 – April 28, 2026",
  quarter: "Q2 Week 3",
  submittedBy: "Natalia Garzon, Partnerships Manager",
  summary: "One deal closed this week — $800 ARR from a VSCPA webinar attendee. The Partnerships Strategic Plan is a work in progress; several deliverables are pending based on conversations with Lina. On the events front: the FICPA Niche Report Webinar was a success with 147 attendees and 26 opt-in leads — the leads list has been received and outreach starts this week. The Negozee Demo Day (Apr 22) could not be held due to commitments on Frankie's side and will be rescheduled. All reporting is against the official $1M annual target; v2 plan remains pending leadership approval.",

  closedARR: 800, priorARR: 2000,
  dealsWon: 1, priorDeals: 2,
  avgACV: 800,
  ytdARR: 54449, ytdCustomers: 45,
  totalLeads: 27, icpLeads: 2,
  annualTarget: 1000000, ytdExpected: 196667,
  q2Target: 250000, q2ARR: 2800,

  weeklyARR: [
    { week: "Mar 25–31", arr: 0 },
    { week: "Apr 1–7", arr: 0 },
    { week: "Apr 8–14", arr: 0 },
    { week: "Apr 15–21", arr: 2000 },
    { week: "Apr 22–28", arr: 800 },
  ],

  funnelRows: [
    { stage: "Total Leads", target: 6000, actual: 388 },
    { stage: "MQLs", target: 3000, actual: 25 },
    { stage: "SQLs", target: 1000, actual: 14 },
    { stage: "Customers", target: 500, actual: 45 },
    { stage: "Lost", target: null, actual: 1 },
    { stage: "Revenue ($)", target: 1000000, actual: 54449 },
  ],

  monthlyRevenue: [
    { month: "Jan 2026", customers: 28, arr: 34749, acv: 1241 },
    { month: "Feb 2026", customers: 7, arr: 9000, acv: 1285 },
    { month: "Mar 2026", customers: 7, arr: 7900, acv: 1128 },
    { month: "Apr (WTD)", customers: 3, arr: 2800, acv: 933 },
  ],

  dealsLog: [
    { partner: "VSCPA", source: "Affiliate", firmSize: "ch1 — Solo", acv: 800, closeDate: "Apr 22–28" },
  ],

  eventPerformance: [
    { event: "Negozee Demo Day", partner: "Negozee", date: "Apr 22", attendees: null, leads: null, demos: null, revenue: null, kpiLeads: 10, kpiDemos: 3, status: "⚫ Cancelled" },
    { event: "FICPA Niche Report Webinar", partner: "FICPA", date: "Apr 23", attendees: 147, leads: 26, demos: null, revenue: null, kpiLeads: 25, kpiDemos: 5, status: "🟢 Complete" },
  ],

  partnerHealth: [
    { name: "FICPA", type: "Affiliate", health: "🟢", rev: 0, note: "Webinar completed — 147 attendees, 26 opt-in leads. List received; outreach starts this week." },
    { name: "Negozee", type: "Affiliate", health: "🟡", rev: 8400, note: "Demo Day cancelled (Apr 22) due to Frankie's commitments — needs rescheduling. $8,400 since Sep 2025." },
    { name: "Tech Solutions", type: "Channel", health: "🟡", rev: 0, note: "Agreement sent to potential channel partner — waiting for feedback." },
    { name: "Workflows for Tax Pros", type: "Affiliate", health: "🟢", rev: 30359, note: "Agreement approved by Jon and sent to Jamie. $30,359 YTD revenue." },
    { name: "Exceed Sales", type: "Affiliate", health: "🟢", rev: 3100, note: "Agreement approved and signed by both parties. $3,100 YTD." },
    { name: "Right Exit", type: "Channel", health: "🔴", rev: 0, note: "Call scheduled today with Jon to discuss further. Agreement not yet approved." },
    { name: "NAEA", type: "Affiliate", health: "🟡", rev: 1900, note: "Webinar confirmed May 20 · $1,900 YTD" },
    { name: "VSCPA", type: "Affiliate", health: "🟡", rev: 800, note: "1 deal closed this week · $800 YTD" },
  ],

  affiliateDirectory: [
    { name: "California Society of CPAs (CALCPA)", website: "https://www.calcpa.org/", contact: "Denise Bethel", email: "Denise.Bethel@calcpa.org", audience: 41000, state: "California", fee: 30450, sponsorship: "NA" },
    { name: "California Society of Enrolled Agents (CSEA)", website: "https://www.csea.org/", contact: "Erica Farr", email: "efarr@csea.org", audience: 2000, state: "California", fee: 10000, sponsorship: "Industry Partnership Pro" },
    { name: "Colorado Society of CPAs (COCPA)", website: "https://cocpa.org/", contact: "Derrol Moorhead", email: "derrol@cocpa.org", audience: 6400, state: "Colorado", fee: 7250, sponsorship: "Preferred Provider" },
    { name: "Florida Institute of CPAs (FICPA)", website: "https://www.ficpa.org/", contact: "Marjorie Stone", email: "MarjorieS@ficpa.org", audience: 18500, state: "Florida", fee: 10000, sponsorship: "NA" },
    { name: "Florida Society of Enrolled Agents (FSEA)", website: "https://fseaonline.org/", contact: "Ericka Williams", email: "EWilliams@trinityglobalfinancial.com", audience: 650, state: "Florida", fee: 4500, sponsorship: "Gold Sponsor" },
    { name: "Illinois Society of CPA's (ICPAS)", website: "https://www.icpas.org/", contact: "Kristin McGill / Geoffrey Brown", email: "mcgillk@icpas.org / browng@icpas.org", audience: 21000, state: "Illinois", fee: 12000, sponsorship: "—" },
    { name: "Indiana Society of CPAs (INCPAS)", website: "https://www.incpas.org/", contact: "Jennifer Rowell", email: "sponsors@incpas.org", audience: 8000, state: "Indiana", fee: 9400, sponsorship: "NA" },
    { name: "Maryland Association of CPAs (MACPA)", website: "https://www.macpa.org/", contact: "Amanda O'Dell", email: "amanda@macpa.org", audience: 8600, state: "Maryland", fee: 10000, sponsorship: "Strategic Partner" },
    { name: "Massachusetts Society of CPAs (MASSCPA)", website: "https://www.masscpas.org", contact: "Kristin Wells", email: "lhebner@masscpas.org / kwells@masscpas.org", audience: 11500, state: "Massachusetts", fee: 10000, sponsorship: "Corporate Partner" },
    { name: "Minnesota Chapter of National Association (MNCPA)", website: "https://www.mnnatp.com/", contact: "Leslie Muller", email: "lmueller@mncpa.org", audience: 7100, state: "Minnesota", fee: 10000, sponsorship: "NA" },
    { name: "National Association of Enrolled Agents (NAEA)", website: "https://www.naea.org/", contact: "Kelli Comegys", email: "kcomegys@naea.org", audience: 11000, state: "National", fee: 20000, sponsorship: "Gold Level" },
    { name: "NAVA", website: "https://navaschoolofbusiness.com", contact: "Erick Martinez", email: "erick@navaschoolofbusiness.com", audience: 150, state: "National", fee: 19000, sponsorship: "Platinum" },
    { name: "Negozee", website: "https://negozee.com/", contact: "Tony Martinez", email: "tony@negozee.com", audience: null, state: "National", fee: 10000, sponsorship: "NA" },
    { name: "New Jersey CPA (NJCPA)", website: "https://www.njcpa.org/", contact: "Eileen Proven", email: "EProven@njcpa.org", audience: 14000, state: "New Jersey", fee: 10000, sponsorship: "Premier" },
    { name: "Texas Society of CPAs (TXCPA)", website: "https://www.tx.cpa/", contact: "Lani Sheperd", email: "lshepherd@tx.cpa", audience: 28000, state: "Texas", fee: null, sponsorship: "—" },
    { name: "Virginia Society of CPAs (VSCPA)", website: "https://www.vscpa.com/", contact: "Amanda O'Dell", email: "ao'dell@vscpa.com", audience: 12000, state: "Virginia", fee: 10000, sponsorship: "NA" },
  ],

  nextWeekForecast: [
    { event: "FICPA Webinar — leads outreach", type: "Follow-up", expectedLeads: 24, expectedCustomers: 3, date: "Pending list" },
    { event: "Negozee Demo Day — reschedule", type: "Follow-up", expectedLeads: 10, expectedCustomers: 3, date: "TBD" },
  ],

  partners: [
    { name: "Negozee", type: "Affiliate", activity: "Demo Day — Reschedule", status: "🟡", notes: "Cancelled Apr 22 (Frankie unavailable) — rescheduling in progress" },
    { name: "FICPA", type: "Affiliate", activity: "Niche Report Webinar", status: "🟢", notes: "Completed Apr 23 · 147 attendees · 26 leads · Outreach starts this week" },
    { name: "Workflows for Tax Pros", type: "Affiliate", activity: "Agreement", status: "🟢", notes: "Approved by Jon and sent to Jamie" },
    { name: "Exceed Sales", type: "Affiliate", activity: "Agreement", status: "🟢", notes: "Approved and signed by both parties" },
    { name: "Right Exit", type: "Channel", activity: "Partnership agreement", status: "🔴", notes: "Call with Jon today — agreement not yet approved" },
    { name: "Tech Solutions", type: "Channel", activity: "Channel agreement", status: "🟡", notes: "Agreement sent — waiting for feedback" },
    { name: "NAEA", type: "Affiliate", activity: "Webinar confirmed", status: "🟡", notes: "May 20 — Tax Return Delivery" },
    { name: "COCPA", type: "Affiliate", activity: "Webinar confirmed", status: "🟡", notes: "May 14 — Member Appreciation" },
    { name: "CALCPA", type: "Affiliate", activity: "Webinar confirmed", status: "🟡", notes: "June 22 — Tax Return Delivery" },
  ],

  webinars: [
    { month: "April", type: "Demo", partner: "Negozee", event: "Demo Day", date: "TBD", time: "TBD", duration: "30 min", status: "🟡" },
    { month: "April", type: "Webinar", partner: "FICPA", event: "Niche Report", date: "Apr 23", time: "11am–Noon", duration: "50 min", status: "🟢" },
    { month: "May", type: "Webinar", partner: "COCPA", event: "Member Appreciation", date: "May 14", time: "TBD", duration: "50 min", status: "🟡" },
    { month: "May", type: "Webinar", partner: "NAEA", event: "Tax Return Delivery", date: "May 20", time: "1:00pm EST", duration: "60 min", status: "🟡" },
    { month: "May", type: "Webinar", partner: "MNCPA", event: "Tax Return Delivery", date: "May 27", time: "Noon", duration: "50 min", status: "🟡" },
    { month: "May", type: "Demo", partner: "MASSCPA", event: "Demo Day", date: "May 28", time: "3:45pm EST", duration: "30 min", status: "🟡" },
    { month: "June", type: "Webinar", partner: "INCPAS", event: "Tax Return Delivery", date: "Jun 3", time: "Noon", duration: "50 min", status: "🟡" },
    { month: "June", type: "Webinar", partner: "CALCPA", event: "Tax Return Delivery", date: "Jun 22", time: "4:00–5:00pm", duration: "60 min", status: "🟡" },
  ],

  inPerson: [
    { month: "May", partner: "VSCPA", event: "VSCPA Ignite", date: "May 7–8", location: "Richmond, VA", status: "🟡" },
    { month: "May", partner: "NAVA", event: "Tax Colloquium", date: "May 25–27", location: "Las Vegas, NV", status: "🟡" },
    { month: "June", partner: "FSEA", event: "FSEA Annual Convention", date: "Jun 11–13", location: "Miramar Beach, FL", status: "🟡" },
    { month: "June", partner: "FICPA", event: "FICPA MEGA Conference", date: "Jun 14–16", location: "Orlando, FL", status: "🟡" },
    { month: "June", partner: "CSEA", event: "Super Seminar", date: "Jun 16–18", location: "Reno, NV", status: "🟡" },
    { month: "June", partner: "NJCPA", event: "NJCPA Convention Expo", date: "Jun 17–18", location: "Atlantic City, NJ", status: "🟡" },
    { month: "June", partner: "MACPA", event: "MACPA Mid-Atlantic Coastal", date: "Jun 22–24", location: "Ocean City, MD", status: "🟡" },
  ],

  coMarketing: [
    { partner: "Negozee", type: "Affiliate", activities: ["Demo Day (rescheduling)"] },
    { partner: "FICPA", type: "Affiliate", activities: ["Webinar — Niche Report (completed Apr 23)", "FICPA MEGA Conference Jun 14–16"] },
    { partner: "Workflows for Tax Pros", type: "Affiliate", activities: ["Email campaigns via Jamie", "Social media promotion"] },
    { partner: "NAEA", type: "Affiliate", activities: ["Webinar — Tax Return Delivery (May 20)", "Blog post (planned)"] },
    { partner: "CALCPA", type: "Affiliate", activities: ["Webinar — Tax Return Delivery (Jun 22)", "Small Firm Navigator article (planned)"] },
    { partner: "MASSCPA", type: "Affiliate", activities: ["Demo Day (May 28)"] },
    { partner: "VSCPA", type: "Affiliate", activities: ["VSCPA Ignite conference (May 7–8)", "Email to members"] },
    { partner: "COCPA", type: "Affiliate", activities: ["Webinar — Member Appreciation (May 14)"] },
  ],

  risks: [
    { risk: "ACV dropped to $800 in latest deal", impact: "Medium", likelihood: "Medium", mitigation: "Monitor May ACV; expect recovery as post-tax season pipeline matures" },
    { risk: "Right Exit agreement not yet approved", impact: "Medium", likelihood: "High", mitigation: "Call with Jon today — outcome to determine next steps" },
    { risk: "FICPA leads outreach not yet started", impact: "Medium", likelihood: "Low", mitigation: "List received — outreach begins this week" },
    { risk: "Negozee Demo Day not rescheduled", impact: "Medium", likelihood: "Medium", mitigation: "Coordinate with Frankie to find new date ASAP" },
    { risk: "Partnerships funnel plan under development", impact: "High", likelihood: "Medium", mitigation: "New partnership funnel plan in progress — prioritize completion this week" },
  ],

  focus: [
    "Start FICPA leads outreach — list received, send Thank You email and begin 1:1 outreach this week",
    "Reschedule Negozee Demo Day — coordinate with Frankie for new date",
    "Finalize Right Exit outcome — follow up on today's call with Jon and define next steps",
    "New partnership funnel plan — continue building and align with Lina on deliverables and timeline",
    "Prepare for MASSCPA Demo Day (May 28) — confirm logistics, UTM links, and follow-up plan",
    "Begin co-marketing planning with signed partners (Workflows for Tax Pros, Exceed Sales)",
  ],

  support: [
    { label: "Decision needed", detail: "Alignment on revised 2026 targets ($333K–$397K baseline / up to $528K with ACV recovery)" },
    { label: "Support needed", detail: "Right Exit — outcome of today's call with Jon needed to unblock agreement" },
    { label: "Escalation", detail: "Channel Partner Self-Service Activation bug — need DevOps confirmation this week" },
    { label: "Resource needed", detail: "HubSpot access for UTM attribution reporting" },
  ],
};

const Section = ({ title, icon, children, accent = C.blue }) => (
  <div style={{ marginBottom: 28 }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 4, height: 22, background: accent, borderRadius: 99 }} />
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: accent }}>{icon} {title}</span>
    </div>
    {children}
  </div>
);

const Card = ({ children, style = {} }) => (
  <div style={{ background: C.card, borderRadius: 16, padding: "20px 24px", boxShadow: "0 2px 16px rgba(11,31,69,0.07)", border: `1px solid ${C.border}`, ...style }}>
    {children}
  </div>
);

const Badge = ({ children, color }) => (
  <span style={{ background: color + "18", color, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 99, letterSpacing: "0.04em", whiteSpace: "nowrap" }}>{children}</span>
);

const KpiTile = ({ label, value, delta, sub, accent, index = 0 }) => {
  const isPos = delta > 0;
  return (
    <div style={{
      background: C.card, border: `1.5px solid ${accent}40`, borderTop: `3px solid ${accent}`,
      borderRadius: 14, padding: "18px 20px", flex: 1, minWidth: 140,
      animation: `fadeUp 0.4s ease both`, animationDelay: `${index * 0.07}s`,
    }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.muted, textTransform: "uppercase", marginBottom: 8 }}>{label}</div>
      <div style={{ fontSize: 32, fontWeight: 800, color: C.text, fontFamily: "'Clash Display', sans-serif", lineHeight: 1 }}>{value}</div>
      {delta !== null && delta !== undefined && (
        <div style={{ fontSize: 12, fontWeight: 700, color: isPos ? C.green : C.red, marginTop: 6 }}>
          {isPos ? "▲" : "▼"} {Math.abs(delta)}% WoW
        </div>
      )}
      {sub && <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{sub}</div>}
    </div>
  );
};

export default function FullReport() {
  const [d, setD] = useState(INIT);
  const [tab, setTab] = useState("overview");
  const [editing, setEditing] = useState(false);

  const quotaPace = Math.round((d.ytdARR / d.annualTarget) * 100);
  const behind = d.ytdARR - d.ytdExpected;
  const wowARR = d.priorARR === 0 ? null : Math.round(((d.closedARR - d.priorARR) / d.priorARR) * 100);
  const wowDeals = d.priorDeals === 0 ? null : Math.round(((d.dealsWon - d.priorDeals) / d.priorDeals) * 100);
  const maxARR = Math.max(...d.weeklyARR.map(w => w.arr), 1);
  const topPartnersByRev = [...d.partnerHealth].sort((a, b) => b.rev - a.rev);

  const upd = (k, v) => setD(p => ({ ...p, [k]: isNaN(+v) || typeof v === "boolean" ? v : +v }));

  const TABS = [
    { id: "overview", label: "Overview" },
    { id: "pipeline", label: "Pipeline" },
    { id: "partners", label: "Partners" },
    { id: "calendar", label: "Calendar" },
    { id: "risks", label: "Risks & Actions" },
  ];

  const typeColor = (t) => t === "Affiliate" ? C.purple : t === "Channel" ? C.teal : C.sky;

  return (
    <div style={{ fontFamily: "'Cabinet Grotesk', 'Segoe UI', sans-serif", background: C.bg, minHeight: "100vh" }}>
      <style>{`
        ${FONTS}
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: #c7d2fe; border-radius: 99px; }
        table { border-collapse: collapse; width: 100%; }
        th { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: ${C.muted}; padding: 8px 12px; text-align: left; border-bottom: 1.5px solid ${C.border}; }
        td { font-size: 13px; color: ${C.text}; padding: 9px 12px; border-bottom: 1px solid ${C.border}; vertical-align: middle; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: #f8faff; }
        input[type=text], input[type=number], textarea { font-family: inherit; padding: 7px 11px; border-radius: 8px; border: 1.5px solid ${C.border}; font-size: 13px; width: 100%; outline: none; background: #fafbff; }
        input:focus, textarea:focus { border-color: ${C.sky}; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: `linear-gradient(135deg, ${C.navy} 0%, #1a3a6b 100%)`, padding: "28px 32px 0", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 4px 24px rgba(11,31,69,0.18)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontFamily: "'Clash Display', sans-serif", letterSpacing: "-0.01em" }}>
              Partnerships — Weekly CRO Report
            </div>
            <div style={{ fontSize: 13, color: "#93b4e8", marginTop: 3 }}>
              {d.period} · {d.quarter} · {d.submittedBy}
            </div>
          </div>
          <button onClick={() => setEditing(e => !e)} style={{
            background: editing ? C.sky : "rgba(255,255,255,0.12)", color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 10, padding: "8px 18px",
            fontWeight: 700, fontSize: 12, cursor: "pointer", letterSpacing: "0.05em", fontFamily: "inherit",
          }}>
            {editing ? "✓ Done Editing" : "✏️ Edit Report"}
          </button>
        </div>
        <div style={{ display: "flex", gap: 2 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              background: tab === t.id ? "#fff" : "transparent",
              color: tab === t.id ? C.navy : "rgba(255,255,255,0.65)",
              border: "none", borderRadius: "10px 10px 0 0", padding: "9px 18px",
              fontWeight: 700, fontSize: 12, cursor: "pointer", fontFamily: "inherit",
              letterSpacing: "0.03em", transition: "all 0.15s",
            }}>{t.label}</button>
          ))}
        </div>
      </div>

      <div style={{ padding: "28px 32px", maxWidth: 1100, margin: "0 auto" }}>

        {/* ── OVERVIEW TAB ── */}
        {tab === "overview" && <>

          <Section title="Executive Summary" icon="📝" accent={C.blue}>
            <Card>
              {editing
                ? <textarea rows={4} value={d.summary} onChange={e => upd("summary", e.target.value)} style={{ resize: "vertical" }} />
                : <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: C.text }}>{d.summary}</p>}
            </Card>
          </Section>

          <Section title="This Week" icon="📊" accent={C.teal}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
              <KpiTile label="Closed ARR" value={`$${d.closedARR.toLocaleString()}`} delta={wowARR} sub={`vs $${d.priorARR.toLocaleString()} prior week`} accent={C.sky} index={0} />
              <KpiTile label="Deals Won" value={d.dealsWon} delta={wowDeals} sub={`vs ${d.priorDeals} prior week`} accent={C.purple} index={1} />
              <KpiTile label="Avg ACV" value={`$${d.avgACV.toLocaleString()}`} sub="Q1 avg: $1,219" accent={C.amber} index={2} />
              <KpiTile label="ICP-fit Leads" value={d.icpLeads} sub={`of ${d.totalLeads} total leads`} accent={C.green} index={3} />
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <KpiTile label="YTD ARR" value={`$${d.ytdARR.toLocaleString()}`} sub="Annual target: $1,000,000" accent={C.teal} index={4} />
              <KpiTile label="YTD Customers" value={d.ytdCustomers} sub="Annual target: 500" accent={C.pink} index={5} />
              <div style={{
                background: C.card, border: `1.5px solid ${quotaPace < 50 ? C.red : C.green}40`,
                borderTop: `3px solid ${quotaPace < 50 ? C.red : C.green}`,
                borderRadius: 14, padding: "18px 20px", flex: 1, minWidth: 200,
                animation: "fadeUp 0.4s ease both", animationDelay: "0.42s",
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", color: C.muted, textTransform: "uppercase", marginBottom: 8 }}>Quota Pace</div>
                <div style={{ fontSize: 32, fontWeight: 800, color: C.text, fontFamily: "'Clash Display', sans-serif", lineHeight: 1 }}>{quotaPace}%</div>
                <div style={{ margin: "10px 0 4px", background: "#f1f5f9", borderRadius: 99, height: 7, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(quotaPace, 100)}%`, background: quotaPace < 50 ? C.red : C.green, borderRadius: 99, transition: "width 0.6s ease" }} />
                </div>
                <div style={{ fontSize: 12, color: C.red, fontWeight: 700 }}>${Math.abs(behind).toLocaleString()} {behind < 0 ? "behind" : "ahead"} of $1M pace</div>
                <div style={{ fontSize: 11, color: C.muted }}>${d.ytdARR.toLocaleString()} of ${d.ytdExpected.toLocaleString()} expected YTD</div>
              </div>
            </div>
          </Section>

          {/* Q2 Progress Bar */}
          <Section title="Q2 Progress" icon="📅" accent={C.purple}>
            <Card>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Q2 ARR vs Q2 Target</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>April – June 2026</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 26, fontWeight: 800, color: C.text, fontFamily: "'Clash Display', sans-serif" }}>${d.q2ARR.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>of ${d.q2Target.toLocaleString()} Q2 target</div>
                </div>
              </div>
              <div style={{ background: "#f1f5f9", borderRadius: 99, height: 12, overflow: "hidden", marginBottom: 8 }}>
                <div style={{
                  height: "100%", width: `${Math.min(Math.round((d.q2ARR / d.q2Target) * 100), 100)}%`,
                  background: `linear-gradient(90deg, ${C.purple}, ${C.sky})`,
                  borderRadius: 99, transition: "width 0.6s ease", minWidth: d.q2ARR > 0 ? 8 : 0,
                }} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: C.purple }}>{Math.round((d.q2ARR / d.q2Target) * 100)}% of Q2 target</div>
                <div style={{ fontSize: 12, color: C.muted }}>${(d.q2Target - d.q2ARR).toLocaleString()} remaining</div>
              </div>
            </Card>
          </Section>

          {/* Weekly ARR Chart */}
          <Section title="Weekly ARR Trend" icon="📈" accent={C.sky}>
            <Card>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>Partnerships pipeline — won deals by week</div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 110 }}>
                {d.weeklyARR.map((w, i) => {
                  const h = Math.max((w.arr / maxARR) * 90, 5);
                  const isLast = i === d.weeklyARR.length - 1;
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: isLast ? C.sky : C.muted }}>
                        {w.arr > 0 ? `$${w.arr.toLocaleString()}` : "—"}
                      </div>
                      <div style={{
                        width: "100%", height: `${h}%`, minHeight: 6,
                        background: isLast ? `linear-gradient(180deg, ${C.sky}, ${C.blue})` : C.border,
                        borderRadius: "6px 6px 0 0", transition: "height 0.5s ease",
                      }} />
                      <div style={{ fontSize: 10, color: C.muted, textAlign: "center", lineHeight: 1.3 }}>{w.week}</div>
                    </div>
                  );
                })}
              </div>
              {editing && (
                <div style={{ marginTop: 16, padding: "12px 0 0", borderTop: `1px solid ${C.border}` }}>
                  <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}>Add week to chart:</div>
                  <div style={{ display: "flex", gap: 8 }}>
                    {["week", "arr"].map(k => (
                      <input key={k} placeholder={k === "week" ? "Label (e.g. Apr 22–28)" : "ARR $"} id={`nw-${k}`} style={{ flex: 1 }} />
                    ))}
                    <button onClick={() => {
                      const w = document.getElementById("nw-week").value;
                      const a = +document.getElementById("nw-arr").value || 0;
                      if (w) setD(p => ({ ...p, weeklyARR: [...p.weeklyARR, { week: w, arr: a }] }));
                    }} style={{ background: C.sky, color: "#fff", border: "none", borderRadius: 8, padding: "7px 14px", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 12 }}>
                      + Add
                    </button>
                  </div>
                </div>
              )}
            </Card>
          </Section>

          {/* Deals Log */}
          <Section title="Deals Closed This Week" icon="🏆" accent={C.green}>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <table>
                <thead><tr><th>Close Date</th><th>Partner Source</th><th>Type</th><th>Firm Size</th><th>ACV</th></tr></thead>
                <tbody>
                  {d.dealsLog.map((deal, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{deal.closeDate}</td>
                      <td style={{ fontWeight: 700 }}>{deal.partner}</td>
                      <td><Badge color={typeColor(deal.source)}>{deal.source}</Badge></td>
                      <td style={{ fontSize: 12, color: C.muted }}>{deal.firmSize}</td>
                      <td style={{ fontWeight: 700, color: C.green }}>${deal.acv.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Section>

          {/* MoM Revenue */}
          <Section title="Month-over-Month Revenue" icon="💰" accent={C.green}>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <table>
                <thead><tr><th>Period</th><th>Customers</th><th>ARR</th><th>Avg ACV</th><th>Δ vs Prior</th></tr></thead>
                <tbody>
                  {d.monthlyRevenue.map((r, i) => {
                    const prev = d.monthlyRevenue[i - 1];
                    const delta = prev ? r.arr - prev.arr : null;
                    const pct = prev && prev.arr > 0 ? Math.round((delta / prev.arr) * 100) : null;
                    return (
                      <tr key={i}>
                        <td style={{ fontWeight: 600 }}>{r.month}</td>
                        <td>{r.customers}</td>
                        <td style={{ fontWeight: 700 }}>${r.arr.toLocaleString()}</td>
                        <td>${r.acv.toLocaleString()}</td>
                        <td style={{ color: delta === null ? C.muted : delta >= 0 ? C.green : C.red, fontWeight: 600 }}>
                          {delta === null ? "—" : `${delta >= 0 ? "+" : ""}$${delta.toLocaleString()} (${pct}%)`}
                        </td>
                      </tr>
                    );
                  })}
                  <tr style={{ background: "#f8faff", fontWeight: 700 }}>
                    <td>Q1 Total</td><td>42</td><td>$51,649</td><td>~$1,219</td><td>—</td>
                  </tr>
                  <tr style={{ background: "#eff6ff", fontWeight: 800, borderTop: `2px solid ${C.sky}` }}>
                    <td style={{ color: C.blue }}>YTD Total</td>
                    <td style={{ color: C.blue }}>45</td>
                    <td style={{ color: C.blue }}>$54,449</td>
                    <td style={{ color: C.blue }}>~$1,210</td>
                    <td style={{ color: C.muted }}>—</td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </Section>
        </>}

        {/* ── PIPELINE TAB ── */}
        {tab === "pipeline" && <>
          <Section title="YTD Funnel — Annual Goal Tracking" icon="🎯" accent={C.blue}>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <table>
                <thead><tr><th>Stage</th><th>Annual Target</th><th>YTD Actual</th><th>% of Annual</th><th>Progress</th><th>Remaining</th></tr></thead>
                <tbody>
                  {d.funnelRows.map((r, i) => {
                    const isLost = r.target === null;
                    const pct = isLost ? null : Math.round((r.actual / r.target) * 100);
                    return (
                      <tr key={i} style={{ background: isLost ? "#fff5f5" : "inherit" }}>
                        <td style={{ fontWeight: 600 }}>{r.stage}</td>
                        <td style={{ color: isLost ? C.muted : C.text }}>{isLost ? "—" : r.stage.includes("$") ? `$${r.target.toLocaleString()}` : r.target.toLocaleString()}</td>
                        <td style={{ fontWeight: 700, color: isLost ? C.red : pct < 5 ? C.red : pct < 20 ? C.amber : C.green }}>
                          {r.stage.includes("$") ? `$${r.actual.toLocaleString()}` : r.actual.toLocaleString()}
                        </td>
                        <td style={{ color: isLost ? C.muted : C.text }}>{isLost ? "—" : `${pct}%`}</td>
                        <td style={{ minWidth: 100 }}>
                          {!isLost && <div style={{ background: C.border, borderRadius: 99, height: 6, overflow: "hidden", width: 80 }}>
                            <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: pct < 5 ? C.red : pct < 20 ? C.amber : C.green, borderRadius: 99 }} />
                          </div>}
                        </td>
                        <td style={{ color: C.muted }}>
                          {isLost ? "—" : r.stage.includes("$") ? `$${(r.target - r.actual).toLocaleString()}` : (r.target - r.actual).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </Card>
            <div style={{ marginTop: 10, padding: "10px 14px", background: "#fff8e1", borderRadius: 10, border: `1px solid ${C.amber}40`, fontSize: 12, color: "#92400e" }}>
              ⚠️ Official annual target is $1M. A revised plan (v2) is currently under review with leadership — projecting $333K–$397K baseline — but has not yet been approved. All reporting is against the $1M target until further notice. ICP-fit leads critically low (11% ICP rate from VSCPA enrichment). Q2 campaigns must target 5+ employee firms explicitly.
            </div>
          </Section>

          {/* Next Week Pipeline Forecast */}
          <Section title="Next Week Pipeline Forecast" icon="🔮" accent={C.sky}>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <table>
                <thead><tr><th>Activity</th><th>Type</th><th>Date</th><th>Expected Leads</th><th>Expected Customers</th><th>Expected Revenue</th></tr></thead>
                <tbody>
                  {d.nextWeekForecast.map((f, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{f.event}</td>
                      <td><Badge color={f.type === "Follow-up" ? C.sky : f.type === "Outreach" ? C.green : C.amber}>{f.type}</Badge></td>
                      <td style={{ fontSize: 12, color: C.muted }}>{f.date}</td>
                      <td style={{ fontWeight: 700, color: f.expectedLeads > 0 ? C.blue : C.muted }}>{f.expectedLeads > 0 ? f.expectedLeads : "—"}</td>
                      <td style={{ fontWeight: 700, color: f.expectedCustomers > 0 ? C.green : C.muted }}>{f.expectedCustomers > 0 ? f.expectedCustomers : "—"}</td>
                      <td style={{ fontWeight: 700, color: C.green }}>{f.expectedCustomers > 0 ? `$${(f.expectedCustomers * 1280).toLocaleString()}` : "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Section>
        </>}

        {/* ── PARTNERS TAB ── */}
        {tab === "partners" && <>

          {/* Partner Health */}
          <Section title="Partner Health" icon="💚" accent={C.green}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12 }}>
              {d.partnerHealth.map((p, i) => {
                const hColor = p.health === "🟢" ? C.green : p.health === "🟡" ? C.amber : C.red;
                return (
                  <div key={i} style={{ background: C.card, border: `1.5px solid ${hColor}30`, borderLeft: `4px solid ${hColor}`, borderRadius: 12, padding: "14px 16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                      <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{p.name}</div>
                      <span style={{ fontSize: 16 }}>{p.health}</span>
                    </div>
                    <Badge color={typeColor(p.type)}>{p.type}</Badge>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>{p.note}</div>
                    {p.rev > 0 && <div style={{ fontSize: 12, fontWeight: 700, color: C.green, marginTop: 6 }}>💰 ${p.rev.toLocaleString()} revenue</div>}
                  </div>
                );
              })}
            </div>
          </Section>

          {/* Top Partners by Revenue */}
          <Section title="Partners by Revenue Contribution" icon="🥇" accent={C.amber}>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <table>
                <thead><tr><th>Rank</th><th>Partner</th><th>Type</th><th>YTD Revenue</th><th>Health</th><th>Notes</th></tr></thead>
                <tbody>
                  {topPartnersByRev.map((p, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 800, color: i === 0 ? C.amber : C.muted, fontSize: 15 }}>#{i + 1}</td>
                      <td style={{ fontWeight: 700 }}>{p.name}</td>
                      <td><Badge color={typeColor(p.type)}>{p.type}</Badge></td>
                      <td style={{ fontWeight: 700, color: p.rev > 0 ? C.green : C.muted }}>{p.rev > 0 ? `$${p.rev.toLocaleString()}` : "—"}</td>
                      <td style={{ fontSize: 16 }}>{p.health}</td>
                      <td style={{ fontSize: 12, color: C.muted }}>{p.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Section>

          {/* Affiliate Directory */}
          <Section title="Affiliate Partner Directory" icon="📋" accent={C.navy}>
            <div style={{ marginBottom: 10, padding: "10px 14px", background: "#eff6ff", borderRadius: 10, border: `1px solid ${C.sky}40`, fontSize: 12, color: "#1e40af" }}>
              💰 Total Investment: <strong>$182,600</strong> across {d.affiliateDirectory.length} affiliate partners
            </div>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <table>
                <thead>
                  <tr><th>Association</th><th>Contact</th><th>State</th><th>Audience</th><th>Fee</th><th>Sponsorship Level</th></tr>
                </thead>
                <tbody>
                  {d.affiliateDirectory.map((p, i) => (
                    <tr key={i}>
                      <td>
                        <a href={p.website} target="_blank" rel="noopener noreferrer" style={{ fontWeight: 700, color: C.blue, textDecoration: "none" }}>{p.name}</a>
                        <div style={{ fontSize: 11, color: C.muted }}>{p.email}</div>
                      </td>
                      <td style={{ fontSize: 12 }}>{p.contact}</td>
                      <td><Badge color={p.state === "National" ? C.purple : C.teal}>{p.state}</Badge></td>
                      <td style={{ fontWeight: 600 }}>{p.audience ? p.audience.toLocaleString() : "—"}</td>
                      <td style={{ fontWeight: 700, color: C.green }}>{p.fee ? `$${p.fee.toLocaleString()}` : "—"}</td>
                      <td style={{ fontSize: 12 }}><Badge color={p.sponsorship === "Platinum" ? C.purple : p.sponsorship === "Premier" || p.sponsorship === "Gold Level" || p.sponsorship === "Gold Sponsor" ? C.amber : p.sponsorship === "NA" || p.sponsorship === "—" ? C.muted : C.sky}>{p.sponsorship || "—"}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Section>

          {/* Partner Activity Log */}
          <Section title="Partner Activity Log" icon="🤝" accent={C.teal}>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <table>
                <thead><tr><th>Partner</th><th>Type</th><th>Activity</th><th>Status</th><th>Notes</th></tr></thead>
                <tbody>
                  {d.partners.map((p, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700 }}>{p.name}</td>
                      <td><Badge color={typeColor(p.type)}>{p.type}</Badge></td>
                      <td>{p.activity}</td>
                      <td style={{ fontSize: 16 }}>{p.status}</td>
                      <td style={{ color: C.muted, fontSize: 12 }}>{p.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Section>

          {/* Blocked Agreements */}
          <Section title="Blocked Agreements" icon="🔴" accent={C.red}>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {[
                { name: "Right Exit", block: "Call with Jon today — agreement not yet approved. Outcome pending." },
              ].map((b, i) => (
                <div key={i} style={{ flex: 1, minWidth: 200, background: "#fff5f5", border: `1.5px solid ${C.red}30`, borderLeft: `4px solid ${C.red}`, borderRadius: 12, padding: "14px 16px" }}>
                  <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{b.name}</div>
                  <div style={{ fontSize: 12, color: C.red, marginTop: 4 }}>{b.block}</div>
                </div>
              ))}
            </div>
          </Section>
        </>}

        {/* ── CALENDAR TAB ── */}
        {tab === "calendar" && <>

          {/* Event Performance Tracker */}
          <Section title="Event Performance Tracker" icon="🎯" accent={C.pink}>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <table>
                <thead>
                  <tr>
                    <th>Event</th><th>Partner</th><th>Date</th>
                    <th>Attendees</th>
                    <th>Leads (KPI: target)</th><th>Demos (KPI: target)</th>
                    <th>Revenue</th><th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {d.eventPerformance.map((e, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 700 }}>{e.event}</td>
                      <td>{e.partner}</td>
                      <td style={{ fontWeight: 600 }}>{e.date}</td>
                      <td style={{ color: e.attendees === null ? C.muted : C.text }}>{e.attendees ?? "—"}</td>
                      <td>
                        <span style={{ fontWeight: 700, color: e.leads === null ? C.muted : e.leads >= e.kpiLeads ? C.green : C.red }}>
                          {e.leads ?? "—"}
                        </span>
                        <span style={{ fontSize: 11, color: C.muted }}> / {e.kpiLeads} target</span>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700, color: e.demos === null ? C.muted : e.demos >= e.kpiDemos ? C.green : C.red }}>
                          {e.demos ?? "—"}
                        </span>
                        <span style={{ fontSize: 11, color: C.muted }}> / {e.kpiDemos} target</span>
                      </td>
                      <td style={{ fontWeight: 700, color: e.revenue === null ? C.muted : C.green }}>
                        {e.revenue !== null ? `$${e.revenue.toLocaleString()}` : "—"}
                      </td>
                      <td><Badge color={e.status.includes("Cancelled") ? "#6b7280" : e.status.includes("Complete") ? C.green : C.amber}>{e.status}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
            <div style={{ marginTop: 10, padding: "10px 14px", background: "#fdf2f8", borderRadius: 10, border: `1px solid ${C.pink}30`, fontSize: 12, color: "#9d174d" }}>
              📌 <strong>FICPA leads note:</strong> 1 lead was lost but opted in to receive info from us — likely still interested in TaxDome. Pipeline breakdown: 1 SQL, 1 MQL, remaining are new leads.
            </div>
          </Section>

          <Section title="Q2 Confirmed Webinars" icon="🗓️" accent={C.blue}>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <table>
                <thead><tr><th>Month</th><th>Type</th><th>Partner</th><th>Event</th><th>Date</th><th>Time</th><th>Duration</th><th>Status</th></tr></thead>
                <tbody>
                  {d.webinars.map((w, i) => (
                    <tr key={i} style={{ background: w.status === "🔴" ? "#fff8f8" : "#fff" }}>
                      <td style={{ fontWeight: 600, color: C.muted }}>{w.month}</td>
                      <td><Badge color={w.type === "Demo" ? C.purple : C.sky}>{w.type}</Badge></td>
                      <td style={{ fontWeight: 700 }}>{w.partner}</td>
                      <td>{w.event}</td>
                      <td style={{ fontWeight: 600 }}>{w.date}</td>
                      <td style={{ fontSize: 12, color: C.muted }}>{w.time}</td>
                      <td style={{ fontSize: 12, color: C.muted }}>{w.duration}</td>
                      <td style={{ fontSize: 16 }}>{w.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Section>

          <Section title="Q2 Confirmed In-Person Events" icon="📍" accent={C.teal}>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <table>
                <thead><tr><th>Month</th><th>Partner</th><th>Event</th><th>Date</th><th>Location</th><th>Status</th></tr></thead>
                <tbody>
                  {d.inPerson.map((e, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600, color: C.muted }}>{e.month}</td>
                      <td style={{ fontWeight: 700 }}>{e.partner}</td>
                      <td>{e.event}</td>
                      <td style={{ fontWeight: 600 }}>{e.date}</td>
                      <td style={{ fontSize: 12, color: C.muted }}>📍 {e.location}</td>
                      <td style={{ fontSize: 16 }}>{e.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Section>

          {/* Co-Marketing Activities */}
          <Section title="Co-Marketing Activities" icon="📣" accent={C.purple}>
            <Card>
              <p style={{ margin: 0, fontSize: 14, color: C.muted, lineHeight: 1.7 }}>
                📌 <strong>Coming next week:</strong> Co-marketing activities per partner (besides in-person events and webinars) — including blog posts, emails, articles, and social media — will be added for each partner.
              </p>
            </Card>
          </Section>
        </>}

        {/* ── RISKS & ACTIONS TAB ── */}
        {tab === "risks" && <>
          <Section title="Risks & Escalations" icon="⚠️" accent={C.red}>
            <Card style={{ padding: 0, overflow: "hidden" }}>
              <table>
                <thead><tr><th>Risk</th><th>Impact</th><th>Likelihood</th><th>Mitigation</th></tr></thead>
                <tbody>
                  {d.risks.map((r, i) => (
                    <tr key={i}>
                      <td style={{ fontWeight: 600 }}>{r.risk}</td>
                      <td><Badge color={r.impact === "High" ? C.red : r.impact === "Medium" ? C.amber : C.green}>{r.impact}</Badge></td>
                      <td><Badge color={r.likelihood === "High" ? C.red : r.likelihood === "Medium" ? C.amber : C.green}>{r.likelihood}</Badge></td>
                      <td style={{ fontSize: 12, color: C.muted }}>{r.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </Section>

          <Section title="Focus for Next Week (Apr 28 – May 4)" icon="🎯" accent={C.blue}>
            <Card>
              {d.focus.map((f, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: i < d.focus.length - 1 ? 12 : 0 }}>
                  <div style={{ width: 24, height: 24, borderRadius: 99, background: C.navy, color: "#fff", fontSize: 11, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: C.text }}>{f}</div>
                </div>
              ))}
            </Card>
          </Section>

          <Section title="Support Needed from Leadership" icon="🙋" accent={C.purple}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {d.support.map((s, i) => (
                <div key={i} style={{ background: C.card, border: `1.5px solid ${C.border}`, borderLeft: `4px solid ${C.purple}`, borderRadius: 12, padding: "12px 16px", display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <Badge color={C.purple}>{s.label}</Badge>
                  <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{s.detail}</div>
                </div>
              ))}
            </div>
          </Section>

          <div style={{ textAlign: "center", fontSize: 12, color: C.muted, marginTop: 24, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
            Next report: Wednesday, April 28, 2026 · Q2 Week 3
          </div>
        </>}

      </div>
    </div>
  );
}
