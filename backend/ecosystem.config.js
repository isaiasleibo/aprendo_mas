module.exports = {
    apps: [
      {
        name: "aprendo_mas_backend",
        script: "server.js", 
        watch: true, 
        ignore_watch: ["node_modules", "logs"], 
        env: {
          NODE_ENV: "production",
          PORT: 3000 
        }
      }
    ]
  };
