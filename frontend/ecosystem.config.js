module.exports = {
    apps: [
      {
        name: "aprendo_mas_frontend",
        script: "serve -s build -l 3001", 
        watch: ["build"], 
      },
      {
        name: "aprendo_mas_frontend_build",
        script: "npm",
        args: "run build",
        watch: ["src", "public"], 
        autorestart: false,
      }
    ]
  };
