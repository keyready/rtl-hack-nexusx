import { Configuration } from 'webpack';
import { BuildOptions } from './config/types';
import { buildPlugins } from './buildPlugins';
import { buildRules } from './buildRules';
import { buildResolvers } from './buildResolvers';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions): Configuration {
    const { mode, paths, isDev } = options;

    return {
        mode,
        entry: paths.entry,
        output: {
            path: paths.dist,
            filename: '[name]-[contenthash:8].js',
            clean: true,
            publicPath: '/',
        },

        plugins: buildPlugins(options),

        module: {
            rules: buildRules(options),
        },
        resolve: buildResolvers(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
