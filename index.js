const express = require('express');
const { chromium } = require('playwright');
const app = express();

// Log server startup for debugging
console.log('Starting Twitter automation server...');
console.log(`PORT environment variable: ${process.env.PORT}`);

app.use(express.json());

app.post('/send-tweet', async (req, res) => {
  console.log('Received request to send tweet');
  
  const browser = await chromium.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('Navigating to Twitter login page');
    await page.goto('https://x.com/login');
    
    await page.fill('input[name="text"]', 'Cryptp_up');
    await page.waitForTimeout(3000);
    
    await page.getByRole('button', { name: 'Next' }).click();
    await page.waitForTimeout(3000);
    
    await page.getByRole('textbox', { name: 'Password Reveal password' }).click();
    await page.waitForTimeout(2000);
    
    await page.getByRole('textbox', { name: 'Password Reveal password' }).fill('-----');
    await page.waitForTimeout(2000);
    
    await page.getByTestId('LoginForm_Login_Button').click();
    await page.waitForTimeout(5000);
    
    // Get tweet text from request body
    const tweetText = req.body.text || 'این یک توییت تست است!';
    
    console.log('Composing tweet: ' + tweetText);
    await page.goto('https://x.com/compose/post');
    await page.waitForTimeout(3000);
    
    await page.fill('div[role="textbox"]', tweetText);
    await page.waitForTimeout(2000);
    
    await page.getByTestId('tweetButton').click();
    await page.waitForTimeout(3000);
    
    console.log('Tweet sent successfully');
    res.json({ success: true, message: 'توییت با موفقیت ارسال شد' });
  } catch (error) {
    console.error('Error sending tweet:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    await browser.close();
  }
});

app.get('/', (req, res) => {
  res.send('سرور ارسال توییت فعال است. از مسیر /send-tweet با متد POST استفاده کنید.');
});

// Make sure this runs unconditionally
const PORT = parseInt(process.env.PORT || '3000');
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`سرور روی پورت ${PORT} در حال اجراست`);
});
