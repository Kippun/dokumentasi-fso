---
title: Perancangan Sistem
layout: page
nav_order: 3
description: "Dokumentasi Riset Free Space Optics"
permalink: /docs/infrastruktur
---


# Wiring Diagram (Skema Koneksi)

Berikut adalah visualisasi rangkaian dan tabel koneksi antar komponen.

## A. Sisi Transmitter (Laser + Driver 2N2222)

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/pengirim.jpeg" class="zoomable" alt="infrastruktur pengirim" width="35%">
</div>
<center><i>Infrastruktur Pengirim</i></center>
<br>

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/TRANSMITTER.png" class="zoomable" alt="Wiring Diagram Transmitter FSO" width="45%">
</div>
<center><i>Wiring Diagram Transmitter (ESP32 + SYD1230 + 2N2222)</i></center>
<br>

Sirkuit ini menggunakan konfigurasi Low-Side Switching. Transistor bertindak sebagai sakelar ("keran") di sisi negatif laser untuk memutus-nyambungkan arus.

| Komponen | Pin / Kaki | Terhubung Ke | Keterangan Penting |
| :--- | :--- | :--- | :--- |
| **Laser SYD1230** | Kabel Merah (+) | **ESP32 VIN** | Mengambil daya 5V langsung dari USB/Vin. |
| | Kabel Hitam (-) | **Kolektor (C)** | Terhubung ke kaki kanan transistor (jika bagian datar menghadap Anda). |
| **Transistor 2N2222** | Basis (B) | **Resistor 1kΩ** | Kaki tengah. Resistor lanjut terhubung ke GPIO 4 ESP32. |
| | Emitor (E) | **ESP32 GND** | Kaki kiri. Jalur pembuangan arus ke Ground. |
| | Kolektor (C) | **Laser Kabel (-)** | Kaki kanan. Menampung beban arus dari laser. |

## B. Sisi Receiver (Modul OPT101)

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/penerima.jpeg" class="zoomable" alt="infrastruktur penerima" width="35%">
</div>
<center><i>Infrastruktur Penerima</i></center>
<br>

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/RECEIVER.png" class="zoomable" alt="Wiring Diagram Receiver FSO" width="45%">
</div>
<center><i>Wiring Diagram Receiver (ESP32 + OPT101)</i></center>
<br>

Modul OPT101 membutuhkan tegangan stabil 3.3V agar aman bagi pin ADC ESP32 dan memiliki *noise* rendah.

| Komponen | Pin Modul | Terhubung Ke | Keterangan Penting |
| :--- | :--- | :--- | :--- |
| **OPT101** | VCC | **ESP32 3V3** | Jangan hubungkan ke 5V (risiko sinyal jenuh/rusak). |
| | GND / COM | **ESP32 GND** | Satukan pin `-V` (Pin 3) dan `COM` (Pin 8) ke Ground. |
| | OUT | **GPIO 34** | Pin khusus Input Analog (ADC1_CH6). |
| | 1M (Feedback) | **Pin OUT** | **WAJIB JUMPER:** Hubungkan pin `1M` (Pin 4) ke pin `OUT` (Pin 5) agar sensitivitas maksimal. |

## Media Kanal

Untuk penggunaan media kanal yang digunkan untuk melakukan pengujian gangguan atenuasi pada atmosfer (attenuation turbulence) yaitu menguji pengiriman laser yang dikirimkan dan dipantulkan pada cermin/kaca pada dinding akuariumnya untuk menciptkanan lintasan optik yang lebih panjang. Pengujian pada transmisi laser menggunakan simulasi kabut asap, air hujan, gangguan cahaya, serta gangguan yang bisa diuji. 

Pengujian menggunakan berbagai simulasi gangguan atmosfer bertujuan untuk mengukur berapa bit yang hilang pada saat pengiriman melalui gangguan atmosfer tersebut dengan metode *Bit Error Rate* (BER).

<div style="text-align: center;">
  <img src="{{ site.baseurl }}/assets/images/blok-diagram-fso.png" class="zoomable" alt="Wiring Diagram Receiver FSO" width="60%">
</div>
<center><i>Blok Diagram Free Space Optics</i></center>
<br>