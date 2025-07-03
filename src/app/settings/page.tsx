"use client";

import SupportDialog from "@/components/common/SupportDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/constants/languages";
import useTheme from "@/hooks/useTheme";
import { useUser } from "@/hooks/useUser";
import {
  Bell,
  Globe,
  HelpCircle,
  Moon,
  Palette,
  Shield,
  Sun,
} from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [isSupportDialogOpen, setIsSupportDialogOpen] = useState(false);
  const [language, setLanguage] = useState("en");
  const { user } = useUser();
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme as "light" | "dark");
  };

  const handleLanguageChange = async (newLanguage: string) => {
    setLanguage(newLanguage);
    // if (user) {
    //   try {
    //     await user.updateMyUserData({ preferred_language: newLanguage });
    //   } catch (error) {
    //     console.error("Failed to update language:", error);
    //   }
    // }
  };

  return (
    <>
      <SupportDialog
        isOpen={isSupportDialogOpen}
        onOpenChange={setIsSupportDialogOpen}
      />
      <div className="max-w-3xl mx-auto py-8 px-4">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Preferences
              </CardTitle>
              <CardDescription>
                Choose your theme to suit your mood.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  {theme === "dark" ? (
                    <Moon className="h-5 w-5" />
                  ) : (
                    <Sun className="h-5 w-5" />
                  )}
                  <div>
                    <h3 className="font-medium">Theme</h3>
                    <p className="text-sm text-muted-foreground">
                      Select your preferred appearance
                    </p>
                  </div>
                </div>
                <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    {/* <SelectItem value="system">System</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5" />
                  <div>
                    <h3 className="font-medium">Language</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose your preferred language
                    </p>
                  </div>
                </div>
                <Select value={language} onValueChange={handleLanguageChange}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        <span className="flex items-center gap-2">
                          <span>{lang.flag}</span>
                          <span>{lang.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your account settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your notification preferences.
                  </p>
                </div>
                <Button variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Privacy & Security</h3>
                  <p className="text-sm text-muted-foreground">
                    Control your privacy and account security.
                  </p>
                </div>
                <Button variant="outline">
                  <Shield className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Help & Support</CardTitle>
              <CardDescription>Need assistance? Find it here.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h3 className="font-medium">Help & Feedback</h3>
                  <p className="text-sm text-muted-foreground">
                    Contact support or provide feedback.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsSupportDialogOpen(true)}
                >
                  <HelpCircle className="w-4 h-4 mr-2" />
                  Open
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
