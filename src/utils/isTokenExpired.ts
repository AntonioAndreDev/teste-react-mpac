export const isTokenExpired = (token: string) => {
    const parts = token.split('.');
    if (parts.length !== 3) {
        return true;
    }

    const payload = atob(parts[1]);
    try {
        const parsedPayload = JSON.parse(payload);
        const expirationTime = parsedPayload.exp * 1000;
        return expirationTime < Date.now();
    } catch {
        return true;
    }
};