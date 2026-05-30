const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  const filePath = 'file://' + path.resolve('dist/index.html');
  console.log('Opening:', filePath);

  await page.goto(filePath, { waitUntil: 'networkidle' });

  // Check if root has content
  const content = await page.content();
  console.log('Content length:', content.length);

  const rootVisible = await page.isVisible('#root');
  console.log('Root visible:', rootVisible);

  const innerText = await page.evaluate(() => document.body.innerText);
  console.log('Body innerText snippet:', innerText.substring(0, 100));

  await page.screenshot({ path: 'dist_verify.png', fullPage: true });
  await browser.close();
})();
