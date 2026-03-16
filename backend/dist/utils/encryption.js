"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = encrypt;
exports.decrypt = decrypt;
const crypto_1 = __importDefault(require("crypto"));
const ALGORITHM = 'aes-256-cbc';
const IV_LENGTH = 16;
// Fixed salt for PBKDF2 key derivation. The raw ENCRYPTION_KEY is the secret;
// the fixed salt provides domain separation and ensures consistent key derivation
// for encryption/decryption operations. Per-key uniqueness comes from the random IV
// generated fresh for every encrypt() call.
const KDF_SALT = Buffer.from('devops-tracker-kdf-salt', 'utf8');
function getEncryptionKey() {
    const rawKey = process.env.ENCRYPTION_KEY;
    if (!rawKey) {
        throw new Error('ENCRYPTION_KEY environment variable is not set');
    }
    // Derive a proper 32-byte key from the provided secret using PBKDF2
    return crypto_1.default.pbkdf2Sync(rawKey, KDF_SALT, 100000, 32, 'sha256');
}
function encrypt(plainText) {
    const iv = crypto_1.default.randomBytes(IV_LENGTH);
    const cipher = crypto_1.default.createCipheriv(ALGORITHM, getEncryptionKey(), iv);
    const encrypted = Buffer.concat([cipher.update(plainText, 'utf8'), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
}
function decrypt(encryptedText) {
    const [ivHex, encryptedHex] = encryptedText.split(':');
    if (!ivHex || !encryptedHex) {
        throw new Error('Invalid encrypted text format');
    }
    const iv = Buffer.from(ivHex, 'hex');
    const encrypted = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto_1.default.createDecipheriv(ALGORITHM, getEncryptionKey(), iv);
    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
}
//# sourceMappingURL=encryption.js.map