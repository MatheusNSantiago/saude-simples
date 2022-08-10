export const hex2rgba = (hex: string, alpha = 1) => {
    const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
    return `rgba(${r},${g},${b},${alpha})`;
};

export const getItems = Object.entries as <T extends object>(obj: T) => Array<[keyof T, T[keyof T]]>;

export const getKeys = Object.keys as <T extends object>(obj: T) => Array<keyof T>
