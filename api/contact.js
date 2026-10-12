// Vercel Function: POST /api/contact
//
// Receives the lead-magnet form (src/components/LeadMagnet.astro) and forwards
// it to the Cenvyro CRM webhook. The webhook URL is a server-only secret read
// from CENVYRO_WEBHOOK_URL — never give it a PUBLIC_ prefix, or Astro would
// ship it to the browser.
//
// Lives in the root `api/` folder (not `src/pages/api`) because the site is a
// static Astro build with no SSR adapter; Vercel deploys this file as its own
// function alongside the static output. `npm run dev` does not serve it — use
// `vercel dev` to exercise it locally.

const FIELD_LIMITS = { name: 120, email: 254, business: 160, website: 300 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Set here rather than taken from the form, so a submitter cannot put arbitrary
// text into the subject line of the CRM record or its notification emails.
const SUBJECT = 'New Lead Leak Audit Request | GrowthPeak Digital';
// Any scheme other than http(s) (javascript:, data:, …) could become a live link
// wherever the CRM renders the website field, so such values are dropped. No
// dots allowed in the scheme part, so "yourbusiness.com:8080" is not mistaken
// for one.
const UNSAFE_SCHEME_RE = /^(?!https?:)[a-z][a-z0-9+-]*:/i;

export async function POST(request) {
  // JS submits ask for JSON; the no-JS native form post gets an HTML page back.
  const wantsJson = (request.headers.get('accept') ?? '').includes('application/json');
  const reply = (status, success, message) =>
    wantsJson
      ? Response.json({ success, message }, { status, headers: { 'Cache-Control': 'no-store' } })
      : new Response(htmlPage(success, message), {
          status,
          headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store' },
        });

  // Cross-site check: browsers send Origin on every form POST, so a mismatch
  // means another site is posting into this form. A missing Origin (curl, old
  // clients) is let through: it is trivially spoofed, so rejecting it would
  // risk real leads without stopping a determined bot. Rate limiting belongs in
  // the Vercel firewall, not here, since function instances share no memory.
  const origin = request.headers.get('origin');
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host');
  if (origin !== null && !sameHost(origin, host)) {
    return reply(403, false, 'This form can only be submitted from our website.');
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return reply(400, false, 'Invalid form submission.');
  }

  // Honeypot: bots tick the hidden checkbox. Pretend success and drop the lead.
  if (form.get('botcheck')) return reply(200, true, 'Thanks — your request has been received.');

  const field = (key) => String(form.get(key) ?? '').trim().slice(0, FIELD_LIMITS[key]);
  const lead = {
    name: field('name'),
    email: field('email'),
    business: field('business'),
    website: field('website'),
    subject: SUBJECT,
  };
  if (UNSAFE_SCHEME_RE.test(lead.website)) lead.website = '';

  if (!lead.name || !EMAIL_RE.test(lead.email)) {
    return reply(400, false, 'Please provide your name and a valid email address.');
  }

  const webhookUrl = process.env.CENVYRO_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('[api/contact] CENVYRO_WEBHOOK_URL is not set; lead was not forwarded.');
    return reply(500, false, 'The form is temporarily unavailable.');
  }

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...lead,
        source: 'growthpeakdigital.com — Free Audit form',
        submittedAt: new Date().toISOString(),
      }),
      signal: AbortSignal.timeout(10_000),
      // The webhook is a fixed endpoint, so a redirect is unexpected: fail rather
      // than follow it somewhere else with the lead data.
      redirect: 'error',
    });
    if (!res.ok) {
      console.error(`[api/contact] Cenvyro webhook responded ${res.status}.`);
      return reply(502, false, 'We could not send your request.');
    }
  } catch (err) {
    // Log the error type only. A malformed CENVYRO_WEBHOOK_URL makes fetch throw
    // "Failed to parse URL from <url>", which would write the secret to the logs.
    console.error('[api/contact] Cenvyro webhook request failed:', err?.name, err?.cause?.code ?? err?.code ?? '');
    return reply(502, false, 'We could not send your request.');
  }

  return reply(200, true, 'Thanks — your request has been received.');
}

function sameHost(origin, host) {
  try {
    return Boolean(host) && new URL(origin).host === host;
  } catch {
    return false; // "null" (sandboxed or privacy-redirected contexts) or garbage
  }
}

// Minimal confirmation page for visitors without JavaScript, matching the dark theme.
function htmlPage(success, message) {
  const title = success ? 'Request received' : 'Something went wrong';
  const detail = success
    ? message
    : `${message} Please go back and try again, or email hello@growthpeakdigital.com.`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex"><title>${title} | GrowthPeak Digital</title></head>
<body style="margin:0;min-height:100vh;display:grid;place-items:center;background:#0B132B;color:#fff;font-family:system-ui,sans-serif;padding:16px">
<main style="max-width:32rem;text-align:center"><h1>${title}</h1><p style="color:#94a3b8">${detail}</p>
<p><a href="/" style="color:#00D2FF">Back to GrowthPeak Digital</a></p></main></body></html>`;
}
