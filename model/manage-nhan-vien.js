import { fetchAPI } from './utils.js';
import { BASE_URL } from './config.js';
import { themNhanVienToTable } from './main.js';

export const themNhanVien = async () => {
    const employee = getNhanVienTuForm();
    if (!employee) return;

    try {
        const newEmployee = await fetchAPI(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(employee)
        });
        themNhanVienToTable(newEmployee); 
        alert('Nhân viên đã được thêm thành công!');
        resetForm(); 
    } catch (error) {
        console.error('Lỗi khi thêm nhân viên:', error);
    }
};

const resetForm = () => {
    document.getElementById('nhanvienForm').reset();
};

const getNhanVienTuForm = () => {
    const nhanvienCode = document.getElementById('nhanvienCode').value;
    const name = document.getElementById('nhanvienName').value;
    const position = document.getElementById('nhanvienPosition').value;
    const wage = parseFloat(document.getElementById('nhanvienWage').value);
    const hours = parseFloat(document.getElementById('soGioLam').value);

    if (nhanvienCode.length < 4 || nhanvienCode.length > 6 || isNaN(wage) || isNaN(hours) || hours < 50 || hours > 150) {
        alert('Vui lòng kiểm tra lại thông tin!');
        return null;
    }

    return { 'employee-code': nhanvienCode, name, position, wage, 'work-hours': hours };
};
