import { User } from "@/types/user";
import axios from "axios";

export async function getUser(token?: string): Promise<User | null> {
  try {
    const res = await axios.get<User>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/me`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true,
      }
    );

    return res.data;
  } catch (err: any) {
    if (err.response?.status === 401) {
      return null;
    }
    throw err;
  }
}
