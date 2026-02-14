# Study Sessions – Practice Quizzes

Practice quizzes for cloud, security, and Linux certifications. Choose a quiz and start studying.

## Getting Started

Open `index.html` in a browser to access all quizzes. No build step or server required.

## Quizzes

| Quiz | File | Exam | Questions | Pool | Source |
|------|------|------|-----------|------|--------|
| **OCI Foundations Associate** | [oci_foundations_quiz.html](oci_foundations_quiz.html) | 1Z0-1085-25 | 41/session | 77+ | `oci_foundations_pattern_guide.md` |
| **GCP Cloud Digital Leader** | [gcp_cloud_digital_leader_quiz.html](gcp_cloud_digital_leader_quiz.html) | — | 40/session | 60+ | `gcp_cloud_digital_leader_guide.md` |
| **AZ-900 Azure Fundamentals** | [az900_azure_fundamentals_quiz.html](az900_azure_fundamentals_quiz.html) | Microsoft Certified: Azure Fundamentals | 40/session | 55+ | `az900_azure_fundamentals_pattern_guide.md` |
| **AWS ML Engineer Associate** | [aws_mlea_quiz.html](aws_mlea_quiz.html) | MLA-C01 | 40/session | 55+ | — |
| **AWS Data Engineer Associate** | [aws_data_engineering_quiz.html](aws_data_engineering_quiz.html) | DEA-C01 | 40/session | 55+ | — |
| **CISSP** | [cissp_quiz.html](cissp_quiz.html) | 8 domains | 40/session | 55+ | — |
| **RHCSA 9** | [rhcsa9_quiz.html](rhcsa9_quiz.html) | EX200 | 40/session | 55+ | — |
| **RHCE** | [rhce_quiz.html](rhce_quiz.html) | EX294 | 40/session | 55+ | — |

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

- **AZ-900:** ~70% (700+ on real exam)
- **GCP Cloud Digital Leader:** ~70%
- **OCI Foundations:** ~65%
- **AWS MLEA & Data Engineer:** ~72% (720/1000)
- **CISSP:** ~70% (700/1000)
- **RHCSA & RHCE:** ~70%

## CISSP Notes

The CISSP quiz is based on the 8 official CISSP domains. To add questions from your own notes (`CISSP_Notes.docx`), convert the docx to text and add questions to `cissp_quiz.html` in the `questionBank` array. The `.docx` format could not be read programmatically.

## Related Files

- `oci_foundations_pattern_guide.md` — OCI study guide
- `gcp_cloud_digital_leader_guide.md` — GCP study guide  
- `az900_azure_fundamentals_pattern_guide.md` — Azure study guide
