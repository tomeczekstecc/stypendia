import fs from 'fs';
import puppeteer from 'puppeteer';
import hbs from 'handlebars';
import path from 'path';
import crc from 'crc';
import md5 from 'md5';
import dayjs from 'dayjs';
import { createHmac } from 'crypto';
import { Submit } from '../entity/Submit';
import { APP_SECRET } from '../config';

hbs.registerHelper('inc', function (value, options) {
  return parseInt(value) + 1;
});


const hashedToken = (plaintextToken: string) => {
  return createHmac('md5', APP_SECRET).update(plaintextToken).digest('hex');
};

const compile = async function (templateName, data) {
  const filePath = path.join(
    process.cwd(),
    'src/templates/pdf/',
    `${templateName}.hbs`
  );
  const html = fs.readFileSync(filePath, 'utf-8');
  return hbs.compile(html)(data);
};

export async function generatePdf(data, type) {
  console.log(data, 'pdf data')
  const hash = hashedToken(new Date().getTime().toString());
  const fileName = data.submit?.numer || data.tempSubmit?.numer; // inne przypadki też dorobić
  // console.log(fileName);

  const calculateChecksum = async (type) => {
    const file = path.join(process.cwd(), 'pdfs', `${type}`, `${fileName}.pdf`);
    const buffer = fs.readFileSync(file);
    const md5h = md5(buffer);
    const crch = crc.crc32(buffer).toString(16);
    const checksum = crch + md5h;
    return checksum;
  };

  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  const content = await compile('submit', data);
  await page.setContent(content);
  await page.emulateMediaType('screen');
  await page.pdf({
    path: `pdfs/${type}/${fileName}.pdf`,
    format: 'A4',
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: `
    <div style="font-family: Arial; margin: 0 auto; margin-top: 20px; border-bottom: solid 1px black; width: 85%; font-size: 8px; padding: 5px 5px 0; position: relative;">
        <div style="position: absolute; left: 10px; bottom: 5px;"><span>Numer wniosku: <strong>${
          data.submit?.numer || data.tempSubmit?.numer
        }</strong></span></div>
        <div style="position: absolute; left: 180px; bottom: 5px;"><span>Suma kontrolna: <strong>${hash}</strong></span></div>
        <div style="position: absolute; right: 10px; bottom: 5px;">strona <span class="pageNumber"></span>/<span class="totalPages"></span></div>
    </div>
  `,
    footerTemplate: `
    <div style="font-family: Arial; margin: 0 auto; margin-bottom: 15px; border-top: solid 1px black; width: 85%; font-size: 8px;
        padding: 5px 5px 0; position: relative;">
        <div style="position: absolute; left: 10px; top: 10px;"><span>Uworzono dnia: <strong> ${dayjs(
          new Date()
        ).format(
          'YYYY-MM-DD HH:mm:ss'
        )}</strong> przez www.slaskietalenty.com</span></div>

        <div style="position: absolute; right: 10px; top: 10px;">strona <span class="pageNumber"></span>/<span class="totalPages"></span></div>
        </div>
        `,
    // <div style="position: absolute; left: 10px; top: 5px;"><span class="date"></span></div>
    // this is needed to prevent content from being placed over the footer
    margin: { bottom: '60px', left: '15px', right: '15px', top: '70px' },
  });

  if (type === 'submit') {
    const submit = await Submit.findOne(data.submit?.id || data.tempSubmit?.id);
    submit.checksum = await calculateChecksum(type);
    submit.hash = hash;
    await submit.save();
  }

  console.log('Wygenerowano pdf wniosku');

  await browser.close();
}
