export interface Theme {
    buttonPrimary: string;

    backgroundPrimary: string;
    backgroundPrimaryLight: string;
    backgroundSecondary: string;

    navbar: string;

    textDark: string;
    textWhite: string;
    textGreen: string;
    textGray: string;
}

export const initializeTheme = () => {
    return {
        buttonPrimary: "#75BC5B",

        backgroundPrimary: "#75BC5B",
        backgroundPrimaryLight: "AFE29D",
        backgroundSecondary: "#D9D9D9",

        navbar: "#141416",

        textDark: "#555555",
        textWhite: "#FFFFFF",
        textGreen: "#75BC5B",
        textGray: "#939393"
    } as Theme;
}