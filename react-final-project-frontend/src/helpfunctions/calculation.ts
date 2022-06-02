export default function recalculate(currency: string, price: string): string {
    let parsedPrice = parseFloat(price);
    switch (currency) {
        case "EURO":
            return parsedPrice.toString()
        case "DOLLAR":
            return Math.ceil((parsedPrice * 1.05)).toString()
        case "RUBLE":
            return Math.ceil((parsedPrice * 80)).toString();
    }

    return "";
}