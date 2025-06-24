"use client";

import { useEffect, useState, useCallback, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  HelpCircle,
  Loader2,
  Paperclip,
  Send,
  X,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User } from "@/types/user";

interface FormState {
  supportType: string;
  message: string;
  attachmentUrl: string;
  preferredContact: "email" | "whatsapp";
  userEmail: string;
  userWhatsapp: string;
}

interface SupportDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
}

interface FormErrors {
  supportType?: string;
  message?: string;
  userEmail?: string;
  userWhatsapp?: string;
}

// Constants
const SUPPORT_TYPES = [
  { value: "technical", label: "Technical Issue" },
  { value: "billing", label: "Billing Question" },
  { value: "suggestion", label: "Improvement Suggestion" },
  { value: "other", label: "Other" },
] as const;

const CONTACT_METHODS = [
  { value: "email", label: "E-mail" },
  { value: "whatsapp", label: "WhatsApp" },
] as const;

const INITIAL_FORM_STATE: FormState = {
  supportType: "",
  message: "",
  attachmentUrl: "",
  preferredContact: "email",
  userEmail: "",
  userWhatsapp: "",
};

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export default function SupportDialog({
  isOpen,
  onOpenChange,
  user,
}: SupportDialogProps) {
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM_STATE);
  const [submitting, setSubmitting] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [uploadError, setUploadError] = useState<string>("");

  // Reset form when dialog closes
  useEffect(() => {
    if (!isOpen) {
      setSubmitSuccess(false);
      setFormState(INITIAL_FORM_STATE);
      setErrors({});
      setUploadError("");
      return;
    }

    // Pre-populate email if user is logged in
    if (user?.email) {
      setFormState((prev) => ({ ...prev, userEmail: user.email }));
    }
  }, [isOpen, user?.email]);

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {};

    if (!formState.supportType) {
      newErrors.supportType = "Please select a support type";
    }

    if (!formState.message.trim()) {
      newErrors.message = "Please provide a message";
    } else if (formState.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters long";
    }

    if (formState.preferredContact === "email") {
      if (!formState.userEmail) {
        newErrors.userEmail = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.userEmail)) {
        newErrors.userEmail = "Please enter a valid email address";
      }
    }

    if (formState.preferredContact === "whatsapp") {
      if (!formState.userWhatsapp) {
        newErrors.userWhatsapp = "WhatsApp number is required";
      } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formState.userWhatsapp)) {
        newErrors.userWhatsapp = "Please enter a valid WhatsApp number";
      }
    }

    return newErrors;
  }, [formState]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormState((prev) => ({ ...prev, [name]: value }));

      // Clear error for this field when user starts typing
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const handleSelectChange = useCallback(
    (name: keyof FormState, value: string) => {
      setFormState((prev) => ({ ...prev, [name]: value }));

      // Clear error for this field
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const validateFile = useCallback((file: File): string | null => {
    if (file.size > MAX_FILE_SIZE) {
      return "File size must be less than 10MB";
    }

    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
      return "File type not supported. Please upload images, PDFs, or documents.";
    }

    return null;
  }, []);

  const handleFileUpload = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const validationError = validateFile(file);
      if (validationError) {
        setUploadError(validationError);
        e.target.value = ""; // Clear the input
        return;
      }

      setFileUploading(true);
      setUploadError("");

      try {
        // Simulate file upload - replace with actual implementation
        await new Promise((resolve) => setTimeout(resolve, 2000));
        const mockUrl = `https://example.com/uploads/${file.name}`;
        setFormState((prev) => ({ ...prev, attachmentUrl: mockUrl }));
      } catch (error) {
        console.error("Error uploading attachment:", error);
        setUploadError("Failed to upload file. Please try again.");
      } finally {
        setFileUploading(false);
      }
    },
    [validateFile]
  );

  const removeAttachment = useCallback(() => {
    setFormState((prev) => ({ ...prev, attachmentUrl: "" }));
    setUploadError("");
  }, []);

  const buildEmailBody = useCallback((): string => {
    let emailBody = `
      <h2>New Support Request - Ekonavi Platform</h2>
      <p><strong>Support Type:</strong> ${formState.supportType}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${formState.message}</p>
    `;

    if (formState.attachmentUrl) {
      emailBody += `<p><strong>Attachment:</strong> <a href="${formState.attachmentUrl}">${formState.attachmentUrl}</a></p>`;
    }

    emailBody += `<hr>`;
    emailBody += `<p><strong>Preferred Contact:</strong> ${formState.preferredContact}</p>`;

    if (user) {
      emailBody += `<p><strong>User:</strong> ${user.full_name} (${user.email})</p>`;
    } else if (formState.userEmail) {
      emailBody += `<p><strong>Email Provided:</strong> ${formState.userEmail}</p>`;
    }

    if (formState.preferredContact === "whatsapp" && formState.userWhatsapp) {
      emailBody += `<p><strong>WhatsApp Provided:</strong> ${formState.userWhatsapp}</p>`;
    }

    return emailBody;
  }, [formState, user]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      const formErrors = validateForm();
      if (Object.keys(formErrors).length > 0) {
        setErrors(formErrors);
        return;
      }

      setSubmitting(true);
      setSubmitSuccess(false);

      try {
        const emailBody = buildEmailBody();

        // Simulate email sending - replace with actual implementation
        await new Promise((resolve) => setTimeout(resolve, 1500));

        /* Replace with actual email service
        await SendEmail({
          to: "contato@ekonsc.com.br",
          subject: `Ekonavi Support: ${formState.supportType} ${
            user ? `- ${user.full_name}` : ""
          }`,
          body: emailBody,
          from_name: "Ekonavi Platform",
        });
        */

        setSubmitSuccess(true);

        // Auto-close dialog after success
        setTimeout(() => {
          onOpenChange(false);
        }, 3000);
      } catch (error) {
        console.error("Error submitting support form:", error);
        setErrors({ message: "Failed to send request. Please try again." });
      } finally {
        setSubmitting(false);
      }
    },
    [formState, validateForm, buildEmailBody, user, onOpenChange]
  );

  const isFormValid = useMemo(() => {
    return (
      formState.supportType &&
      formState.message.trim().length >= 10 &&
      ((formState.preferredContact === "email" && formState.userEmail) ||
        (formState.preferredContact === "whatsapp" && formState.userWhatsapp))
    );
  }, [formState]);

  const attachmentFileName = useMemo(() => {
    if (!formState.attachmentUrl) return "";
    return formState.attachmentUrl.split("/").pop() || "";
  }, [formState.attachmentUrl]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-500" aria-hidden="true" />
            Help Center
          </DialogTitle>
          <DialogDescription>
            Describe your issue or question so we can better assist you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          {/* Support Type */}
          <div className="grid gap-2">
            <Label htmlFor="supportType">
              Support Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formState.supportType}
              onValueChange={(value) =>
                handleSelectChange("supportType", value)
              }
            >
              <SelectTrigger
                className={`w-full ${
                  errors.supportType ? "border-red-500" : ""
                }`}
                aria-describedby={
                  errors.supportType ? "supportType-error" : undefined
                }
              >
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                {SUPPORT_TYPES.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.supportType && (
              <p id="supportType-error" className="text-sm text-red-500">
                {errors.supportType}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="grid gap-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Describe your issue or question here... (minimum 10 characters)"
              value={formState.message}
              onChange={handleInputChange}
              rows={5}
              className={errors.message ? "border-red-500" : ""}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            <div className="flex justify-between items-center">
              {errors.message && (
                <p id="message-error" className="text-sm text-red-500">
                  {errors.message}
                </p>
              )}
              <p className="text-sm text-gray-500 ml-auto">
                {formState.message.length}/1000
              </p>
            </div>
          </div>

          {/* File Attachment */}
          <div className="grid gap-2">
            <Label htmlFor="attachment" className="flex items-center gap-2">
              <Paperclip className="w-4 h-4" aria-hidden="true" />
              Attach file (optional)
            </Label>
            <Input
              id="attachment"
              type="file"
              onChange={handleFileUpload}
              disabled={fileUploading}
              accept=".jpg,.jpeg,.png,.gif,.pdf,.doc,.docx,.txt"
              className="cursor-pointer"
            />

            {uploadError && (
              <Alert variant="destructive">
                <AlertDescription>{uploadError}</AlertDescription>
              </Alert>
            )}

            {fileUploading && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Loader2 className="animate-spin w-4 h-4" />
                Uploading file...
              </div>
            )}

            {formState.attachmentUrl && (
              <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded-md">
                <div className="flex items-center gap-2">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="text-sm truncate max-w-[200px]">
                    {attachmentFileName}
                  </span>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeAttachment}
                  className="h-6 w-6 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Contact Method */}
          <div className="grid gap-2">
            <Label htmlFor="preferredContact">Preferred Contact Method</Label>
            <Select
              value={formState.preferredContact}
              onValueChange={(value) =>
                handleSelectChange(
                  "preferredContact",
                  value as "email" | "whatsapp"
                )
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CONTACT_METHODS.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Email Field */}
          <div className="grid gap-2">
            <Label htmlFor="userEmail">
              Your E-mail{" "}
              {formState.preferredContact === "email" && (
                <span className="text-red-500">*</span>
              )}
            </Label>
            <Input
              id="userEmail"
              name="userEmail"
              type="email"
              placeholder="youremail@example.com"
              value={formState.userEmail}
              onChange={handleInputChange}
              className={errors.userEmail ? "border-red-500" : ""}
              aria-describedby={
                errors.userEmail ? "userEmail-error" : undefined
              }
            />
            {errors.userEmail && (
              <p id="userEmail-error" className="text-sm text-red-500">
                {errors.userEmail}
              </p>
            )}
          </div>

          {/* WhatsApp Field */}
          {formState.preferredContact === "whatsapp" && (
            <div className="grid gap-2">
              <Label htmlFor="userWhatsapp">
                Your WhatsApp <span className="text-red-500">*</span>
              </Label>
              <Input
                id="userWhatsapp"
                name="userWhatsapp"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={formState.userWhatsapp}
                onChange={handleInputChange}
                className={errors.userWhatsapp ? "border-red-500" : ""}
                aria-describedby={
                  errors.userWhatsapp ? "userWhatsapp-error" : undefined
                }
              />
              {errors.userWhatsapp && (
                <p id="userWhatsapp-error" className="text-sm text-red-500">
                  {errors.userWhatsapp}
                </p>
              )}
            </div>
          )}
        </form>

        <DialogFooter>
          {submitSuccess ? (
            <div className="flex items-center text-green-600 gap-2">
              <CheckCircle className="w-5 h-5" />
              <span>Request sent successfully!</span>
            </div>
          ) : (
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={submitting || fileUploading || !isFormValid}
              className="w-full sm:w-auto"
            >
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Request
                </>
              )}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
