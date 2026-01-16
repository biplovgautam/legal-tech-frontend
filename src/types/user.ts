export interface User {
    id: number;
    org_name: string;
    org_type: "SOLO" | "FIRM" | "TARIK" | "NONE" | null;
    org_id: number | null; 
    user_email: string;
    user_name: string;
    user_roles: string[];
    primary_profession: string;
}
