export interface User {
  id: string;
  org_name: "string";
  org_type: "SOLO" | "FIRM";
  user_email: string;
  user_name: string;
  user_roles: string[];
}
