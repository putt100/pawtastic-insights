
import { useToast } from "@/hooks/use-toast";

const API_KEY = ""; // User will need to input their OpenAI API key

export interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface ImageMessage extends Message {
  content: string;
  imageUrl?: string; 
}

export type ChatMessage = Message | ImageMessage;

export const useOpenAiService = () => {
  const { toast } = useToast();
  
  const sendMessage = async (messages: ChatMessage[], apiKey: string = API_KEY): Promise<string> => {
    if (!apiKey) {
      toast({
        title: "API Key Missing",
        description: "Please enter your OpenAI API key in the settings",
        variant: "destructive",
      });
      return "Error: API key is missing. Please provide your OpenAI API key in the settings.";
    }

    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini", // Using GPT-4o mini as default model
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast({
          title: "API Error",
          description: errorData.error?.message || "Error connecting to OpenAI",
          variant: "destructive",
        });
        return `Error: ${errorData.error?.message || "Error connecting to OpenAI"}`;
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error calling OpenAI API:", error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to OpenAI. Please check your internet connection.",
        variant: "destructive",
      });
      return "Error: Failed to connect to OpenAI. Please check your internet connection.";
    }
  };

  return { sendMessage };
};
