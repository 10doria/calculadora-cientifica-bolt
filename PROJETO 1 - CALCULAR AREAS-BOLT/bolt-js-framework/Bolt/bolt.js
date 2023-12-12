const http = require('http');
const fs = require('fs');
const path = require('path');

//STYLE PAGES
const error404 = require('./404');
const Style = require('../src/Style/style');
const Alert = require('./alert');
const JavaScriptFunctions = require('../src/JavaScript/script');
const Footer = require('../src/components/Footer');
const Navbar = require('../src/components/NavBar');
const Router = require('./router-bolt')
fs.readFile('./config.bolt', 'utf8', (err, data) => {
  if (err) {
    console.error('', err);
    return;
  }

  const configLines = data.split('\n');
  const config = {};

  configLines.forEach(line => {
    const [key, value] = line.split('=>').map(item => item.trim());

    if (value === 'true') {
      config[key] = true;
    } else if (value === 'false') {
      config[key] = false;
    } else {
      config[key] = value;
    }
  });

  const ProjectName = config['PROJECT-TITLE'] || "My Bolt Project";
  const ProjectDescription = config['PROJECT-DESCRIPTION'] || "This is my amazing Bolt Project";
  const sweetAlert = config['SWEETALERT'] || false;
  const port = config['PORT'] || 3000; // The default port is 3000
  const __dirname = path.resolve(); // Get the atual directory
  const Logo = config['PROJECT-LOGO'] || "https://media.discordapp.net/attachments/1027557466113847408/1181398690947158047/logo-bolt.jpg?ex=6580ea45&is=656e7545&hm=1b10780dce55d3d87f1f9025bd2db195641957b288ba7a16ae8be013b88beaf2&=&format=webp";
  let htmlData = {};


  fs.readdir('app', (err, files) => {
    if (err) {
      console.error('Erro ao ler o diretório', err);
    } else {
      const htmlFiles = files.filter(file => path.extname(file) === '.html');
  
      if (htmlFiles.length > 0) {
        let mainPageFound = false;
        htmlFiles.forEach((file, index) => {
          fs.readFile(`app/${file}`, 'utf8', (err, fileData) => {
            if (err) {
              console.error(`Erro ao ler o arquivo HTML ${file}`, err);
            } else {
              const fileName = path.parse(file).name;
              if (file === 'page.html') {
                htmlData['html1'] = fileData;
                console.log(`✅ Main page is set: ${file}`);
                mainPageFound = true;
              } else {
                htmlData[`html${index + 1}`] = fileData;
                console.log(`✅ ${fileName} page is working.`);
              }
              if (!mainPageFound && index === htmlFiles.length - 1) {
                console.error('Main page not found. Setting default.');
                const defaultMainPage = htmlFiles[0];
                fs.readFile(`app/${defaultMainPage}`, 'utf8', (err, defaultData) => {
                  if (err) {
                    console.error(`Erro ao ler o arquivo HTML ${defaultMainPage}`, err);
                  } else {
                    htmlData['html1'] = defaultData;
                    console.log(`✅ Main page set as default: ${defaultMainPage}`);
                  }
                });
              }
            }
          });
        });
      } else {
        console.error('\n Error: \n Bolt.js don´t found any "page.html" archive in app.');
      
      fs.readFile('public/Apresentation.html', 'utf8', (err, fileData) => {
        if (err) {
        } else {
          htmlData['html1'] = fileData;
      
        }
      });
      }
    }
  });

  const server = http.createServer((req, res) => {
    let headContent = `<meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"><link href="${Logo}" rel="icon">${Style}<script>${JavaScriptFunctions}</script><script>${Router}</script>`;
    if (req.url === '/' && req.method === 'GET') {
  
      if (config['BOOTSTRAP'] == true) {
        headContent += `<title>${ProjectName}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>`;
      } else {
        headContent += `<title>${ProjectName}</title>`;
      }
      if (config['SWEETALERT'] == true) {
        headContent += `${Alert}
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        `;
      }
      if (config['FOOTER'] == true) {
        headContent += `${Footer}`
      }
      if (config['NAVBAR'] == true) {
        headContent += `${Navbar}`
      }
  
      res.writeHead(200, { 'Content-Type': 'text/html' });
      if (htmlData['html1']) {
        res.end(headContent + htmlData['html1']);
      } else if (htmlData['page.html']) {
        res.end(headContent + htmlData['page.html']);
      } else {
        res.end(headContent); 
      }
      // SERVER2:
    } else if (req.method === 'GET') {
      const fileName = req.url.split('/')[1];

    if (config['BOOTSTRAP'] == true) {
      headContent += `<title>${ProjectName}</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>`;
    } else {
      headContent += `<title>${ProjectName}</title>`;
    }
    if (config['SWEETALERT'] == true) {
      headContent += `${Alert}
      <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
      `;
    }
    if (config['FOOTER'] == true) {
      headContent += `${Footer}`
    }
    if (config['NAVBAR'] == true) {
      headContent += `${Navbar}`
    }
      if (fileName && fileName !== '' && fileName !== 'page.html') {
        const filePath = path.join(__dirname, 'app', `${fileName}.html`);
  
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error(`Erro ao ler o arquivo HTML ${fileName}`, err);
            res.writeHead(404);
            res.end(error404);
          } else {
            fs.readFile(filePath, 'utf8', (err, fileData) => {
              if (err) {
                console.error(`Erro ao ler o arquivo HTML ${fileName}`, err);
                res.writeHead(500);
                res.end('Erro interno no servidor');
              } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(headContent += fileData);
              }
            });
          }
        });
      } else {
        res.writeHead(404);
        res.end('Endpoint não encontrado');
      }
    } else {
      res.writeHead(404);
      res.end('Endpoint não encontrado');
    }
  });
  
  server.listen(port, () => {
    console.log('Bolt Framework @2023');
    console.log('');
    console.log(`Your Bolt Server started running on: \nhttp://localhost:${port}\nName: ${ProjectName}\nDescription: ${ProjectDescription}`);
  });
})  