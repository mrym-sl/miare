export const ConvertTransType = (type) => {
    switch (type) {
        case 'payment':
            return 'شارژ حساب';
        case 'concurrency':
            return 'خرید ظرفیت همزمان';
        case 'trip':
            return 'هزینه سفر';
        case 'expenses':
            return 'خسارت';
        default:
            return type;    
    }
}