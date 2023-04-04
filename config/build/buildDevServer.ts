import { Configuration as DevServerConfig } from 'webpack-dev-server';
import { BuildOptions } from './config/types';

export function buildDevServer(options: BuildOptions): DevServerConfig {
    return {
        port: options.port,
        // open: true,
        historyApiFallback: true,
        hot: true,
    };
}
