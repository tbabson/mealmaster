export const loader = () => {
    const getInitialTheme = () => {
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.getItem('theme');
        return storedTheme || (prefersDarkMode ? 'dark' : 'light');
    };

    const theme = getInitialTheme();
    document.documentElement.setAttribute('data-theme', theme);
    return theme;
};

export const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    return newTheme;
};