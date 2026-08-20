# 06 — Dependencies and lifecycle (objective 4f — **new in 004**)

**Implicit dependency:** you reference another resource's attribute (`local_file.b.content` uses `random_pet.a.id`). Terraform builds the graph from this.

**Explicit `depends_on`:** use when there is a *hidden* ordering requirement that is **not** expressed by an attribute reference (e.g. an API must exist first but you never interpolate it). Overusing `depends_on` is a smell.

Lifecycle meta-arguments (memorize):

| Argument | Effect |
|----------|--------|
| `create_before_destroy` | replacement: create new, then destroy old (less downtime) |
| `prevent_destroy` | apply **fails** if this resource would be destroyed |
| `ignore_changes` | drift on listed attributes is not "fixed" by Terraform |
| `replace_triggered_by` | force replace when another resource/attr changes |

Legacy `terraform taint` → `terraform apply -replace=ADDRESS`.
