
// OpenAI API integration for PawLingo AI
import { toast } from "sonner";

// OpenAI API configurations
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-4o"; // Using OpenAI's latest model

interface OpenAIMessage {
  role: "system" | "user" | "assistant";
  content: string | Array<{
    type: "text" | "image_url";
    text?: string;
    image_url?: {
      url: string;
    };
  }>;
}

interface OpenAIRequestBody {
  model: string;
  messages: OpenAIMessage[];
  temperature?: number;
  max_tokens?: number;
}

interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// Function to process text-based questions about pets
export const analyzeTextQuery = async (
  userMessage: string,
  apiKey: string
): Promise<string> => {
  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: 
        "You are PawLingo AI, a helpful pet communication assistant. You specialize in understanding pet behavior, health, and training. Provide accurate, compassionate, and concise advice about pets. Focus on dogs and cats primarily. Always be supportive and provide actionable advice when possible. Keep responses focused and relevant to pet care."
    },
    {
      role: "user",
      content: userMessage
    }
  ];

  try {
    const response = await sendOpenAIRequest(messages, apiKey);
    return response;
  } catch (error) {
    console.error("Error analyzing text query:", error);
    throw error;
  }
};

// Function to analyze pet images with text descriptions
export const analyzePetImage = async (
  imageBase64: string,
  userMessage: string,
  apiKey: string
): Promise<string> => {
  // For image analysis, we need to use multi-modal capabilities
  const messages: OpenAIMessage[] = [
    {
      role: "system",
      content: 
        "You are PawLingo AI, a pet image analysis specialist. Analyze the provided pet image and offer insights about the pet's likely behavior, mood, health indicators, and breed characteristics visible in the image. Be observant of body language, facial expressions, and environmental context. Provide helpful and accurate information based only on what can be observed in the image."
    },
    {
      role: "user",
      content: [
        {
          type: "image_url",
          image_url: {
            url: imageBase64
          }
        },
        {
          type: "text",
          text: userMessage || "What can you tell me about this pet? Please analyze its behavior, mood, and any notable physical characteristics."
        }
      ]
    }
  ];

  try {
    const response = await sendOpenAIRequest(messages, apiKey);
    return response;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};

// Common function to send requests to OpenAI API
const sendOpenAIRequest = async (
  messages: OpenAIMessage[],
  apiKey: string
): Promise<string> => {
  if (!apiKey) {
    throw new Error("OpenAI API key is missing");
  }

  const requestBody: OpenAIRequestBody = {
    model: OPENAI_MODEL,
    messages: messages,
    temperature: 0.7,
    max_tokens: 1000
  };

  try {
    const response = await fetch(OPENAI_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `OpenAI API error: ${errorData.error?.message || response.statusText}`
      );
    }

    const data: OpenAIResponse = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API request failed:", error);
    throw error;
  }
};
