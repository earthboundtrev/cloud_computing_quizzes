const fs = require('fs');
const path = require('path');

const quizFiles = [
  'oci_foundations_quiz.html',
  'gcp_cloud_digital_leader_quiz.html',
  'az900_azure_fundamentals_quiz.html',
  'aws_mlea_quiz.html',
  'aws_data_engineering_quiz.html',
  'aws_genai_quiz.html',
  'cissp_quiz.html',
  'rhcsa9_quiz.html',
  'rhce_quiz.html'
];

for (const file of quizFiles) {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const quizIdIdx = content.indexOf("const QUIZ_ID ");
  if (quizIdIdx === -1) {
    console.log('No inline script found in', file);
    continue;
  }
  const scriptTagStart = content.lastIndexOf('<script>', quizIdIdx);
  const scriptEnd = content.indexOf('</script>', quizIdIdx);
  if (scriptTagStart === -1 || scriptEnd === -1) {
    console.log('Script bounds not found in', file);
    continue;
  }
  const before = content.slice(0, scriptTagStart).replace(/\s+$/, '\n');
  const after = content.slice(scriptEnd + '</script>'.length);
  fs.writeFileSync(filePath, before + after, 'utf8');
  console.log('Stripped inline script from', file);
}
