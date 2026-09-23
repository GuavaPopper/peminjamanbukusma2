/* Data dummy untuk prototipe. Sampul buku dibuat dengan CSS, bukan gambar. */
window.BOOKS = [
  {
    id: 'laskar-pelangi', title: 'Laskar Pelangi', author: 'Andrea Hirata', year: 2005,
    category: 'Fiksi', tags: ['Inspiratif', 'Persahabatan', 'Sekolah'],
    stock: 4, total: 6, borrowedTotal: 212, rating: 4.8, reviews: 86, shelf: 'A · Baris 2',
    desc: 'Sepuluh anak dari keluarga sederhana di Belitung bertahan di sebuah sekolah Muhammadiyah yang nyaris ditutup. Kisah tentang guru yang gigih, persahabatan, dan mimpi yang lebih besar dari keadaan mereka.',
    cover: { layout: 'band', bg: '#f1c453', fg: '#1d3557', accent: '#1d3557' }
  },
  {
    id: 'bumi', title: 'Bumi', author: 'Tere Liye', year: 2014,
    category: 'Fiksi', tags: ['Fantasi', 'Petualangan', 'Seri'],
    stock: 2, total: 5, borrowedTotal: 301, rating: 4.7, reviews: 124, shelf: 'A · Baris 4',
    desc: 'Raib, siswi kelas sepuluh, menyimpan rahasia: ia bisa menghilang. Bersama Seli dan Ali, ia menemukan dunia paralel dan petualangan yang menguji keberanian mereka.',
    cover: { layout: 'plain', bg: '#1f2a44', fg: '#f4e9d8', accent: '#e07a5f' }
  },
  {
    id: 'negeri-5-menara', title: 'Negeri 5 Menara', author: 'A. Fuadi', year: 2009,
    category: 'Fiksi', tags: ['Pesantren', 'Motivasi'],
    stock: 3, total: 4, borrowedTotal: 156, rating: 4.6, reviews: 58, shelf: 'A · Baris 1',
    desc: 'Alif merantau dari Maninjau ke sebuah pondok di Jawa Timur. Di bawah menara masjid, ia dan lima sahabatnya belajar bahwa kesungguhan bisa membuka jalan ke mana saja.',
    cover: { layout: 'frame', bg: '#e8dcc4', fg: '#3d2c1e', accent: '#8a5a2b' }
  },
  {
    id: 'laut-bercerita', title: 'Laut Bercerita', author: 'Leila S. Chudori', year: 2017,
    category: 'Fiksi', tags: ['Sejarah', 'Drama'],
    stock: 0, total: 3, borrowedTotal: 97, rating: 4.9, reviews: 71, shelf: 'A · Baris 3',
    desc: 'Biru Laut, mahasiswa aktivis di akhir 1990-an, bercerita tentang kawan-kawannya dan keluarga yang terus menunggu. Novel tentang kehilangan dan ingatan yang tidak boleh padam.',
    cover: { layout: 'stripe', bg: '#0f4c5c', fg: '#f5efe6', accent: '#5fa8d3' }
  },
  {
    id: 'sang-pemimpi', title: 'Sang Pemimpi', author: 'Andrea Hirata', year: 2006,
    category: 'Fiksi', tags: ['Persahabatan', 'Mimpi'],
    stock: 3, total: 4, borrowedTotal: 133, rating: 4.6, reviews: 40, shelf: 'A · Baris 2',
    desc: 'Ikal, Arai, dan Jimbron menjalani masa SMA di Magai sambil bekerja sebagai kuli ngambat. Mereka menyimpan mimpi besar: sekolah sampai ke Prancis.',
    cover: { layout: 'band', bg: '#f28f3b', fg: '#fff8ef', accent: '#3a2e39' }
  },
  {
    id: 'bumi-manusia', title: 'Bumi Manusia', author: 'Pramoedya Ananta Toer', year: 1980,
    category: 'Fiksi', tags: ['Klasik', 'Sejarah'],
    stock: 1, total: 3, borrowedTotal: 88, rating: 4.8, reviews: 52, shelf: 'A · Baris 5',
    desc: 'Minke, pemuda pribumi yang bersekolah di HBS, bertemu Annelies dan ibunya, Nyai Ontosoroh. Potret masyarakat kolonial awal abad ke-20 dan perlawanan lewat pena.',
    cover: { layout: 'frame', bg: '#7a1f1f', fg: '#f3e3c3', accent: '#f3e3c3' }
  },
  {
    id: 'hujan', title: 'Hujan', author: 'Tere Liye', year: 2016,
    category: 'Fiksi', tags: ['Fiksi ilmiah', 'Romansa'],
    stock: 2, total: 3, borrowedTotal: 176, rating: 4.5, reviews: 63, shelf: 'A · Baris 4',
    desc: 'Di masa depan setelah bencana besar, Lail kehilangan keluarganya dan bertemu Esok. Kisah tentang melupakan, bertahan, dan pilihan yang sulit.',
    cover: { layout: 'plain', bg: '#a8c5da', fg: '#14213d', accent: '#14213d' }
  },
  {
    id: 'dilan-1990', title: 'Dilan 1990', author: 'Pidi Baiq', year: 2014,
    category: 'Fiksi', tags: ['Remaja', 'Romansa', 'Bandung'],
    stock: 2, total: 2, borrowedTotal: 245, rating: 4.3, reviews: 90, shelf: 'A · Baris 6',
    desc: 'Milea pindah ke Bandung dan bertemu Dilan, siswa yang caranya mendekati selalu tak terduga. Kisah SMA yang ringan dan jenaka dengan latar tahun 1990.',
    cover: { layout: 'stripe', bg: '#f6f1e7', fg: '#1b4d89', accent: '#1b4d89' }
  },
  {
    id: 'filosofi-teras', title: 'Filosofi Teras', author: 'Henry Manampiring', year: 2018,
    category: 'Nonfiksi', tags: ['Pengembangan diri', 'Stoisisme'],
    stock: 2, total: 4, borrowedTotal: 164, rating: 4.7, reviews: 77, shelf: 'B · Baris 1',
    desc: 'Pengantar filsafat Stoa yang ditulis ringan untuk pembaca muda: memisahkan hal yang bisa dan tidak bisa kita kendalikan, dan menghadapi cemas dengan kepala dingin.',
    cover: { layout: 'band', bg: '#2d6a4f', fg: '#f1faee', accent: '#f1faee' }
  },
  {
    id: 'atomic-habits', title: 'Atomic Habits', author: 'James Clear', year: 2018,
    category: 'Nonfiksi', tags: ['Kebiasaan', 'Produktivitas'],
    stock: 3, total: 3, borrowedTotal: 142, rating: 4.6, reviews: 49, shelf: 'B · Baris 1',
    desc: 'Perubahan kecil yang dilakukan konsisten bisa menghasilkan hasil besar. Buku praktis tentang membangun kebiasaan baik dan meninggalkan kebiasaan buruk.',
    cover: { layout: 'plain', bg: '#f4f1ea', fg: '#1a1a1a', accent: '#d4a017' }
  },
  {
    id: 'sapiens', title: 'Sapiens', author: 'Yuval Noah Harari', year: 2011,
    category: 'Sains', tags: ['Sejarah', 'Antropologi'],
    stock: 1, total: 2, borrowedTotal: 69, rating: 4.5, reviews: 31, shelf: 'C · Baris 2',
    desc: 'Riwayat singkat umat manusia, dari revolusi kognitif sampai revolusi ilmiah. Mengajak pembaca mempertanyakan hal-hal yang selama ini dianggap wajar.',
    cover: { layout: 'frame', bg: '#e9e4d8', fg: '#b23a48', accent: '#b23a48' }
  },
  {
    id: 'kosmos', title: 'Kosmos', author: 'Carl Sagan', year: 1980,
    category: 'Sains', tags: ['Astronomi', 'Sains populer'],
    stock: 2, total: 2, borrowedTotal: 41, rating: 4.7, reviews: 18, shelf: 'C · Baris 1',
    desc: 'Perjalanan dari atom sampai galaksi, dan kisah para ilmuwan yang memahaminya. Klasik sains populer yang membuat alam semesta terasa dekat.',
    cover: { layout: 'stripe', bg: '#10002b', fg: '#e0aaff', accent: '#7b2cbf' }
  },
  {
    id: 'matematika-xii', title: 'Matematika', author: 'Tim Kemendikbud', year: 2022,
    category: 'Pelajaran', tags: ['Kelas XII', 'Kurikulum Merdeka'], grade: 'XII',
    stock: 18, total: 40, borrowedTotal: 530, rating: 4.1, reviews: 12, shelf: 'D · Baris 1',
    desc: 'Buku siswa Matematika kelas XII: limit, turunan, integral, dan statistika, dilengkapi contoh soal dan latihan setiap bab.',
    cover: { layout: 'text', bg: '#3a86ff', fg: '#ffffff', accent: '#ffbe0b' }
  },
  {
    id: 'fisika-xi', title: 'Fisika', author: 'Tim Kemendikbud', year: 2022,
    category: 'Pelajaran', tags: ['Kelas XI', 'Kurikulum Merdeka'], grade: 'XI',
    stock: 9, total: 36, borrowedTotal: 402, rating: 4.0, reviews: 9, shelf: 'D · Baris 2',
    desc: 'Buku siswa Fisika kelas XI: dinamika rotasi, fluida, gelombang, dan termodinamika dengan eksperimen sederhana di setiap bab.',
    cover: { layout: 'text', bg: '#ef476f', fg: '#ffffff', accent: '#ffd166' }
  },
  {
    id: 'sejarah-xi', title: 'Sejarah Indonesia', author: 'Tim Kemendikbud', year: 2021,
    category: 'Pelajaran', tags: ['Kelas XI', 'Kurikulum Merdeka'], grade: 'XI',
    stock: 14, total: 36, borrowedTotal: 377, rating: 4.2, reviews: 7, shelf: 'D · Baris 3',
    desc: 'Buku siswa Sejarah Indonesia kelas XI: dari masa kolonial, pergerakan nasional, sampai proklamasi kemerdekaan.',
    cover: { layout: 'text', bg: '#8d6a4f', fg: '#ffffff', accent: '#f2cc8f' }
  },
  {
    id: 'biologi-xii', title: 'Biologi', author: 'Tim Kemendikbud', year: 2022,
    category: 'Pelajaran', tags: ['Kelas XII', 'Kurikulum Merdeka'], grade: 'XII',
    stock: 0, total: 32, borrowedTotal: 441, rating: 4.1, reviews: 10, shelf: 'D · Baris 4',
    desc: 'Buku siswa Biologi kelas XII: pertumbuhan dan perkembangan, metabolisme, genetika, dan evolusi.',
    cover: { layout: 'text', bg: '#06a77d', fg: '#ffffff', accent: '#d5f2e3' }
  }
];

window.SHELVES = [
  { title: 'Fiksi Remaja', curator: 'Bu Ratna', role: 'Pustakawan', av: '#e0a899', category: 'Fiksi',
    books: ['bumi', 'dilan-1990', 'laskar-pelangi', 'hujan', 'sang-pemimpi', 'negeri-5-menara'] },
  { title: 'Wajib Baca Kelas XII', curator: 'Pak Hendra', role: 'Guru Bahasa Indonesia', av: '#8fb996', category: 'Fiksi',
    books: ['bumi-manusia', 'laut-bercerita', 'laskar-pelangi', 'negeri-5-menara', 'sapiens'] },
  { title: 'Buku Paket', curator: 'Bu Ratna', role: 'Pustakawan', av: '#e0a899', category: 'Pelajaran',
    books: ['matematika-xii', 'fisika-xi', 'sejarah-xi', 'biologi-xii'] },
  { title: 'Pengembangan Diri', curator: 'Bu Sinta', role: 'Guru BK', av: '#9bb1d4', category: 'Nonfiksi',
    books: ['filosofi-teras', 'atomic-habits', 'negeri-5-menara', 'sapiens'] },
  { title: 'Sains Populer', curator: 'Pak Yusuf', role: 'Guru Fisika', av: '#d4b483', category: 'Sains',
    books: ['kosmos', 'sapiens', 'fisika-xi', 'biologi-xii'] }
];

window.FEED = [
  { who: 'Dimas Pratama', av: '#7fa7c9', cls: 'XII IPS 1', verb: 'mulai membaca', mins: 12, bookId: 'bumi' },
  { who: 'Perpustakaan', av: '#1b1b1b', cls: '', verb: 'menambahkan buku baru', mins: 95, kind: 'new', count: 6 },
  { who: 'Salsa Nabila', av: '#d8a48f', cls: 'X-3', verb: 'selesai membaca', mins: 180, bookId: 'filosofi-teras' },
  { who: 'Rafi Akbar', av: '#9cc5a1', cls: 'XI MIPA 1', verb: 'menyimpan', mins: 320, bookId: 'kosmos' }
];

window.STUDENTS = [
  { name: 'Dimas Pratama', cls: 'XII IPS 1', av: '#7fa7c9' },
  { name: 'Salsa Nabila', cls: 'X-3', av: '#d8a48f' },
  { name: 'Rafi Akbar', cls: 'XI MIPA 1', av: '#9cc5a1' },
  { name: 'Nadia Ayu', cls: 'XII MIPA 3', av: '#c7a0d6' }
];

window.ME = { name: 'Alya Putri', cls: 'XI MIPA 2', nis: '2324.11.087', av: '#c9a27e' };
