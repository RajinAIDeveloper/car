// src/lib/whatsappHelper.ts

/**
 * Generates a WhatsApp click-to-chat link.
 * @param phoneNumber The phone number in international format (e.g., 1XXXXXXXXXX for US).
 * @param message The pre-filled message.
 * @returns The WhatsApp URL.
 */
export function generateWhatsAppLink(phoneNumber: string, message: string): string {
  const encodedMessage = encodeURIComponent(message);
  // Remove any non-digit characters from phone number
  const cleanPhoneNumber = phoneNumber.replace(/\D/g, '');
  return `https://wa.me/${cleanPhoneNumber}?text=${encodedMessage}`;
}
