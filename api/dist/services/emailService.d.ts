interface ContactEmailData {
    name: string;
    email: string;
    company?: string;
    phone?: string;
    projectType: string;
    budget: string;
    timeline: string;
    message: string;
    submittedAt: string;
    ip?: string | undefined;
}
interface AutoReplyData {
    name: string;
    email: string;
    projectType: string;
    language: string;
}
export declare const sendContactEmail: (data: ContactEmailData) => Promise<void>;
export declare const sendAutoReply: (data: AutoReplyData) => Promise<void>;
export {};
//# sourceMappingURL=emailService.d.ts.map