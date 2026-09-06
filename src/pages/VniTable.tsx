import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import RelatedGuides from '../components/RelatedGuides';
import { buildGuideSchemas } from '../components/guide-schema';
import { VNI_RULES } from '../constants';
import { buildToneTable, TONE_LABELS, cellStyle, headStyle } from './typing-table-data';

const tableSchemas = buildGuideSchemas({
    path: '/bang-go-vni',
    breadcrumbName: 'Bảng gõ VNI',
    headline: 'Bảng gõ VNI đầy đủ (bản in A4)',
    description: 'Bảng gõ VNI 1 trang: dấu thanh phím 1-5, chữ â ê ô ơ ư ă đ phím 6-9, bảng nguyên âm 12×5 và 12 từ hay gặp kèm phím gõ. Bấm In để dán cạnh máy.',
    datePublished: '2026-09-07',
    dateModified: '2026-09-07',
});

const TONE_RULES = [
    { tone: 'Sắc', key: '1', example: 'a1 → á' },
    { tone: 'Huyền', key: '2', example: 'a2 → à' },
    { tone: 'Hỏi', key: '3', example: 'a3 → ả' },
    { tone: 'Ngã', key: '4', example: 'a4 → ã' },
    { tone: 'Nặng', key: '5', example: 'a5 → ạ' },
];

const SPECIAL_CHARS = [
    { key: '6', role: 'Dấu mũ', example: 'a6 → â, e6 → ê, o6 → ô' },
    { key: '7', role: 'Dấu móc', example: 'o7 → ơ, u7 → ư' },
    { key: '8', role: 'Dấu trăng', example: 'a8 → ă' },
    { key: '9', role: 'Chữ đ', example: 'd9 → đ' },
];

const COMMON_WORDS = [
    { word: 'Việt Nam', keys: 'Vie6t5 Nam' },
    { word: 'tiếng', keys: 'tie6ng1' },
    { word: 'người', keys: 'ngu7o7i2' },
    { word: 'được', keys: 'd9u7o7c5' },
    { word: 'trường', keys: 'tru7o7ng2' },
    { word: 'học', keys: 'hoc5' },
    { word: 'bàn phím', keys: 'ban2 phim1' },
    { word: 'mười ngón', keys: 'mu7o7i2 ngon1' },
    { word: 'chữ', keys: 'chu74' },
    { word: 'đẹp', keys: 'd9ep5' },
    { word: 'gõ', keys: 'go4' },
    { word: 'nhanh', keys: 'nhanh' },
];

const COMPARISON_ROWS = [
    { label: 'Dấu Sắc (á)', vni: '1', telex: 's' },
    { label: 'Dấu Huyền (à)', vni: '2', telex: 'f' },
    { label: 'Dấu Hỏi (ả)', vni: '3', telex: 'r' },
    { label: 'Dấu Ngã (ã)', vni: '4', telex: 'x' },
    { label: 'Dấu Nặng (ạ)', vni: '5', telex: 'j' },
    { label: 'Chữ â', vni: 'a6', telex: 'aa' },
    { label: 'Chữ ê', vni: 'e6', telex: 'ee' },
    { label: 'Chữ ô', vni: 'o6', telex: 'oo' },
    { label: 'Chữ ă', vni: 'a8', telex: 'aw' },
    { label: 'Chữ ơ', vni: 'o7', telex: 'ow' },
    { label: 'Chữ ư', vni: 'u7', telex: 'uw' },
    { label: 'Chữ đ', vni: 'd9', telex: 'dd' },
];

const VniTable: React.FC = () => {
    const tableRows = buildToneTable(VNI_RULES);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '60px 20px', color: 'var(--text-main)' }}
        >
            <Seo
                title="Bảng gõ VNI đầy đủ, in được | Typing Kid VN"
                description="Bảng gõ VNI 1 trang: dấu thanh phím 1-5, chữ â ê ô ơ ư ă đ phím 6-9, bảng nguyên âm 12×5 và 12 từ hay gặp kèm phím gõ. Bấm In để dán cạnh máy."
                path="/bang-go-vni"
            />
            {tableSchemas.map((s) => (
                <JsonLd key={s['@type'] as string} data={s} />
            ))}

            <Link to="/" className="tap-target" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary-color)', textDecoration: 'none', marginBottom: '30px', fontWeight: 'bold' }}>
                <ChevronLeft size={20} /> Quay lại trang chủ
            </Link>

            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '20px' }}>
                    Bảng gõ VNI đầy đủ (bản in A4)
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                    Toàn bộ phím số 1-9 của kiểu gõ VNI gom trong một trang, đủ để tra giữa lúc đang gõ hoặc in ra giấy A4 dán cạnh máy. Nếu bạn chưa quen và cần giải thích từng bước kèm ví dụ, hãy đọc <Link to="/huong-dan-vni">hướng dẫn cách gõ VNI</Link> trước.
                </p>
                <button
                    type="button"
                    className="no-print"
                    onClick={() => window.print()}
                    style={{
                        background: 'var(--primary-color)',
                        color: '#fff',
                        borderRadius: '12px',
                        padding: '12px 20px',
                        cursor: 'pointer',
                        border: 'none',
                        fontWeight: 700,
                        fontSize: '16px',
                    }}
                >
                    In bảng này
                </button>
            </header>

            <article style={{ lineHeight: '1.8' }}>
                {/* 1. Dấu thanh */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>1. Dấu thanh</h2>
                    <div style={{ overflowX: 'auto', borderRadius: '12px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.03)' }}>
                            <thead>
                                <tr>
                                    <th style={headStyle}>Dấu</th>
                                    <th style={headStyle}>Phím</th>
                                    <th style={headStyle}>Ví dụ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {TONE_RULES.map((r) => (
                                    <tr key={r.tone}>
                                        <td style={{ ...cellStyle, fontWeight: 600 }}>{r.tone}</td>
                                        <td style={cellStyle}><code>{r.key}</code></td>
                                        <td style={cellStyle}>{r.example}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 2. Chữ đặc biệt */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>2. Chữ đặc biệt</h2>
                    <div style={{ overflowX: 'auto', borderRadius: '12px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.03)' }}>
                            <thead>
                                <tr>
                                    <th style={headStyle}>Phím</th>
                                    <th style={headStyle}>Chức năng</th>
                                    <th style={headStyle}>Ví dụ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SPECIAL_CHARS.map((c) => (
                                    <tr key={c.key}>
                                        <td style={{ ...cellStyle, fontSize: '18px', fontWeight: 600, color: 'var(--primary-color)' }}><code>{c.key}</code></td>
                                        <td style={{ ...cellStyle, fontWeight: 600 }}>{c.role}</td>
                                        <td style={cellStyle}>{c.example}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
                        Phím <code>0</code> xoá dấu vừa gõ.
                    </p>
                </section>

                {/* 3. Nguyên âm × thanh */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>3. Bảng nguyên âm và thanh điệu</h2>
                    <div style={{ overflowX: 'auto', marginTop: '20px', borderRadius: '12px' }}>
                        <table style={{ width: '100%', minWidth: '560px', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.03)' }}>
                            <thead>
                                <tr>
                                    <th style={headStyle}>Nguyên âm</th>
                                    <th style={headStyle}>Gõ gốc</th>
                                    {TONE_LABELS.map((t) => (
                                        <th key={t} style={headStyle}>{t}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {tableRows.map((row) => (
                                    <tr key={row.base}>
                                        <td style={{ ...cellStyle, fontSize: '20px', fontWeight: 700, color: 'var(--primary-color)' }}>{row.base}</td>
                                        <td style={cellStyle}><code>{row.baseKeys}</code></td>
                                        {row.cells.map((cell) => (
                                            <td key={cell.char} style={cellStyle}>
                                                <div style={{ fontSize: '18px', fontWeight: 600 }}>{cell.char}</div>
                                                <code style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{cell.keys}</code>
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>

                {/* 4. 12 từ hay gặp */}
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>4. 12 từ hay gặp</h2>
                    <div style={{ overflowX: 'auto', borderRadius: '12px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.03)' }}>
                            <thead>
                                <tr>
                                    <th style={headStyle}>Từ</th>
                                    <th style={headStyle}>Gõ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMMON_WORDS.map((item) => (
                                    <tr key={item.word}>
                                        <td style={{ ...cellStyle, fontWeight: 600 }}>{item.word}</td>
                                        <td style={cellStyle}><code>{item.keys}</code></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
                        Gõ dấu ngay sau nguyên âm (ngu7o72i) hay cuối từ (ngu7o7i2) đều được.
                    </p>
                </section>

                {/* 5. Telex và VNI cạnh nhau */}
                <section className="no-print" style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>5. So sánh VNI và Telex</h2>
                    <p style={{ marginBottom: '15px' }}>
                        Đối chiếu cách gõ giữa hai kiểu gõ tiếng Việt. Xem thêm <Link to="/bang-go-telex">bảng gõ Telex đầy đủ</Link>.
                    </p>
                    <div style={{ overflowX: 'auto', borderRadius: '12px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.03)' }}>
                            <thead>
                                <tr>
                                    <th style={headStyle}>Dấu / chữ</th>
                                    <th style={headStyle}>VNI</th>
                                    <th style={headStyle}>Telex</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON_ROWS.map((row) => (
                                    <tr key={row.label}>
                                        <td style={{ ...cellStyle, fontWeight: 600 }}>{row.label}</td>
                                        <td style={cellStyle}><code>{row.vni}</code></td>
                                        <td style={cellStyle}><code>{row.telex}</code></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </article>

            <RelatedGuides currentPath="/bang-go-vni" />
        </motion.div>
    );
};

export default VniTable;
