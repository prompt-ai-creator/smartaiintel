import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
const file='content/articles/internal-workflow-test.md';
const article=`---\ntitle: 'Internal <test> & validation'\nsection: technology\nsummary: 'Temporary local test only.'\ndescription: 'Internal pipeline validation, not publication.'\ndate: '2026-01-01T12:00:00Z'\neditorial_approved: true\nindexable: false\nsources:\n  - title: Test source\n    url: https://example.com/\n---\n## Internal test\n\n<script>alert('test')</script>\n`;
try{
 await fs.writeFile(file,article.replace('editorial_approved: true','editorial_approved: false'));
 {const out=execFileSync(process.execPath,['tools/build.mjs'],{encoding:'utf8',stdio:'pipe'});assert.ok(out.includes('Skipped unpublished article: internal-workflow-test.md (draft)'),'unapproved draft must be skipped');await assert.rejects(fs.access('_site/articles/internal-workflow-test/index.html'),'unapproved draft must not be built');assert.ok(!(await fs.readFile('_site/sitemap.xml','utf8')).includes('internal-workflow-test'),'unapproved draft must not be in sitemap');}
 await fs.writeFile(file,article);execFileSync(process.execPath,['tools/build.mjs']);
 const html=await fs.readFile('_site/articles/internal-workflow-test/index.html','utf8');
 assert.ok(html.includes('By Logan M.'));assert.ok(html.includes('noindex,nofollow'));assert.ok(!html.includes("<script>alert('test')</script>"));assert.ok(html.includes('Internal &lt;test&gt; &amp; validation'));assert.ok(html.includes('application/ld+json'));
 assert.ok(!(await fs.readFile('_site/sitemap.xml','utf8')).includes('internal-workflow-test'));
 const homepage=await fs.readFile('index.html','utf8');const built=await fs.readFile('_site/index.html','utf8');assert.ok(built.includes(homepage.slice(0,100)));
 console.log('PASS: approval build gate, author assignment, escaping, raw HTML disabled, preview noindex, schema presence, nonindexable article excluded from sitemap, homepage retained.');
}finally{await fs.rm(file,{force:true});execFileSync(process.execPath,['tools/build.mjs'],{stdio:'inherit'});}
