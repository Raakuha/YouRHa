import { getUniqueTaskTitle } from '../taskTitle';

describe('getUniqueTaskTitle', () => {
    test('judul normal dipakai apa adanya setelah di-trim', () => {
        const tasks = [{ id: '1', title: 'Masak' }];

        expect(getUniqueTaskTitle('Belajar', tasks)).toBe('Belajar');
        expect(getUniqueTaskTitle('  Belajar  ', tasks)).toBe('Belajar');
    });

    test('judul kosong atau hanya spasi ditolak (null)', () => {
        expect(getUniqueTaskTitle('', [])).toBeNull();
        expect(getUniqueTaskTitle('     ', [])).toBeNull();
    });

    test('duplikat dengan huruf besar-kecil berbeda tetap diberi nomor', () => {
        const tasks = [{ id: '1', title: 'Belajar' }];

        expect(getUniqueTaskTitle('belajar', tasks)).toBe('belajar ( 1 )');
        expect(getUniqueTaskTitle('BELAJAR', tasks)).toBe('BELAJAR ( 1 )');
    });

    test('duplikat bertingkat melewati nomor yang sudah dipakai', () => {
        const tasks = [
            { id: '1', title: 'Belajar' },
            { id: '2', title: 'Belajar ( 1 )' },
            { id: '3', title: 'belajar ( 2 )' },
        ];

        expect(getUniqueTaskTitle('Belajar', tasks)).toBe('Belajar ( 3 )');
    });

    test('saat edit, judul milik tugas itu sendiri tidak dihitung duplikat', () => {
        const tasks = [
            { id: '1', title: 'Belajar' },
            { id: '2', title: 'Masak' },
        ];

        // Tugas 1 disimpan ulang dengan judul yang sama (beda huruf saja).
        expect(getUniqueTaskTitle('BELAJAR', tasks, '1')).toBe('BELAJAR');
        // Tapi kalau diganti jadi judul tugas lain, tetap diberi nomor.
        expect(getUniqueTaskTitle('Masak', tasks, '1')).toBe('Masak ( 1 )');
    });
});
