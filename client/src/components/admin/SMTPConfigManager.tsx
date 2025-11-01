import { useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Mail, Server, Lock, User, AtSign, CheckCircle2 } from "lucide-react";
import { smtpConfigSchema } from "@shared/schema";
import type { SMTPConfig } from "@shared/schema";

export default function SMTPConfigManager() {
  const { toast } = useToast();

  const form = useForm<SMTPConfig>({
    resolver: zodResolver(smtpConfigSchema),
    defaultValues: {
      host: "",
      port: 587,
      secure: false,
      username: "",
      password: "",
      fromEmail: "",
      fromName: "",
    },
  });

  const { data: smtpConfig, isLoading } = useQuery<SMTPConfig>({
    queryKey: ["/api/smtp-config"],
    queryFn: async () => {
      const response = await fetch("/api/smtp-config", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminSessionId")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch SMTP configuration");
      return response.json();
    },
  });

  useEffect(() => {
    if (smtpConfig) {
      form.reset(smtpConfig);
    }
  }, [smtpConfig, form]);

  const updateMutation = useMutation({
    mutationFn: (data: SMTPConfig) =>
      apiRequest("PUT", "/api/smtp-config", data, {
        Authorization: `Bearer ${localStorage.getItem("adminSessionId")}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/smtp-config"] });
      toast({
        title: "Success",
        description: "SMTP configuration saved successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to save SMTP configuration",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: SMTPConfig) => {
    updateMutation.mutate(data);
  };

  if (isLoading) {
    return <div className="p-8">Loading SMTP configuration...</div>;
  }

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">SMTP Configuration</h1>
        <p className="text-muted-foreground">
          Configure your email server settings to receive contact form submissions
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Server className="h-5 w-5 text-primary" />
              Server Settings
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="host"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Server className="h-4 w-4" />
                      SMTP Host
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="smtp.gmail.com"
                        {...field}
                        data-testid="input-smtp-host"
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      e.g., smtp.gmail.com, smtp.outlook.com
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="port"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Port</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="587"
                        {...field}
                        onChange={(e) => field.onChange(parseInt(e.target.value) || 587)}
                        data-testid="input-smtp-port"
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      Typically: 587 (TLS) or 465 (SSL)
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="secure"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <div className="flex items-center justify-between">
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Use SSL/TLS (Port 465)
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={(checked) => {
                          field.onChange(checked);
                          form.setValue("port", checked ? 465 : 587);
                        }}
                        data-testid="switch-smtp-secure"
                      />
                    </FormControl>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {field.value 
                      ? "SSL/TLS (port 465) - Connection is encrypted from start"
                      : "STARTTLS (port 587) - Connection starts unencrypted and upgrades to TLS"
                    }
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Authentication
            </h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Username / Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="your-email@gmail.com"
                        {...field}
                        data-testid="input-smtp-username"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="h-4 w-4" />
                      Password / App Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••••••••••"
                        {...field}
                        data-testid="input-smtp-password"
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      For Gmail, use an App Password (not your regular password)
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Sender Information
            </h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="fromEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <AtSign className="h-4 w-4" />
                      From Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="noreply@example.com"
                        {...field}
                        data-testid="input-smtp-from-email"
                      />
                    </FormControl>
                    <p className="text-xs text-muted-foreground">
                      This email will appear as the sender
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fromName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      From Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Portfolio Contact Form"
                        {...field}
                        data-testid="input-smtp-from-name"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Card>

          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                Contact form submissions will be sent to: <strong>{smtpConfig?.fromEmail || "Not configured"}</strong>
              </p>
            </div>
            <Button 
              type="submit" 
              disabled={updateMutation.isPending} 
              data-testid="button-save-smtp"
              className="px-8"
            >
              {updateMutation.isPending ? "Saving..." : "Save Configuration"}
            </Button>
          </div>
        </form>
      </Form>

      <Card className="p-6 mt-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
        <h3 className="text-lg font-semibold mb-2">Quick Setup Guides</h3>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Gmail:</strong>
            <ul className="ml-4 mt-1 space-y-1 text-muted-foreground">
              <li>• Host: smtp.gmail.com</li>
              <li>• Port: 587 (TLS) or 465 (SSL)</li>
              <li>• Enable 2-Step Verification in your Google Account</li>
              <li>• Generate an App Password: Google Account → Security → 2-Step Verification → App passwords</li>
              <li>• Use your email and the generated App Password</li>
            </ul>
          </div>
          <div className="mt-4">
            <strong>Outlook/Office 365:</strong>
            <ul className="ml-4 mt-1 space-y-1 text-muted-foreground">
              <li>• Host: smtp-mail.outlook.com or smtp.office365.com</li>
              <li>• Port: 587 (TLS)</li>
              <li>• Use your full email address and password</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}
