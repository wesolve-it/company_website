import { defineConfig } from '@playwright/test'
import path from 'node:path'
export default defineConfig({
  testDir:'./tests/e2e',workers:1,timeout:60000,
  use:{baseURL:'http://localhost:3100',headless:true,launchOptions:{executablePath:process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH},screenshot:'only-on-failure'},
  webServer:{
    command:'node --env-file=.env --import tsx scripts/prepare-e2e.ts && npm run start -- --port 3100',
    url:'http://localhost:3100',timeout:120000,reuseExistingServer:false,
    env:{SERVER_URL:'http://localhost:3100',DATABASE_URL:`file:${path.resolve('.test-data/payload.db')}`,MEDIA_DIR:path.resolve('.test-data/media')},
  },
})
