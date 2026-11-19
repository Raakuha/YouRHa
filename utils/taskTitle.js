// Menyiapkan judul tugas sebelum disimpan.
// Mengembalikan null kalau judul kosong (atau hanya spasi).
// Kalau judul sudah dipakai (tanpa peduli huruf besar-kecil), ditambahkan nomor:
// "Belajar" -> "Belajar ( 1 )" -> "Belajar ( 2 )", dan seterusnya.
// excludeTaskId diisi id tugas yang sedang diedit, supaya judulnya sendiri tidak dihitung duplikat.
export function getUniqueTaskTitle(rawTitle, tasks, excludeTaskId = null) {
    const title = rawTitle.trim();
    if (title === '') {
        return null;
    }

    let finalTitle = title;
    let number = 1;
    while (tasks.some((task) => task.title.trim().toLowerCase() === finalTitle.trim().toLowerCase() && task.id !== excludeTaskId)) {
        finalTitle = `${title} ( ${number} )`;
        number += 1;
    }
    return finalTitle;
}
