export class RegexHelper {
    static cpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    static email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    static phoneNumber = /^\(\d{2}\) \d{5}-\d{4}$/;
    static birthDate = /^\d{4}-\d{2}-\d{2}$/;
}

export default RegexHelper;