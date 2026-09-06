import { readFile, writeFile } from 'node:fs/promises';

const path = 'src/App.jsx';
let source = await readFile(path, 'utf8');

if (!/^export\s+default\s+App\s*;?\s*$/m.test(source)) {
  source = `${source.trimEnd()}\n\nexport default App;\n`;
}

const marker = '<div className="editor-actions"><button className="secondary" onClick={print}>';
const statusControl = '<div className="status-control"><span>Status</span><select value={contract.status||\'draft\'} onChange={e=>persist({...contract,status:e.target.value})}><option value="draft">Draft</option><option value="finalized">Finalized</option><option value="sent">Sent</option></select></div>';
if (!source.includes('className="status-control"')) {
  if (!source.includes(marker)) {
    throw new Error('Editor action bar marker not found; refusing to apply status control patch.');
  }
  source = source.replace(marker, `${statusControl}${marker}`);
}

await writeFile(path, `${source.trimEnd()}\n`);
