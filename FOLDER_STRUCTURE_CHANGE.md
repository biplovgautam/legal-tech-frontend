# Folder Structure Changes (Dynamic Routing)

We have migrated from static role-based paths to dynamic tenancy-based paths.

## URL Pattern Guide

### Law Firm
*   **Admin**: `/dashboard/firm/[orgId]/admin/[userId]`
*   **Lawyer**: `/dashboard/firm/[orgId]/lawyer/[userId]`
*   **Assistant**: `/dashboard/firm/[orgId]/assist/[userId]`
*   **Tarik/Clerk**: `/dashboard/firm/[orgId]/tarik/[userId]`

### Solo Practice (Independent Lawyer)
*   **Solo Lawyer (Owner)**: `/dashboard/solo/[orgId]`
*   **Assistant**: `/dashboard/solo/[orgId]/assist/[userId]`

### Freelancer (Tarik)
*   **Dashboard**: `/dashboard/tarik/[userId]`

## Notes
*   `[orgId]`: The ID of the Firm or the Solo Practice Tenant.
*   `[userId]`: The ID of the specific user viewing the dashboard.
