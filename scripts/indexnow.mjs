/**
 * Báo cho Bing (và Yandex, Seznam, Naver qua api.indexnow.org) biết các URL trong sitemap vừa đổi.
 *
 * Vì sao: ChatGPT search và Copilot lấy nguồn từ chỉ mục Bing; 27/09/2026 `site:type.scala.vn`
 * trên Bing không ra trang nào. IndexNow không cần tài khoản Bing Webmaster: file key
 * `public/<KEY>.txt` được phục vụ ở gốc domain là bằng chứng sở hữu.
 *
 * Chạy SAU khi deploy đã live (không chạy trong build: lúc build trên Vercel bản mới chưa live):
 *   npm run indexnow                 # gửi mọi URL trong sitemap live
 *   npm run indexnow -- /huong-dan-telex /huong-dan-vni   # chỉ gửi các path này
 */
const SITE_URL = 'https://type.scala.vn';
const KEY = 'a2fc90a4415b11f295d748325f6b628a';
const KEY_LOCATION = `${SITE_URL}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function liveUrls() {
    const res = await fetch(`${SITE_URL}/sitemap.xml`);
    if (!res.ok) throw new Error(`sitemap.xml trả ${res.status}`);
    const xml = await res.text();
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

// Key file phải live trước, nếu không Bing từ chối cả lô (403).
const keyRes = await fetch(KEY_LOCATION);
const keyBody = keyRes.ok ? (await keyRes.text()).trim() : '';
if (keyBody !== KEY) {
    console.error(`[indexnow] ${KEY_LOCATION} chưa live (status ${keyRes.status}). Deploy xong rồi chạy lại.`);
    process.exit(1);
}

const paths = process.argv.slice(2);
const urlList = paths.length ? paths.map((p) => `${SITE_URL}${p.startsWith('/') ? p : `/${p}`}`) : await liveUrls();

const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: new URL(SITE_URL).host, key: KEY, keyLocation: KEY_LOCATION, urlList }),
});

// 200 = đã nhận, 202 = đã nhận và đang xác minh key; còn lại là lỗi.
console.log(`[indexnow] ${res.status} ${res.statusText} — ${urlList.length} URL`);
urlList.forEach((u) => console.log(`  ${u}`));
if (res.status !== 200 && res.status !== 202) {
    console.error(await res.text());
    process.exit(1);
}
