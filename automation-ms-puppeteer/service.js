const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
require('dotenv').config({
  path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
});

const app = express();
app.use(cors());
app.use(express.json());

let page;
let home;

app.post('/automate', async (req, res) => {
  const { url } = req.body;
  home = url
  console.log(home)
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const browser = await puppeteer.launch({
      executablePath: process.env.CHROMIUM_PUPPETEER_PATH, // Caminho para execução do chrome
      headless: true, // Modo headless para execução em segundo plano
      args: [
        '--disable-background-timer-throttling',
        '--disable-backgrounding-occluded-windows',
        '--disable-renderer-backgrounding',
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    });

    page = await browser.newPage();
    console.log("page initialized")
    await page.setViewport({ width: 960, height: 1080 });
    console.log("page initialized")

    // const browser = await puppeteer.connect({
    //   browserURL: 'http://localhost:9222', // Conecte-se ao Chrome existente
    //   defaultViewport: null,
    //   args: [
    //     '--disable-background-timer-throttling',
    //     '--disable-backgrounding-occluded-windows',
    //     '--disable-renderer-backgrounding',
    //   ]
    // });

    // const pages = await browser.pages();
    // page = pages.length > 0 ? pages[0] : await browser.newPage();
    // console.log("Page initialized");

    await page.setViewport({ width: 960, height: 1080 });

    await page.goto(url, { waitUntil: 'networkidle2' });
    console.log('Page loaded');

    // Aguarde a página carregar completamente
    await page.waitForSelector('.order-3');
    console.log('.order-3 selector found');

    // Clique no botão
    await page.click('.order-3');
    console.log('Clicked on .order-3');

    // Aguarde um pouco para o modal aparecer
    await new Promise(resolve => setTimeout(resolve, 3000)); // Aumentar tempo de espera para 3 segundos

    // Verifique se o modal apareceu
    const modalVisible = await page.evaluate(() => {
      const modal = document.querySelector('modal-container');
      if (!modal) {
        console.log('Modal element not found');
      } else {
        console.log('Modal element found, checking visibility');
      }
      return modal && window.getComputedStyle(modal).display !== 'none';
    });

    if (!modalVisible) {
      throw new Error('Modal did not appear');
    }

    console.log('Modal appeared');

    // Aguarde até que o iframe esteja disponível
    await page.waitForSelector('modal-container iframe', { visible: true });
    console.log('iframe inside modal-container found');

    // Obtenha o identificador do iframe
    const frameHandle = await page.$('modal-container iframe');
    const frame = await frameHandle.contentFrame();

    // Aguarde a carga completa dentro do iframe
    await frame.waitForSelector('.texto-meio-pagamento');
    console.log('.texto-meio-pagamento inside iframe found');

    // Clique no elemento .texto-meio-pagamento dentro do iframe
    await frame.click('.texto-meio-pagamento');
    console.log('Clicked on .texto-meio-pagamento');

    // Aguarde até que o botão de pagamento esteja disponível e clique nele
    await frame.waitForSelector('#btnPgto');
    console.log('#btnPgto found');
    await frame.click('#btnPgto');
    console.log('Clicked on #btnPgto');

    // Espera adicional após clicar no botão de pagamento
    await new Promise(resolve => setTimeout(resolve, 5000)); // Aumentar tempo de espera para 5 segundos

    // Verificação se o QR code está presente no DOM
    const qrCodePresent = await frame.evaluate(() => {
      const qrCode = document.querySelector('img.qr-code-img');
      return qrCode !== null;
    });

    if (!qrCodePresent) {
      throw new Error('QR code not found in the DOM');
    }

    console.log('QR code found in the DOM, waiting for visibility');

    // Aguardando a visibilidade do QR code
    await frame.waitForFunction(
      () => {
        const qrCode = document.querySelector('img.qr-code-img');
        return qrCode && window.getComputedStyle(qrCode).visibility !== 'hidden' && qrCode.complete && qrCode.naturalHeight !== 0;
      },
      { timeout: 60000 }
    );
    console.log('QR code is now visible');

    const qrCodeSrc = await frame.$eval('img.qr-code-img', img => img.src);
    console.log('QR code src:', qrCodeSrc);

    res.status(200).json({ message: 'Automation completed', qrCodeSrc });

  } catch (error) {
    console.error('Automation failed', error);
    res.status(500).json({ error: 'Failed to automate the page' });
  }
});

// Endpoint para verificar o status do pagamento
app.get('/check-payment-status', async (req, res) => {
  try {

    // //Mock para teste 
    // //<--------->

    // res.json({
    //   message: 'Payment completed successfully',

    //   descricao: 'Mock for test persistence',
    //   identificacaoPagamento: '123456',
    //   nomeContribuinte: 'Teste',
    //   formaPagamento: 'Credit Card',
    //   cnpjContribuinte: '00.000.000/0000-00',
    //   idTransacao: '654321',
    //   numeroReferencia: 'REF123456',
    //   dataPagamento: '2024-07-09',
    //   valor: 'R$100,00',
    //   dataConfirmacaoPagamento: '2024-07-09'

    // });
    if (!page) {
      return res.status(400).json({ error: 'No page reference found. Please initiate the automation first.' });
    }

    console.log('before evaluate');

    const frameHandle = await page.$('modal-container iframe');
    if (!frameHandle) {
      return res.status(400).json({ error: 'Iframe not found' });
    }

    const frame = await frameHandle.contentFrame();
    if (!frame) {
      return res.status(400).json({ error: 'Unable to access iframe content' });
    }

    const { messageElementExists, messageText, paymentDetails } = await frame.evaluate(() => {
      const messageElement = document.querySelector('.resumo-pgto-msg');
      const message = messageElement ? (messageElement.textContent || messageElement.innerText) : null;

      if (message && message.includes('Pagamento realizado com sucesso.')) {
        const informacoes = document.querySelectorAll('.pl-0.valor-detalhe-pagamento');

        const formatDate = (dateStr) => {
          const [day, month, year] = dateStr.split(' ')[0].split('/');
          return `${year}-${month}-${day}`;
        };

        const dataPagamento = formatDate(informacoes[7]?.textContent);
        const dataConfirmacaoPagamento = formatDate(informacoes[9]?.textContent);

        return {
          messageElementExists: true,
          messageText: message,
          paymentDetails: {
            descricao: informacoes[0]?.textContent,
            identificacaoPagamento: informacoes[1]?.textContent,
            nomeContribuinte: informacoes[2]?.textContent,
            formaPagamento: informacoes[3]?.textContent,
            cnpjContribuinte: informacoes[4]?.textContent,
            idTransacao: informacoes[5]?.textContent,
            numeroReferencia: informacoes[6]?.textContent,
            dataPagamento: dataPagamento,
            valor: informacoes[8]?.textContent,
            dataConfirmacaoPagamento: dataConfirmacaoPagamento,
          }
        };
      }
      return { messageElementExists: false, messageText: message };
    });

    console.log('messageElementExists:', messageElementExists);
    console.log('messageText:', messageText);

    if (messageElementExists && paymentDetails) {
      res.status(200).json({
        message: 'Payment completed successfully',
        ...paymentDetails
      });
    } else {
      res.status(200).json({ message: 'Payment not yet completed' });
    }
  } catch (error) {
    console.error('Failed to check payment status', error);
    res.status(500).json({ error: 'Failed to check payment status' });
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
