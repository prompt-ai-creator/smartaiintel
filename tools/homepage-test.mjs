import assert from 'node:assert/strict';import fs from 'node:fs/promises';import {homepage} from './homepage.mjs';
const template=await fs.readFile('index.html','utf8');
const a={slug:'local-test',title:'LOCAL <test>',summary:'Local validation only.',section:'technology',sectionLabel:'Technology & AI',author:'Logan M.',date:'2026-01-01T00:00:00Z'};
const empty=homepage(template,[]);assert.ok(empty.includes('No articles have been published yet.'));assert.ok(!empty.includes('data-story='));
const filled=homepage(template,[a]);assert.ok(filled.includes('/articles/local-test/'));assert.ok(filled.includes('LOCAL &lt;test&gt;'));assert.ok(filled.includes('By Logan M.'));
assert.ok(!homepage(template,[{...a,test_only:true}]).includes('/articles/local-test/'));
assert.ok(!homepage(template,[{...a,show_on_homepage:false}]).includes('/articles/local-test/'));
console.log('PASS: empty states, static mock-story removal, links, byline, escaping, test flag and homepage visibility exclusion.');
