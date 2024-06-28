import { fetchAPI } from './utils.js';
import { BASE_URL } from './config.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('themNhanVienBtn').addEventListener('click', async () => {
        await themNhanVien();
    });
    loadNhanVien();
});

const loadNhanVien = async () => {
    try {
        const employees = await fetchAPI(BASE_URL);
        displayNhanVien(employees);
    } catch (error) {
        console.error('Error loading employees:', error);
    }
};

const displayNhanVien = (employees) => {
    const tableBody = document.getElementById('nhanvienBody');
    tableBody.innerHTML = '';
    employees.forEach(employee => {
        themNhanVienToTable(employee);
    });
};

export const themNhanVienToTable = (employee) => {
    const tableBody = document.getElementById('nhanvienBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${employee.id}</td>
        <td>${employee['employee-code']}</td>
        <td>${employee.name}</td>
        <td>${employee.position}</td>
        <td>${employee.wage}</td>
        <td>${employee.wage * employee['work-hours']}</td>
        <td>${employee['work-hours']}</td>
        <td><button onclick="xoaNhanVien('${employee.id}')">Xóa</button></td>
    `;
    tableBody.appendChild(row);
};

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
        console.error('Error adding employee:', error);
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

window.xoaNhanVien = async (id) => {
    try {
        await fetchAPI(`${BASE_URL}/${id}`, { method: 'DELETE' });
        loadNhanVien(); 
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
};
