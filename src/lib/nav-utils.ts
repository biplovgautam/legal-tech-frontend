import { User } from "@/types/user";

/**
 * Determines the primary dashboard URL based on user context.
 * @param {User} user - The user object from /users/me
 * @returns {string} The URL to redirect to
 */
export function getDashboardUrl(user: User): string {
  const { org_type, user_roles, org_id, id } = user;

  // Usage of ID for dynamic routing
  // Fallback to 'me' in rare dev cases, but backend guarantees IDs now.
  const contextId = org_id ? org_id.toString() : "me";
  const userId = id ? id.toString() : "me";

  // --- CASE 1: FREELANCER (Tarik) ---
  // If org_type is null or "NONE", they are a freelancer.
  if (!org_type || org_type === "NONE" || (org_type as string) === "TARIK") {
     return `/dashboard/tarik/${userId}`;
  }

  // --- CASE 2: SOLO PRACTICE ---
  if (org_type === "SOLO") {
     // Solo Lawyer: /dashboard/solo/[org_id]
     if (user_roles.includes("SOLO_LAWYER")) return `/dashboard/solo/${contextId}`;
     // Assistant: /dashboard/solo/[org_id]/assist/[user_id]
     if (user_roles.includes("ASSISTANT"))    return `/dashboard/solo/${contextId}/assist/${userId}`;
     
     return `/dashboard/solo/${contextId}`; 
  }

  // --- CASE 3: LAW FIRM ---
  if (org_type === "FIRM") {
     const isAdmin = user_roles.includes("FIRM_ADMIN");
     const isLawyer = user_roles.includes("FIRM_LAWYER") || user_roles.includes("LAWYER");
     const isAssistant = user_roles.includes("ASSISTANT");
     const isTarik = user_roles.includes("TARIK") || user_roles.includes("CLERK");

     // Pattern: /dashboard/firm/[org_id]/[role]/[user_id]
     if (isAdmin) return `/dashboard/firm/${contextId}/admin/${userId}`;
     
     if (isLawyer) return `/dashboard/firm/${contextId}/lawyer/${userId}`;
     
     if (isAssistant) return `/dashboard/firm/${contextId}/assist/${userId}`;
     
     if (isTarik) return `/dashboard/firm/${contextId}/tarik/${userId}`;
  }

  return "/dashboard"; 
}
