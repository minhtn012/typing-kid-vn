import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Seo from '../components/Seo';
import JsonLd from '../components/JsonLd';
import RelatedGuides from '../components/RelatedGuides';
import { buildGuideSchemas } from '../components/guide-schema';
import { cellStyle, headStyle } from './typing-table-data';

/**
 * FAQ: 1 mảng dùng cho CẢ phần hiển thị lẫn JSON-LD.
 * Bắt buộc dùng chung nguồn để text trong schema trùng khớp text người dùng thấy
 * (yêu cầu của Google cho rich result FAQ).
 */
const faqs: { q: string; a: string }[] = [
    {
        q: 'Bé mấy tuổi có thể tập gõ 10 ngón?',
        a: 'Từ 7–8 tuổi, khi bàn tay bé đủ rộng để đặt 4 ngón lên 4 phím liền nhau và bé đã đọc tốt. Dưới 7 tuổi chỉ nên chơi game làm quen bàn phím, chưa cần đúng ngón.',
    },
    {
        q: 'Mỗi ngày bé nên tập gõ bao lâu?',
        a: '10 phút mỗi ngày, 5–6 ngày một tuần là đủ. Tập ngắn nhưng đều tốt hơn tập dài rồi bỏ. Dừng ngay khi bé mỏi tay hoặc mất tập trung.',
    },
    {
        q: 'Tập gõ 10 ngón mất bao lâu?',
        a: 'Theo lộ trình 4 tuần, bé gõ được câu tiếng Việt có dấu mà không nhìn bàn phím. Tốc độ 20–25 từ/phút thường đến sau 2–3 tháng tập đều.',
    },
    {
        q: 'Có cần mua phần mềm tập gõ cho bé không?',
        a: 'Không. Typing Kid VN miễn phí, chạy trên trình duyệt máy tính, có bài theo từng hàng phím, bài gõ dấu Telex/VNI và mini game. Chỉ cần bàn phím rời và 10 phút mỗi ngày.',
    },
];

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
};

const pageSchemas = buildGuideSchemas({
    path: '/tap-go-10-ngon-cho-be',
    breadcrumbName: 'Tập gõ cho bé',
    headline: 'Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà',
    description: 'Cho bé tập gõ 10 ngón tiếng Việt tại nhà: mấy tuổi bắt đầu, 10 phút mỗi ngày, lộ trình 4 tuần từ hàng phím cơ sở đến gõ dấu Telex/VNI, kèm bài tập miễn phí.',
    datePublished: '2026-09-08',
    dateModified: '2026-09-08',
});

const KidsRoadmap: React.FC = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ width: '100%', maxWidth: '800px', margin: '0 auto', padding: '60px 20px', color: 'var(--text-main)' }}
        >
            <Seo
                title="Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà | Typing Kid VN"
                description="Cho bé tập gõ 10 ngón tiếng Việt tại nhà: mấy tuổi bắt đầu, 10 phút mỗi ngày, lộ trình 4 tuần từ hàng phím cơ sở đến gõ dấu Telex/VNI, kèm bài tập miễn phí."
                path="/tap-go-10-ngon-cho-be"
            />
            {/* FAQPage JSON-LD: sinh từ cùng mảng faqs với phần hiển thị bên dưới */}
            <JsonLd data={faqSchema} />
            {/* Breadcrumb + Article JSON-LD */}
            {pageSchemas.map((s) => (
                <JsonLd key={s['@type'] as string} data={s} />
            ))}

            <Link to="/" className="tap-target" style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--primary-color)', textDecoration: 'none', marginBottom: '30px', fontWeight: 'bold' }}>
                <ChevronLeft size={20} /> Quay lại trang chủ
            </Link>

            <header style={{ marginBottom: '50px' }}>
                <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '20px' }}>
                    Tập gõ 10 ngón cho bé: lộ trình 4 tuần tại nhà
                </h1>
                <p style={{ fontSize: '18px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                    Nhiều phụ huynh băn khoăn thời điểm thích hợp để hướng dẫn con làm quen bàn phím. Thực tế, các bé từ 7–8 tuổi đã hoàn toàn đủ khả năng tập gõ 10 ngón. Điều cốt lõi không phải mua phần mềm phức tạp, mà là duy trì đều đặn 10 phút mỗi ngày và giữ đúng ngón tay ngay từ đầu. Dưới đây là lộ trình 4 tuần rõ ràng kết hợp cùng các bài thực hành miễn phí trên Typing Kid VN chạy trên máy tính.
                </p>
            </header>

            <article style={{ lineHeight: '1.8' }}>
                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>1. Mấy tuổi thì bắt đầu được?</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Độ tuổi lý tưởng nhất để bé bắt đầu tập gõ 10 ngón là từ 7 đến 8 tuổi, tương đương giai đoạn học sinh bước vào lớp 2 hoặc lớp 3. Lúc này, bàn tay của bé đã phát triển đủ lớn để trải đều bốn ngón lên bốn phím liền kề mà không bị căng cơ, đồng thời khả năng nhận diện mặt chữ và đọc hiểu văn bản đã tương đối vững vàng.
                    </p>
                    <p style={{ marginBottom: '16px' }}>
                        Nếu bé đang học lớp 1 hoặc dưới 7 tuổi, phụ huynh chưa nên đặt nặng yêu cầu con phải đặt đúng ngón tay ngay. Ở độ tuổi này, các bé chỉ nên tham gia các trò chơi tương tác vui nhộn nhằm làm quen vị trí phím bấm và nuôi dưỡng sự tò mò. Ngược lại, trẻ từ 10 tuổi trở lên tiếp thu kỹ năng đánh máy rất nhanh, có thể hiểu quy tắc và bứt phá tốc độ gần như người lớn.
                    </p>
                    <p style={{ marginBottom: '0' }}>
                        Để biết con đã thực sự sẵn sàng bước vào hành trình tập đánh máy hay chưa, cha mẹ có thể quan sát hai dấu hiệu then chốt: bé có thể tự giác ngồi yên chăm chú trước màn hình trong khoảng 10 phút và đọc trôi chảy từng câu ngắn độc lập mà không cần hỗ trợ đánh vần từng từ.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>2. Chuẩn bị: bàn phím, tư thế, quy tắc 10 phút</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Trước khi bước vào buổi học đầu tiên, việc chuẩn bị một không gian học tập khoa học đóng vai trò quyết định giúp bảo vệ cột sống và thị lực cho con. Ba mẹ nên trang bị cho bé một bàn phím máy tính rời cỡ chuẩn, có độ nảy phím êm ái, tránh để bé tập lâu trên những chiếc laptop 13 inch có khoảng cách phím quá chật hẹp khiến các ngón tay bị co cụm.
                    </p>
                    <p style={{ marginBottom: '16px' }}>
                        Về góc ngồi học, ghế cần có chiều cao phù hợp để hai bàn chân bé chạm phẳng xuống sàn nhà, khuỷu tay gập góc vuông ngang tầm bàn và tầm mắt cách xa màn hình từ 50 đến 70 cm. Trước buổi thực hành, hãy hướng dẫn bé xem kỹ bài viết về <Link to="/tu-the-go-phim" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>tư thế ngồi và cách đặt tay</Link> để bé ghi nhớ cách thả lỏng vai và cổ tay.
                    </p>
                    <p style={{ marginBottom: '16px' }}>
                        Đặc biệt, cha mẹ hãy chỉ cho con khám phá <Link to="/bi-mat-phim-f-j" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>gờ nổi trên phím F và J</Link>. Hai chiếc gờ nhỏ bé này chính là kim chỉ nam giúp ngón trỏ của hai bàn tay tự tìm đúng vị trí xuất phát bất cứ lúc nào mà mắt bé hoàn toàn không cần liếc nhìn xuống bàn phím.
                    </p>
                    <p style={{ marginBottom: '0' }}>
                        Về thời lượng, quy tắc vàng là chỉ cho bé luyện tập đúng 10 phút mỗi ngày, duy trì 5–6 ngày trong tuần. Phụ huynh hãy chủ động cho con dừng buổi học ngay khi nhận thấy bé có biểu hiện mỏi tay, chớp mắt nhiều hoặc giảm tập trung. Trong những tuần đầu, tuyệt đối không tạo áp lực hay so đo tốc độ; mục tiêu cốt lõi duy nhất là bé gõ chuẩn xác và dùng đúng ngón tay đã phân công.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>3. Lộ trình 4 tuần</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Một lộ trình rõ ràng giúp cả phụ huynh và bé dễ dàng theo dõi sự tiến bộ từng ngày mà không bị ngợp. Dưới đây là kế hoạch 4 tuần được thiết kế tương thích với hệ thống bài tập từng bước trên Typing Kid VN:
                    </p>
                    <div style={{ overflowX: 'auto', marginTop: '20px', marginBottom: '25px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', overflow: 'hidden' }}>
                            <thead>
                                <tr>
                                    <th style={headStyle}>Tuần</th>
                                    <th style={{ ...headStyle, textAlign: 'left' }}>Mục tiêu</th>
                                    <th style={{ ...headStyle, textAlign: 'left' }}>Bài trên Typing Kid VN</th>
                                    <th style={{ ...headStyle, textAlign: 'left' }}>Đạt khi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td style={cellStyle}>1</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Hàng phím cơ sở ASDF JKL; không nhìn tay</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/?mode=basic_home" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Cơ bản: Hàng phím cơ sở</Link>
                                    </td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>gõ đúng từ 90% trở lên mà không nhìn bàn phím</td>
                                </tr>
                                <tr>
                                    <td style={cellStyle}>2</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Thêm hàng phím trên</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/?mode=basic_top" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Cơ bản: Hàng phím trên</Link>
                                    </td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>khoảng 10 từ/phút, đúng từ 90%</td>
                                </tr>
                                <tr>
                                    <td style={cellStyle}>3</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Hàng phím dưới, phím cách, chữ hoa</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/?mode=basic_bottom" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Cơ bản: Hàng phím dưới</Link>
                                    </td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>gõ được câu ngắn không dấu</td>
                                </tr>
                                <tr>
                                    <td style={cellStyle}>4</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>Dấu tiếng Việt: chọn Telex hoặc VNI</td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>
                                        <Link to="/?mode=vietnamese_telex" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Luyện dấu Telex</Link> hoặc <Link to="/?mode=vietnamese_vni" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Luyện dấu VNI</Link>
                                    </td>
                                    <td style={{ ...cellStyle, textAlign: 'left' }}>gõ được tên bé và tên trường có dấu</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px 25px', borderRadius: '16px', marginBottom: '20px' }}>
                        <p style={{ marginBottom: '10px' }}>
                            <strong>Hướng dẫn chi tiết từng tuần cho cha mẹ:</strong>
                        </p>
                        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <li><strong>Tuần 1:</strong> Khắc sâu vị trí nghỉ của 8 ngón tay trên hàng cơ sở. Nhắc bé luôn đặt ngón trỏ vào hai phím có gờ và tuyệt đối không cúi đầu nhìn bàn tay.</li>
                            <li><strong>Tuần 2:</strong> Rèn luyện phản xạ vươn ngón tay lên hàng trên gõ chữ rồi lập tức rút ngón quay về vị trí nghỉ ban đầu ở hàng cơ sở.</li>
                            <li><strong>Tuần 3:</strong> Mở rộng tầm với xuống hàng dưới, kết hợp dùng ngón cái nhấn phím cách (Spacebar) nhịp nhàng và ngón út giữ Shift khi cần viết hoa chữ cái đầu.</li>
                            <li><strong>Tuần 4:</strong> Bắt đầu gõ từ ngữ hoàn chỉnh có dấu thanh tiếng Việt. Hãy cho con thực hành với họ tên của chính mình, tên người thân và tên trường lớp thân quen.</li>
                        </ul>
                    </div>
                    <p style={{ marginBottom: '0' }}>
                        Khi bước vào tuần thứ 4, phụ huynh cần giúp con lựa chọn kiểu gõ dấu phù hợp. Với học sinh tiểu học, cách tiếp cận thuận lợi nhất là chọn kiểu Telex vì các phím bỏ dấu nằm ngay trong khu vực chữ cái, con không cần vươn tay lên hàng phím số. Ba mẹ có thể mở bài hướng dẫn <Link to="/huong-dan-telex" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>cách gõ Telex</Link> chi tiết và in <Link to="/bang-go-telex" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>bảng gõ Telex</Link> khổ A4 dán ngay bên cạnh màn hình máy tính. Nếu cả gia đình đã có thói quen dùng kiểu VNI, hãy cho bé làm quen qua bài hướng dẫn <Link to="/huong-dan-vni" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>cách gõ VNI</Link> và tham khảo <Link to="/bang-go-vni" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>bảng gõ VNI</Link> tương ứng.
                    </p>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>4. Giữ bé không chán</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Tâm lý trẻ nhỏ rất nhanh chán nếu phải gõ đi gõ lại những ký tự đơn điệu. Để mỗi buổi học luôn hào hứng và nhẹ nhàng, phụ huynh có thể áp dụng vài bí quyết đơn giản sau:
                    </p>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '20px 25px', borderRadius: '16px' }}>
                        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <li>
                                <strong>Xen kẽ trò chơi tương tác:</strong> Vào giữa hoặc cuối buổi tập 10 phút, hãy thưởng cho bé 2–3 phút trải nghiệm <Link to="/?mode=totoro_chase" style={{ color: 'var(--primary-color)', fontWeight: 600 }}>Game: Mie đuổi bắt</Link>. Trò chơi giúp bé vừa thư giãn vừa rèn luyện phản xạ gõ nhanh các phím chữ đang chạy.
                            </li>
                            <li>
                                <strong>Thay đổi bài tập sau mỗi 3 phút:</strong> Không nên bắt bé gõ một bài quá lâu. Hãy chuyển đổi linh hoạt giữa các bài luyện ký tự đơn, từ vựng ngắn và câu chuyện vui.
                            </li>
                            <li>
                                <strong>Khen ngợi độ chính xác thay vì tốc độ:</strong> Hãy cổ vũ số lần gõ đúng và việc con không nhìn bàn phím. Khi độ chuẩn xác đạt 90–95%, tốc độ gõ sẽ tự nhiên tăng dần theo thời gian.
                            </li>
                            <li>
                                <strong>Dán sẵn bảng tra cứu cạnh máy:</strong> Giúp bé tự liếc nhìn bảng gõ in sẵn khi quên quy tắc bỏ dấu, hạn chế thói quen cúi đầu nhìn xuống bàn phím.
                            </li>
                            <li>
                                <strong>Cùng con xem lại kết quả:</strong> Cuối mỗi bài tập, hãy để bé tự bấm xem bảng thành tích về độ chính xác và tỷ lệ hoàn thành để con cảm nhận rõ ràng từng bước tiến bộ của bản thân.
                            </li>
                        </ul>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>5. Lỗi hay gặp và cách sửa</h2>
                    <p style={{ marginBottom: '16px' }}>
                        Trong quá trình cùng con rèn luyện thói quen gõ phím tại nhà, cha mẹ thường sẽ thấy bé mắc phải bốn lỗi cơ bản dưới đây. Hãy kiên trì giúp con điều chỉnh nhẹ nhàng:
                    </p>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '25px', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>Lỗi 1: Bé luôn nhìn xuống bàn phím khi gõ</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                                Vấn đề là bé chưa đủ tự tin vào cảm giác vị trí của từng đầu ngón tay. Cách sửa hiệu quả nhất là dùng một chiếc khăn tay mỏng hoặc tờ giấy A4 phủ nhẹ lên hai mu bàn tay của bé, khuyến khích con nhìn thẳng vào màn hình và dựa vào hai gờ nổi F và J để định vị.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>Lỗi 2: Bé chỉ dùng hai ngón trỏ để mổ cò</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                                Thói quen này xuất hiện khi bé muốn gõ nhanh cho xong bài tập. Phụ huynh hãy đưa con quay trở lại tuần 1 với bài hàng phím cơ sở, yêu cầu con gõ thật chậm rãi và chỉ bấm phím khi ngón tay tương ứng đã được đặt đúng chỗ.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>Lỗi 3: Bé lúng túng gõ dấu sai thứ tự hoặc sai vị trí</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                                Nhiều bé loay hoay không biết phải gõ dấu ngay sau nguyên âm hay khi nào. Ba mẹ hãy giải thích và nhắc bé rằng hệ thống bộ gõ tiếng Việt đều cho phép gõ phím dấu ở ngay sau nguyên âm hoặc gõ ở cuối từ đều được nhận diện chính xác.
                            </p>
                        </div>
                        <div>
                            <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-main)', marginBottom: '6px' }}>Lỗi 4: Bé ngồi cong lưng hoặc cúi sát mắt vào màn hình</h3>
                            <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                                Đây là dấu hiệu rõ ràng cho thấy cơ thể bé đã bắt đầu mỏi mệt hoặc ghế ngồi chưa vừa tầm. Hãy cho con tạm nghỉ ngay lập tức, cùng con vươn vai vận động vài phút và điều chỉnh lại độ cao bàn ghế cùng khoảng cách màn hình trước khi tiếp tục.
                            </p>
                        </div>
                    </div>
                </section>

                <section style={{ marginBottom: '40px' }}>
                    <h2 style={{ fontSize: '24px', color: 'var(--primary-color)', marginBottom: '15px' }}>Câu hỏi thường gặp</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {faqs.map((f) => (
                            <div key={f.q} style={{ background: 'rgba(255,255,255,0.03)', padding: '20px 25px', borderRadius: '16px' }}>
                                <h3 style={{ fontSize: '17px', fontWeight: 600, color: 'var(--text-main)', marginBottom: '10px' }}>{f.q}</h3>
                                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7', margin: 0 }}>{f.a}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA cuối */}
                <div
                    className="glass"
                    style={{
                        marginTop: '40px',
                        marginBottom: '40px',
                        padding: '28px',
                        borderRadius: '20px',
                        textAlign: 'center',
                    }}
                >
                    <Link
                        to="/?mode=basic_home"
                        style={{
                            display: 'inline-block',
                            padding: '14px 32px',
                            background: 'var(--primary-color)',
                            color: '#fff',
                            borderRadius: '12px',
                            textDecoration: 'none',
                            fontWeight: 700,
                            fontSize: '16px',
                            marginBottom: '10px',
                        }}
                    >
                        Bắt đầu tuần 1 ngay
                    </Link>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                        Mở trên máy tính có bàn phím rời.
                    </div>
                </div>
            </article>

            <RelatedGuides currentPath="/tap-go-10-ngon-cho-be" />
        </motion.div>
    );
};

export default KidsRoadmap;
