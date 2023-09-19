const useFormatCurrency = () => {
    const formatCurrency = (amount: number) => {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
        });
        return formatter.format(amount);
    };

    return formatCurrency;
};

export default useFormatCurrency;
