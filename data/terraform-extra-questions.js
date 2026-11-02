/**
 * Terraform Associate (004) extras — lifecycle, custom conditions, ephemeral/write-only,
 * HCP projects, and CLI traps that the main bank under-weights.
 */
window.QUESTION_BANK_TERRAFORM_EXTRA = [
  {
    "mode": "exam",
    "topic": "Security & Best Practices",
    "q": "What is an ephemeral resource block in Terraform?",
    "options": [
      "A managed resource that is always destroyed after 24 hours",
      "A temporary resource Terraform opens for the current operation and does not store in state or plan",
      "A synonym for count = 0",
      "An HCP-only run task"
    ],
    "correct": 1,
    "explain": "ephemeral \"TYPE\" \"NAME\" { } values exist for the operation (e.g. a one-time password) and are not written to state/plan.",
    "obj": "4h",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/resources/ephemeral",
    "id": "tf-extra-001"
  },
  {
    "mode": "exam",
    "topic": "Security & Best Practices",
    "q": "How do write-only arguments (often named *_wo) differ from sensitive arguments?",
    "options": [
      "They are the same; both persist in state but hide CLI output",
      "Write-only values are sent to the provider for this operation and are not stored in state or plan; sensitive values are still stored",
      "Write-only arguments encrypt terraform.tfstate with AES-256 automatically",
      "Write-only arguments only work with terraform console"
    ],
    "correct": 1,
    "explain": "Exam 4h: write-only + ephemeral avoid persisting secrets. sensitive = true only redacts display.",
    "obj": "4h",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/resources/ephemeral",
    "id": "tf-extra-002"
  },
  {
    "mode": "exam",
    "topic": "Security & Best Practices",
    "type": "tf",
    "q": "Marking an output sensitive = true prevents that value from being stored in Terraform state.",
    "correct": false,
    "explain": "State still contains the value. Use ephemeral resources and write-only arguments when you must not persist it.",
    "obj": "4h",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/resources/ephemeral",
    "id": "tf-extra-003"
  },
  {
    "mode": "exam",
    "topic": "Security & Best Practices",
    "type": "multi",
    "q": "Which patterns keep a database password out of Terraform state? Pick 2.",
    "options": [
      "ephemeral \"random_password\" piped into a write-only argument such as password_wo",
      "output \"db_password\" { value = aws_db_instance.x.password; sensitive = true }",
      "Provider write-only argument (password_wo) populated for the current apply",
      "Committing terraform.tfstate but adding it to .gitignore later"
    ],
    "correct": [
      0,
      2
    ],
    "explain": "Sensitive outputs of managed attributes still live in state. Ephemeral + write-only are the 004 answer.",
    "obj": "4h",
    "level": 4,
    "ref": "https://developer.hashicorp.com/terraform/language/resources/ephemeral",
    "id": "tf-extra-004"
  },
  {
    "mode": "exam",
    "topic": "Security & Best Practices",
    "q": "On the Associate exam, what is the preferred pattern for secrets management?",
    "options": [
      "Hard-code secrets in .tf files with sensitive = true",
      "A secrets manager such as HashiCorp Vault (or cloud equivalent), consumed at runtime rather than committed",
      "Email the secret to the team after apply",
      "Store secrets only in terraform.tfvars committed to git"
    ],
    "correct": 1,
    "explain": "Objective 4h includes secrets management with Vault: inject at runtime, do not commit.",
    "obj": "4h",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/resources/ephemeral",
    "id": "tf-extra-005"
  },
  {
    "mode": "exam",
    "topic": "Configuration",
    "q": "When should you set depends_on on a resource?",
    "options": [
      "Whenever two resources exist in the same file",
      "When Terraform cannot infer order because you never reference the other resource's attributes, but a hidden ordering requirement still exists",
      "Instead of using resource references; it is always preferred",
      "Only inside modules published to the public registry"
    ],
    "correct": 1,
    "explain": "Prefer implicit dependencies via attribute references. depends_on is for hidden/side-effect ordering (004 objective 4f).",
    "obj": "4f",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on",
    "id": "tf-extra-006"
  },
  {
    "mode": "exam",
    "topic": "Configuration",
    "q": "What does lifecycle { create_before_destroy = true } change during a replacement?",
    "options": [
      "Terraform skips the destroy entirely",
      "Terraform creates the replacement first, then destroys the old object (when the provider/resource supports it)",
      "Terraform only updates tags in-place",
      "Terraform disables the provider plugin cache"
    ],
    "correct": 1,
    "explain": "Used to reduce downtime for replacements that cannot update in place.",
    "obj": "4f",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on",
    "id": "tf-extra-007"
  },
  {
    "mode": "exam",
    "topic": "Configuration",
    "q": "What happens on apply if a resource has prevent_destroy = true and the plan would destroy it?",
    "options": [
      "Terraform destroys it after a 30-second pause",
      "Apply fails until prevent_destroy is removed or the destroy is no longer planned",
      "Terraform automatically runs state rm instead",
      "Only HCP Terraform honors prevent_destroy"
    ],
    "correct": 1,
    "explain": "prevent_destroy is a safety rail against accidental destroy/replace.",
    "obj": "4f",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on",
    "id": "tf-extra-008"
  },
  {
    "mode": "exam",
    "topic": "Configuration",
    "q": "What does lifecycle { ignore_changes = [tags] } mean?",
    "options": [
      "Tags can never be set in configuration",
      "After creation, Terraform will not propose updates to tags even if config or remote drift differs",
      "Tags are removed from state",
      "The provider ignores the AWS API"
    ],
    "correct": 1,
    "explain": "ignore_changes is for attributes managed outside Terraform (autoscalers, vendor tags, etc.).",
    "obj": "4f",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on",
    "id": "tf-extra-009"
  },
  {
    "mode": "exam",
    "topic": "Configuration",
    "q": "Where do you put a variable validation block?",
    "options": [
      "Only in terraform.tfstate",
      "Inside the variable block: variable \"x\" { validation { condition = ... error_message = ... } }",
      "Only in HCP Sentinel policies",
      "Inside output blocks exclusively"
    ],
    "correct": 1,
    "explain": "Input validation fails fast before (or as) the plan is built (004 objective 4g).",
    "obj": "4g",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/checks",
    "id": "tf-extra-010"
  },
  {
    "mode": "exam",
    "topic": "Configuration",
    "q": "How do preconditions differ from postconditions?",
    "options": [
      "They are identical aliases",
      "Preconditions evaluate before the resource action; postconditions evaluate against the resulting resource (self) after read/create/update",
      "Postconditions only run on terraform destroy",
      "Preconditions require HCP Terraform"
    ],
    "correct": 1,
    "explain": "lifecycle { precondition {} postcondition {} } — both are custom conditions (4g).",
    "obj": "4f",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on",
    "id": "tf-extra-011"
  },
  {
    "mode": "exam",
    "topic": "Configuration",
    "q": "What is a check block primarily for?",
    "options": [
      "Replacing terraform validate",
      "Declaring assertions about infrastructure that Terraform reports (they do not themselves implement provider CRUD)",
      "Forcing a remote backend",
      "Compiling HCL to JSON"
    ],
    "correct": 1,
    "explain": "check { assert { condition = ... } } validates assumptions; failed checks are reported in plan.",
    "obj": "4g",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/checks",
    "id": "tf-extra-012"
  },
  {
    "mode": "exam",
    "topic": "Configuration",
    "type": "multi",
    "q": "Which are custom condition mechanisms in Terraform? Pick 3.",
    "options": [
      "variable validation blocks",
      "lifecycle preconditions and postconditions",
      "check blocks",
      "terraform fmt -check (this is style, not infrastructure validation)"
    ],
    "correct": [
      0,
      1,
      2
    ],
    "explain": "fmt -check is formatting CI, not objective 4g infrastructure validation.",
    "obj": "4g",
    "level": 4,
    "ref": "https://developer.hashicorp.com/terraform/language/checks",
    "id": "tf-extra-013"
  },
  {
    "mode": "exam",
    "topic": "HCP Terraform",
    "q": "In HCP Terraform, what is a project?",
    "options": [
      "A git branch naming convention",
      "A grouping of workspaces used for access control, organization, and attaching variable sets",
      "A replacement for terraform init",
      "The same thing as a CLI terraform workspace"
    ],
    "correct": 1,
    "explain": "004 objective 8c: Organization → Project → Workspace. CLI workspaces are a different feature.",
    "obj": "8c",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/cloud-docs/workspaces/projects",
    "id": "tf-extra-014"
  },
  {
    "mode": "exam",
    "topic": "Workspaces",
    "type": "tf",
    "q": "terraform workspace new prod on your laptop creates an HCP Terraform project named prod.",
    "correct": false,
    "explain": "CLI workspaces only switch named state in the current backend. HCP projects/workspaces are platform objects.",
    "obj": "8c",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/cloud-docs/workspaces/projects",
    "id": "tf-extra-015"
  },
  {
    "mode": "exam",
    "topic": "HCP Terraform",
    "q": "A team wants every workspace in a project to share the same cloud credentials without copy-paste. What should they use?",
    "options": [
      "A local terraform.tfvars committed once",
      "An HCP variable set attached at the project or workspace scope",
      "TF_LOG=TRACE",
      "terraform state push on each laptop"
    ],
    "correct": 1,
    "explain": "Variable sets reuse variables across workspaces/projects.",
    "obj": "8c",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/cloud-docs/workspaces/projects",
    "id": "tf-extra-016"
  },
  {
    "mode": "exam",
    "topic": "HCP Terraform",
    "q": "Workspace net must finish apply before workspace app starts. Which HCP feature does that?",
    "options": [
      "terraform fmt",
      "Run triggers (plus remote state / outputs as needed)",
      "ignore_changes",
      "count = 0"
    ],
    "correct": 1,
    "explain": "Run triggers start downstream workspace runs after a successful upstream apply.",
    "obj": "8c",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/cloud-docs/workspaces/projects",
    "id": "tf-extra-017"
  },
  {
    "mode": "exam",
    "topic": "HCP Terraform",
    "type": "multi",
    "q": "Which are HCP Terraform collaboration or governance features? Pick 3.",
    "options": [
      "Sentinel or OPA policy as code on plans",
      "Team permissions at organization, project, and workspace",
      "Speculative plans on VCS pull requests",
      "Storing terraform.tfstate only on an intern's USB drive"
    ],
    "correct": [
      0,
      1,
      2
    ],
    "explain": "Governance = policy + IAM + VCS workflow. USB state is the anti-pattern.",
    "obj": "8b",
    "level": 4,
    "ref": "https://developer.hashicorp.com/terraform/cloud-docs",
    "id": "tf-extra-018"
  },
  {
    "mode": "exam",
    "topic": "HCP Terraform",
    "q": "What does terraform login do?",
    "options": [
      "SSH into every managed VM",
      "Obtain and store an API token so the CLI can talk to HCP Terraform / Terraform Cloud",
      "Upgrade providers",
      "Disable state locking"
    ],
    "correct": 1,
    "explain": "Used with a cloud/remote backend block to run against HCP.",
    "obj": "8d",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/cli/commands/login",
    "id": "tf-extra-019"
  },
  {
    "mode": "exam",
    "topic": "Backend",
    "q": "Which backend block runs Terraform remotely on HCP rather than only storing a local state file?",
    "options": [
      "backend \"local\" { path = \"terraform.tfstate\" }",
      "A cloud { } or remote backend configuration pointing at HCP Terraform",
      "provider \"random\" {}",
      "output \"x\" { value = 1 }"
    ],
    "correct": 1,
    "explain": "The cloud/remote integration stores state and can execute runs on HCP.",
    "obj": "6c",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/settings/backends/configuration",
    "id": "tf-extra-020"
  },
  {
    "mode": "exam",
    "topic": "State",
    "q": "What does terraform apply -refresh-only do?",
    "options": [
      "Destroys and recreates all resources",
      "Updates state to match real infrastructure without changing that infrastructure",
      "Formats all .tf files",
      "Deletes the lock table"
    ],
    "correct": 1,
    "explain": "Refresh-only reconciles drift into state; it is not a regular apply of config changes.",
    "obj": "6d",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/state/refactor",
    "id": "tf-extra-021"
  },
  {
    "mode": "exam",
    "topic": "Terraform CLI",
    "q": "How do you force replacement of a single resource on the next apply (modern replacement for taint)?",
    "options": [
      "terraform delete ADDR",
      "terraform apply -replace=ADDR",
      "terraform fmt ADDR",
      "terraform workspace delete ADDR"
    ],
    "correct": 1,
    "explain": "terraform taint is deprecated; use -replace (or replace in automation).",
    "obj": "3a",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/intro/core-workflow",
    "id": "tf-extra-022"
  },
  {
    "mode": "exam",
    "topic": "Terraform CLI",
    "q": "What does terraform fmt -check do in CI?",
    "options": [
      "Applies infrastructure if formatting is dirty",
      "Exits non-zero if files are not already in canonical format, without rewriting them",
      "Validates providers",
      "Enables TRACE logs"
    ],
    "correct": 1,
    "explain": "Objective 3g: fmt for style; -check is the pipeline gate.",
    "obj": "3g",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/cli/commands/fmt",
    "id": "tf-extra-023"
  },
  {
    "mode": "exam",
    "topic": "Terraform CLI",
    "q": "Which pair enables verbose Terraform logs for troubleshooting (objective 7c)?",
    "options": [
      "TF_LOG and optionally TF_LOG_PATH",
      "AWS_PROFILE and AWS_REGION only",
      "GIT_EDITOR and PAGER",
      "HCP_ONLY and SENTINEL_DEBUG"
    ],
    "correct": 0,
    "explain": "TF_LOG=TRACE|DEBUG|INFO and TF_LOG_PATH to a file.",
    "obj": "7c",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/internals/debugging",
    "id": "tf-extra-024"
  },
  {
    "mode": "exam",
    "topic": "Terraform fundamentals",
    "q": "What is .terraform.lock.hcl?",
    "options": [
      "The state lock table in DynamoDB",
      "A dependency lock file pinning provider versions and hashes for reproducible init",
      "HCP team membership",
      "A deprecated workspace file"
    ],
    "correct": 1,
    "explain": "Commit the lock file. terraform init -upgrade may change it.",
    "obj": "2a",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/files/dependency-lock",
    "id": "tf-extra-025"
  },
  {
    "mode": "exam",
    "topic": "Providers",
    "q": "A resource omits the provider meta-argument while both a default aws provider and provider.aws.west exist. Which is used?",
    "options": [
      "Always aws.west because alias names win",
      "The default (non-aliased) aws provider configuration",
      "Both, creating two resources",
      "Terraform errors until you pick one"
    ],
    "correct": 1,
    "explain": "Aliases are opt-in via provider = aws.west.",
    "obj": "3a",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/intro/core-workflow",
    "id": "tf-extra-026"
  },
  {
    "mode": "exam",
    "topic": "Modules",
    "q": "Which module source supports a version argument in the module block?",
    "options": [
      "source = \"./modules/vpc\"",
      "A Terraform Registry module such as source = \"hashicorp/consul/aws\" with version = \"x.y.z\"",
      "Any local path if you add version = \"1.0.0\"",
      "Modules cannot be versioned"
    ],
    "correct": 1,
    "explain": "Registry (and some git sources via ref) version; local paths do not use the version argument.",
    "obj": "5d",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/modules/sources",
    "id": "tf-extra-027"
  },
  {
    "mode": "exam",
    "topic": "Modules",
    "type": "tf",
    "q": "A child module's input variables are automatically visible as var.x in the root module.",
    "correct": false,
    "explain": "Scope is per module. Pass inputs in; read outputs out.",
    "obj": "3a",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/intro/core-workflow",
    "id": "tf-extra-028"
  },
  {
    "mode": "exam",
    "topic": "Maintain infrastructure",
    "q": "You imported an existing object but the next plan still wants to recreate it. What is the usual cause?",
    "options": [
      "import deletes the object",
      "Configuration does not match the imported object; import only binds state, it does not write correct HCL for you",
      "You must run terraform fmt first or import is invalid",
      "Providers cannot import anything"
    ],
    "correct": 1,
    "explain": "Align resource arguments (or use generated config) until plan is clean.",
    "obj": "7a",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/cli/import",
    "id": "tf-extra-029"
  },
  {
    "mode": "exam",
    "topic": "Maintain infrastructure",
    "q": "What does a moved block do?",
    "options": [
      "Moves VMs between availability zones",
      "Records a refactor so Terraform updates state addresses (e.g. rename resource/module) instead of destroy+create",
      "Uploads state to S3",
      "Converts count to for_each automatically in all cases"
    ],
    "correct": 1,
    "explain": "Prefer moved blocks in code over ad-hoc terraform state mv for team workflows.",
    "obj": "7a",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/cli/import",
    "id": "tf-extra-030"
  },
  {
    "mode": "exam",
    "topic": "State",
    "type": "multi",
    "q": "Why use a remote backend in production? Pick 2.",
    "options": [
      "State locking so two applies do not corrupt state",
      "Shared state for the team instead of copying terraform.tfstate",
      "It removes the need for terraform init",
      "It makes HCL optional"
    ],
    "correct": [
      0,
      1
    ],
    "explain": "Locking + collaboration (and keeping secrets off laptops) are the textbook reasons.",
    "obj": "8d",
    "level": 4,
    "ref": "https://developer.hashicorp.com/terraform/cli/commands/login",
    "id": "tf-extra-031"
  },
  {
    "mode": "exam",
    "topic": "Terraform Workflow",
    "q": "You saved a plan with terraform plan -out=tfplan. How do you apply that exact plan?",
    "options": [
      "terraform init tfplan",
      "terraform apply tfplan",
      "terraform import tfplan",
      "terraform console tfplan"
    ],
    "correct": 1,
    "explain": "Applying the plan file executes the approved set of actions.",
    "obj": "3d",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/cli/commands/plan",
    "id": "tf-extra-032"
  },
  {
    "mode": "exam",
    "topic": "Configuration",
    "q": "Which expression is a valid implicit dependency?",
    "options": [
      "depends_on = [] with no references anywhere",
      "filename = \"${path.module}/${random_pet.app.id}.txt\" on a local_file",
      "A comment that mentions another resource",
      "Putting resources in alphabetical order in the file"
    ],
    "correct": 1,
    "explain": "Interpolation/references create the graph edge automatically.",
    "obj": "4f",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/meta-arguments/depends_on",
    "id": "tf-extra-033"
  },
  {
    "mode": "exam",
    "topic": "IaC Concepts",
    "q": "How does Terraform support multi-cloud and service-agnostic workflows?",
    "options": [
      "One provider plugin implements every vendor",
      "Terraform core is vendor-neutral; providers plug in per API, so one configuration can mix AWS, Azure, SaaS, and on-prem resources",
      "You must rewrite HCL per cloud with a different binary",
      "Only HashiCorp Cloud providers are allowed"
    ],
    "correct": 1,
    "explain": "Objectives 1c / 2b: core + providers. Same workflow, different plugins.",
    "obj": "1c",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/intro",
    "id": "tf-extra-034"
  },
  {
    "mode": "comparison",
    "topic": "Workspaces",
    "q": "CLI terraform workspace vs HCP Terraform workspace — which statement is accurate?",
    "options": [
      "They are identical; the CLI command provisions HCP",
      "CLI workspaces are named state copies in a backend; HCP workspaces are remote run environments with VCS, variables, and permissions",
      "HCP workspaces cannot store state",
      "CLI workspaces include Sentinel automatically"
    ],
    "correct": 1,
    "explain": "Favorite 004 trick question. Same English word, different products.",
    "obj": "3a",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/intro/core-workflow",
    "id": "tf-extra-035"
  },
  {
    "mode": "comparison",
    "topic": "Security & Best Practices",
    "q": "sensitive = true vs ephemeral vs write-only — which is the right mental model?",
    "options": [
      "All three delete the value from state",
      "sensitive redacts UI but stores; ephemeral/write-only are designed not to persist in state/plan",
      "ephemeral encrypts the local backend only",
      "write-only is only a Sentinel policy name"
    ],
    "correct": 1,
    "explain": "sensitive only redacts CLI output; values remain in state. Ephemeral and write-only arguments avoid persisting secrets in state/plan (004 objective 4h). See HashiCorp docs on managing sensitive data.",
    "obj": "4h",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/resources/ephemeral",
    "id": "tf-extra-036"
  },
  {
    "mode": "exam",
    "topic": "Terraform CLI",
    "type": "tf",
    "q": "terraform validate requires a prior terraform init in a normal working directory that uses providers.",
    "correct": true,
    "explain": "Validate uses installed plugins/schema; init first.",
    "obj": "3c",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/tutorials/certification-004/associate-review-004",
    "id": "tf-extra-037"
  },
  {
    "mode": "exam",
    "topic": "Backend",
    "q": "A coworker left a stale lock on the remote state. Which command is the break-glass tool?",
    "options": [
      "terraform fmt",
      "terraform force-unlock LOCK_ID",
      "terraform output",
      "terraform workspace list"
    ],
    "correct": 1,
    "explain": "Only after you confirm no apply is actually running.",
    "obj": "6c",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/settings/backends/configuration",
    "id": "tf-extra-038"
  },
  {
    "mode": "exam",
    "topic": "HCP Terraform",
    "q": "What is a speculative plan in HCP Terraform?",
    "options": [
      "An apply that skips policy checks",
      "A plan (often from a VCS pull request) that previews changes without applying them",
      "terraform destroy -auto-approve",
      "A local terraform console session"
    ],
    "correct": 1,
    "explain": "PR/VCS speculative plans are a core collaboration feature.",
    "obj": "8c",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/cloud-docs/workspaces/projects",
    "id": "tf-extra-039"
  },
  {
    "mode": "exam",
    "topic": "Configuration",
    "q": "You need three nearly identical local files named after a set of roles. Which meta-argument is preferred?",
    "options": [
      "Copy-paste three resource blocks with no repetition features",
      "for_each over a set/map of roles so addresses are role keys, not shifting indexes",
      "count plus for_each on the same resource",
      "A check block that writes files"
    ],
    "correct": 1,
    "explain": "for_each keys stay stable if the set changes; count indexes reshuffle.",
    "obj": "4e",
    "level": 3,
    "ref": "https://developer.hashicorp.com/terraform/language/meta-arguments/for_each",
    "id": "tf-extra-040"
  }
];
