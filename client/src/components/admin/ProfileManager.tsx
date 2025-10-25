import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";
import type { ProfileInfo } from "@shared/schema";

export default function ProfileManager() {
  const { toast } = useToast();
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingBg, setUploadingBg] = useState(false);

  const { data: profile, isLoading } = useQuery<ProfileInfo>({
    queryKey: ["/api/profile"],
  });

  const [formData, setFormData] = useState({
    name: profile?.name || "",
    title: profile?.title || "",
    bio: profile?.bio || "",
    profilePhoto: profile?.profilePhoto || "",
    heroBackground: profile?.heroBackground || "",
  });

  const updateMutation = useMutation({
    mutationFn: (data: ProfileInfo) =>
      apiRequest("PUT", "/api/profile", data, {
        Authorization: `Bearer ${localStorage.getItem("adminSessionId")}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/profile"] });
      toast({ title: "Profile updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update profile", variant: "destructive" });
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "profilePhoto" | "heroBackground") => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (field === "profilePhoto") {
      setUploadingPhoto(true);
    } else {
      setUploadingBg(true);
    }

    const formDataUpload = new FormData();
    formDataUpload.append("file", file);
    formDataUpload.append("type", "profile");

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminSessionId")}`,
        },
        body: formDataUpload,
      });

      const data = await response.json();
      setFormData((prev) => ({ ...prev, [field]: data.url }));
      toast({ title: "Image uploaded successfully" });
    } catch (error) {
      toast({ title: "Failed to upload image", variant: "destructive" });
    } finally {
      if (field === "profilePhoto") {
        setUploadingPhoto(false);
      } else {
        setUploadingBg(false);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (profile && formData.name === "") {
    setFormData({
      name: profile.name,
      title: profile.title,
      bio: profile.bio,
      profilePhoto: profile.profilePhoto,
      heroBackground: profile.heroBackground,
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Profile Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                data-testid="input-profile-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                data-testid="input-profile-title"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={4}
                required
                data-testid="input-profile-bio"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profilePhoto">Profile Photo</Label>
              <div className="flex gap-2">
                <Input
                  id="profilePhoto"
                  value={formData.profilePhoto}
                  onChange={(e) => setFormData({ ...formData, profilePhoto: e.target.value })}
                  placeholder="Image URL"
                  required
                  data-testid="input-profile-photo"
                />
                <Button type="button" variant="outline" disabled={uploadingPhoto} asChild>
                  <label htmlFor="photo-upload" className="cursor-pointer" data-testid="button-upload-profile-photo">
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingPhoto ? "Uploading..." : "Upload"}
                    <input
                      id="photo-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "profilePhoto")}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>
              {formData.profilePhoto && (
                <img src={formData.profilePhoto} alt="Profile preview" className="w-32 h-32 object-cover rounded" />
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="heroBackground">Hero Background</Label>
              <div className="flex gap-2">
                <Input
                  id="heroBackground"
                  value={formData.heroBackground}
                  onChange={(e) => setFormData({ ...formData, heroBackground: e.target.value })}
                  placeholder="Image URL"
                  required
                  data-testid="input-profile-hero"
                />
                <Button type="button" variant="outline" disabled={uploadingBg} asChild>
                  <label htmlFor="bg-upload" className="cursor-pointer" data-testid="button-upload-profile-hero">
                    <Upload className="w-4 h-4 mr-2" />
                    {uploadingBg ? "Uploading..." : "Upload"}
                    <input
                      id="bg-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, "heroBackground")}
                      className="hidden"
                    />
                  </label>
                </Button>
              </div>
              {formData.heroBackground && (
                <img src={formData.heroBackground} alt="Hero preview" className="w-full h-32 object-cover rounded" />
              )}
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={updateMutation.isPending}
              data-testid="button-save-profile"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
