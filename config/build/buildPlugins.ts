import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
// import CopyPlugin from 'copy-webpack-plugin';
import { BuildOptions } from './config/types';

export function buildPlugins(
    { paths, isDev, apiUrl }: BuildOptions,
): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html,
            // filename: 'index.html',
        }),

        new webpack.ProgressPlugin(),

        new MiniCssExtractPlugin({
            filename: 'css/[name]-[contenthash:6].css',
            chunkFilename: 'css/[name]-[contenthash:6].css',
        }),

        new webpack.DefinePlugin({
            IS_DEV: JSON.stringify(isDev),
            __API__: JSON.stringify(apiUrl),
        }),

        // new CopyPlugin({
        //     patterns: [
        //         { from: paths.fontsFrom, to: paths.fontsTo },
        //     ],
        // }),
    ];

    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new BundleAnalyzerPlugin({
            openAnalyzer: false,
        }));
    }

    return plugins;
}
