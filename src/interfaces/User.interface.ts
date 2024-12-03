interface User {
    email: string;
    user_id: string | number;
    fullname: string;
    phone: string | null;
    permission: "admin" | "standard";
    ip: string;
    email_confirmed: boolean | 0 | 1;
}

export default User