export const FontBody = {
    BOLD: 'bold-body',
    STANDARD: 'standard-body',
    ITALIC: 'italic-body',
    BOLDITALIC: 'italic-bold-body'
};

export const FontHeader = {
    BOLD: 'bold-header',
    STANDARD: 'standard-header',
    ITALIC: 'italic-header',
    BOLDITALIC: 'italic-bold-header'
};

type Keys = keyof typeof FontBody;

export type FontStyleBody = typeof FontBody[Keys];

export type FontStyleHeader = typeof FontHeader[Keys];