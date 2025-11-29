// words_tr.js
// TDK kelime listesini yükleyip VALID_WORDS setini hazırlayan dosya.

// Fetch başarısız olursa kullanılacak küçük yedek liste:
const FALLBACK_WORDS = [
  "ARABA","KİTAP","KALEM","DENİZ","BULUT","ELMA","ARMUT","KEDİ","KÖPEK","YAZAR"
];

let VALID_WORDS = new Set(FALLBACK_WORDS);

// Oyun başlamadan önce kelime havuzunun tamamen yüklenmesi için global promise
window.WORDS_READY = (async () => {
  try {
    const res = await fetch("tdk_kelimeler.txt"); // Aynı klasörde olmalı
    if (!res.ok) throw new Error("Kelime dosyası okunamadı");

    const text = await res.text();

    const arr = text
      .split(/\s+/)
      .map(w => w.trim())
      .filter(w => w.length > 1)       // tek harfli girişleri at
      .map(w => w.toUpperCase());      // hepsini BÜYÜK harfe çevir

    VALID_WORDS = new Set(arr);

    console.log("📘 TDK kelimeleri yüklendi. Kelime sayısı:", VALID_WORDS.size);
  } catch (err) {
    console.warn("⚠️ TDK kelime listesi yüklenemedi, FALLBACK kullanılacak:", err);
  }
})();
