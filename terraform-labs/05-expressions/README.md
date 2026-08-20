# 05 — Expressions, count, for_each, functions (objectives 4d–4e)

Know these cold:

| Construct | Use |
|-----------|-----|
| `count` | integer; instances `name[0]`, `count.index` |
| `for_each` | **map or set of strings**; `each.key` / `each.value`; instances `name["key"]` |
| `count` **or** `for_each`, never both | exam favorite |
| `for` / `for ... if` | transform lists/maps |
| `dynamic` | repeat nested blocks |
| functions | `length`, `join`, `lookup`, `coalesce`, `toset`, `merge`, `cidrsubnet` |

```hcl
count     = var.enabled ? 1 : 0
for_each  = toset(["a", "b"])
```
