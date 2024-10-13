import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
//import * as path from 'path'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  // resolve: {
  //   alias: {
  //     "@": path.resolve(__dirname, "./src/"),
  //     components: `${path.resolve(__dirname, "./src/components/")}`,
  //     consts: `${path.resolve(__dirname, "./src/consts")}`,
  //     pages: path.resolve(__dirname, "./src/pages"),
  //     services: `${path.resolve(__dirname, "./src/services/")}`,
  //     styles: `${path.resolve(__dirname, "./src/styles")}`
  //   },
  // }
})
