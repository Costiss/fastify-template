import { Application } from '../src/app';
import fs from 'fs';
import path from 'path';

const app = await Application();
await app.ready();

const schema = JSON.stringify(app.swagger());

fs.writeFileSync(path.join(__dirname, 'openapi.json'), schema, { flag: 'w+' });

await app.close();

console.log('OpenAPI Spec generated successfully');
process.exit(0);
