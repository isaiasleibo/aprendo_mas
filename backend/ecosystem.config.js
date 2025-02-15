module.exports = {
    apps: [
      {
        name: "aprendo_mas_backend",
        script: "server.js", // Archivo principal del backend
        watch: true, // Detecta cambios en los archivos y reinicia el servidor
        ignore_watch: ["node_modules", "logs"], // Evita reinicios innecesarios
        env: {
          NODE_ENV: "production",
          PORT: 3000 // Asegura que el backend use el puerto 3000
        }
      }
    ]
  };
