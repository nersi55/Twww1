const express = require('express');
const { chromium } = require('playwright');
const app = express();
app.use(express.json());

app.post('/send-tweet', async (req, res) => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  try {
    // کد ارسال توییت که شما نوشته‌اید
    await page.goto('https://x.com/login');
    await page.fill('input[name="text"]', 'Cryptp_up');
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3000);
    await page.getByRole('textbox', { name: 'Password Reveal password' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('textbox', { name: 'Password Reveal password' }).fill('lmG*7Wr6$jlVlAXB');
    await page.waitForTimeout(2000);
    await page.getByTestId('LoginForm_Login_Button').click();
    await page.waitForTimeout(5000);

    // اگر پیام توییت از N8N ارسال شده
    const tweetText = req.body.text || 'این یک توییت تست است!';

    await page.goto('https://x.com/compose/post');
    await page.waitForTimeout(3000);
    await page.fill('div[role="textbox"]', tweetText);
    await page.waitForTimeout(2000);
    await page.getByTestId('tweetButton').click();
    await page.waitForTimeout(3000);

    res.json({ success: true, message: 'توییت با موفقیت ارسال شد' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    await browser.close();
  }
});
app.get('/', (req, res) => {
  res.send('سرور ارسال توییت فعال است. از مسیر /send-tweet با متد POST استفاده کنید.');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`سرور روی پورت ${PORT} در حال اجراست`));
