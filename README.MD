# Study Sessions – Practice Quizzes

Practice quizzes for cloud, security, and Linux certifications. Choose a quiz and start studying.

## Getting Started

Open `index.html` in a browser to access all quizzes. No build step or server required.

## Quizzes

| Quiz | File | Exam | Questions | Pool | Source |
|------|------|------|-----------|------|--------|
| **OCI Foundations Associate** | [oci_foundations_quiz.html](oci_foundations_quiz.html) | 1Z0-1085-25 | 41/session (55 exam) | 190+ | `oci_foundations_pattern_guide.md` |
| **GCP Cloud Digital Leader** | [gcp_cloud_digital_leader_quiz.html](gcp_cloud_digital_leader_quiz.html) | — | 40/session (55 exam) | 155+ | `gcp_cloud_digital_leader_guide.md` |
| **GCP Associate Cloud Engineer** | [gcp_associate_cloud_engineer_quiz.html](gcp_associate_cloud_engineer_quiz.html) | Associate Cloud Engineer | 40/session (50 exam) | 200+ | — |
| **GCP Professional Cloud Architect** | [gcp_professional_cloud_architect_quiz.html](gcp_professional_cloud_architect_quiz.html) | Professional Cloud Architect | 40/session (50 exam); 8 Q per case study exam | 185+ | Case-study split view (EHR Healthcare, Mountkirk Games) |
| **AZ-900 Azure Fundamentals** | [az900_azure_fundamentals_quiz.html](az900_azure_fundamentals_quiz.html) | Microsoft Certified: Azure Fundamentals | 40/session (50 exam) | 245+ | `az900_azure_fundamentals_pattern_guide.md` |
| **AZ-104 Azure Administrator** | [az104_azure_administrator_quiz.html](az104_azure_administrator_quiz.html) | Administrator Associate (typical step after AZ-900) | 40/session (50 exam); 8 Q per case study | 210+ | `az104_azure_administrator_pattern_guide.md` |
| **AZ-305 Azure Solutions Architect** | [az305_azure_solutions_architect_quiz.html](az305_azure_solutions_architect_quiz.html) | Solutions Architect Expert (closest Azure track to AWS SAA) | 40/session (50 exam); 8 Q per case study | 255+ | `az305_azure_solutions_architect_pattern_guide.md` |
| **AI-900 Azure AI Fundamentals** | [ai900_azure_ai_fundamentals_quiz.html](ai900_azure_ai_fundamentals_quiz.html) | Azure AI Fundamentals | 40/session (50 exam) | 290+ | — |
| **AWS ML Engineer Associate** | [aws_mlea_quiz.html](aws_mlea_quiz.html) | MLA-C01 | 40/session (85 exam) | 210+ | Case studies |
| **AWS Data Engineer Associate** | [aws_data_engineering_quiz.html](aws_data_engineering_quiz.html) | DEA-C01 | 40/session (65 exam) | 215+ | Case studies |
| **AWS GenAI Developer Pro** | [aws_genai_quiz.html](aws_genai_quiz.html) | AIP-C01 | 40/session (85 exam) | 200+ | Case studies |
| **Terraform Associate** | [terraform_associate_quiz.html](terraform_associate_quiz.html) | 004 | 40/session (65 exam) | 385+ | — |
| **CISSP** | [cissp_quiz.html](cissp_quiz.html) | 8 domains | 40/session (100 exam) | 235+ | Scenario blocks |
| **CompTIA SecAI+** | [secai_quiz.html](secai_quiz.html) | CY0-001 | 40/session (60 exam) | 238+ | Scenario blocks |
| **RHCSA 9** | [rhcsa9_quiz.html](rhcsa9_quiz.html) | EX200 | 40/session | 205+ | — |
| **RHCE** | [rhce_quiz.html](rhce_quiz.html) | EX294 | 40/session | 165+ | — |

## Case study / scenario blocks

These quizzes support **split-view case studies** (context panel + linked questions), similar to formal exam case blocks:

| Quiz | Format on real exam | Mini-exams in app |
|------|---------------------|-------------------|
| **GCP Professional Cloud Architect** | 2 published case studies (~20–30% of exam) | EHR Healthcare, Mountkirk Games (8 Q each) |
| **CISSP** | Scenario-based CAT items (first/next/best) | Regional Hospital, Northwind Financial (6 Q each) |
| **AWS ML Engineer Associate** | Case study sections | SageMaker enterprise app, Fraud detection (6 Q each) |
| **AWS Data Engineer Associate** | Case-style blocks | RetailCo data lake, StreamOrders (6 Q each) |
| **AWS GenAI Developer Professional** | Long compound scenarios | OmniDocs RAG, Apex Financial (6 Q each) |
| **CompTIA SecAI+** | PBQ + scenario MCQ (PBQs not simulated here) | HelpNow chatbot, InsightRAG (6 Q each) |
| **AZ-104 Azure Administrator** | Case study sections (split-screen on exam) | Northwind Operations, Fabrikam Research (8 Q each) |
| **AZ-305 Azure Solutions Architect** | Case study sections (multi-tab scenarios) | Litware Digital, Adventure Works Global (8 Q each) |

**No shared case-study blocks** (standalone scenario MCQs only): OCI Foundations, GCP Digital Leader, GCP ACE, AZ-900, AI-900, Terraform Associate, RHCSA 9, RHCE.

Use **Case studies (mixed)** or the **mini-exam** buttons on each quiz start screen.

## Quiz Modes

**Cloud quizzes (OCI, GCP, AZ-900):**
- **Comparison (Cloud ↔ AWS)** — Map cloud services to AWS equivalents. Uses your SAA/CCP knowledge.
- **Exam (Scenario-based)** — Exam-style questions.
- **Mixed** — Both modes.

**Specialty quizzes (AWS MLEA, DEA, CISSP, RHCE):**
- **Domain Focus / Service Selection** — Target specific domains or use cases.
- **Exam (Scenario-based)** — Exam-style questions.
- **Mixed** — Both modes.

**RHCSA 9 (if you passed RHCSA 7):**
- **RHEL 9 vs RHEL 7** — What changed? Map RHEL 7 concepts to RHEL 9.
- **Exam (RHEL 9–specific)** — Storage, systemd, firewalld, SELinux, etc.
- **Mixed** — Both modes.

## Features

- **Randomized sessions** — Each run draws from the question pool.
- **Weighted sampling** — Weak topics get more questions based on past performance.
- **Import results** — Paste or upload previous results (`.md`) to focus on weak topics.
- **Download / copy results** — Export results for AI refactoring or review.

## How to Use

1. Open `index.html` and choose a quiz.
2. Pick a mode (Comparison, Exam, or Mixed).
3. (Optional) Import past results to emphasize weak areas.
4. Click **Start Quiz** and answer each question.
5. At the end, download or copy results for later review or AI-assisted study.

## Pass Targets

- **AZ-900, AZ-104, AZ-305:** ~70% (700+ on real exams)
- **GCP Cloud Digital Leader:** ~70%
- **GCP Associate Cloud Engineer & Professional Cloud Architect:** ~70%
- **OCI Foundations:** ~65%
- **AWS MLEA & Data Engineer:** ~72% (720/1000)
- **CISSP:** ~70% (700/1000)
- **RHCSA & RHCE:** ~70%

## CISSP Notes

The CISSP quiz is based on the 8 official CISSP domains. To add questions from your own notes (`CISSP_Notes.docx`), convert the docx to text and add questions to `cissp_quiz.html` in the `questionBank` array. The `.docx` format could not be read programmatically.

## Related Files

- `oci_foundations_pattern_guide.md` — OCI study guide
- `gcp_cloud_digital_leader_guide.md` — GCP study guide  
- `az900_azure_fundamentals_pattern_guide.md` — Azure Fundamentals  
- `az104_azure_administrator_pattern_guide.md` — Azure Administrator (after AZ-900)  
- `az305_azure_solutions_architect_pattern_guide.md` — Azure Solutions Architect (SAA-equivalent scope)
