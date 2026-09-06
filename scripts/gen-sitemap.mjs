/**
 * Sinh dist/sitemap.xml sau khi build (npm postbuild).
 *
 * Vì sao: sitemap tay trong public/ có lastmod tĩnh, quên cập nhật khi sửa nội dung
 * (06/09/2026: lastmod 25/06 trong khi Article dateModified 13/08). Ở đây lastmod lấy
 * từ ngày commit gần nhất của các file tạo nên trang → tự đúng, không cần nhớ.
 *
 * Thêm trang mới: thêm 1 dòng vào ROUTES (path + các file nguồn của trang).
 * Trên Vercel git có thể là shallow clone hoặc thiếu → fallback ngày build.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const SITE_URL = 'https://type.scala.vn';
const OUT = 'dist/sitemap.xml';

/** path → file nguồn quyết định nội dung trang (đổi file nào thì lastmod trang đó đổi) */
const ROUTES = [
    { path: '/', files: ['src/components/HomePage.tsx', 'src/components/HomeView.tsx', 'src/routes.tsx'] },
    { path: '/tu-the-go-phim', files: ['src/pages/PostureGuide.tsx'] },
    { path: '/huong-dan-telex', files: ['src/pages/TelexGuide.tsx'] },
    { path: '/huong-dan-vni', files: ['src/pages/VniGuide.tsx'] },
    { path: '/bi-mat-phim-f-j', files: ['src/pages/FjRidgeGuide.tsx'] },
    { path: '/bang-go-telex', files: ['src/pages/TelexTable.tsx'] },
    { path: '/bang-go-vni', files: ['src/pages/VniTable.tsx'] },
    { path: '/tap-go-10-ngon-cho-be', files: ['src/pages/KidsRoadmap.tsx'] },
];

const today = new Date().toISOString().slice(0, 10);

/** Ngày commit gần nhất (YYYY-MM-DD) của 1 file, hoặc null nếu git không trả lời. */
function lastCommitDate(file) {
    try {
        const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', file], { encoding: 'utf8' }).trim();
        return /^\d{4}-\d{2}-\d{2}$/.test(out) ? out : null;
    } catch {
        return null;
    }
}

const entries = ROUTES.map(({ path, files }) => {
    const dates = files.map(lastCommitDate).filter(Boolean);
    const lastmod = dates.length ? dates.sort().at(-1) : today;
    return `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
});

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

mkdirSync('dist', { recursive: true });
writeFileSync(OUT, xml);
console.log(`[gen-sitemap] ${OUT}: ${ROUTES.length} URL`);
