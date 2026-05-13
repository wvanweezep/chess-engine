import esbuild from "esbuild";

await esbuild.build({
    entryPoints: ["src/index.ts"],
    bundle: true,
    outfile: "dist/bundle.js",
    sourcemap: true,
    minify: true,
    target: ["es2022"],
    format: "esm",
    tsconfig: "tsconfig.build.json"
});
