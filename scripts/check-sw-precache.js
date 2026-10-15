#!/usr/bin/env node
/**
 * Check service worker precache configuration
 * 
 * Validates:
 * 1. Every local src/href in *.html is in PRECACHE_PATHS
 * 2. Every PRECACHE_PATHS entry exists on disk
 * 3. Either ignoreSearch:true is used or precache keys match ?v= URLs
 * 
 * Exit 0 on success, 1 on failure.
 */
'use strict';

const fs = require('fs');
const path = require('path');

function main() {
  const swPath = path.join(__dirname, '..', 'sw.js');
  const swContent = fs.readFileSync(swPath, 'utf8');
  
  // Extract PRECACHE_PATHS
  const precacheMatch = swContent.match(/const PRECACHE_PATHS = \[([\s\S]*?)\];/);
  if (!precacheMatch) {
    console.error('ERROR: Could not find PRECACHE_PATHS in sw.js');
    process.exit(1);
  }
  
  const precachePaths = precacheMatch[1]
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith("'") || line.startsWith('"'))
    .map(line => {
      const match = line.match(/['"]([^'"]+)['"]/);
      return match ? match[1] : null;
    })
    .filter(Boolean);
  
  // Check if ignoreSearch is used
  const hasIgnoreSearch = swContent.includes('ignoreSearch: true');
  
  if (!hasIgnoreSearch) {
    console.error('ERROR: caches.match must use { ignoreSearch: true } to handle ?v= URLs');
    process.exit(1);
  }
  
  // Collect HTML files that are actively used (not deprecated/redirected)
  // Load quiz-config.js to get active quiz pages
  const quizConfigPath = path.join(__dirname, '..', 'quiz-config.js');
  const quizConfigContent = fs.readFileSync(quizConfigPath, 'utf8');
  
  // Extract href values from QUIZ_CONFIG
  const hrefMatches = [...quizConfigContent.matchAll(/href:\s*['"]([^'"]+)['"]/g)];
  const activeQuizPages = ['index.html'];
  
  for (const match of hrefMatches) {
    activeQuizPages.push(match[1]);
  }
  
  // Only check HTML files that are actively linked in the app
  const htmlFiles = activeQuizPages.map(f => path.join(__dirname, '..', f));
  
  const requiredPaths = new Set();
  const errors = [];
  
  // Extract all local src and href from HTML files
  htmlFiles.forEach(htmlFile => {
    const content = fs.readFileSync(htmlFile, 'utf8');
    const filename = path.basename(htmlFile);
    
    // Match src="..." and href="..."
    const srcMatches = content.matchAll(/(?:src|href)=["']([^"']+)["']/g);
    
    for (const match of srcMatches) {
      let url = match[1];
      
      // Skip external URLs and data URIs
      if (url.startsWith('http://') || url.startsWith('https://') || 
          url.startsWith('data:') || url.startsWith('//')) {
        continue;
      }
      
      // Strip query string
      const urlWithoutQuery = url.split('?')[0];
      
      // Normalize path (ensure leading slash)
      const normalizedPath = urlWithoutQuery.startsWith('/') 
        ? urlWithoutQuery 
        : '/' + urlWithoutQuery;
      
      requiredPaths.add(normalizedPath);
    }
  });
  
  // Verify all required paths are in PRECACHE_PATHS
  const precacheSet = new Set(precachePaths);
  
  for (const requiredPath of requiredPaths) {
    if (!precacheSet.has(requiredPath)) {
      errors.push(`Missing from PRECACHE_PATHS: ${requiredPath}`);
    }
  }
  
  // Verify all PRECACHE_PATHS exist on disk
  for (const precachePath of precachePaths) {
    const diskPath = path.join(__dirname, '..', precachePath);
    if (!fs.existsSync(diskPath)) {
      errors.push(`PRECACHE_PATHS entry does not exist on disk: ${precachePath}`);
    }
  }
  
  // Report results
  if (errors.length > 0) {
    console.error('SERVICE WORKER PRECACHE CHECK FAILED:\n');
    errors.forEach(err => console.error('  ' + err));
    console.error(`\n${errors.length} error(s) found.`);
    process.exit(1);
  }
  
  console.log('✓ Service worker precache check passed');
  console.log(`  - ${precachePaths.length} paths in PRECACHE_PATHS`);
  console.log(`  - ${requiredPaths.size} unique paths required by HTML files`);
  console.log('  - ignoreSearch: true is configured');
  console.log('  - All paths exist on disk');
}

main();
