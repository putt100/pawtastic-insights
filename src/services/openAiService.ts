
import { toast } from "sonner";

interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string | Array<any>;
}

interface OpenAIResponse {
  choices: {
    message: OpenAIMessage;
    index: number;
    finish_reason: string;
  }[];
}

// This should be replaced with your actual OpenAI API key
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY";

export const analyzeWithOpenAI = async (
  prompt: string,
  imageFile?: File,
  apiKey?: string
): Promise<string> => {
  const activeKey = OPENAI_API_KEY;
  
  if (!activeKey) {
    toast.error("OpenAI API key is not configured");
    return "";
  }

  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: "You are PawLingo AI, an expert in pet communication and behavior analysis. Provide detailed, helpful analysis of pet emotions, body language, and needs. Always be warm, friendly and educational in your responses."
    }
  ];

  // If there's an image file, prepare it for the API request
  if (imageFile) {
    const base64Image = await fileToBase64(imageFile);
    messages.push({
      role: "user",
      content: [
        { type: "text", text: prompt || "What can you tell me about this pet? Analyze their body language and emotional state." },
        { type: "image_url", image_url: { url: base64Image } }
      ]
    });
  } else {
    messages.push({
      role: "user",
      content: prompt
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${activeKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // Using the latest model that supports vision
        messages,
        max_tokens: 1000,
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      toast.error(error.error?.message || "Error connecting to OpenAI");
      return "";
    }

    const data = await response.json() as OpenAIResponse;
    return data.choices[0].message.content as string;
  } catch (error) {
    console.error("Error analyzing with OpenAI:", error);
    toast.error("Failed to connect to OpenAI. Please try again.");
    return "";
  }
};

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to convert file to base64"));
      }
    };
    reader.onerror = error => reject(error);
  });
};
