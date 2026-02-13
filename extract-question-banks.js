const fs = require('fs');
const path = require('path');

const quizzes = [
  { html: 'oci_foundations_quiz.html', varName: 'QUESTION_BANK_OCI', out: 'data/oci-questions.js' },
  { html: 'gcp_cloud_digital_leader_quiz.html', varName: 'QUESTION_BANK_GCP', out: 'data/gcp-questions.js' },
  { html: 'az900_azure_fundamentals_quiz.html', varName: 'QUESTION_BANK_AZ900', out: 'data/az900-questions.js' },
  { html: 'aws_mlea_quiz.html', varName: 'QUESTION_BANK_AWS_MLEA', out: 'data/aws-mlea-questions.js' },
  { html: 'aws_data_engineering_quiz.html', varName: 'QUESTION_BANK_AWS_DATA_ENGINEERING', out: 'data/aws-data-engineering-questions.js' },
  { html: 'aws_genai_quiz.html', varName: 'QUESTION_BANK_AWS_GENAI', out: 'data/aws-genai-questions.js' },
  { html: 'cissp_quiz.html', varName: 'QUESTION_BANK_CISSP', out: 'data/cissp-questions.js' },
  { html: 'rhcsa9_quiz.html', varName: 'QUESTION_BANK_RHCSA9', out: 'data/rhcsa9-questions.js' },
  { html: 'rhce_quiz.html', varName: 'QUESTION_BANK_RHCE', out: 'data/rhce-questions.js' },
];

const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

for (const { html, varName, out } of quizzes) {
  const filePath = path.join(__dirname, html);
  const content = fs.readFileSync(filePath, 'utf8');
  const startMarker = 'const questionBank = [';
  const start = content.indexOf(startMarker);
  if (start === -1) {
    console.error('Could not find questionBank in', html);
    continue;
  }
  let depth = 0;
  let i = start + startMarker.length;
  const begin = i - 1; // include '['
  while (i < content.length) {
    const ch = content[i];
    if (ch === '"' || ch === "'") {
      const quote = ch;
      i++;
      while (i < content.length && (content[i] !== quote || content[i - 1] === '\\')) i++;
      i++;
      continue;
    }
    if (ch === '[') depth++;
    else if (ch === ']') {
      if (depth === 0) {
        i++;
        break;
      }
      depth--;
    }
    i++;
  }
  const arrayContent = content.substring(begin, i);
  const outPath = path.join(__dirname, out);
  fs.writeFileSync(outPath, `window.${varName} = ${arrayContent};\n`, 'utf8');
  console.log('Wrote', out);
}
