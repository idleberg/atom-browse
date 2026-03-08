import { defineConfig } from 'tsdown';

export default defineConfig({
	clean: true,
	deps: {
		alwaysBundle: ['@atxm/developer-console', '@nsis/dent', '@nsis/nlf', 'atom-select-list', 'makensis', 'which'],
		neverBundle: ['atom', 'electron'],
		onlyAllowBundle: false,
	},
	entry: ['src/index.ts'],
	format: 'cjs',
	minify: true,
	nodeProtocol: 'strip',
	outDir: 'lib',
	platform: 'node',
	target: 'node14',
	treeshake: true,
});
