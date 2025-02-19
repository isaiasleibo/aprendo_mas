module.exports = {
    apps: [
      {
        name: "aprendo_mas_frontend",
        script: "serve -s build -l 3001", 
        watch: ["build"], 
      }
    ]
  };
