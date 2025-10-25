import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import type { ContactInfo } from "@shared/schema";

export default function ContactInfoManager() {
  const { toast } = useToast();

  const { data: contactInfo, isLoading } = useQuery<ContactInfo>({
    queryKey: ["/api/contact-info"],
  });

  const [formData, setFormData] = useState({
    email: contactInfo?.email || "",
    phone: contactInfo?.phone || "",
    location: contactInfo?.location || "",
  });

  const updateMutation = useMutation({
    mutationFn: (data: ContactInfo) =>
      apiRequest("PUT", "/api/contact-info", data, {
        Authorization: `Bearer ${localStorage.getItem("adminSessionId")}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contact-info"] });
      toast({ title: "Contact info updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update contact info", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return <div>Loading contact info...</div>;
  }

  if (contactInfo && formData.email === "") {
    setFormData({
      email: contactInfo.email,
      phone: contactInfo.phone,
      location: contactInfo.location,
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Contact Info Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Edit Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                data-testid="input-contact-email"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                data-testid="input-contact-phone"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                required
                data-testid="input-contact-location"
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={updateMutation.isPending}
              data-testid="button-save-contact"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
