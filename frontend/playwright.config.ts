import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60_000,
  workers: 1,
  expect: {
    timeout: 10_000,
  },
  use: {
    baseURL: "http://127.0.0.1:8000",
    trace: "retain-on-failure",
    storageState: undefined, // Don't persist storage between tests
  },
  webServer: {
    command:
      "cmd /c if exist kanban.e2e.db del /f /q kanban.e2e.db && set KANBAN_DB_PATH=E:\\Projects\\pm\\frontend\\kanban.e2e.db && npm run build && ..\\.venv\\Scripts\\python.exe ..\\backend\\main.py",
    url: "http://127.0.0.1:8000",
    reuseExistingServer: true,
    timeout: 180_000,
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
