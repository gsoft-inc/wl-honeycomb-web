// import type { Config } from "jest";
// import { swcConfig } from "./swc.jest.ts";

// const config: Config = {
//     testEnvironment: "jsdom",
//     transformIgnorePatterns: [
//         "node_modules/(?!.pnpm|memoize|mimic-function)"
//     ],
//     transform: {
//         "^.+\\.(js|ts|tsx)$": ["@swc/jest", swcConfig as Record<string, unknown>]
//     },
//     cacheDirectory: "./node_modules/.cache/jest"
// };

// export default config;


import type { Config } from "jest";
import { swcConfig } from "./swc.jest.ts";

const config: Config = {
    // JSDOM is required for OTel instrumentation like "@opentelemetry/instrumentation-document-load".
    testEnvironment: "jsdom",
    testRegex: "/tests/*/.*\\.test\\.ts$",
    testPathIgnorePatterns: ["/node_modules/", "/dist/"],
    transform: {
        "^.+\\.(js|ts)$": ["@swc/jest", swcConfig as Record<string, unknown>]
    },
    setupFilesAfterEnv: ["<rootDir>/jest-setup.js"],
    cacheDirectory: "./node_modules/.cache/jest",
    verbose: true
};

export default config;
