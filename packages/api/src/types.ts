declare global {
  namespace Express {
    interface Request {
      companyId: string;
      userId: string;
      rawBody?: Buffer;
    }
  }
}

export {};
