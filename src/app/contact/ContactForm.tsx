"use client";

import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm({
  form_title,
  form_description,
}: {
  form_title: string;
  form_description: string;
}) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear success/error messages when user starts typing again
    if (submitSuccess || submitError) {
      setSubmitSuccess(false);
      setSubmitError(null);
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      topic: value,
    }));

    // Clear success/error messages when user starts typing again
    if (submitSuccess || submitError) {
      setSubmitSuccess(false);
      setSubmitError(null);
    }
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate topic selection
    if (!formData.topic) {
      setSubmitError("Please select a service.");
      return;
    }

    // Verify reCAPTCHA
    if (!recaptchaToken) {
      setSubmitError("Please complete the reCAPTCHA verification.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Use environment variable for API URL
      const apiUrl = process.env.NEXT_PUBLIC_EMAIL_GATEWAY_HANDLER_URL || "";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          recaptchaToken,
        }),
      });

      console.log("response", response);

      const data = await response.json();

      console.log("data", data);

      if (response.ok && data.success) {
        setSubmitSuccess(true);
        // Reset form after successful submission
        setFormData({
          firstname: "",
          lastname: "",
          email: "",
          phone: "",
          topic: "",
          message: "",
        });
        // Reset reCAPTCHA
        if (recaptchaRef.current) {
          recaptchaRef.current.reset();
        }
        setRecaptchaToken(null);
      } else {
        setSubmitError(
          data.message || "Failed to send message. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(
        "Network error. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl"
      onSubmit={handleSubmit}
    >
      <h3 className="text-4xl text-accent">{form_title}</h3>
      <p className="text-white/60">{form_description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          type="text"
          name="firstname"
          placeholder="Firstname"
          value={formData.firstname}
          onChange={handleChange}
          autoComplete="given-name"
          required
          disabled={isSubmitting}
        />
        <Input
          type="text"
          name="lastname"
          placeholder="Lastname"
          value={formData.lastname}
          onChange={handleChange}
          autoComplete="family-name"
          required
          disabled={isSubmitting}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
          disabled={isSubmitting}
        />
        <Input
          type="tel"
          placeholder="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          autoComplete="tel"
          required
          disabled={isSubmitting}
        />
      </div>
      <Select value={formData.topic} onValueChange={handleSelectChange} disabled={isSubmitting}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a service" />
        </SelectTrigger>
        <SelectContent className="bg-[#27272c]">
          <SelectGroup>
            <SelectLabel>Select a service</SelectLabel>
            <SelectItem value="web">Web Development</SelectItem>
            <SelectItem value="app">App Development</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Textarea
        className="h-[200px]"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        disabled={isSubmitting}
        placeholder="Type your message here..."
      />

      <div className="recaptcha-container">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
          onChange={handleRecaptchaChange}
        />
      </div>

      <Button
        size="md"
        className="max-w-40"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send message"}
      </Button>

      {/* Success Message */}
      {submitSuccess && (
        <div className="p-4 bg-green-500/10 border border-green-500 rounded-lg">
          <p className="text-green-500 font-semibold">
            ✓ Message sent successfully!
          </p>
          <p className="text-green-500/80 text-sm mt-1">
            Thank you for reaching out. I&apos;ll get back to you soon.
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitError && (
        <div className="p-4 bg-red-500/10 border border-red-500 rounded-lg">
          <p className="text-red-500 font-semibold">✗ Error</p>
          <p className="text-red-500/80 text-sm mt-1">{submitError}</p>
        </div>
      )}
    </form>
  );
}
