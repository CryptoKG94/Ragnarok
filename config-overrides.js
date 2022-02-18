module.exports = function override (config, env) {
    console.log('override')
    let loaders = config.resolve
    loaders.fallback = {
        "assert": require.resolve('assert'),
        "http": require.resolve("stream-http"),
        "https": false,
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "crypto": require.resolve("crypto-browserify"),
        "os": require.resolve("os-browserify/browser")
    }
    
    return config
}