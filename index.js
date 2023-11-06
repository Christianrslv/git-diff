import { getInput, setFailed, setOutput } from '@actions/core';
import { context } from '@actions/github';
import { createRequire } from 'node:module';
 
const require = createRequire(import.meta.url);
const fs = require('fs');
const yml = require('js-yaml');

try {
  let file = getInput('file');
  if(file == '') file = 'config.deploy.yml';
  const fileContents = fs.readFileSync(file, 'utf8');
  const data = yml.load(fileContents);
  setOutput('content', data);
  const payload = JSON.stringify(context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
  } catch (error) {
    setFailed(error.message);
}
