const ONE_HOUR = 1000 * 60 * 60;

const TWELVE_HOURS = ONE_HOUR * 12;

const ONE_DAY = 1000 * 60 * 60 * 24;

// Bcrypt

export const BCRYPT_WORK_FACTOR = 12;

export const BCRYPT_MAX_BYTES = 72;

// Verification email

export const EMAIL_VERIFICATION_TIMEOUT = TWELVE_HOURS;

// sha1 -> 160 bits / 8 = 20 bytes * 2 (hex) = 40 bytes
export const EMAIL_VERIFICATION_TOKEN_BYTES = 40;

// sha256 -> 256 bits / 8 = 32 bytes * 2 (hex) = 64 bytes
export const EMAIL_VERIFICATION_SIGNATURE_BYTES = 64;

// Password reset

export const PASSWORD_RESET_BYTES = 40;

export const PASSWORD_RESET_TIMEOUT = TWELVE_HOURS;
export const UNBLOCK_TIMEOUT = ONE_HOUR / 3;
export const PASS_DAYS_VALID = ONE_DAY * 90;
