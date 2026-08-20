# 04 — Resources vs data sources (objectives 4a–4b)

- **resource** — Terraform *manages* lifecycle (create/update/destroy). Address: `TYPE.NAME`
- **data** — Terraform *reads* something that already exists. Address: `data.TYPE.NAME`
- Cross-resource reference: `random_pet.app.id` (implicit dependency; builds the graph)

Exam: data sources do not create the remote object. If the object is missing, plan/apply fails at refresh/read time.
