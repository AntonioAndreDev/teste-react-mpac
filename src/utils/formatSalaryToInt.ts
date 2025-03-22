function formatSalaryToInt(salary: string) {
    return parseInt(salary.replace(/\./g, '').replace(',', ''), 10);
}

export default formatSalaryToInt;