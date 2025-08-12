import { type User, type InsertUser, type Quote, type InsertQuote, type Emotion, type InsertEmotion } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Quote operations
  getQuotesByEmotion(emotion: string): Promise<Quote[]>;
  createQuote(quote: InsertQuote): Promise<Quote>;
  getAllQuotes(): Promise<Quote[]>;
  
  // Emotion operations
  getAllEmotions(): Promise<Emotion[]>;
  createEmotion(emotion: InsertEmotion): Promise<Emotion>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private quotes: Map<string, Quote>;
  private emotions: Map<string, Emotion>;

  constructor() {
    this.users = new Map();
    this.quotes = new Map();
    this.emotions = new Map();
    
    // Initialize with default emotions and quotes
    this.initializeData();
  }

  private async initializeData() {
    // Initialize emotions
    const defaultEmotions: InsertEmotion[] = [
      { id: "happy", name: "happy", icon: "😊", displayName: "Happy" },
      { id: "sad", name: "sad", icon: "😢", displayName: "Sad" },
      { id: "anxious", name: "anxious", icon: "😰", displayName: "Anxious" },
      { id: "motivated", name: "motivated", icon: "💪", displayName: "Motivated" },
      { id: "stressed", name: "stressed", icon: "😫", displayName: "Stressed" },
      { id: "grateful", name: "grateful", icon: "🙏", displayName: "Grateful" },
      { id: "confident", name: "confident", icon: "✨", displayName: "Confident" },
      { id: "overwhelmed", name: "overwhelmed", icon: "🌪️", displayName: "Overwhelmed" },
      { id: "hopeful", name: "hopeful", icon: "🌅", displayName: "Hopeful" },
      { id: "peaceful", name: "peaceful", icon: "🕊️", displayName: "Peaceful" },
    ];

    for (const emotion of defaultEmotions) {
      await this.createEmotion(emotion);
    }

    // Initialize quotes
    const defaultQuotes: InsertQuote[] = [
      // Happy quotes
      { text: "Happiness is not something ready-made. It comes from your own actions.", author: "Dalai Lama", emotion: "happy" },
      { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", emotion: "happy" },
      { text: "Happiness is when what you think, what you say, and what you do are in harmony.", author: "Mahatma Gandhi", emotion: "happy" },
      { text: "Very little is needed to make a happy life; it is all within yourself, in your way of thinking.", author: "Marcus Aurelius", emotion: "happy" },
      { text: "Count your age by friends, not years. Count your life by smiles, not tears.", author: "John Lennon", emotion: "happy" },
      
      // Sad quotes
      { text: "The wound is the place where the Light enters you.", author: "Rumi", emotion: "sad" },
      { text: "Sadness flies away on the wings of time.", author: "Jean de La Fontaine", emotion: "sad" },
      { text: "The way sadness works is one of the strange riddles of the world.", author: "Lemony Snicket", emotion: "sad" },
      { text: "Tears are words that need to be written.", author: "Paulo Coelho", emotion: "sad" },
      { text: "Heavy hearts, like heavy clouds in the sky, are best relieved by the letting of a little water.", author: "Christopher Morley", emotion: "sad" },
      
      // Anxious quotes
      { text: "You have been assigned this mountain to show others it can be moved.", author: "Mel Robbins", emotion: "anxious" },
      { text: "Anxiety is the dizziness of freedom.", author: "Søren Kierkegaard", emotion: "anxious" },
      { text: "Nothing diminishes anxiety faster than action.", author: "Walter Anderson", emotion: "anxious" },
      { text: "Worry does not empty tomorrow of its sorrow, it empties today of its strength.", author: "Corrie Ten Boom", emotion: "anxious" },
      { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne", emotion: "anxious" },
      
      // Motivated quotes
      { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", emotion: "motivated" },
      { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", emotion: "motivated" },
      { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", emotion: "motivated" },
      { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", emotion: "motivated" },
      { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", emotion: "motivated" },
      
      // Stressed quotes
      { text: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius", emotion: "stressed" },
      { text: "Stress is caused by being 'here' but wanting to be 'there'.", author: "Eckhart Tolle", emotion: "stressed" },
      { text: "The greatest weapon against stress is our ability to choose one thought over another.", author: "William James", emotion: "stressed" },
      { text: "Take time to make your soul happy.", author: "Unknown", emotion: "stressed" },
      { text: "Sometimes the most productive thing you can do is relax.", author: "Mark Black", emotion: "stressed" },
      
      // Grateful quotes
      { text: "Gratitude is not only the greatest of virtues but the parent of all others.", author: "Cicero", emotion: "grateful" },
      { text: "Be thankful for what you have; you'll end up having more.", author: "Oprah Winfrey", emotion: "grateful" },
      { text: "Gratitude makes sense of our past, brings peace for today, and creates a vision for tomorrow.", author: "Melody Beattie", emotion: "grateful" },
      { text: "The unthankful heart discovers no mercies; but the thankful heart will find, in every hour, some heavenly blessings.", author: "Henry Ward Beecher", emotion: "grateful" },
      { text: "Reflect upon your present blessings, of which every man has many - not on your past misfortunes, of which all men have some.", author: "Charles Dickens", emotion: "grateful" },
      
      // Confident quotes
      { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", emotion: "confident" },
      { text: "Confidence is not 'they will like me'. Confidence is 'I'll be fine if they don't'.", author: "Christina Grimmie", emotion: "confident" },
      { text: "You are braver than you believe, stronger than you seem, and smarter than you think.", author: "A.A. Milne", emotion: "confident" },
      { text: "With confidence, you have won before you have started.", author: "Marcus Garvey", emotion: "confident" },
      { text: "The most beautiful thing you can wear is confidence.", author: "Blake Lively", emotion: "confident" },
      
      // Overwhelmed quotes
      { text: "You don't have to see the whole staircase, just take the first step.", author: "Martin Luther King Jr.", emotion: "overwhelmed" },
      { text: "One day at a time—this is enough. Do not look back and grieve over the past for it is gone.", author: "John Newton", emotion: "overwhelmed" },
      { text: "Sometimes the most important thing in a whole day is the rest we take between two deep breaths.", author: "Etty Hillesum", emotion: "overwhelmed" },
      { text: "Progress, not perfection.", author: "Unknown", emotion: "overwhelmed" },
      { text: "You have survived 100% of your worst days. You're doing great.", author: "Unknown", emotion: "overwhelmed" },
      
      // Hopeful quotes
      { text: "Hope is the thing with feathers that perches in the soul.", author: "Emily Dickinson", emotion: "hopeful" },
      { text: "Everything you need is inside you – you just need to access it.", author: "Buddha", emotion: "hopeful" },
      { text: "The darkest hour has only sixty minutes.", author: "Morris Mandel", emotion: "hopeful" },
      { text: "Hope is being able to see that there is light despite all of the darkness.", author: "Desmond Tutu", emotion: "hopeful" },
      { text: "Once you choose hope, anything's possible.", author: "Christopher Reeve", emotion: "hopeful" },
      
      // Peaceful quotes
      { text: "Peace comes from within. Do not seek it without.", author: "Buddha", emotion: "peaceful" },
      { text: "The quieter you become, the more able you are to hear.", author: "Rumi", emotion: "peaceful" },
      { text: "In the midst of winter, I found there was, within me, an invincible summer.", author: "Albert Camus", emotion: "peaceful" },
      { text: "Serenity is not freedom from the storm, but peace amid the storm.", author: "Unknown", emotion: "peaceful" },
      { text: "Peace is not absence of conflict, it is the ability to handle conflict by peaceful means.", author: "Ronald Reagan", emotion: "peaceful" },
    ];

    for (const quote of defaultQuotes) {
      await this.createQuote(quote);
    }
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Quote methods
  async getQuotesByEmotion(emotion: string): Promise<Quote[]> {
    return Array.from(this.quotes.values()).filter(
      (quote) => quote.emotion === emotion
    );
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = randomUUID();
    const quote: Quote = { ...insertQuote, id };
    this.quotes.set(id, quote);
    return quote;
  }

  async getAllQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  // Emotion methods
  async getAllEmotions(): Promise<Emotion[]> {
    return Array.from(this.emotions.values());
  }

  async createEmotion(insertEmotion: InsertEmotion): Promise<Emotion> {
    const emotion: Emotion = { ...insertEmotion };
    this.emotions.set(emotion.id, emotion);
    return emotion;
  }
}

export const storage = new MemStorage();
