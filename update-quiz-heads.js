const fs = require('fs');
const path = require('path');

const configs = [
  { file: 'gcp_cloud_digital_leader_quiz.html', accent: '#4285f4', accentDim: '#1a73e8', dataScript: 'data/gcp-questions.js', initScript: 'quiz-init-gcp.js' },
  { file: 'az900_azure_fundamentals_quiz.html', accent: '#0078d4', accentDim: '#106ebe', dataScript: 'data/az900-questions.js', initScript: 'quiz-init-az900.js' },
  { file: 'aws_mlea_quiz.html', accent: '#ff9900', accentDim: '#ec7211', dataScript: 'data/aws-mlea-questions.js', initScript: 'quiz-init-aws-mlea.js' },
  { file: 'aws_data_engineering_quiz.html', accent: '#ff9900', accentDim: '#ec7211', dataScript: 'data/aws-data-engineering-questions.js', initScript: 'quiz-init-aws-data-engineering.js' },
  { file: 'aws_genai_quiz.html', accent: '#ff9900', accentDim: '#ec7211', dataScript: 'data/aws-genai-questions.js', initScript: 'quiz-init-aws-genai.js' },
  { file: 'cissp_quiz.html', accent: '#0066cc', accentDim: '#0052a3', dataScript: 'data/cissp-questions.js', initScript: 'quiz-init-cissp.js' },
  { file: 'rhcsa9_quiz.html', accent: '#ee0000', accentDim: '#cc0000', dataScript: 'data/rhcsa9-questions.js', initScript: 'quiz-init-rhcsa9.js' },
  { file: 'rhce_quiz.html', accent: '#ee0000', accentDim: '#cc0000', dataScript: 'data/rhce-questions.js', initScript: 'quiz-init-rhce.js' },
];

for (const cfg of configs) {
  const filePath = path.join(__dirname, cfg.file);
  let content = fs.readFileSync(filePath, 'utf8');
  const styleStart = content.indexOf('  <style>');
  const styleEnd = content.indexOf('</style>', styleStart);
  if (styleStart === -1 || styleEnd === -1) {
    console.log('Style block not found in', cfg.file);
    continue;
  }
  const replacement = '  <link rel="stylesheet" href="css/quiz-common.css">\n  <style>:root { --accent: ' + cfg.accent + '; --accent-dim: ' + cfg.accentDim + '; }</style>';
  content = content.slice(0, styleStart) + replacement + content.slice(styleEnd + '</style>'.length);

  const streakTag = '<script src="session-streak.js"></script>';
  const insertAfter = streakTag + '\n  <script src="quiz-engine.js"></script>\n  <script src="' + cfg.dataScript + '"></script>\n  <script src="' + cfg.initScript + '"></script>';
  content = content.replace(streakTag, insertAfter);

  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Updated', cfg.file);
}
