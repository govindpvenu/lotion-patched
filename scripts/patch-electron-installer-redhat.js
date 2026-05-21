#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const templatePath = path.join(
  __dirname,
  '..',
  'node_modules',
  'electron-installer-redhat',
  'resources',
  'spec.ejs'
);

const oldLine = "cp <%= process.platform === 'darwin' ? '-R' : '-r' %> usr/* %{buildroot}/usr/";
const newLine = "cp <%= process.platform === 'darwin' ? '-R' : '-r' %> %{_topdir}/BUILD/usr/* %{buildroot}/usr/";

if (!fs.existsSync(templatePath)) {
  process.exit(0);
}

const source = fs.readFileSync(templatePath, 'utf8');

if (source.includes(newLine)) {
  process.exit(0);
}

if (!source.includes(oldLine)) {
  console.warn('electron-installer-redhat spec template did not match expected content; skipping RPM patch');
  process.exit(0);
}

fs.writeFileSync(templatePath, source.replace(oldLine, newLine));
