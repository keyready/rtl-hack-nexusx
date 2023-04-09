import webpack from 'webpack';
import { BuildOptions } from './config/types';
import { BuildCssLoader } from './loaders/buildCssLoader';
import { buildBabelLoader } from './loaders/buildBabelLoader';

export function buildRules(options: BuildOptions): webpack.RuleSetRule[] {
    const { isDev } = options;

    const svgLoader = {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
    };

    const fontsLoader = {
        test: /\.(woff|woff2)$/,
        use: {
            loader: 'font-loader',
            options: {
                outputPath: 'fonts/', // путь для сохранения шрифтов
                publicPath: '../fonts/', // путь к шрифтам в CSS файле
                name: '[name].[ext]',
            },
        },
    };

    const babelLoader = buildBabelLoader(options);

    const fileLoader = {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
            {
                loader: 'file-loader',
            },
        ],
    };

    const typescriptLoader = {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
    };

    const sassLoader = BuildCssLoader(isDev);

    return [
        fontsLoader,
        fileLoader,
        svgLoader,
        babelLoader,
        typescriptLoader,
        sassLoader,
    ];
}
