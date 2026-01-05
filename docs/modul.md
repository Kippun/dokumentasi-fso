---
title: Perangkat Keras
layout: page
nav_order: 2
description: "Dokumentasi Riset Free Space Optics"
permalink: /docs/modul
---

# Spesifikasi Komponen FSO
{: .no_toc }

Sistem FSO ini dibangun menggunakan pendekatan *low-cost* dengan komponen elektronika yang tersedia umum di pasaran. Berikut adalah detail teknis dari setiap modul yang digunakan.

1. TOC
{:toc}

---

## 1. Mikrokontroler (DOIT ESP32 DevKit V1)

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/esp32devkitv1.webp"  class="zoomable" alt="ESP32DEVKIT-V1" width="30%">
</div>
<center><i>Mikrokontroler ESP32 Dev Kit V1</i></center>

Sebagai unit pemrosesan utama (*Main Processing Unit*), sistem ini menggunakan papan pengembangan DOIT ESP32 DevKit V1. Board ini merupakan *development board* yang berbasis pada modul ESP-WROOM-32.

### Alasan Pemilihan Perangkat
Kami memilih varian DevKit V1 dari DOIT ini karena beberapa keunggulan arsitektur yang krusial untuk proyek FSO:

1.  **Performa Tinggi:** Ditenagai oleh prosesor Tensilica Xtensa® LX6 32-bit yang dapat beroperasi dalam mode *Dual-core* dengan kecepatan *clock* hingga 240 MHz. Kecepatan ini sangat dibutuhkan untuk melakukan *sampling* data sinyal optik secara *real-time* tanpa jeda.
2.  **Konektivitas Terintegrasi:** Chip ini sudah memiliki modul Wi-Fi (802.11 b/g/n) dan Bluetooth dalam satu paket. Fitur ini memungkinkan sistem FSO untuk mengirimkan data telemetri (seperti status koneksi atau kualitas sinyal) ke *dashboard* pemantauan secara nirkabel tanpa perlu modul tambahan.
3.  **Fleksibilitas Daya:** Board ini dilengkapi regulator tegangan internal yang memungkinkan suplai daya fleksibel, baik melalui kabel USB maupun tegangan eksternal (baterai) melalui pin VIN dengan rentang input yang lebar (7-12V).


### Spesifikasi Teknis
Berdasarkan dokumen teknis (*datasheet*), berikut adalah spesifikasi detail dari *board* yang digunakan:

| Parameter | Nilai / Keterangan |
|:--- |:--- |
| **Model Board** | DOIT ESP32 DevKit V1 |
| **Prosesor** | Tensilica 32-bit Single-/Dual-core CPU Xtensa LX6 |
| **Kecepatan Clock** | Hingga 240 MHz |
| **Memori (RAM/Flash)** | 520 KB SRAM / 4 MB Flash Memory |
| **Tegangan Operasi** | 3.3V (Logic Level) |
| **Input Tegangan (VIN)** | 7 - 12V DC (Rekomendasi) |
| **Jumlah Pin GPIO** | 25 Digital I/O (termasuk fungsi PWM) |
| **Antarmuka Serial** | 3x UART, 2x SPI, 3x I2C |
| **Konverter Data** | 6x Analog Input (ADC) & 2x Analog Output (DAC) |

Untuk mengakses datasheet komponen berikut, bisa dengan mengikuti [tautan berikut]({{ site.baseurl }}/assets/datasheet/ESP32DEVKIT-V1.pdf){:target="_blank"}

{: .note }
> **Catatan Mengenai Daya:**
> Meskipun pin VIN dapat menerima tegangan hingga 20V secara teori, dokumen spesifikasi sangat menyarankan rentang 7V hingga 12V. Penggunaan tegangan di atas 12V berisiko menyebabkan regulator tegangan *overheat* (panas berlebih) dan dapat merusak perangkat.
>
> Selain itu, perlu diperhatikan bahwa tegangan logika pada pin GPIO adalah 3.3V. Hindari menghubungkan sensor 5V secara langsung ke pin input tanpa *level shifter* untuk menjaga keawetan mikrokontroler.

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/esp32-wroom.webp" class="zoomable" alt="2N2222" width="70%">
</div>
<center><i>DOIT ESP32 DevKit V1</i></center>

---

## 2. Transmitter Optik (Laser & Driver)

Berbeda dengan modul laser standar yang langsung terhubung ke pin data, sistem transmisi pada proyek ini dirancang menggunakan dua komponen terpisah untuk memastikan stabilitas daya dan kecepatan *switching* yang optimal.

Sisi pengirim (*Transmitter*) terdiri dari Modul Laser SYD1230 sebagai sumber cahaya dan Transistor 2N2222 sebagai rangkaian penggerak (*driver*).

### A. Modul Laser (SYD1230)
Kami menggunakan modul laser industri seri SYD1230. Pemilihan modul ini didasarkan pada fitur lensa yang dapat disesuaikan (*adjustable focus*), yang memungkinkan berkas cahaya dikolimasi (dibuat sejajar) untuk menjangkau jarak yang lebih jauh dibandingkan laser *pointer* biasa.

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/syd1230.png" class="zoomable" alt="SYD1230" width="400" height="300">
</div>
<center><i>Modul laser SYD1230</i></center>

Berdasarkan *datasheet* pabrikan, berikut adalah karakteristik utama modul ini:

| Parameter | Nilai | Keterangan |
|:--- |:--- |:--- |
| **Panjang Gelombang** | 650 nm | Cahaya Merah (*Visible Light*) |
| **Daya Output** | < 5 mW | Aman untuk keperluan riset (dengan pelindung mata) |
| **Tegangan Kerja** | 3.5 - 5.0 V DC | Kompatibel dengan *supply* 5V USB |
| **Konsumsi Arus** | < 25 mA | Hemat daya |
| **Fitur Lensa** | *Adjustable Focus* | Fokus dapat diatur manual dengan memutar kepala lensa |

Untuk mengakses datasheet komponen berikut, bisa dengan mengikuti [tautan berikut]({{ site.baseurl }}/assets/datasheet/SYD1230.pdf){:target="_blank"}

{: .warning }
> **Peringatan Keselamatan:**
> Modul ini memancarkan radiasi laser yang dapat berbahaya bagi mata. Jangan pernah menatap langsung ke sumber sinar (*direct beam*).
>
> **Catatan Instalasi:**
> *Housing* atau selongsong logam pada modul SYD1230 ini terhubung ke kutub **Positif/Anode (+)**. Sangat penting untuk memastikan badan laser tidak menyentuh *ground* atau logam lain pada rangka alat untuk mencegah hubungan pendek arus (*short circuit*).

### B. Laser Driver (Transistor 2N2222)

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/2n2222.webp" class="zoomable" alt="2N2222" width="25%">
</div>
<center><i>Transistor 2N2222</i></center>

Modul laser SYD1230 tidak memiliki pin input data (TTL) khusus, sehingga laser ini hanya akan menyala jika diberi tegangan daya secara langsung. Oleh karena itu, kita tidak bisa menghubungkannya langsung ke pin GPIO mikrokontroler untuk keperluan modulasi data berkecepatan tinggi.

Solusinya adalah menggunakan rangkaian *driver* sederhana berbasis transistor P2N2222A (varian dari keluarga 2N2222).

### Fungsi dalam Sistem
Transistor ini berfungsi sebagai saklar elektronik kecepatan tinggi.
1.  **Penguatan Arus:** Meskipun arus laser relatif kecil (<25mA), penggunaan transistor menjamin pin GPIO ESP32 tidak terbebani secara langsung, menjaga sinyal kontrol tetap stabil.
2.  **Kecepatan Switching:** P2N2222A memiliki karakteristik waktu tunda (*delay time*) dan waktu naik (*rise time*) yang sangat cepat (sekitar 25 nanodetik), yang sangat krusial untuk mengikuti kecepatan *baud rate* pengiriman data biner tanpa distorsi.
3.  **Kapasitas Daya:** Dengan batas arus kolektor maksimal hingga 600 mA, transistor ini bekerja jauh di bawah batas maksimumnya saat mengendalikan laser, sehingga komponen tetap dingin dan awet.

| Parameter | Nilai | Catatan |
|:--- |:--- |:--- |
| **Tipe** | NPN Silicon | General Purpose Amplifier |
| **Arus Kolektor (Maks)** | 600 mA | *Safety margin* besar untuk beban laser |
| **Kecepatan Rise Time** | 25 ns | Mendukung transmisi frekuensi tinggi |
| **Kemasan** | TO-92 | Paket standar transistor 3 kaki |

Untuk mengakses datasheet komponen berikut, bisa dengan mengikuti [tautan berikut]({{ site.baseurl }}/assets/datasheet/P2N2222A-D.pdf){:target="_blank"}

---

### C. Skema Rangkaian Transmitter
Dalam implementasinya, transistor 2N2222 dikonfigurasikan sebagai *Low-Side Switch* (Saklar sisi Ground).

* **Kaki Basis (Base):** Terhubung ke Pin GPIO ESP32 (melalui resistor pembatas arus) untuk menerima sinyal data digital (0/1).
* **Kaki Kolektor (Collector):** Terhubung ke kabel Negatif (Hitam) modul laser.
* **Kaki Emitor (Emitter):** Terhubung ke Ground (GND).
* **Modul Laser:** Kabel Positif (Merah) laser terhubung langsung ke sumber tegangan 5V.

**Logika Kerja:**
Saat GPIO ESP32 mengirim logika HIGH (1), transistor akan aktif (*saturation*) dan menyambungkan jalur arus laser ke Ground, sehingga laser MENYALA. Sebaliknya, saat logika LOW (0), transistor memutus jalur arus (*cutoff*), dan laser MATI.

---

## 3. Receiver Optik (Evolusi Sensor Penerima)

Bagian penerima (*receiver*) bertugas menangkap kedipan cahaya dari *transmitter* dan menerjemahkannya kembali menjadi sinyal listrik.

Dalam pengembangan riset ini, kami membandingkan dua jenis modul penerima untuk menentukan performa terbaik.

### A. Modul Sensor Cahaya (LM393)

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/ldr-photoresistor.webp" class="zoomable" alt="LDR-Photoresistor" width="35%">
</div>
<center><i>LDR Photoresistor</i></center>

Pada tahap awal, digunakan modul sensor cahaya pasaran yang umum digunakan dalam pembelajaran elektronika dasar. Modul ini terdiri dari komponen sensor LDR tipe L5528 yang dipasangkan dengan chip komparator LM393.

### Komponen Penyusun Modul
1.  **Sensor LDR (GL5528):** Komponen utama yang mendeteksi cahaya. Resistansinya berubah sesuai intensitas cahaya (Terang = Resistansi Rendah, Gelap = Resistansi Tinggi).
2.  **Chip LM393 (Comparator):** Berfungsi membandingkan tegangan dari LDR dengan tegangan referensi. Jika cahaya laser mengenai LDR, chip ini akan mengeluarkan logika `LOW` (atau `HIGH` tergantung konfigurasi) ke pin Digital Output (DO).
3.  **Potensiometer (Trimpot):** Komponen putar berwarna biru yang berfungsi mengatur sensitivitas (ambang batas) cahaya agar sensor tidak terganggu cahaya ruangan.

### Analisis Kekurangan (Mengapa Tidak Dipakai?)
Meskipun modul LM393 memudahkan pembacaan sinyal digital (0/1), kendala utamanya tetap terletak pada karakteristik fisik komponen LDR GL5528 itu sendiri.

Berdasarkan *datasheet*, sensor LDR memiliki Waktu Respons (*Response Time*) yang sangat lambat, yakni sekitar 20-30 milidetik. Akibatnya, modul ini hanya cocok untuk mendeteksi perubahan lambat (siang/malam), namun gagal total saat harus membaca kedipan laser berkecepatan tinggi (kHz) dalam pengiriman data teks.

Untuk mengakses datasheet komponen berikut, bisa dengan mengikuti [tautan berikut]({{ site.baseurl }}/assets/datasheet/LDR_Photoresistor.pdf){:target="_blank"}

---

### B. Photodiode OPT101 (Monolithic)

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/OPT101.webp" class="zoomable" alt="OPT101" width="40%">
</div>
<center><i>OPT101</i></center>

Untuk mengatasi masalah kelambatan tersebut, sistem penerima ditingkatkan menggunakan chip OPT101 dari Texas Instruments.

OPT101 bukan sekadar sensor biasa, melainkan sebuah Sistem Optik Monolitik. Di dalam satu chip kecil berkaki 8 ini, sudah tertanam sebuah *photodiode* presisi dan *Transimpedance Amplifier* (TIA) yang terintegrasi.

### Keunggulan Teknis
Mengacu pada dokumen spesifikasi (*datasheet*) Texas Instruments, berikut alasan mengapa OPT101 sangat superior untuk FSO:

1.  **Responsivitas Spektral Luas:**
    Sensor ini sangat sensitif terhadap panjang gelombang 650 nm (laser merah) dengan responsivitas sekitar 0.45 V/µW. Artinya, sedikit saja cahaya laser yang tertangkap akan langsung dikuatkan menjadi tegangan listrik yang signifikan.

2.  **Bandwidth Lebar (Kecepatan Tinggi):**
    Berbeda dengan LDR yang bekerja dalam satuan milidetik, OPT101 memiliki *bandwidth* hingga 14 kHz (dengan resistor internal 1 MΩ). Ini berarti sensor dapat merespons perubahan sinyal puluhan ribu kali per detik, memungkinkan pengiriman data teks yang mulus.

3.  **Integrasi Amplifier (Low Noise):**
    Masalah utama photodiode biasa adalah arus bocor dan *noise* (derau). Karena OPT101 menanamkan penguat (Op-Amp) tepat di sebelah sensor dalam satu kemasan silikon, gangguan sinyal eksternal dapat diminimalisir secara drastis dibandingkan merakit sensor dan amplifier secara terpisah.

### Konfigurasi Pin Receiver
Berikut adalah skema penyambungan modul OPT101 ke mikrokontroler ESP32:

| Pin OPT101 | Fungsi | Koneksi ke ESP32 | Keterangan |
|:--- |:--- |:--- |:--- |
| **Vs (1)** | Supply Voltage | 3.3V / 5V | Mendukung rentang luas 2.7V - 36V |
| **-In (2)** | Input Negatif | - | Dibiarkan terbuka (Open) |
| **-V (3)** | Ground (Common) | GND | Titik referensi 0V |
| **Feedback (4)** | Umpan Balik | Output (Pin 5) | Menghubungkan resistor internal 1MΩ |
| **Output (5)** | Output Sinyal | GPIO 34 (ADC) | Sinyal analog hasil pembacaan |
| **Common (8)** | Ground | GND | Terhubung ke Pin 3 |

Untuk mengakses datasheet komponen berikut, bisa dengan mengikuti [tautan berikut]({{ site.baseurl }}/assets/datasheet/OPT101.pdf){:target="_blank"}

{: .note }
> **Catatan Implementasi:**
> Pin 4 dan Pin 5 perlu dihubungkan (*jumper*) untuk mengaktifkan resistor *feedback* internal sebesar 1 MΩ. Hal ini memberikan penguatan (*gain*) yang optimal tanpa perlu menambahkan komponen eksternal.