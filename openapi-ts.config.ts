import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
    input: './api/openapi.json',
    output: './api/generated',
    plugins: ['@hey-api/client-next']
});