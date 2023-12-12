const fs = require('fs');

const configLines = fs.readFileSync('config.bolt', 'utf8').split('\n');

const config = {};
let title = 'My Bolt Project'; 

configLines.forEach(line => {
  const [key, value] = line.split('=>').map(item => item.trim());
  if (key === 'PROJECT-TITLE') {
    title = value || title; 
  }
  config[key] = value; 
});

const footer = `
  <footer style="
    position: fixed;
    bottom: 0;
    width: 100%;
    text-align: center;
    padding: 10px 0;
    background-color: #000;
    color: #fff;
  ">
    2023 - ${title}
  </footer>
`;

module.exports = footer;
