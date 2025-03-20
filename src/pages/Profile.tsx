
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, User, Camera, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  bio: z.string().optional(),
  petName: z.string().optional(),
  petType: z.string().optional(),
  petBreed: z.string().optional(),
});

const Profile = () => {
  const { user, updateUserProfile, isLoading } = useAuth();
  const [isSaving, setIsSaving] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      bio: user?.bio || "",
      petName: user?.petName || "",
      petType: user?.petType || "",
      petBreed: user?.petBreed || "",
    },
  });
  
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSaving(true);
    try {
      await updateUserProfile(values);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <RefreshCw className="h-10 w-10 text-pawlingo-primary animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 py-24 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-pawlingo-primary hover:text-pawlingo-secondary mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          
          <Card className="bg-white shadow-md">
            <CardHeader>
              <CardTitle className="text-3xl font-display text-pawlingo-dark">Your Profile</CardTitle>
              <CardDescription>
                Manage your account details and pet information
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-pawlingo-light">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-pawlingo-light">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.name} />
                    ) : (
                      <AvatarFallback className="bg-pawlingo-primary/10 text-pawlingo-primary text-xl">
                        <User />
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <Button variant="outline" size="icon" className="absolute bottom-0 right-0 rounded-full bg-white">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="text-center md:text-left">
                  <h2 className="text-xl font-medium text-pawlingo-dark">{user?.name}</h2>
                  {user?.email && <p className="text-pawlingo-muted">{user.email}</p>}
                  <div className="mt-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pawlingo-primary/10 text-pawlingo-primary">
                      {user?.authProvider === 'google' ? 'Google Account' : user?.authProvider === 'metamask' ? 'MetaMask Wallet' : 'Email Account'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Wallet Address (for MetaMask users) */}
              {user?.walletAddress && (
                <div className="p-4 rounded-lg bg-pawlingo-light/20">
                  <p className="text-sm text-pawlingo-muted">Connected Wallet</p>
                  <p className="font-mono text-sm break-all">
                    {user.walletAddress}
                  </p>
                </div>
              )}
              
              {/* Profile Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us a little about yourself and your pets..." 
                            className="resize-none" 
                            rows={4} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-6 border-t border-pawlingo-light">
                    <h3 className="text-lg font-medium text-pawlingo-dark mb-4">Pet Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <FormField
                        control={form.control}
                        name="petName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pet Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Buddy" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="petType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pet Type</FormLabel>
                            <FormControl>
                              <Input placeholder="Dog, cat, etc." {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="petBreed"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Pet Breed</FormLabel>
                            <FormControl>
                              <Input placeholder="Golden Retriever" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <CardFooter className="flex justify-end px-0">
                    <Button 
                      type="submit" 
                      className="rounded-full bg-gradient-to-r from-pawlingo-primary to-pawlingo-secondary text-white"
                      disabled={isSaving}
                    >
                      {isSaving ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4 mr-2" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
