'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// The pilot kit's frozen key must be the quiz the site asks, word for word, or pilot scores stop being comparable.
const source = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
const start = source.indexOf('const QUIZ = [');
const end = source.indexOf('];', start);
const QUIZ = new Function('return ' + source.slice(start + 'const QUIZ = '.length, end + 1))();
const key = fs.readFileSync(path.join(__dirname, '../../evaluation/pilot-kit/quiz-and-key.md'), 'utf8');

test('the site asks ten questions with four choices and one correct answer each', () => {
  assert.equal(QUIZ.length, 10);
  for (const item of QUIZ) {
    assert.equal(item.choices.length, 4);
    assert.ok(Number.isInteger(item.correct) && item.correct >= 0 && item.correct < 4);
    assert.ok(item.why.length > 20);
  }
});

test('the pilot kit key matches the site question by question', () => {
  QUIZ.forEach((item, i) => {
    assert.ok(key.includes(`## ${i + 1}. ${item.q}`), `question ${i + 1} wording`);
    for (const choice of item.choices) assert.ok(key.includes(`- ${choice}`), `choice of question ${i + 1}: ${choice}`);
    assert.ok(key.includes(`**Answer:** ${item.choices[item.correct]}`), `answer of question ${i + 1}`);
  });
  assert.equal((key.match(/\*\*Answer:\*\*/g) || []).length, 10);
});
