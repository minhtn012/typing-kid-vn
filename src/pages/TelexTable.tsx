import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import RelatedGuides from '../components/RelatedGuides';
import { buildGuideSchemas } from '../components/guide-schema';
import { TELEX_RULES } from '../constants';
import { buildToneTable, TONE_LABELS, cellStyle, headStyle } from './typing-table-data';

const tableSchemas = buildGuideSchemas({
    path: '/bang-go-telex',
    breadcrumbName: 'Bảng gõ Telex',
    headline: 'Bảng gõ Telex đầy đủ (bản in A4)',
    description: 'Bảng gõ Telex 1 trang: 5 dấu thanh, 7 chữ đặc biệt, bảng nguyên âm 12×5 và 12 từ hay gặp kèm phím gõ. Bấm In để dán cạnh máy cho bé tập gõ.',
    datePublished: '2026-09-07',
    dateModified: '2026-09-07',
});

const TONE_RULES = [
    { tone: 'Sắc', key: 's', example: 'as → á' },
    { tone: 'Huyền', key: 'f', example: 'af → à' },
    { tone: 'Hỏi', key: 'r', example: 'ar → ả' },
    { tone: 'Ngã', key: 'x', example: 'ax → ã' },
    { tone: 'Nặng', key: 'j', example: 'aj → ạ' },
];

const SPECIAL_CHARS = [
    { input: 'aa', output: 'â' },
    { input: 'ee', output: 'ê' },
    { input: 'oo', output: 'ô' },
    { input: 'aw', output: 'ă' },
    { input: 'ow', output: 'ơ' },
    { input: 'uw', output: 'ư' },
    { input: 'dd', output: 'đ' },
];

const COMMON_WORDS = [
    { word: 'Việt Nam', keys: 'Vieetj Nam' },
    { word: 'tiếng', keys: 'tieengs' },
    { word: 'người', keys: 'nguwowif' },
    { word: 'được', keys: 'dduwowcj' },
    { word: 'trường', keys: 'truwowngf' },
    { word: 'học', keys: 'hocj' },
    { word: 'bàn phím', keys: 'banf phims' },
    { word: 'mười ngón', keys: 'muwowif ngons' },
    { word: 'chữ', keys: 'chuwx' },
    { word: 'đẹp', keys: 'ddepj' },
    { word: 'gõ', keys: 'gox' },
    { word: 'nhanh', keys: 'nhanh' },
];

const COMPARISON_ROWS = [
    { label: 'Dấu Sắc (á)', telex: 's', vni: '1' },
    { label: 'Dấu Huyền (à)', telex: 'f', vni: '2' },
    { label: 'Dấu Hỏi (ả)', telex: 'r', vni: '3' },
    { label: 'Dấu Ngã (ã)', telex: 'x', vni: '4' },
    { label: 'Dấu Nặng (ạ)', telex: 'j', vni: '5' },
    { label: 'Chữ â', telex: 'aa', vni: 'a6' },
    { label: 'Chữ ê', telex: 'ee', vni: 'e6' },
    { label: 'Chữ ô', telex: 'oo', vni: 'o6' },
    { label: 'Chữ ă', telex: 'aw', vni: 'a8' },
    { label: 'Chữ ơ', telex: 'ow', vni: 'o7' },
    { label: 'Chữ ư', telex: 'uw', vni: 'u7' },
    { label: 'Chữ đ', telex: 'dd', vni: 'd9' },
];

const TelexTable: React.FC = () => {
    const tableRows = buildToneTable(TELEX_RULES);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '60px 20px', color: 'var(--text-main)' }}
        >
            <Seo
                title="Bảng gõ Telex đầy đủ, in được | Typing Kid VN"
                description="Bảng gõ Telex 1 trang: 5 dấu thanh, 7 chữ đặc biệt, bảng nguyên âm 12×5 và 12 từ hay gặp kèm phím gõ. Bấm In để dán cạnh máy cho bé tập gõ."
                path="/bang-go-telex"
            />
            {tableSchemas.map((s) => (
                <JsonLd key={s['@type'] as string} data={s} />
            ))}

            <Link to="/" className="tap-target" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary-color)', textDecoration: 'none', marginBottom: '30px', fontWeight: 'bold' }}>
                <ChevronLeft size={20} /> Quay lại trang chủ
            </Link>

            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '20px' }}>
                    Bảng gõ Telex đầy đủ (bản in A4)
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '20px' }}>
                    Bảng tra cứu nhanh quy tắc gõ Telex rút gọn trên một trang, thuận tiện để in ra giấy A4 và dán cạnh máy tính cho bé luyện tập. Nếu bạn mới bắt đầu làm quen và muốn học chi tiết từng bước, hãy xem <Link to="/huong-dan-telex">hướng dẫn cách gõ Telex</Link>.
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
                                    <th style={headStyle}>Gõ</th>
                                    <th style={headStyle}>Ra chữ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SPECIAL_CHARS.map((c) => (
                                    <tr key={c.input}>
                                        <td style={cellStyle}><code>{c.input}</code></td>
                                        <td style={{ ...cellStyle, fontSize: '18px', fontWeight: 600, color: 'var(--primary-color)' }}>{c.output}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
                        Phím <code>z</code> xoá dấu vừa gõ.
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
                        Gõ dấu ngay sau nguyên âm (ngươfi) hay cuối từ (nguwowif) đều được.
                    </p>
                </section>

                {/* 5. Telex và VNI cạnh nhau */}
                <section className="no-print" style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>5. So sánh Telex và VNI</h2>
                    <p style={{ marginBottom: '15px' }}>
                        Đối chiếu cách gõ giữa hai kiểu gõ tiếng Việt. Xem thêm <Link to="/bang-go-vni">bảng gõ VNI đầy đủ</Link>.
                    </p>
                    <div style={{ overflowX: 'auto', borderRadius: '12px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.03)' }}>
                            <thead>
                                <tr>
                                    <th style={headStyle}>Dấu / chữ</th>
                                    <th style={headStyle}>Telex</th>
                                    <th style={headStyle}>VNI</th>
                                </tr>
                            </thead>
                            <tbody>
                                {COMPARISON_ROWS.map((row) => (
                                    <tr key={row.label}>
                                        <td style={{ ...cellStyle, fontWeight: 600 }}>{row.label}</td>
                                        <td style={cellStyle}><code>{row.telex}</code></td>
                                        <td style={cellStyle}><code>{row.vni}</code></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </article>

            <RelatedGuides currentPath="/bang-go-telex" />
        </motion.div>
    );
};

export default TelexTable;
