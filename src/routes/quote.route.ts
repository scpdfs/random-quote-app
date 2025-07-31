import { Router } from "express";
import {
  getQuotes,
  addQuote,
  bulkInsert,
} from "../controllers/quote.controller";
import { getRandomQuote } from "../controllers/quote.controller";
import { auth } from "../middlewares/auth.middleware";

const router = Router();

router.get("/quotes", getQuotes);
router.get("/quotes/random", getRandomQuote);
router.post("/quotes", auth, addQuote);
router.post("/quotes/bulk", auth, bulkInsert);

export default router;
