export const testMiddleware = (req: any, res: any, next: any) => {
  try {
    console.log("Test middleware called successfully!");

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};