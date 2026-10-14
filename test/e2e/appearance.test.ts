import { expect, test } from '@mobrowser/cli/e2e';

test('renders a dark surface and light text, remembers it after reload, and restores light mode', async ({ page }) => {
  const root = page.locator('html');
  await page.getByRole('button', { name: 'Light', exact: true }).click();
  const light = await root.evaluate(el => ({
    background: getComputedStyle(el).backgroundColor,
    foreground: getComputedStyle(el).color,
  }));
  await page.getByRole('button', { name: 'Dark', exact: true }).click();
  // Verify the visible surface and text, not just the selected control.
  await expect.poll(() => root.evaluate(el => {
    const style = getComputedStyle(el);
    const background = style.backgroundColor.match(/[\d.]+/g)!.map(Number);
    const foreground = style.color.match(/[\d.]+/g)!.map(Number);
    return (background[3] ?? 1) === 1 &&
      Math.max(...background.slice(0, 3)) < Math.min(...foreground.slice(0, 3));
  })).toBe(true);
  const dark = await root.evaluate(el => getComputedStyle(el).backgroundColor);
  expect(dark).not.toBe(light.background);
  await page.reload();
  await expect(root).toHaveCSS('background-color', dark);
  await page.getByRole('button', { name: 'Light', exact: true }).click();
  await expect(root).toHaveCSS('background-color', light.background);
  await expect(root).toHaveCSS('color', light.foreground);
});
