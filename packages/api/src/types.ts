declare global {
  namespace Express {
    interface Request {
      companyId: string;
      userId: string;
    }
  }
}

export {};
