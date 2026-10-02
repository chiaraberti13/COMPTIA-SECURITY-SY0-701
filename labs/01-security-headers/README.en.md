# Lab 01 — Reading the app's security headers

| Field | Value |
|---|---|
| SY0-701 objectives | 2.5, 4.1 |
| Risk | `low` |
| Duration | 30 minutes |

You start this very app on your own computer, read the security headers the server adds to
every response, watch the browser block an unauthorised script and trip the request limit.
These are hardening (2.5) and application security (4.1) controls you will find in almost
every web application.

## Scenario

The security manager has to decide whether the study app can be published on a company
server. They ask you for a quick check: which protections the server applies to the web
interface, which it does not, and whether the AI endpoints are protected against excessive
use. You have to hand in the list of headers with their purpose and proof that the request
limit works.

## Prerequisites

- Node.js 24 and npm, with the repository cloned (see the main README).
- `curl`, already present on Linux, macOS and Windows 10 or later.
- A Chromium-based browser or Firefox, for step 3.
- No Gemini key: the exercise never calls the AI.
- Knowledge: what an HTTP header is; Domain 4 of the guide (objective 4.1).

## Topology

```text
[curl / browser] ──► 127.0.0.1:4190 [local app, production mode]
```

The server listens only on the loopback interface: no other computer on the network can
reach it. Every request stays on your machine.

## Setup

1. Build the app in production mode (the security headers are active only there):

   ```bash
   npm ci
   npm run build
   ```

2. Start the server on the loopback interface, on port 4190, with the AI switched off:

   ```bash
   HOST=127.0.0.1 PORT=4190 AI_DAILY_LIMIT=0 NODE_ENV=production npm start
   ```

   On Windows (PowerShell) set the variables first, for example `$env:HOST="127.0.0.1"`,
   then run `npm start`. Leave this terminal open and use another one for the next steps.

3. Check that the server listens only on `127.0.0.1`:

   ```bash
   lsof -nP -iTCP:4190 -sTCP:LISTEN
   ```

   Output obtained:

   ```text
   COMMAND PID USER   FD   TYPE DEVICE SIZE/OFF NODE NAME
   node    762 root   21u  IPv4   3471      0t0  TCP 127.0.0.1:4190 (LISTEN)
   ```

   If you see `*:4190` or `0.0.0.0:4190`, the server is reachable from the network: stop it
   and check the `HOST` variable. Instead of `lsof` you can use `ss -ltn` (Linux) or
   `netstat -ano` (Windows).

4. Create the folder for the evidence, outside the repository:

   ```bash
   mkdir -p ~/lab01
   ```

## Exercise

### 1. Read the page headers

```bash
curl -sI http://127.0.0.1:4190/ | tee ~/lab01/headers.txt
```

Output obtained (the `Date`, `ETag` and `Last-Modified` lines change with every build):

```text
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self';base-uri 'self';font-src 'self';form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self';upgrade-insecure-requests;connect-src 'self'
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
Origin-Agent-Cluster: ?1
Referrer-Policy: no-referrer
Strict-Transport-Security: max-age=31536000; includeSubDomains
X-Content-Type-Options: nosniff
X-DNS-Prefetch-Control: off
X-Download-Options: noopen
X-Frame-Options: SAMEORIGIN
X-Permitted-Cross-Domain-Policies: none
X-XSS-Protection: 0
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Content-Type: text/html; charset=utf-8
```

For each of the main headers, write in `~/lab01/analysis.md` what it protects against. Use
this table as an outline and complete it:

| Header | Protects against |
|---|---|
| `Content-Security-Policy` | Running unauthorised scripts (XSS) and loading resources from other sites |
| `X-Frame-Options`, `frame-ancestors` | Clickjacking: the page cannot be framed by another site |
| `X-Content-Type-Options: nosniff` | … |
| `Referrer-Policy: no-referrer` | … |
| `Strict-Transport-Security` | … |

Also note what is **missing**: there is no `X-Powered-By`, the header with which Express
would announce the server's technology. Removing it does not make the server secure, but
it gives fewer clues to someone looking for known vulnerabilities of a specific product.

### 2. Two headers that look odd

- `X-XSS-Protection: 0` **turns off** the old XSS filter of browsers. That is on purpose:
  the filter has been removed from modern browsers and in the past it introduced
  vulnerabilities of its own. The modern protection against XSS is the CSP.
- `Strict-Transport-Security` appears even though you are using `http://`. The browser,
  however, **ignores** it when it arrives over an unencrypted connection (RFC 6797,
  section 8.1): HSTS takes effect only when the site is served over HTTPS, as in production.

### 3. Watch the CSP block a script

Open `http://127.0.0.1:4190/` in the browser, then the developer tools (F12), Console tab,
and paste:

```js
const s = document.createElement("script");
s.textContent = "window.__ran = true";
document.body.append(s);
window.__ran
```

Output obtained in Chromium:

```text
Refused to execute inline script because it violates the following Content Security Policy directive: "script-src 'self'". Either the 'unsafe-inline' keyword, a hash ('sha256-TzqRNhn3cMET3JybEF+0ZY76dZlxqMrOYqp0xs1vMZI='), or a nonce ('nonce-...') is required to enable inline execution.
undefined
```

The script did not run: `window.__ran` is `undefined`. That is what would happen to a script
injected by an attacker through an XSS: the CSP allows only scripts served as files by the
same site (`script-src 'self'`), not those written inside the page.

### 4. Trip the request limit

The `/api/` endpoints accept at most 30 requests every 15 minutes from one address. Send 31
requests with an empty body: the server rejects them as invalid (`400`) before calling the
AI, so they use no quota.

```bash
for i in $(seq 1 31); do
  curl -s -o /dev/null -w "%{http_code} " -X POST http://127.0.0.1:4190/api/chat \
    -H 'content-type: application/json' -d '{}'
done; echo
```

Output obtained:

```text
400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 400 429
```

From the thirty-first request the answer is `429 Too Many Requests`. Look at the headers
that come with it:

```bash
curl -s -i -X POST http://127.0.0.1:4190/api/chat \
  -H 'content-type: application/json' -d '{}' | tee ~/lab01/ratelimit.txt
```

Output obtained (main lines):

```text
HTTP/1.1 429 Too Many Requests
RateLimit-Policy: 30;w=900
RateLimit: limit=30, remaining=0, reset=892
Retry-After: 892
{"error":"Too many requests. Please try again in a few minutes."}
```

`RateLimit-Policy` states the rule (30 requests in a 900-second window), `RateLimit` how
many are left and in how many seconds the counter resets, `Retry-After` when to try again.
The health check, on the other hand, is not limited, because it is registered before the
limiter:

```bash
curl -s http://127.0.0.1:4190/healthz
```

```text
{"status":"ok"}
```

The counter lives in the process memory: restarting the server resets it. It is a per-IP
limit designed against excessive use (*denial of wallet*), not a protection against an
attack distributed across many addresses.

## Hints and solution

### Success indicators

- `~/lab01/headers.txt` contains `Content-Security-Policy` and does not contain `X-Powered-By`.
- The browser console shows "Refused to execute inline script" and `window.__ran` is `undefined`.
- The thirty-first request to `/api/chat` gets `429`, with `RateLimit-Policy: 30;w=900`.

### If you get stuck

Try on your own first: the hints open one at a time, from the vaguest to the solution.

<details>
<summary>Hint 1</summary>

No security headers? Check which mode the server runs in: they appear only after `npm run build`
and with `NODE_ENV=production`.

</details>

<details>
<summary>Hint 2</summary>

No `429`? The counter is per address and only for the `/api/` endpoints: requests to the main
page do not count, and restarting the server resets it.

</details>

<details>
<summary>Worked solution</summary>

`nosniff` stops the browser from guessing a file's type and running as script what the server
declares as text. `no-referrer` keeps the page address, with its parameters, from reaching other
sites. HSTS makes the browser use only HTTPS for a year, against downgrades to HTTP. The CSP
blocks the script in step 3 because it is written inside the page and the policy allows only
files served by the same site. The rate limit is a preventive control against overuse, not
against an attack spread over many addresses.

</details>

### Common mistakes

- Starting `npm run dev`: in development the headers are missing and the check looks failed.
- Pasting the script into a blank tab or another site: the CSP to test is the one on the app's
  page.
- Concluding that HSTS works over `http://`: the browser ignores it until the site is served over
  HTTPS.
- Removing `HOST=127.0.0.1`: the server becomes reachable from the whole network during the
  exercise.

## Evidence

The `~/lab01` folder must contain:

- `headers.txt`, the page headers;
- `analysis.md`, the completed table with the purpose of each header;
- `ratelimit.txt`, the `429` response with its headers;
- a screenshot of the browser console with the CSP error.

## Cleanup

1. Stop the server with `Ctrl+C` in the terminal where you started it.
2. Check that nothing is left listening: this command must print nothing.

   ```bash
   lsof -nP -iTCP:4190 -sTCP:LISTEN
   ```

3. Once you have handed in the evidence, delete the working folder:

   ```bash
   rm -r -- ~/lab01
   ```

## Final questions

1. Why do the security headers appear only with `NODE_ENV=production`?

   <details>
   <summary>Answer</summary>

   In development the server embeds Vite, which injects scripts and styles generated on the
   fly into the page for hot reloading: such a strict CSP would block them. In production the
   files are already built and the CSP can allow only those. For the check in the scenario,
   the production mode is what counts, the same one that will be published.

   </details>

2. A colleague suggests adding `'unsafe-inline'` to `script-src` because an external widget
   does not work. What do you answer?

   <details>
   <summary>Answer</summary>

   That the CSP would then stop protecting against XSS: an injected script is exactly an
   inline script. The alternatives are loading the widget as a file from the same site, or
   allowing only that code with a hash or a nonce. It is an example of a trade-off between
   functionality and security to be documented, not solved by switching the control off.

   </details>

3. Is the limit of 30 requests a preventive, detective or corrective control? And of which
   category?

   <details>
   <summary>Answer</summary>

   It is a **preventive** control (it blocks requests beyond the threshold) and a
   **technical** one (software enforces it). It reduces the risk of excessive resource use,
   but on its own it does not stop an attack distributed across many addresses: for that the
   app also has an overall daily limit (`AI_DAILY_LIMIT`).

   </details>

4. Why is `HOST=127.0.0.1` part of a lab's setup?

   <details>
   <summary>Answer</summary>

   Because without it the server listens on every interface and anyone on the same network
   (a public Wi-Fi, for example) could reach it during the exercise. Reducing exposure to the
   services that are needed is a hardening technique of objective 2.5.

   </details>
