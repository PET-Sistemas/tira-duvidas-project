export function splitName(fullName) {
    const parts = fullName.trim().split(" ");
    if (parts.length <= 2) {
        return { firstName: parts[0], lastName: parts.slice(1).join(" ") || "" };
    }
    return { 
        firstName: parts.slice(0, -2).join(" "), 
        lastName: parts.slice(-2).join(" ") 
    };
}
