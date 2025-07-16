/**
 * Get the strength of a password
 * @param password The password to check
 * @returns Number from 0 to Infinity representing the strength of the password
 */
export const passwordStrength = (password: string): number => {
    const length = password.length;
    const specialChars = password.match(/[^A-Za-z0-9]/g)?.length || 0;
    const numbers = password.match(/[0-9]/g)?.length || 0;
    const upperCase = password.match(/[A-Z]/g)?.length || 0;
    const lowerCase = password.match(/[a-z]/g)?.length || 0;

    // Calculate the strength of the password
    return (
        (length * 4 +
            specialChars * 6 +
            numbers * 4 +
            upperCase * 2 +
            lowerCase * 2) /
        16
    );
};
