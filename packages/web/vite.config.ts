import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { resolve, join } from "path";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": join(__dirname, "src"),
		},
	},
	plugins: [react(), visualizer()],
	build: {
		lib: {
			entry: resolve(__dirname, "src/main.tsx"),
			name: "web",
			fileName: (format) => `web.${format}.js`,
		},
		rollupOptions: {
			// 确保外部化处理那些你不想打包进库的依赖
			external: ["react", "react-dom"],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					react: "React",
					"react-dom": "react-dom",
				},
			},
		},
		outDir: "lib",
	},
	server: {
		// headers: {
		// 	"Cross-Origin-Embedder-Policy": "require-corp",
		// 	"Cross-Origin-Opener-Policy": "same-origin",
		// },
	},
});
