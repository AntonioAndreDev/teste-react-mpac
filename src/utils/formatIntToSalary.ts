function formatIntToSalary(value: number) {
    const salaryString = (value / 100).toFixed(2);

    // eslint-disable-next-line prefer-const
    let [integerPart, decimalPart] = salaryString.split(".");

    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

    return `${integerPart},${decimalPart}`;
}

export default formatIntToSalary