import { readFile, writeFile } from 'node:fs/promises';

const path = 'src/App.jsx';
const source = await readFile(path, 'utf8');

if (!/^export\s+default\s+App\s*;?\s*$/m.test(source)) {
  await writeFile(path, `${source.trimEnd()}\n\nexport default App;\n`);
}
