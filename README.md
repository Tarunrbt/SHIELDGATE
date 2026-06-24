ShieldGate v2.1-RC1

Enterprise Multi-Tenant Smart Colony Security Platform

ShieldGate is a multi-tenant visitor management and colony security platform designed for residential societies, gated communities, townships, and housing associations.

The platform provides secure visitor approvals, QR-based gate access, OTP authentication, emergency response management, audit logging, WhatsApp notifications, analytics, and real-time gate operations.

---

Architecture Overview

Technology Stack

Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO

Frontend

- React.js
- Vite
- Tailwind CSS

Mobile Experience

- Progressive Web App (PWA)

Integrations

- WhatsApp Business API
- Google Maps
- Geolocation Services
- Analytics Platform

---

Core Design Principles

- Multi-Tenant Isolation
- Society-Level Segregation
- Role-Based Access Control (RBAC)
- Secure OTP Authentication
- QR-Based Visitor Entry
- Real-Time Notifications
- Immutable Audit Trail
- HSE-Grade Emergency Response Tracking
- Horizontal Scalability

---

User Roles

Resident

- OTP Login
- Approve Visitors
- View Visitor History
- Receive Notifications
- Raise Emergency Alerts

Security Guard

- Password Authentication
- Scan Visitor QR Codes
- Record Entries and Exits
- View Gate Logs

Society Admin

- Password + OTP MFA
- Manage Residents
- Manage Security Staff
- Configure Gates
- View Reports

Super Admin

- Tenant Management
- Subscription Management
- Platform Monitoring

---

Multi-Tenant Structure

Tenant
└── Society
├── Residents
├── Visitors
├── Visitor Passes
├── Approvals
├── Entry Logs
├── Emergency Alerts
├── Audit Trails
└── Analytics

Every business document contains:

- tenantId
- societyId

This enables strict row-level security and tenant isolation.

---

Major Collections

Tenants

Stores customer organizations and subscription information.

Societies

Stores colony metadata:

- Society Name
- Address
- Geofence
- Gates
- Settings

Users

Platform staff accounts:

- Guards
- Admins
- Super Admins

Residents

Resident and flat ownership information.

Visitors

Visitor profile records.

VisitorPasses

QR-enabled visitor access passes.

Security Features:

- tokenHash
- tokenVersion
- Expiry Validation
- Replay Protection

Approvals

Visitor approval workflow records.

Supports:

- Multi-resident flats
- First-response-wins approval logic

EntryLogs

Immutable visitor entry and exit records.

References:

- visitorId
- passId
- approvalId
- guardId

EmergencyAlerts

Emergency incident tracking.

Metrics:

- Raised Time
- Response Time
- Resolution Time

WhatsAppEvents

Delivery and read receipt tracking.

AuditTrails

Compliance-grade immutable audit records.

AnalyticsEvents

Business intelligence and reporting events.

AuthSessions

OTP verification and authentication session tracking.

---

Authentication Model

Residents

Authentication Method:

OTP Only

Flow:

1. Mobile Number
2. OTP Generation
3. OTP Verification
4. JWT Issued

Security Guards

Authentication Method:

Password + JWT

Society Admins

Authentication Method:

Password + OTP MFA

Super Admins

Authentication Method:

Password + OTP MFA

---

QR Pass Security

Raw QR tokens are never stored.

Stored Fields:

- tokenHash
- tokenVersion

Validation Process:

1. Verify Signature
2. Verify Tenant
3. Verify Society
4. Verify Expiry
5. Verify Status
6. Verify Replay Protection

---

Replay Protection

Single-use enforcement implemented through atomic database updates.

Status Lifecycle:

PENDING
→ APPROVED
→ USED
→ ARCHIVED

Duplicate scans are automatically rejected.

---

Visitor Photo Security

Visitor images are not publicly exposed.

Storage Strategy:

- S3
- Cloudflare R2
- Azure Blob Storage

Database stores:

photoStorageKey

Images are served using short-lived signed URLs.

---

Emergency Response KPIs

Tracked Metrics:

- Total Alerts
- Average Response Time
- Resolution Time
- Open Alerts
- Escalated Alerts

---

Compliance Features

- Immutable Audit Logs
- Activity Tracking
- OTP Verification History
- Visitor Traceability
- Entry/Exit Accountability
- Emergency Response Metrics

---

Required Indexes

Residents

- { tenantId, societyId }

Visitors

- { tenantId, societyId }

Approvals

- { tenantId, societyId, status }

EntryLogs

- { tenantId, societyId, entryTime }

VisitorPasses

- { tokenHash } UNIQUE

WhatsAppEvents

- { providerMessageId } UNIQUE

AuthSessions

- TTL on purgeAt

---

Security Checklist

- Multi-Tenant Isolation
- Row-Level Access Control
- OTP Authentication
- MFA Support
- JWT Authorization
- QR Replay Protection
- Signed URL Access
- Audit Logging
- Session Tracking
- Suspicious Activity Detection

---

Current Status

Version: ShieldGate v2.1-RC1

Architecture Status:
Review Candidate

Next Milestone:
Auth & OTP Module Implementation
