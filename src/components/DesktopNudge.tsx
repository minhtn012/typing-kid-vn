import React from 'react';
import { Link } from 'react-router-dom';
import { Monitor, ChevronLeft, BookOpen } from 'lucide-react';
import { GUIDES } from './RelatedGuides';

interface DesktopNudgeProps {
  /** Quay lại màn hình trang chủ (thoát chế độ luyện gõ). */
  onBack: () => void;
}

/**
 * DesktopNudge: banner hiển thị thay cho giao diện luyện gõ khi người dùng mở
 * chế độ practice/game trên điện thoại (≤768px).
 *
 * Vì sao cần: gõ 10 ngón yêu cầu bàn phím vật lý → giao diện keyboard/canvas
 * trên mobile vừa vô dụng vừa vỡ layout. Thay vì cố responsive phần không dùng
 * được, ta hướng người dùng về máy tính và mời họ đọc các trang hướng dẫn
 * (vốn đọc tốt trên mobile).
 */
const DesktopNudge: React.FC<DesktopNudgeProps> = ({ onBack }) => {
  return (
    <div
      style={{
        maxWidth: '560px',
        margin: '0 auto',
        padding: '48px 20px',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          background: 'var(--primary-color)',
          padding: '20px',
          borderRadius: '20px',
          boxShadow: '0 0 30px rgba(88, 166, 255, 0.4)',
          marginBottom: '28px',
        }}
      >
        <Monitor color="white" size={40} />
      </div>

      <h1 style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-main)', marginBottom: '14px' }}>
        Mở trên máy tính để luyện gõ 10 ngón
      </h1>
      <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: 1.7, marginBottom: '28px' }}>
        👉 Luyện gõ 10 ngón cần một chiếc <strong>bàn phím vật lý</strong>, nên phần luyện tập chỉ
        hoạt động trên máy tính. Hãy mở <strong>type.scala.vn</strong> trên máy tính để bắt đầu nhé!
      </p>

      <button
        onClick={onBack}
        className="tap-target"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          padding: '12px 24px',
          borderRadius: '12px',
          background: 'var(--primary-color)',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 700,
          marginBottom: '48px',
        }}
      >
        <ChevronLeft size={20} /> Về trang chủ
      </button>

      {/* Trên điện thoại vẫn đọc được các hướng dẫn — dẫn người dùng sang đó. */}
      <div style={{ width: '100%', textAlign: 'left' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '16px', textAlign: 'center' }}>
          Trong lúc đó, đọc thử các hướng dẫn
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {GUIDES.map((guide) => (
            <Link
              key={guide.path}
              to={guide.path}
              className="glass tap-target"
              style={{
                padding: '16px 20px',
                textDecoration: 'none',
                display: 'flex',
                gap: '14px',
                alignItems: 'center',
              }}
            >
              <div style={{ background: 'rgba(88, 166, 255, 0.1)', padding: '8px', borderRadius: '10px', flexShrink: 0 }}>
                <BookOpen size={18} color="var(--primary-color)" />
              </div>
              <div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-main)', margin: '0 0 2px' }}>{guide.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', margin: 0, lineHeight: 1.5 }}>{guide.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopNudge;
