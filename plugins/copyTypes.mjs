import fs from 'fs';
import path from 'path';

const root = process.cwd();

export default () => ({
  name: 'vue3-tree:types',
  enforce: 'post',
  apply: 'build',
  closeBundle: () => fs.copyFileSync(
    path.join(root, 'src', 'lib', 'index.d.ts'),
    path.join(root, 'dist', 'types.d.ts'),
  ),
});
