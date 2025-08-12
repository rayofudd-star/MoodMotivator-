import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all emotions
  app.get("/api/emotions", async (req, res) => {
    try {
      const emotions = await storage.getAllEmotions();
      res.json(emotions);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch emotions" });
    }
  });

  // Get quotes by emotion
  app.get("/api/quotes/:emotion", async (req, res) => {
    try {
      const { emotion } = req.params;
      const quotes = await storage.getQuotesByEmotion(emotion);
      
      if (quotes.length === 0) {
        return res.status(404).json({ message: "No quotes found for this emotion" });
      }
      
      res.json(quotes);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch quotes" });
    }
  });

  // Get a random quote for an emotion (excluding recently used ones)
  app.post("/api/quotes/:emotion/random", async (req, res) => {
    try {
      const { emotion } = req.params;
      const { excludeIds = [] } = req.body;
      
      const allQuotes = await storage.getQuotesByEmotion(emotion);
      
      if (allQuotes.length === 0) {
        return res.status(404).json({ message: "No quotes found for this emotion" });
      }
      
      // Filter out excluded quotes
      let availableQuotes = allQuotes.filter(quote => !excludeIds.includes(quote.id));
      
      // If all quotes have been used, reset the pool
      if (availableQuotes.length === 0) {
        availableQuotes = allQuotes;
      }
      
      // Select a random quote
      const randomIndex = Math.floor(Math.random() * availableQuotes.length);
      const selectedQuote = availableQuotes[randomIndex];
      
      res.json(selectedQuote);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch random quote" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
