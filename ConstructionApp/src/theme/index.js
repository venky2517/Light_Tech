import { DefaultTheme } from 'react-native-paper';

export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#2196F3',
        accent: '#f1c40f',
        background: '#f5f5f5',
        surface: '#ffffff',
        error: '#ff1744',
        text: '#000000',
        placeholder: '#9e9e9e'
    },
    roundness: 8,
    animation: {
        scale: 1.0,
    }
};

export const styles = {
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: theme.colors.background
    },
    card: {
        marginVertical: 8,
        elevation: 4
    },
    button: {
        marginVertical: 8
    },
    input: {
        marginBottom: 16
    }
};
