module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps : [
    {
      name: 'CoinMarketCapService',
      script: 'server.js',
      cwd: 'C:/Projects/StarRepublic.Analytics/coinMarketCapService',
      kill_timeout: 60000,
      restart_delay: 30000,
    },
    {
      name: 'Server',
      script: 'server.js',
      cwd: 'C:/Projects/StarRepublic.Analytics/server',
    },
    {
      name: 'Client',
      script: 'client.js',
      cwd: 'C:/Projects/StarRepublic.Analytics/client',
    },
  ],
};
