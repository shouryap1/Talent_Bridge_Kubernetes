import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  optimizeDeps: {
    exclude: ['js-big-decimal']
  }
,
  server: {
    proxy: {
      "/api": {
        // target: "http://172.16.201.75:8081",
        // target: "http://rasp-iiitb360:8081",
        changeOrigin: true,
      },
    },
    host: true, // needed for the Docker Container port mapping to work
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  
})

// https://vitejs.dev/config/
// export default defineConfig({
//   server: {
//     proxy: {
//       "/api": {
//         // target: "http://172.16.201.75:8081",
//         target: "http://rasp-iiitb360:8081",
//         changeOrigin: true,
//       },
//     },
//     host: true, // needed for the Docker Container port mapping to work
//   },
//   plugins: [react()],
// });