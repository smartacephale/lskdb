import path from "node:path";
import { defineConfig } from "vite";
import dts from 'vite-plugin-dts'

export default ({ mode }) => {
  return defineConfig({
    define: {
      "process.env": {},
    },
    build: {
      sourcemap: true,
      minify: false,
      lib: {
        entry: path.resolve(__dirname, "./src/index.ts"),
        name: "lskdb",
        fileName: (format) => `lskdb.${format}.js`,
      }
    },
    plugins: [dts({ rollupTypes: true })]
  });
};