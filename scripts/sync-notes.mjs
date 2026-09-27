import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { dirname, join, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const target = join(root, 'external-notes');
const notes = join(target, 'notes');
const videoAssets = join(root, 'public', 'notes-assets');
const run = (command, args) => {
	const result = spawnSync(command, args, { cwd: root, stdio: 'inherit' });
	if (result.status !== 0) process.exit(result.status ?? 1);
};

if (existsSync(notes) && process.env.CI) {
	console.log('Using notes checked out by CI.');
} else if (existsSync(join(target, '.git'))) {
	run('git', ['-C', target, 'pull', '--ff-only']);
} else if (existsSync(notes)) {
	console.log('Using existing external-notes directory.');
} else {
	run('git', ['clone', '--depth', '1', 'https://github.com/Hole333/HaloMoon-Notes.git', target]);
}

if (existsSync(notes)) {
	const resolvedRoot = resolve(root);
	const resolvedAssets = resolve(videoAssets);
	if (!resolvedAssets.startsWith(resolvedRoot + sep)) throw new Error('Video asset target escaped the blog root.');
	rmSync(videoAssets, { recursive: true, force: true });
	mkdirSync(videoAssets, { recursive: true });
	for (const entry of ['.mp4', '.webm', '.ogg']) {
		const source = join(notes, '..', 'notes');
		if (!existsSync(source)) continue;
		cpSync(source, videoAssets, {
			recursive: true,
			filter: (path) => path === source || !path.split(sep).at(-1)?.toLowerCase().endsWith(entry),
		});
	}
	console.log('Copied note video assets for local rendering.');
}
