module.exports = {
  apps: [
    {
      name: 'juejin',
      script: 'npx next start -p 7496',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '180M',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
}
