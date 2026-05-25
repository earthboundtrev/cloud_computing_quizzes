const fs = require('fs');
const path = require('path');
const dataDir = path.join(__dirname, '..', 'data');

const banks = {
  oci: ['oci-questions.js'],
  gcp_cdl: ['gcp-questions.js'],
  gcp_ace: ['gcp-ace-questions.js', 'gcp-ace-extra-questions.js'],
  gcp_pca: ['gcp-pca-questions.js', 'gcp-pca-scenario-questions.js'],
  az900: ['az900-questions.js'],
  az104: ['az104-questions.js', 'az104-extra-questions.js', 'az104-boost-questions.js', 'az104-scenario-questions.js'],
  az305: ['az305-questions.js', 'az305-extra-questions.js', 'az305-boost-questions.js', 'az305-scenario-questions.js'],
  ai900: ['ai900-questions.js'],
  aws_mlea: ['aws-mlea-questions.js', 'aws-mlea-extra-questions.js', 'aws-mlea-scenario-questions.js'],
  aws_dea: ['aws-data-engineering-questions.js', 'aws-dea-extra-questions.js', 'aws-dea-scenario-questions.js'],
  aws_genai: ['aws-genai-questions.js', 'aws-genai-extra-questions.js', 'aws-genai-scenario-questions.js'],
  terraform: ['terraform-questions.js'],
  cissp: ['cissp-questions.js', 'cissp-scenario-questions.js'],
  secai: ['secai-questions.js', 'secai-scenario-questions.js'],
  rhcsa9: ['rhcsa9-questions.js', 'rhcsa9-extra-questions.js'],
  rhce: ['rhce-questions.js']
};

for (const [id, files] of Object.entries(banks)) {
  let n = 0;
  for (const f of files) {
    const p = path.join(dataDir, f);
    if (!fs.existsSync(p)) continue;
    n += (fs.readFileSync(p, 'utf8').match(/\{ mode:/g) || []).length;
  }
  console.log(id + ':', n);
}
