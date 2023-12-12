const fs = require('fs');

const configLines = fs.readFileSync('config.bolt', 'utf8').split('\n');

const config = {};
let title = 'My Bolt Project'; 
let image = 'https://media.discordapp.net/attachments/1027557466113847408/1181398690947158047/logo-bolt.jpg?ex=6580ea45&is=656e7545&hm=1b10780dce55d3d87f1f9025bd2db195641957b288ba7a16ae8be013b88beaf2&=&format=webp';

configLines.forEach(line => {
  const [key, value] = line.split('=>').map(item => item.trim());
  if (key === 'PROJECT-TITLE') {
    title = value || title; 
  }
  config[key] = value; 
});

configLines.forEach(line => {
    const [key, value] = line.split('=>').map(item => item.trim());
    if (key === 'PROJECT-LOGO') {
      image = value || image; 
    }
    config[key] = value; 
  });

const NavBar = `
<nav style="
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #000;
  color: #fff;
  padding: 10px 20px;
">
  <img src="${image}" alt="Logo" style="width: 30px; height: 30px; border-radius: 50%;">
  <div style="display: flex; align-items: center;">
    ${title}
  </div>
</nav>

`;

module.exports = NavBar;
