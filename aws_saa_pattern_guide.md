# AWS SAA Quick-Reference Pattern Guide

**Purpose:** Fast pattern recognition for common AWS SAA question types. When you see these signals, trust your gut.

---

## 🚚 Data Transfer & Migration Patterns

### **Large Data Transfer (>10 TB)**
**Signal:** Multiple terabytes, "too long to transfer", "cost-effective upload"
**Answer:** **AWS Snowball Edge** or **AWS Snowmobile** (for 10+ PB)
**Why:** Physical transfer avoids bandwidth costs entirely
**Gut Check:** If it's TB-scale and cost/timing is an issue → Snowball

### **Ongoing Data Sync**
**Signal:** "Synchronize", "keep in sync", "replicate", "continuous"
**Answer:** **AWS DataSync** (for file systems) or **AWS DMS** (for databases)
**Why:** Designed for ongoing replication, not one-time bulk transfers
**Gut Check:** Continuous/recurring sync → DataSync/DMS

### **Database Migration**
**Signal:** "Migrate database", "minimal downtime", "replicate database"
**Answer:** **AWS Database Migration Service (DMS)**
**Why:** Handles schema conversion, ongoing replication, minimal downtime
**Gut Check:** Database + migration → DMS

---

## 💰 Cost Optimization Patterns

### **Reserved Capacity**
**Signal:** "Predictable workload", "long-term", "reduce costs", "steady state"
**Answer:** **Reserved Instances** or **Savings Plans**
**Why:** Up to 72% discount for 1-3 year commitments
**Gut Check:** Predictable + long-term → Reserved Instances

### **Right-Sizing**
**Signal:** "Over-provisioned", "unused capacity", "reduce costs"
**Answer:** **AWS Cost Explorer**, **AWS Compute Optimizer**, or **Trusted Advisor**
**Why:** Identifies underutilized resources
**Gut Check:** Find waste → Cost Explorer/Compute Optimizer

### **Spot Instances**
**Signal:** "Fault-tolerant", "flexible", "interruptible", "batch processing"
**Answer:** **EC2 Spot Instances**
**Why:** Up to 90% discount, but can be interrupted
**Gut Check:** Can handle interruption + need savings → Spot

### **S3 Storage Classes**
**Signal:** "Rarely accessed", "archive", "long-term storage", "cost-effective"
**Answer:** **S3 Glacier** or **S3 Glacier Deep Archive**
**Why:** Cheapest storage for infrequent access
**Gut Check:** Archive/rarely accessed → Glacier

### **Cost Allocation Tags**
**Signal:** "Track costs", "cost by department", "cost allocation", "organize costs", "tag resources"
**Answer:** **Cost Allocation Tags**
**Why:** Organize and track AWS costs by department, project, or custom categories
**Gut Check:** Need to organize/track costs → Cost Allocation Tags

### **S3 Cross-Region Replication**
**Signal:** "Replicate", "backup", "disaster recovery", "compliance", "geographic distribution"
**Answer:** **S3 Cross-Region Replication (CRR)**
**Why:** Automatically replicates objects to another region
**Gut Check:** Need S3 data in multiple regions → CRR

### **S3 Versioning**
**Signal:** "Protect from deletion", "recover", "accidental overwrite", "compliance"
**Answer:** **S3 Versioning**
**Why:** Keeps multiple versions of objects, protects from accidental deletion
**Gut Check:** Need to protect/recover objects → Versioning

### **S3 Transfer Acceleration**
**Signal:** "Faster upload", "global users", "reduce transfer time", "upload speed"
**Answer:** **S3 Transfer Acceleration**
**Why:** Uses CloudFront edge locations to accelerate uploads
**Gut Check:** Need faster uploads from distant locations → Transfer Acceleration

### **S3 Access Control - Bucket Policy**
**Signal:** "Bucket policy", "public access", "bucket-level", "resource-based", "allow public", "bucket permissions"
**Answer:** **S3 Bucket Policy** (JSON policy attached to bucket)
**Why:** Resource-based policy that controls access at the bucket/object level, can make bucket public
**Gut Check:** Bucket-level public access → Bucket Policy

### **S3 Access Control - IAM Policy**
**Signal:** "User-level access", "IAM policy", "user permissions", "identity-based"
**Answer:** **IAM Policy** (attached to IAM user/role)
**Why:** Identity-based policy that controls what a specific user/role can do with S3
**Gut Check:** User-level access → IAM Policy

### **S3 Block Public Access**
**Signal:** "Block public access", "compliance", "prevent public", "security", "account/bucket level"
**Answer:** **S3 Block Public Access** (account-level or bucket-level setting)
**Why:** Overrides bucket policies and ACLs to prevent public access, security best practice
**Gut Check:** Need to prevent public access → Block Public Access

---

## 🔒 Security & Compliance Patterns

### **Encryption at Rest**
**Signal:** "Encrypt data", "compliance", "encryption keys"
**Answer:** **AWS KMS** (Key Management Service)
**Why:** Centralized key management, integrates with most AWS services
**Gut Check:** Need encryption keys → KMS

### **Secrets Management**
**Signal:** "API keys", "passwords", "credentials", "rotate secrets"
**Answer:** **AWS Secrets Manager** (if rotation needed) or **AWS Systems Manager Parameter Store** (if no rotation)
**Why:** Secure storage and automatic rotation
**Gut Check:** Secrets + rotation → Secrets Manager

### **Network Isolation**
**Signal:** "Private", "isolated", "no internet", "VPC"
**Answer:** **Private Subnets** + **NAT Gateway** (for outbound) or **VPC Endpoints** (for AWS services)
**Why:** Keeps resources private while allowing necessary access
**Gut Check:** Private resources → Private subnet + NAT/VPC Endpoints

### **Compliance Auditing - API Call Tracking**
**Signal:** "API calls", "who did what", "when", "track API activity", "audit API calls", "who deleted bucket"
**Answer:** **AWS CloudTrail**
**Why:** Tracks all API calls made to AWS services, records who made the call, when, and what action was taken
**Gut Check:** Track API calls/actions → CloudTrail
**Key Memory:** CloudTrail = API call audit trail (who called what API, when). Like a security camera recording actions.

### **Compliance Auditing - Resource Configuration Tracking**
**Signal:** "Resource configuration", "compliance drift", "what changed", "configuration history", "compliance reports", "security group changed", "your compliance", "track your resources"
**Answer:** **AWS Config**
**Why:** Tracks YOUR resource configuration changes over time, detects compliance drift, generates compliance reports - proves your resources are compliant
**Gut Check:** Track resource configuration/compliance → Config
**Key Memory:** Config = your inventory system (tracks your resource changes, your compliance). Proves YOUR resources are compliant, not AWS's.

### **Systems Management - EC2 Operations**
**Signal:** "Manage EC2 instances", "run commands", "patch systems", "Session Manager", "access without SSH", "remote management", "automation"
**Answer:** **AWS Systems Manager (SSM)**
**Why:** Manages and automates operations on EC2 instances (Session Manager, Patch Manager, Run Command, Parameter Store)
**Gut Check:** Manage/operate EC2 instances → Systems Manager
**Key Memory:** Systems Manager = active management/operations (run commands, patch, remote access). Like a remote control for your EC2 instances.

### **CloudTrail vs Config vs Systems Manager - Key Distinction**
**⚠️ Critical Distinction:**
- **CloudTrail** = Tracks API calls/actions (who did what, when) - event/action tracking
- **Config** = Tracks resource configuration/state (what changed, compliance drift) - passive monitoring
- **Systems Manager** = Manages/operates EC2 instances (run commands, patch, remote access) - active management
- **Use Together:** Systems Manager for operations + Config for compliance tracking
- **Exam Trap:** "Manage EC2 instances" or "run commands" → Systems Manager (not Config). "Track configuration changes" → Config (not Systems Manager).

### **Artifact vs Config - Key Distinction**
**⚠️ Critical Distinction:**
- **AWS Artifact** = AWS's compliance documentation (download AWS's certifications, audit reports) - proves AWS is compliant
- **AWS Config** = Your resource configuration tracking (tracks your resources, your compliance) - proves your resources are compliant
- **Exam Trap:** "Prove AWS is HIPAA compliant" → Artifact (AWS's compliance). "Track your security group changes" → Config (your compliance).
- **Memory Hook:** Artifact = AWS's report card. Config = your inventory system.

### **AWS Compliance Documentation - AWS's Compliance**
**Signal:** "AWS compliance", "AWS certifications", "AWS audit reports", "HIPAA", "SOC", "ISO", "prove AWS is compliant", "download AWS compliance docs"
**Answer:** **AWS Artifact**
**Why:** Provides AWS's own compliance documentation (certifications, audit reports, attestations) - proves AWS is compliant, not your resources
**Gut Check:** Need AWS's compliance proof → Artifact
**Key Memory:** Artifact = AWS's report card (download AWS's compliance certifications). Proves AWS is compliant, not your resources.

### **DDoS Protection**
**Signal:** "DDoS", "distributed denial of service", "protect from attacks", "network attacks", "traffic flood", "crash server"
**Answer:** **AWS Shield** (Standard = free, Advanced = paid)
**Why:** Protects against DDoS attacks at network/transport layers (Layer 3/4)
**Gut Check:** DDoS protection → Shield
**Key Memory:** Network-level attacks (traffic floods) = Shield. Layer 3/4 protection.

### **Data Security Discovery**
**Signal:** "Sensitive data", "PII", "discover data", "data classification", "compliance"
**Answer:** **Amazon Macie**
**Why:** Discovers and protects sensitive data (PII, credentials) using ML
**Gut Check:** Need to find/protect sensitive data → Macie

### **Vulnerability Assessment**
**Signal:** "Vulnerabilities", "security assessment", "EC2 security", "scan instances"
**Answer:** **Amazon Inspector**
**Why:** Automated security assessment for EC2 instances and container images
**Gut Check:** Need to assess EC2/container security → Inspector

### **Web Application Firewall**
**Signal:** "SQL injection", "XSS", "application attacks", "Layer 7", "WAF", "HTTP requests", "inspect content"
**Answer:** **AWS WAF** (Web Application Firewall)
**Why:** Protects web applications from application-layer attacks (Layer 7), inspects HTTP request content
**Gut Check:** Application-layer attacks → WAF
**Key Memory:** Application-level attacks (SQL injection, XSS in HTTP) = WAF. Layer 7 protection. Inspects request content.

### **Security Service Distinction**
**⚠️ Critical Distinction:**
- **WAF** = Application-layer protection (Layer 7) - SQL injection, XSS, inspects HTTP content
- **Shield** = Network-layer protection (Layer 3/4) - DDoS attacks, traffic floods
- **Exam Trap:** "Firewall Manager" = management tool (not the protection mechanism). WAF/Shield = actual protection.

## 🔐 Identity & Access Management (IAM) Patterns

### **IAM Roles (Temporary Credentials)**
**Signal:** "Temporary credentials", "no access keys", "EC2 access", "instance role", "cross-account", "assume role", "least privilege"
**Answer:** **IAM Roles** (especially EC2 instance roles, cross-account roles)
**Why:** Roles provide temporary credentials (no keys to manage), automatically rotated, best practice for EC2 and cross-account access
**Gut Check:** Need temporary/no-key access → IAM Role. EC2 needs AWS access → Instance Role.
**Key Memory:** EC2 accessing AWS services = ALWAYS use IAM Role (Instance Role), never IAM User

### **IAM Users (Permanent Credentials)**
**Signal:** "Human user", "console access", "programmatic access", "access keys"
**Answer:** **IAM Users** (with access keys for programmatic access)
**Why:** For human users or applications that need permanent credentials
**Gut Check:** Human user or app needing permanent keys → IAM User
**Key Memory:** IAM Users = humans or legacy apps. EC2 should use Roles, not Users.

### **IAM Policies**
**Signal:** "Permissions", "allow/deny actions", "resource access", "least privilege", "JSON policy"
**Answer:** **IAM Policies** (JSON documents defining permissions)
**Why:** Define what actions can be performed on which resources, attached to users/roles/groups
**Gut Check:** Need to restrict actions → IAM Policy. Always apply least privilege.

### **Cross-Account Access**
**Signal:** "Cross-account", "assume role", "access another account", "multi-account"
**Answer:** **IAM Roles with AssumeRole** (cross-account role assumption)
**Why:** Secure way to grant access across AWS accounts without sharing credentials
**Gut Check:** Cross-account access → IAM Role with AssumeRole policy

### **IAM Red Herring: Users vs Roles**
**⚠️ Critical Distinction:**
- **IAM User** = Permanent credentials (access keys), must rotate manually, NOT temporary
- **IAM Role** = Temporary credentials (STS), automatically rotated, NO keys to manage
- **Exam Trap:** Questions often want roles (temporary, secure) but offer users (permanent keys) as distractor
- **EC2 Rule:** EC2 accessing AWS services = ALWAYS IAM Role (Instance Role), never IAM User

---

### **VPC Security - Security Groups**
**Signal:** "Instance-level security", "stateful", "allow/deny traffic", "EC2 security", "automatic return traffic"
**Answer:** **Security Groups** (stateful firewall at instance level)
**Why:** Controls inbound/outbound traffic to EC2 instances, stateful (remembers connections, automatically allows return traffic)
**Gut Check:** Instance-level firewall → Security Groups
**Key Memory:** Security Groups = stateful (remembers connections, auto-allows return traffic). Like a bouncer who remembers who came in.

### **VPC Security - NACLs**
**Signal:** "Subnet-level security", "stateless", "network ACL", "subnet firewall", "block subnet", "subnet-wide rules"
**Answer:** **Network ACLs (NACLs)** (stateless firewall at subnet level)
**Why:** Controls traffic at subnet level, stateless (doesn't remember connections, must define both inbound AND outbound rules)
**Gut Check:** Subnet-level firewall → NACLs
**Key Memory:** NACLs = stateless (doesn't remember, must explicitly allow both directions). Like a gate that doesn't remember who passed through.

### **Security Groups vs NACLs - Key Distinction**
**⚠️ Critical Distinction:**
- **Security Groups** = Instance-level, stateful (remembers connections, auto-allows return traffic)
- **NACLs** = Subnet-level, stateless (doesn't remember, must define inbound AND outbound separately)
- **Stateful** = Remembers connection state, automatically allows return traffic
- **Stateless** = Doesn't remember, must explicitly allow both directions
- **Use Both:** NACLs for subnet-level blocking, Security Groups for instance-level + automatic return traffic
- **Exam Trap:** "Block at subnet level" → NACLs. "Automatic return traffic" → Security Groups (stateful).

---

## 🏗️ High Availability & Resilience Patterns

### **Multi-AZ Deployment**
**Signal:** "High availability", "failover", "99.99% uptime", "single region", "data center failure", "AZ failure"
**Answer:** **Multi-AZ** deployment
**Why:** Automatic failover within same region, survives data center/AZ failure
**Gut Check:** HA in one region → Multi-AZ
**Key Memory:** Multi-AZ = within one region (us-east-1a fails → failover to us-east-1b). Survives data center failure, not region failure.

### **Multi-Region Deployment**
**Signal:** "Disaster recovery", "global", "survive region failure", "natural disaster", "entire region down"
**Answer:** **Multi-Region** deployment
**Why:** Survives entire region failure (hurricane, earthquake, regional outage)
**Gut Check:** DR/global → Multi-Region
**Key Memory:** Multi-Region = across different regions (us-east-1 fails → failover to us-west-2). Survives region-wide disasters.

### **Multi-AZ vs Multi-Region - Key Distinction**
**⚠️ Critical Distinction:**
- **Multi-AZ** = High availability within one region (survives data center/AZ failure)
- **Multi-Region** = Disaster recovery across regions (survives entire region failure)
- **Use Both:** Multi-AZ for HA + Multi-Region for DR = maximum resilience
- **Exam Trap:** "Survive region failure" = Multi-Region (not Multi-AZ). "Data center failure" = Multi-AZ.

### **Auto Scaling**
**Signal:** "Variable traffic", "spike", "scale", "cost-effective"
**Answer:** **Auto Scaling Groups** + **Application Load Balancer**
**Why:** Automatically adjusts capacity based on demand
**Gut Check:** Variable load → Auto Scaling

### **Launch Templates**
**Signal:** "Consistent configuration", "version control", "reusable", "AMI", "instance config"
**Answer:** **EC2 Launch Templates**
**Why:** Version-controlled, reusable templates for launching EC2 instances
**Gut Check:** Need consistent/reusable instance config → Launch Templates

### **Backup & Recovery**
**Signal:** "Backup", "point-in-time recovery", "restore"
**Answer:** **AWS Backup** (unified) or service-specific (RDS snapshots, EBS snapshots)
**Why:** Automated backup and recovery
**Gut Check:** Need backups → AWS Backup or service snapshots

---

## 📊 Performance & Caching Patterns

### **Content Delivery**
**Signal:** "Global users", "reduce latency", "static content", "video"
**Answer:** **CloudFront** (CDN)
**Why:** Caches content at edge locations worldwide
**Gut Check:** Global + static content → CloudFront

### **Database Caching**
**Signal:** "Reduce database load", "faster reads", "cache"
**Answer:** **ElastiCache** (Redis or Memcached)
**Why:** In-memory caching layer
**Gut Check:** Need caching → ElastiCache

### **Read Replicas**
**Signal:** "Read-heavy", "reduce load", "scale reads"
**Answer:** **Read Replicas** (RDS, Aurora, ElastiCache)
**Why:** Offloads read traffic from primary database
**Gut Check:** Read scaling → Read Replicas

---

## 🔄 Messaging & Event Patterns

### **Decouple Applications - Queue (One Consumer)**
**Signal:** "Queue", "one consumer", "process messages", "work queue", "task processing", "one worker per message"
**Answer:** **Amazon SQS** (Simple Queue Service)
**Why:** Queue pattern - one message goes to one consumer, message deleted after processing
**Gut Check:** One service processes multiple messages → SQS
**Key Memory:** SQS = work queue (like a to-do list, one worker picks one task)

### **Decouple Applications - Pub/Sub (Multiple Consumers)**
**Signal:** "Pub/sub", "fan-out", "multiple consumers", "broadcast", "notify multiple services", "one event, many listeners"
**Answer:** **Amazon SNS** (Simple Notification Service)
**Why:** Pub/sub pattern - one message goes to multiple subscribers, fan-out architecture
**Gut Check:** One event triggers multiple services → SNS
**Key Memory:** SNS = broadcast (like a radio station, one broadcast reaches many listeners)

### **SQS vs SNS - Key Distinction**
**⚠️ Critical Distinction:**
- **SQS** = Queue pattern - one message → one consumer (work queue, task processing)
- **SNS** = Pub/sub pattern - one message → multiple subscribers (fan-out, broadcast)
- **Exam Trap:** "Multiple services process same event" → SNS. "One service processes multiple events" → SQS.

### **Event-Driven Architecture**
**Signal:** "Event", "trigger", "react to changes", "serverless"
**Answer:** **AWS Lambda** + **EventBridge** or **SNS/SQS**
**Why:** Serverless event processing
**Gut Check:** Event-driven → Lambda + EventBridge

### **Event Triggers & Scheduling**
**Signal:** "Event trigger", "schedule", "cron", "time-based", "event rules", "multiple sources"
**Answer:** **Amazon EventBridge** (event bus with rules)
**Why:** Serverless event bus that routes events from AWS services, SaaS applications, or custom applications based on rules
**Gut Check:** Event trigger/schedule → EventBridge

### **S3 Event Notifications**
**Signal:** "S3 upload trigger", "file upload", "object created", "S3 event", "trigger on S3"
**Answer:** **S3 Event Notifications** (can trigger Lambda, SQS, SNS, EventBridge)
**Why:** Automatically triggers actions when objects are created, deleted, or modified in S3
**Gut Check:** S3 file upload trigger → S3 Event Notifications → Lambda/SQS/SNS

### **Serverless Event Pattern**
**⚠️ Common Pattern:**
- **S3 upload** → **S3 Event Notification** → **Lambda** (process file)
- **Schedule** → **EventBridge Rule** → **Lambda** (scheduled task)
- **API call** → **API Gateway** → **Lambda** (serverless API)

### **Streaming Data**
**Signal:** "Real-time", "streaming", "continuous data", "Kafka"
**Answer:** **Amazon Kinesis** (Data Streams, Firehose, Analytics)
**Why:** Real-time data streaming and processing
**Gut Check:** Real-time streaming → Kinesis

---

## 🗄️ Database Selection Patterns

### **Relational Database**
**Signal:** "ACID", "transactions", "structured data", "SQL"
**Answer:** **Amazon RDS** (MySQL, PostgreSQL, etc.) or **Aurora** (AWS-managed)
**Why:** Traditional relational database
**Gut Check:** SQL + transactions → RDS/Aurora

### **NoSQL - Key-Value**
**Signal:** "Key-value", "session data", "simple queries", "low latency"
**Answer:** **Amazon DynamoDB**
**Why:** Fast, scalable NoSQL database
**Gut Check:** Key-value + fast → DynamoDB

### **NoSQL - Document**
**Signal:** "Document", "JSON", "flexible schema", "MongoDB"
**Answer:** **Amazon DocumentDB** (MongoDB-compatible)
**Why:** Document database for JSON data
**Gut Check:** Document/JSON → DocumentDB

### **Data Warehouse**
**Signal:** "Analytics", "BI", "data warehouse", "ETL", "load data", "complex analytics", "structured data warehouse"
**Answer:** **Amazon Redshift**
**Why:** Purpose-built for analytics and data warehousing, requires loading data first (ETL), optimized for complex queries on structured data
**Gut Check:** Analytics/warehouse → Redshift
**Key Memory:** "Data warehouse" or "load data first" = Redshift. Redshift = requires ETL/loading step (Extract-Transform-Load). Like a warehouse - must load inventory first.

---

## 📊 Data Lakes & Big Data Analytics Patterns

### **SQL Queries on S3 Data**
**Signal:** "Query S3", "SQL on S3", "serverless SQL", "ad-hoc queries", "no infrastructure", "query files in S3", "query without loading"
**Answer:** **Amazon Athena**
**Why:** Serverless SQL queries directly on data stored in S3, no infrastructure to manage, no loading required
**Gut Check:** SQL queries on S3 files → Athena
**Key Memory:** "Query S3 directly" or "query without loading" = Athena. Athena = query engine for data lakes in S3 (like fishing from a lake with minimal gear).

### **ETL & Data Catalog**
**Signal:** "ETL", "extract transform load", "data catalog", "crawl data", "discover schemas", "prepare data"
**Answer:** **AWS Glue**
**Why:** Serverless ETL service with automatic schema discovery and data catalog
**Gut Check:** ETL/data catalog → Glue

### **Big Data Processing (Spark/Hadoop)**
**Signal:** "Spark", "Hadoop", "big data processing", "large-scale processing", "cluster", "EMR"
**Answer:** **Amazon EMR** (Elastic MapReduce)
**Why:** Managed big data platform for running Spark, Hadoop, and other frameworks at scale
**Gut Check:** Spark/Hadoop/big data cluster → EMR

### **Data Lake Governance**
**Signal:** "Data lake", "governance", "centralized permissions", "data lake security", "fine-grained access"
**Answer:** **AWS Lake Formation**
**Why:** Simplifies setting up and securing data lakes with centralized governance
**Gut Check:** Data lake governance → Lake Formation

### **Business Intelligence & Visualization**
**Signal:** "BI", "business intelligence", "dashboards", "visualization", "reports", "interactive analytics"
**Answer:** **Amazon QuickSight**
**Why:** Serverless BI service for creating interactive dashboards and visualizations
**Gut Check:** BI/dashboards/visualization → QuickSight

### **Data Lake vs Data Warehouse - Key Distinction**
**⚠️ Critical Distinction:**
- **Data Lake (S3 + Athena/Glue)** = Store raw data in S3, query with Athena, process with Glue. Query directly without loading (like fishing from a lake with minimal gear).
- **Data Warehouse (Redshift)** = Structured data warehouse for complex analytics, requires loading data first (ETL). Like a warehouse - must load inventory first.
- **Exam Trap:** "Query S3 files" or "query without loading" → Athena (not Redshift). "Data warehouse" or "load data first" → Redshift (not Athena).
- **Memory Hook:** Athena = minimal infrastructure, query directly. Redshift = ETL (Extract-Transform-Load), must load first.

---

## 🔍 Monitoring & Observability Patterns

### **Distributed Tracing**
**Signal:** "Distributed tracing", "latency breakdown", "end-to-end", "trace requests", "service map", "performance bottlenecks"
**Answer:** **AWS X-Ray**
**Why:** Traces requests across services, shows latency breakdown, identifies bottlenecks, creates service maps
**Gut Check:** Tracing/latency breakdown → X-Ray

### **Metrics & Alarms**
**Signal:** "Metrics", "alarms", "dashboards", "monitor resources", "CPU", "memory", "custom metrics"
**Answer:** **Amazon CloudWatch**
**Why:** Collects and monitors metrics from AWS services and custom applications, creates alarms and dashboards
**Gut Check:** Metrics/alarms → CloudWatch

### **Centralized Logging**
**Signal:** "Logs", "search", "centralized", "aggregate logs", "log analysis", "troubleshoot"
**Answer:** **CloudWatch Logs** (or **Elasticsearch/OpenSearch** for advanced search)
**Why:** Centralized log aggregation, search, and analysis from applications and AWS services
**Gut Check:** Logs/search → CloudWatch Logs

### **Monitoring Decision Tree**
**⚠️ Key Distinctions:**
- **Distributed tracing** (trace requests across services) → **X-Ray**
- **Metrics/alarms/dashboards** → **CloudWatch**
- **Logs/search/aggregation** → **CloudWatch Logs**

---

## 🌐 Networking Patterns

### **DNS & Routing**
**Signal:** "DNS", "domain name", "route traffic", "failover", "health checks"
**Answer:** **Amazon Route 53**
**Why:** AWS DNS service with routing policies (failover, weighted, latency, geolocation)
**Gut Check:** DNS/routing → Route 53

### **DNS Failover**
**Signal:** "Failover", "health check", "primary/secondary", "automatic failover"
**Answer:** **Route 53 Failover Routing Policy** with health checks
**Why:** Automatically routes traffic to healthy endpoint, fails over if unhealthy
**Gut Check:** DNS failover → Route 53 Failover Routing

### **Load Balancer Selection - Application Layer**
**Signal:** "Path-based routing", "host-based routing", "HTTP/HTTPS", "Layer 7", "content-based", "SSL termination", "inspect headers"
**Answer:** **Application Load Balancer (ALB)**
**Why:** Layer 7 load balancer, supports path/host-based routing, SSL termination, can inspect HTTP headers/content
**Gut Check:** Layer 7/HTTP routing → ALB
**Key Memory:** Path routing, SSL termination, HTTP inspection = ALB (Layer 7)

### **Load Balancer Selection - Network Layer**
**Signal:** "High performance", "TCP/UDP", "low latency", "Layer 4", "static IP"
**Answer:** **Network Load Balancer (NLB)**
**Why:** Layer 4 load balancer, handles millions of requests, preserves source IP, operates at TCP/UDP level
**Gut Check:** Layer 4/high performance → NLB
**Key Memory:** TCP/UDP only, high throughput, no HTTP inspection = NLB (Layer 4)

### **Load Balancer Selection - Classic**
**Signal:** "Legacy", "EC2-Classic", "basic load balancing"
**Answer:** **Classic Load Balancer (CLB)** (legacy, avoid for new deployments)
**Why:** Legacy load balancer, use ALB or NLB for new deployments
**Gut Check:** Legacy/basic → CLB (but prefer ALB/NLB)

### **Load Balancer Selection - Gateway**
**Signal:** "Third-party appliances", "firewall", "IDS/IPS", "security appliances"
**Answer:** **Gateway Load Balancer (GLB)**
**Why:** Transparently distributes traffic to third-party virtual appliances
**Gut Check:** Third-party security appliances → GLB

### **Dedicated Connection**
**Signal:** "Dedicated", "private", "consistent bandwidth", "hybrid"
**Answer:** **AWS Direct Connect**
**Why:** Dedicated network connection from on-premises to AWS
**Gut Check:** Dedicated connection → Direct Connect

### **VPN Connection**
**Signal:** "VPN", "secure connection", "temporary", "cost-effective"
**Answer:** **AWS VPN** (Site-to-Site or Client VPN)
**Why:** Encrypted connection over internet
**Gut Check:** VPN needed → AWS VPN

### **VPC Endpoints - Private AWS Service Access**
**Signal:** "Private access to AWS service", "no internet", "S3 private", "DynamoDB private", "API services", "keep traffic in AWS"
**Answer:** **VPC Endpoints**
- **Gateway Endpoints** (route table) for S3 and DynamoDB only
- **Interface Endpoints** (ENI) for API services (EC2, S3, DynamoDB, etc.)
**Why:** Private connectivity to AWS services without internet, keeps traffic within AWS network
**Gut Check:** Private AWS service access → VPC Endpoints. S3/DynamoDB → Gateway Endpoint. Other services → Interface Endpoint.
**Key Memory:** VPC Endpoints = AWS services only, no internet needed

### **NAT Gateway - Outbound Internet from Private Subnet**
**Signal:** "Outbound internet from private subnet", "private instances need internet", "download updates", "access internet", "external APIs"
**Answer:** **NAT Gateway** (or NAT Instance for cost-sensitive scenarios)
**Why:** Allows resources in private subnets to access internet for outbound traffic (updates, external APIs) while remaining private
**Gut Check:** Private subnet outbound internet → NAT Gateway
**Key Memory:** NAT Gateway = external internet access (not for AWS services)

### **Internet Gateway - Public Subnet Internet Access**
**Signal:** "Public subnet internet access", "bidirectional internet", "public IP", "internet gateway"
**Answer:** **Internet Gateway** + public route table (0.0.0.0/0 → igw)
**Why:** Provides bidirectional internet access for public subnets, required for public IP addresses
**Gut Check:** Public subnet internet access → Internet Gateway
**Key Memory:** Internet Gateway = public subnets only, bidirectional

### **VPC Networking Decision Tree**
**⚠️ Critical Distinctions:**
- **Private AWS service access** (S3, DynamoDB, etc.) → **VPC Endpoints** (no internet needed)
- **Private subnet outbound internet** (external APIs, downloads) → **NAT Gateway** (for updates, external APIs)
- **Public subnet internet access** → **Internet Gateway** (bidirectional, public IPs)
**Exam Trap:** "Private subnet + internet" could mean AWS services (VPC Endpoints) OR external internet (NAT Gateway) - read carefully!

---

## 🚀 Serverless Patterns

### **Serverless Compute**
**Signal:** "Serverless", "event-driven", "no infrastructure", "pay per use"
**Answer:** **AWS Lambda**
**Why:** Run code without managing servers
**Gut Check:** Serverless compute → Lambda

### **Serverless API**
**Signal:** "REST API", "serverless", "HTTP", "API Gateway"
**Answer:** **API Gateway** + **Lambda**
**Why:** Serverless API endpoints
**Gut Check:** Serverless API → API Gateway + Lambda

### **Serverless Containers**
**Signal:** "Containers", "serverless", "Docker", "no cluster management"
**Answer:** **AWS Fargate** (ECS or EKS)
**Why:** Serverless container execution
**Gut Check:** Serverless containers → Fargate

---

## 💻 EC2 & Storage Patterns

### **EC2 Instance Types - General Purpose**
**Signal:** "Balanced", "general purpose", "web servers", "small-medium databases"
**Answer:** **M5/M6i instances** (general purpose)
**Why:** Balanced compute, memory, and networking
**Gut Check:** General purpose workloads → M-series

### **EC2 Instance Types - Compute Optimized**
**Signal:** "CPU-intensive", "batch processing", "high performance", "compute-heavy"
**Answer:** **C5/C6i instances** (compute optimized)
**Why:** High-performance processors, ideal for compute-intensive workloads
**Gut Check:** CPU-intensive → C-series

### **EC2 Instance Types - Memory Optimized**
**Signal:** "Memory-intensive", "large databases", "in-memory caching", "high memory"
**Answer:** **R5/R6i instances** (memory optimized)
**Why:** High memory-to-CPU ratio for memory-intensive applications
**Gut Check:** Memory-intensive → R-series

### **EC2 Instance Types - Storage Optimized**
**Signal:** "High disk I/O", "large datasets", "data warehousing", "sequential I/O"
**Answer:** **I3/I3en instances** (storage optimized) or **D2 instances** (dense storage)
**Why:** High sequential read/write performance, local NVMe SSD storage
**Gut Check:** High disk I/O → I-series or D-series

### **EC2 Placement Groups**
**Signal:** "Low latency", "high throughput", "cluster", "HPC", "network performance"
**Answer:** **Placement Groups** (Cluster, Spread, or Partition)
**Why:** Controls EC2 instance placement for performance or availability
**Gut Check:** Need specific placement → Placement Groups

### **EBS Volume Types - General Purpose SSD**
**Signal:** "Boot volumes", "general purpose", "balanced", "cost-effective"
**Answer:** **gp3** (latest) or **gp2** (legacy) - General Purpose SSD
**Why:** Balanced price/performance for most workloads, boot volumes
**Gut Check:** General purpose storage → gp3/gp2

### **EBS Volume Types - Provisioned IOPS SSD**
**Signal:** "High IOPS", "low latency", "I/O-intensive", "databases", "consistent performance"
**Answer:** **io1** or **io2** (Provisioned IOPS SSD)
**Why:** Highest performance SSD, provision IOPS independently, for I/O-intensive workloads
**Gut Check:** High IOPS needed → io1/io2

### **EBS Volume Types - Throughput Optimized HDD**
**Signal:** "Big data", "data warehouses", "sequential reads", "throughput"
**Answer:** **st1** (Throughput Optimized HDD)
**Why:** Low-cost HDD for frequently accessed, throughput-intensive workloads
**Gut Check:** Throughput-intensive → st1

### **EBS Volume Types - Cold HDD**
**Signal:** "Infrequently accessed", "cold data", "lowest cost", "throughput"
**Answer:** **sc1** (Cold HDD)
**Why:** Lowest-cost HDD for infrequently accessed data
**Gut Check:** Cold/infrequent data → sc1

---

## 🎯 Quick Decision Trees

### **Data Transfer Decision Tree**
```
>10 TB? → Snowball/Snowmobile
Ongoing sync? → DataSync/DMS
Database migration? → DMS
Otherwise → Direct upload or Transfer Family
```

### **Cost Optimization Decision Tree**
```
Predictable workload? → Reserved Instances
Can handle interruption? → Spot Instances
Rarely accessed data? → Glacier
Need to find waste? → Cost Explorer/Compute Optimizer
Need to track costs? → Cost Allocation Tags
```

### **Load Balancer Selection Decision Tree**
```
Layer 7 / HTTP routing? → ALB
Layer 4 / High performance? → NLB
Third-party appliances? → GLB
Legacy? → CLB (but prefer ALB/NLB)
```

### **Security Service Decision Tree**
```
Application attacks (SQL injection, XSS)? → WAF
DDoS attacks? → Shield
Find sensitive data? → Macie
Assess EC2 vulnerabilities? → Inspector
Detect threats? → GuardDuty
Need AWS compliance docs? → Artifact
```

### **VPC Security Decision Tree**
```
Instance-level firewall? → Security Groups (stateful)
Subnet-level firewall? → NACLs (stateless)
Private resources? → Private Subnets
Need outbound internet? → NAT Gateway
Need AWS services privately? → VPC Endpoints
```

### **VPC Networking Decision Tree**
```
Private AWS service access (S3, DynamoDB, etc.)? → VPC Endpoints
Private subnet outbound internet? → NAT Gateway
Public subnet internet access? → Internet Gateway
```

### **S3 Access Control Decision Tree**
```
Bucket-level public access? → Bucket Policy
User-level access? → IAM Policy
Need to prevent public access? → Block Public Access
```

### **IAM Decision Tree**
```
Need temporary credentials? → IAM Role
Human user or permanent keys? → IAM User
Need cross-account access? → IAM Role with AssumeRole
Need to define permissions? → IAM Policy
```

### **High Availability Decision Tree**
```
Need to survive region failure? → Multi-Region
Need HA in one region? → Multi-AZ
Variable traffic? → Auto Scaling
Need backups? → AWS Backup/Snapshots
```

### **Database Selection Decision Tree**
```
SQL + transactions? → RDS/Aurora
Key-value + fast? → DynamoDB
Analytics/warehouse? → Redshift
Document/JSON? → DocumentDB
Graph? → Neptune
Time-series? → Timestream
```

### **Data Lake & Big Data Decision Tree**
```
Query S3 files with SQL? → Athena
ETL/data catalog? → Glue
Spark/Hadoop/big data cluster? → EMR
Data lake governance? → Lake Formation
BI/dashboards? → QuickSight
Data warehouse (structured analytics)? → Redshift
```

---

## 🧠 Exam Strategy Reminders

1. **Size Matters:** TB-scale data → Physical transfer (Snowball)
2. **Timing Matters:** "Too long" or "quick" → Look for alternatives to internet transfer
3. **Cost + Size:** Large data + cost-effective → Physical transfer
4. **Pattern First:** Trust your gut on clear patterns (size, HA, security)
5. **Read Carefully:** Security/compliance questions need careful reading
6. **AWS Native First:** When multiple options work, prefer AWS-managed services
7. **Managed > Self-Managed:** Unless explicitly required, choose managed services
8. **Keyword Matching:** Scan for key words first → Match to signal patterns → Trust gut check

---

## 📝 Common Red Herrings to Avoid

- **"Data Warehouse"** doesn't always mean Redshift - could be about migration
- **"Query S3"** or **"SQL on S3"** → **Athena** (not Redshift). Redshift requires loading data first.
- **"Data Lake"** → Usually **S3 + Athena/Glue** (not Redshift). Redshift = data warehouse (structured).
- **"Sync"** doesn't always mean DataSync - could be about replication method
- **"Cost-effective"** with large data usually means physical transfer, not just cheaper storage
- **"High availability"** in one region = Multi-AZ, not Multi-Region
- **"Private"** might need NAT Gateway (outbound) or VPC Endpoints (AWS services)
- **"Security"** questions: Detection (GuardDuty) vs Prevention (WAF/Shield) vs Assessment (Inspector)
- **"Manager"** in service name (Firewall Manager) = management tool, not the protection mechanism
- **"Load Balancer"** questions: Check if Layer 7 (ALB) or Layer 4 (NLB) features needed
- **"Compliance"** could mean your compliance (Config/CloudTrail) or AWS's compliance (Artifact) - read carefully!
- **"AWS's compliance"** or **"prove AWS is compliant"** → **Artifact** (download AWS's certifications)
- **"Your compliance"** or **"track your resources"** → **Config** (track your resource configuration)
- **"Security Groups"** are stateful, **"NACLs"** are stateless - remember the difference
- **"IAM User"** (permanent keys) vs **"IAM Role"** (temporary credentials) - roles are preferred, especially for EC2
- **"VPC Endpoints"** for private AWS service access vs **"NAT Gateway"** for private subnet outbound internet
- **"Bucket Policy"** (bucket-level) vs **"IAM Policy"** (user-level) for S3 access control
- **"X-Ray"** for tracing vs **"CloudWatch"** for metrics vs **"CloudWatch Logs"** for logs

---

*Last Updated: January 2026*
