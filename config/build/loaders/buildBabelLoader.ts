import { BuildOptions } from '../config/types';

export function buildBabelLoader({ isDev }: BuildOptions) {
    return {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
        },
    };
}
