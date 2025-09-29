// Estas son validaciones que express-validator no cubre, o que necesitamos en la lógica de negocio

export class Validators {
  static isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidPhone(phone: string): boolean {
    // Permite diferentes formatos de teléfono
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ""));
  }

  static isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  static isValidDate(date: Date): boolean {
    return date instanceof Date && !isNaN(date.getTime());
  }

  static isValidString(
    str: string,
    minLength: number = 1,
    maxLength: number = 255
  ): boolean {
    return (
      typeof str === "string" &&
      str.trim().length >= minLength &&
      str.trim().length <= maxLength
    );
  }

  static sanitizeString(str?: string): string {
    if (!str) return "";
    return str.trim();
  }

  static isAdult(birthDate: Date): boolean {
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      return age - 1 >= 18;
    }

    return age >= 18;
  }
}
