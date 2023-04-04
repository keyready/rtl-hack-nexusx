import MiniCssExtractPlugin from 'mini-css-extract-plugin';

export function BuildCssLoader(isDev : boolean) {
    return {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? MiniCssExtractPlugin.loader : 'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: {
                        auto: (resPath: string) => Boolean(
                            resPath.includes('.module.'),
                        ),
                        localIdentName:
                            isDev
                                ? '[path][name]__[local]--[hash:base64:5]'
                                : '[hash:5]',
                    },
                },
            },
            'sass-loader',
        ],
    };
}
