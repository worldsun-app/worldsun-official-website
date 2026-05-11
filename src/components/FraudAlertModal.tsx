import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const POLICE_REPORT_IMAGE = "/fraud-alert-police-report.jpg";

const FraudAlertModal = () => {
  const [open, setOpen] = useState(false);
  const [imageZoomed, setImageZoomed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 400);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  const handleClose = () => {
    setImageZoomed(false);
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="fraud-alert-overlay"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="fraud-alert-title"
        >
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl flex flex-col"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 22, stiffness: 220 }}
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="關閉公告"
              className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-600 shadow-md ring-1 ring-gray-200 transition hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-3 px-6 pt-6 pb-4 bg-gradient-to-r from-red-50 to-amber-50 border-b border-red-100">
              <div className="flex-shrink-0 rounded-full bg-red-100 p-2.5">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-red-600">
                  重要公告 · Important Notice
                </p>
                <h2
                  id="fraud-alert-title"
                  className="text-lg sm:text-xl font-bold text-gray-900"
                >
                  詐騙警示通知
                </h2>
              </div>
            </div>

            <div className="overflow-y-auto px-6 py-5 space-y-4 text-gray-700 leading-relaxed text-sm sm:text-base">
              <p>
                近期發現有<span className="font-semibold text-red-600">不明人士冒用本公司名義，並且盜用公司分機撥打電話</span>，
                而後假冒「<span className="font-semibold">沃勝聯合家族辦公室股份有限公司</span>」進行電話詐騙行為。
              </p>
              <p>
                本公司已於 <span className="font-semibold">中華民國 115 年 5 月 11 日</span> 至
                <span className="font-semibold">臺北市政府警察局大安分局瑞安街派出所</span> 正式報案，
                案號：<span className="font-mono font-semibold">Z115059AW2Q1SLK</span>。
              </p>
              <p className="text-red-700 font-medium">
                提醒所有客戶與民眾，凡接獲可疑來電請務必審慎查證，避免造成財產損失。
                如有任何疑問，歡迎透過官網聯絡資訊與本公司直接聯繫。
              </p>

              <div className="pt-2">
                <p className="mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                  受理案件證明單
                </p>
                <button
                  type="button"
                  onClick={() => setImageZoomed(true)}
                  className="block w-full overflow-hidden rounded-lg border border-gray-200 bg-gray-50 transition hover:border-red-300 hover:shadow-md"
                >
                  <img
                    src={POLICE_REPORT_IMAGE}
                    alt="臺北市政府警察局大安分局瑞安街派出所受理案件證明單"
                    className="w-full h-auto object-contain max-h-[40vh]"
                    loading="lazy"
                  />
                  <span className="block px-3 py-2 text-xs text-gray-500 text-center bg-white border-t border-gray-100">
                    點擊圖片可放大檢視
                  </span>
                </button>
              </div>
            </div>

            <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100 bg-gray-50">
              <Button
                onClick={handleClose}
                className="bg-red-600 hover:bg-red-700 text-white font-medium px-6"
              >
                我已了解，進入網站
              </Button>
            </div>
          </motion.div>

          <AnimatePresence>
            {imageZoomed && (
              <motion.div
                key="image-zoom"
                className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/90 p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setImageZoomed(false)}
              >
                <button
                  type="button"
                  onClick={() => setImageZoomed(false)}
                  aria-label="關閉放大檢視"
                  className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow-lg hover:bg-white"
                >
                  <X className="h-5 w-5" />
                </button>
                <motion.img
                  src={POLICE_REPORT_IMAGE}
                  alt="臺北市政府警察局大安分局瑞安街派出所受理案件證明單"
                  className="max-w-full max-h-[95vh] object-contain rounded-lg shadow-2xl"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FraudAlertModal;
