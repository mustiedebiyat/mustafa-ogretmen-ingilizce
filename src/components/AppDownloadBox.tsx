import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { CheckCircle2, Download, Share, Smartphone, X } from 'lucide-react';

export const AppDownloadBox: React.FC = () => {
  const { isInstallable, isInstalled, install } = usePWAInstall();
  const [guideModal, setGuideModal] = useState<'android' | 'ios' | null>(null);

  const handleAndroidClick = async () => {
    if (isInstallable) {
      const accepted = await install();
      if (!accepted) {
        setGuideModal('android');
      }
    } else {
      setGuideModal('android');
    }
  };

  return (
    <section
      aria-label="Mobil Uygulama İndirme"
      className="max-w-6xl mx-auto px-4 sm:px-6 mt-10"
    >
      <div className="rounded-2xl bg-gradient-to-r from-[#4C1D95] via-[#5B21B6] to-[#3B0764] text-white p-5 sm:p-7 shadow-md border border-purple-700/60 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
            <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 text-amber-300" />
          </div>
          <div className="space-y-1">
            <p className="text-xs font-extrabold uppercase tracking-wider text-amber-200">
              Mobil Uygulama Deneyimi
            </p>
            <h2 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              Android ve iOS Cihazına Uygulama Olarak İndir
            </h2>
            <p className="text-xs sm:text-sm text-purple-100/90 max-w-xl">
              Tek dokunuşla telefon veya tabletinin ana ekranına ekle; internet olmadan bile hızlı ve tam ekran çalış!
            </p>
          </div>
        </div>

        {isInstalled ? (
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-300/40 text-emerald-100 text-sm font-bold shrink-0">
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>Uygulama Cihazına Yüklü</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 shrink-0">
            {/* Android Install Box */}
            <button
              type="button"
              onClick={handleAndroidClick}
              className="inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:scale-[0.99] text-white font-extrabold text-sm shadow-sm transition-all cursor-pointer min-h-[48px] whitespace-nowrap"
            >
              <Download className="w-5 h-5 shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-100 leading-none">
                  Android (Chrome)
                </span>
                <span className="block text-sm font-extrabold leading-tight mt-0.5">
                  Android İçin İndir
                </span>
              </div>
            </button>

            {/* iOS Install Box */}
            <button
              type="button"
              onClick={() => setGuideModal('ios')}
              className="inline-flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl bg-white hover:bg-slate-100 active:scale-[0.99] text-slate-900 font-extrabold text-sm shadow-sm transition-all cursor-pointer min-h-[48px] whitespace-nowrap"
            >
              <Share className="w-5 h-5 text-[#4C1D95] shrink-0" />
              <div className="text-left">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 leading-none">
                  iOS (iPhone / iPad)
                </span>
                <span className="block text-sm font-extrabold leading-tight mt-0.5">
                  iOS İçin Yükle
                </span>
              </div>
            </button>
          </div>
        )}
      </div>

      {/* Step-by-step Install Guide Modal */}
      {guideModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <div className="w-full max-w-md rounded-2xl bg-white text-slate-900 p-6 shadow-2xl border border-slate-200 space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-purple-800">
                  {guideModal === 'ios' ? 'iPhone & iPad (Safari)' : 'Android (Google Chrome)'}
                </p>
                <h3 className="text-xl font-extrabold text-slate-900 mt-0.5">
                  {guideModal === 'ios'
                    ? 'iOS Cihazına Uygulamayı Ekle'
                    : 'Android Cihazına Uygulamayı Kur'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setGuideModal(null)}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 cursor-pointer"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {guideModal === 'ios' ? (
              <ol className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-[#4C1D95] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span>
                    Bu sayfayı <strong>Safari</strong> tarayıcısında aç ve alt menüdeki{' '}
                    <strong>Paylaş (Share)</strong> simgesine dokun.
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-[#4C1D95] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span>
                    Açılan listede aşağı kaydır ve{' '}
                    <strong>“Ana Ekrana Ekle” (Add to Home Screen)</strong> seçeneğine dokun.
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-[#4C1D95] text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span>
                    Sağ üst köşedeki <strong>Ekle</strong> butonuna bas. Uygulama simgesi ana ekranına yerleşecektir!
                  </span>
                </li>
              </ol>
            ) : (
              <ol className="space-y-3 text-sm text-slate-700">
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                    1
                  </span>
                  <span>
                    Bu sayfayı telefonunda <strong>Google Chrome</strong> ile aç ve sağ üst köşedeki{' '}
                    <strong>üç nokta (⋮)</strong> menüsüne dokun.
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                    2
                  </span>
                  <span>
                    Menüden <strong>“Uygulamayı yükle”</strong> veya{' '}
                    <strong>“Ana ekrana ekle”</strong> seçeneğine dokun.
                  </span>
                </li>
                <li className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-extrabold flex items-center justify-center shrink-0">
                    3
                  </span>
                  <span>
                    <strong>Yükle</strong> onayına bas. Uygulama telefonuna Android uygulaması gibi kurulacaktır!
                  </span>
                </li>
              </ol>
            )}

            <button
              type="button"
              onClick={() => setGuideModal(null)}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-extrabold cursor-pointer transition-colors"
            >
              Anladım, Kapat
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
