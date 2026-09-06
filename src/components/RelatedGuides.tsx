import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen } from 'lucide-react';
import { GUIDES } from './guides-data';

interface RelatedGuidesProps {
    /** Đường dẫn trang hiện tại để loại nó khỏi danh sách liên quan */
    currentPath: string;
}

const RelatedGuides: React.FC<RelatedGuidesProps> = ({ currentPath }) => {
    const others = GUIDES.filter((g) => g.path !== currentPath);

    return (
        <section style={{ marginTop: '50px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '20px' }}>
                Hướng dẫn liên quan
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
                {others.map((g) => (
                    <Link
                        key={g.path}
                        to={g.path}
                        className="glass"
                        style={{ padding: '18px 20px', textDecoration: 'none', display: 'flex', gap: '14px', alignItems: 'flex-start', transition: 'transform 0.2s' }}
                        onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-4px)')}
                        onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
                    >
                        <div style={{ background: 'rgba(88, 166, 255, 0.1)', padding: '8px', borderRadius: '10px', flexShrink: 0 }}>
                            <BookOpen size={18} color="var(--primary-color)" />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 4px' }}>{g.title}</h3>
                            <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{g.desc}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default RelatedGuides;
