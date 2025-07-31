import { Request, Response } from "express";
import { Quote } from "../models/quote.model";

// Get all (with pagination)
export const getQuotes = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 100;
  const skip = (page - 1) * limit;

  try {
    const quotes = await Quote.find().skip(skip).limit(limit);
    const total = await Quote.countDocuments();
    res.json({ page, total, quotes });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
// Get (random quote)
export const getRandomQuote = async (req: Request, res: Response) => {
  try {
    const [randomQuote] = await Quote.aggregate([{ $sample: { size: 1 } }]);
    if (randomQuote) {
      res.json(randomQuote);
    } else {
      res.status(404).json({ message: "No quotes found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Post (create quote)
export const addQuote = async (req: Request, res: Response) => {
  const { text, author }: { text: string; author: string } = req.body;
  try {
    const quote = new Quote({ text: text?.trim(), author });
    await quote.save();
    res.status(201).json(quote);
  } catch (err) {
    res.status(400).json({ message: "Bad Request" });
  }
};

// Bulk insert for  quotes
export const bulkInsert = async (req: Request, res: Response) => {
  const { quotes } = req.body;

  try {
    const result = await Quote.insertMany(quotes, {
      ordered: false, 
    });

    res.json({
      message: `${result.length} quotes inserted successfully.`,
      insertedCount: result.length,
    });
  } catch (err: any) {
    console.error("Bulk insert error:", err?.writeErrors?.length || err);
    const inserted = err?.result?.result?.nInserted || 0;
    res.status(207).json({
      message: `Partial insert: ${inserted} quotes inserted. Duplicates skipped.`,
      insertedCount: inserted,
    });
  }
};
