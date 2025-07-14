export declare class AuthService {
    static registerUser(data: {
        name: string;
        email: string;
        password: string;
        phone?: string;
    }): Promise<{
        success: boolean;
        user: {
            id: string;
            name: string;
            email: string;
        };
        token: string;
        error?: never;
    } | {
        success: boolean;
        error: string;
        user?: never;
        token?: never;
    }>;
    static sendLoginOTP(email: string): Promise<{
        success: boolean;
        error: string;
        message?: never;
    } | {
        success: boolean;
        message: string;
        error?: never;
    }>;
    static verifyOTP(email: string, otp: string): Promise<{
        success: boolean;
        error: string;
        user?: never;
        token?: never;
    } | {
        success: boolean;
        user: {
            id: string;
            name: string;
            email: string;
        };
        token: string;
        error?: never;
    }>;
    static loginUser(email: string, password: string): Promise<{
        success: boolean;
        user: {
            id: string;
            name: string;
            email: string;
        };
        token: string;
        error?: never;
    } | {
        success: boolean;
        error: string;
        user?: never;
        token?: never;
    }>;
}
//# sourceMappingURL=auth.service.d.ts.map