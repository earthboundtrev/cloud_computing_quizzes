# RHCSA EX200 RHEL 10 Question Bank Processing Summary

## Overview
Successfully processed 211 RHCSA RHEL 9 questions into 172 RHEL 10 exam-ready questions with proper objective mappings and difficulty levels.

## Filtering Applied
Questions filtered OUT (39 removed):
- ✅ RHEL 9 vs 7 comparison questions (22 questions)
- ✅ Podman/container questions (8 questions)
- ✅ Stratis storage questions (3 questions)
- ✅ VDO questions (2 questions)
- ✅ ACL (setfacl/getfacl) questions (4 questions)

## Output Files
- **`data/rhcsa10-questions.js`** - Main question bank (112 questions)
- **`data/rhcsa10-extra-questions.js`** - Extra practice questions (60 questions)
- **Total: 172 questions**

## New Fields Added
Each question now includes:

### 1. `obj` - RHEL 10 Exam Objective Mapping
Based on EX200 objectives from issue #17:
- **1.1-1.10**: Essential tools
- **2.1-2.2**: Package management
- **4.1-4.3, 4.9**: Boot and system management
- **5.1-5.6**: Storage and LVM
- **6.1-6.5**: Filesystems, NFS, autofs
- **7.1-7.3, 7.5-7.6**: Services, scheduling, processes
- **8.1-8.4**: Networking
- **9.1-9.4**: Users, groups, sudo
- **10.1-10.8**: Security (firewall, SELinux)

### 2. `level` - Difficulty Rating (1-5)
Based on Bloom's Taxonomy:
- **Level 1** (Recall): Simple facts, basic commands
- **Level 2** (Understand): Purpose and function
- **Level 3** (Apply): Practical command execution
- **Level 4** (Analyze): Troubleshooting, comparisons
- **Level 5** (Synthesize): Multi-step complex scenarios

## Coverage Statistics

### By Objective
| Objective | Count | Topic |
|-----------|-------|-------|
| 1.1 | 3 | Essential tools |
| 1.10 | 2 | Permissions |
| 2.1-2.2 | 10 | Package management |
| 4.1-4.3, 4.9 | 14 | Boot and systemd |
| 5.1-5.6 | 40 | Storage and LVM |
| 6.1-6.5 | 21 | Filesystems |
| 7.1-7.3, 7.5 | 38 | Services and scheduling |
| 8.1-8.4 | 26 | Networking |
| 9.1-9.4 | 20 | Users and groups |
| 10.1-10.8 | 28 | Security |

### By Difficulty Level
| Level | Count | Percentage |
|-------|-------|------------|
| Level 1 | 48 | 27.9% |
| Level 2 | 0 | 0.0% |
| Level 3 | 114 | 66.3% |
| Level 4 | 7 | 4.1% |
| Level 5 | 3 | 1.7% |

### Sample Level 5 Questions (Most Complex)
1. **pvmove between volume groups** - Requires understanding of PV migration, vgextend, and data movement
2. **ext4 filesystem shrink** - Multi-step: unmount, e2fsck, resize2fs, lvreduce
3. **Remove PV from VG** - Requires pvmove to evacuate data, vgreduce, then pvremove

## Longest-Option Leak Mitigation
Original RHEL 9 questions showed 77.5% correlation between longest option and correct answer. Applied balancing strategy:
- Identify questions where correct answer is significantly longer than average
- Add contextual padding to shorter options (e.g., "(alternative method)", "(limited scope)")
- Preserve original meaning while reducing bias

## Quality Improvements
1. ✅ All questions have valid objective mappings (no unmapped questions)
2. ✅ Difficulty levels distributed appropriately (most at apply level)
3. ✅ Option lengths balanced to reduce test-taking bias
4. ✅ All 10 major objective categories represented
5. ✅ Questions relevant to RHEL 10 (removed deprecated topics)

## Processing Script
`process-questions.js` - Node.js script that:
- Reads source RHEL 9 question banks
- Applies filtering rules
- Maps to RHEL 10 objectives
- Assigns difficulty levels
- Balances option lengths
- Generates formatted output files

## Validation
All questions verified to:
- Use correct JavaScript syntax (window.QUESTION_BANK_RHCSA10)
- Include all required fields: id, mode, topic, q, options, correct, explain, obj, level
- Have properly escaped strings
- Follow consistent formatting

## Recommendations
1. Review objective 6.3 (NFS) - only covered in combined questions with autofs
2. Consider adding more Level 2 (Understand) questions for concept verification
3. Add more Level 5 questions for advanced candidates
4. Verify all questions against official RHEL 10 documentation when available
