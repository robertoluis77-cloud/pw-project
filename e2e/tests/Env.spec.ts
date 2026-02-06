import test from "@playwright/test";
import { Environment } from "./Utils/envConfig";

const env = Environment.getConfig();

const BASE_URL = env.baseURL;
//const API_URL = env.getConfig().apiURL;
//const FRT_BASE_URL = env.getConfig().frtBaseURL;

test('', async ({ page }) => {
    console.log('Env: ', env);
    console.log('\nBase URL: ', BASE_URL);
})


