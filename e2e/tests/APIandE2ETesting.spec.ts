import { test, expect } from '@playwright/test';

const REPO = 'robertoluis77-repo';
const USER = 'robertoluis77-cloud';

// El contexto de la solicitud es reutilizado por todas las pruebas en el archivo.
let apiContext: any;

test.beforeAll(async ({ playwright }) => {
    apiContext = await playwright.request.newContext({
        // Todos los requests que enviamos van a este endpoint.
        baseURL: 'https://api.github.com',
        extraHTTPHeaders: {
            // Configuramos este Header como nos dicen en la docu de GitHub.
            'Accept': 'application/vnd.github.v3+json',
            // Agregamos el token de autorización a todos los requests.
            // Acá ponemos el token que generamos en GitHub.
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    });

    /* No me dejo crearlo
    const response = await apiContext.post('USER/repos', {
        data: {
            name: REPO
        }
    });
    expect(response.ok()).toBeTruthy();
    */

    //console.log('prccess.env.GITHUB_TOKEN: ', process.env.GITHUB_TOKEN);
});

test.afterAll(async ({ }) => {
    /* Nos deshacemos de todas las respuestas al final.
    const response = await apiContext.delete(`/repos/${USER}/${REPO}`);
    expect(response.ok()).toBeTruthy();
    */
    //await apiContext.page.close();
    await apiContext.dispose();
});

test('El último issue creado es el primero en la lista @APITesting', async ({ page }) => {
    const newIssue = await apiContext.post(`/repos/${USER}/${REPO}/issues`, {
        data: {
            title: '[Feature] Que el framework me planche la ropa 2',
        }
    });
    expect(newIssue.ok()).toBeTruthy();

    const issues = await apiContext.get(`/repos/${USER}/${REPO}/issues`);
    expect(issues.ok()).toBeTruthy();
    expect(await issues.json()).toContainEqual(expect.objectContaining({
        title: '[Feature] Que el framework me planche la ropa 2',
        //body: 'Estaría buenísimo que el repo haga helados 🍦'
    }));

    await page.goto(`https://github.com/${USER}/${REPO}/issues`);
    //await page.reload();
    //page.waitForTimeout(2000);
    const firstIssue = await page.getByRole('link', { name: '[Feature] Que el framework me planche la ropa 2' }).first();
    await expect(firstIssue, "Issue not found").toHaveText('[Feature] Que el framework me planche la ropa 2');

});