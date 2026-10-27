import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
// Dedicated disposable test database; never touches the working CMS database.
fs.mkdirSync('.test-data',{recursive:true})
const db=path.resolve('.test-data/payload.db')
for(const suffix of ['','-shm','-wal']) if(fs.existsSync(db+suffix))fs.unlinkSync(db+suffix)
execFileSync(process.execPath,['--env-file-if-exists=.env','node_modules/payload/bin.js','migrate'],{stdio:'inherit',env:{...process.env,NODE_ENV:'production'}})
execFileSync(process.execPath,['--env-file-if-exists=.env','--import','tsx','scripts/seed.ts'],{stdio:'inherit',env:{...process.env,NODE_ENV:'production'}})
