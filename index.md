---
title: Home
layout: home
nav_order: 1
description: "Dokumentasi Riset Free Space Optics"
permalink: /
---

# Selamat datang di Dokumentasi Free Space Optics!
{: .fs-9 }

Dokumentasi ini berisi informasi terkait riset Free Space Optics (FSO), mulai dari memahami, mengonfigurasi, serta membuat rancangan infrastruktur FSO menggunakan modul sederhana.
{: .fs-6 .fw-300 }

[Lihat di GitHub](https://github.com/Kippun/dokumentasi-fso){: .btn .fs-5 .mb-4 .mb-md-0 target="_blank" rel="noopener noreferrer" }

---

## Free Space Optics

Free Space Optics atau disingkat dengan FSO merupakan teknologi komunikasi secara nirkabel yang mengirikan data melalui udara bebas (atmosfer) menggunakan pancaran cahaya terfokus sebagai medium transmisi. Prinsip yang dimiliki FSO sama seperti cara kerja yang dimiliki serat optik namun tanpa perantara kabel fisik yang menjadikannya solusi untuk koneksi bandwidth tinggi secara nirkabel dengan kecepatan Gigabit Ethernet dan tidak memerlukan lisensi frekuensi radio karena menggunakan spektrum cahaya.

**Cara kerja sederhana Free Space Optics melalui tiga hal berikut:**
1. **Transmisi** : Data dimodulasi menjadi cahaya laser (laser inframerah atau laser visible light communication) di pemancar.
2. **Propagasi** : Cahaya ini ditembakkan melalui udara  (ruang bebas) menuju penerima (receiver) yang berada di lokasi lain, penempatan receiver tergantung keperluan penggunaannya yang bisa berjarak beberapa meter hingga kilometer dari transmitter.
3. **Receiver** : Penerima menangkap cahaya, lalu mengubahnya kembali menjadi data digital.

Teknologi FSO umum digunakan pada aplikasi *backhaul* sebagai perangkat yang menghubungkan pusat distribusi terakhir langsung ke pengguna akhir. Selain itu, FSO juga sering diimplementasikan sebagai jalur backhaul, yang berfungsi mengalirkan trafik data kapasitas besar dari pusat distribusi (seperti menara seluler) menuju jaringan inti (*core network*) tanpa perlu menggunakan media kabel fisik sebagai perantaranya.

## Kelebihan dan Tantangan Infrastruktur Free Space Optics

| Kelebihan | Tantangan | 
|:--- |:--- |
| **Kecepatan Tinggi**: Mampu mencapai *throughput* setara fiber optik. | **Cuaca**: Kabut, hujan deras, dan polusi asap dapat meredam sinyal cahaya (atenuasi). |
| **Keamanan**: Sinyal sulit disadap karena *beam* cahaya sangat sempit dan tidak menembus dinding. | **Line of Sight (LoS)**: Pemancar dan penerima harus lurus sempurna tanpa halangan fisik. |
| **Tanpa Lisensi**: Menggunakan spektrum cahaya yang tidak memerlukan izin regulasi frekuensi. | **Stabilitas**: Guncangan fisik atau angin kencang dapat menggeser aligment laser. |
| **Tanpa Media Fisik**: Penggunaan FSO yang tidak memerlukan kabel fisik yang membuat instalasi FSO bisa memangkas biaya. | **Jarak Terbatas**: Jarak efektif umumnya 1-5 km, jarak jauh lebih rentan terhadap pelebaran cahaya. |

## Fokus Riset & Dokumentasi

Web dokumentasi ini secara khusus membahas implementasi konsep FSO tersebut ke dalam skala purwarupa (prototype).

Alih-alih menggunakan perangkat *carrier-grade* yang mahal, dokumentasi ini akan memandu pembuatan sistem FSO menggunakan komponen elektronika yang mudah didapat, dengan tujuan memvalidasi prinsip kerja komunikasi optik ruang bebas.

**Topik pembahasan meliputi:**
* Perancangan sistem optik sederhana (Transmitter & Receiver).
* Penggunaan mikrokontroler ESP32 untuk pemrosesan sinyal.
* Pengujian *throughput* dan kestabilan koneksi pada jarak dekat.