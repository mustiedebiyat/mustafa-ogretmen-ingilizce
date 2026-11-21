import React, { useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  open: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ open, onClose }) => {
  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[88vh] bg-white rounded-2xl border border-slate-200 shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-r from-[#4C1D95] to-[#6D28D9] text-white px-5 py-4 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-amber-300" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-amber-200">
                Privacy Policy · Güvenli Eğitim
              </p>
              <h2 id="privacy-modal-title" className="text-lg font-extrabold truncate">
                Gizlilik Politikası
              </h2>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/15 text-white cursor-pointer shrink-0"
            aria-label="Gizlilik politikasını kapat"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-sm text-slate-700 leading-relaxed">
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-900 font-semibold">
            Özet: Bu uygulama öğrencilerden hiçbir kişisel veri toplamaz, dış sunuculara göndermez ve üçüncü taraflarla paylaşmaz. Reklam ve takip kodu içermez.
          </div>

          <section className="space-y-1.5">
            <h3 className="text-base font-extrabold text-slate-900">1. Genel Bilgilendirme</h3>
            <p>
              <strong>Mustafa Öğretmenle İngilizce</strong> uygulaması, 3. sınıf öğrencilerinin İngilizce kelime, dinleme ve alıştırma çalışmalarını güvenli bir ortamda yapabilmesi için <strong>Mustafa ŞAHİN</strong> tarafından hazırlanmıştır. Uygulama, çocukların çevrim içi güvenliğini esas alan Google Play Aileler Politikası ile tam uyumludur.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-base font-extrabold text-slate-900">2. Toplanan ve Saklanan Veriler</h3>
            <p>
              Uygulama sunucu tabanlı bir kullanıcı hesabı veya uzak veri tabanı kullanmaz. Öğrencinin girdiği ad, çalışma ilerlemesi, yıldızlar, rozetler ve mini sınav puanları yalnızca kullanıcının kendi cihazındaki yerel depolama alanında (<code>localStorage</code>) saklanır. Hiçbir veri internete aktarılmaz veya üçüncü taraflarla paylaşılmaz.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-base font-extrabold text-slate-900">3. İzinler, Ses ve Reklamlar</h3>
            <p>
              Uygulama kamera, mikrofon kaydı, konum veya rehber izni istemez. Kelime seslendirmeleri cihazın kendi konuşma sentezi özelliği ile yerel olarak yapılır. Uygulamada reklam veya kullanıcı izleme (analytics/tracker) yazılımı bulunmaz.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-base font-extrabold text-slate-900">4. Verilerin Silinmesi</h3>
            <p>
              Cihazda tutulan tüm ilerleme kayıtları ana sayfadaki <strong>“Çıkış Yap”</strong> butonuna basılarak veya cihaz/tarayıcı ayarlarından uygulama verileri temizlenerek istenildiği an kalıcı olarak silinebilir.
            </p>
          </section>

          <section className="space-y-1.5">
            <h3 className="text-base font-extrabold text-slate-900">5. İletişim</h3>
            <p>
              Gizlilik politikası hakkındaki sorularınız için geliştiriciyle{' '}
              <a
                href="mailto:derskonum@gmail.com"
                className="font-bold text-purple-800 underline hover:text-purple-950"
              >
                derskonum@gmail.com
              </a>{' '}
              üzerinden iletişime geçebilirsiniz.
            </p>
            <p className="text-xs text-slate-500 pt-1">Son güncelleme: 21 Kasım 2026</p>
          </section>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-5 py-3.5 flex items-center justify-between gap-3 shrink-0">
          <a
            href="/privacy.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-purple-800 hover:underline"
          >
            Tam Sayfa Bağlantısını Aç
          </a>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white text-xs sm:text-sm font-bold hover:bg-slate-800 cursor-pointer"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
