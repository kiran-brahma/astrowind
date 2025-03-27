// ~/utils/config.js
import yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

let configData = null;

export function getConfigData() {
  if (configData) {
    return configData;
  }
  
  try {
    // Adjust path as needed to point to your config.yaml
    const configPath = path.resolve('/src./config.yaml');
    const fileContents = fs.readFileSync(configPath, 'utf8');
    configData = yaml.load(fileContents);
    return configData;
  } catch (e) {
    console.error('Error loading config.yaml:', e);
    // Fallback default config
    return {
      site: {
        name: 'Knighthood',
        site: 'https://knighthood.co',
        base: '/'
      }
    };
  }
}
