import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";
import type { Experience } from "@shared/schema";

export default function ExperienceManager() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    duration: "",
    description: "",
  });
  const { toast } = useToast();

  const { data: experiences, isLoading } = useQuery<Experience[]>({
    queryKey: ["/api/experience"],
  });

  const createMutation = useMutation({
    mutationFn: (data: any) =>
      apiRequest("POST", "/api/experience", data, {
        Authorization: `Bearer ${localStorage.getItem("adminSessionId")}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experience"] });
      toast({ title: "Experience created successfully" });
      handleCloseDialog();
    },
    onError: () => {
      toast({ title: "Failed to create experience", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      apiRequest("PUT", `/api/experience/${id}`, data, {
        Authorization: `Bearer ${localStorage.getItem("adminSessionId")}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experience"] });
      toast({ title: "Experience updated successfully" });
      handleCloseDialog();
    },
    onError: () => {
      toast({ title: "Failed to update experience", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/experience/${id}`, undefined, {
        Authorization: `Bearer ${localStorage.getItem("adminSessionId")}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/experience"] });
      toast({ title: "Experience deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete experience", variant: "destructive" });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      title: formData.title,
      company: formData.company,
      duration: formData.duration,
      description: formData.description.split("\n").filter(line => line.trim()),
    };

    if (editingExp) {
      updateMutation.mutate({ id: editingExp.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      title: exp.title,
      company: exp.company,
      duration: exp.duration,
      description: exp.description.join("\n"),
    });
    setIsDialogOpen(true);
  };

  const handleAdd = () => {
    setEditingExp(null);
    setFormData({
      title: "",
      company: "",
      duration: "",
      description: "",
    });
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingExp(null);
    setFormData({
      title: "",
      company: "",
      duration: "",
      description: "",
    });
  };

  if (isLoading) {
    return <div>Loading experiences...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Experience Management</h1>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={handleAdd} data-testid="button-add-experience">
              <Plus className="w-4 h-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingExp ? "Edit Experience" : "Add Experience"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  data-testid="input-experience-title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  data-testid="input-experience-company"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="Jan 2020 - Dec 2022"
                  required
                  data-testid="input-experience-duration"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description (one per line)</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  placeholder="Responsibility 1&#10;Responsibility 2&#10;Responsibility 3"
                  required
                  data-testid="input-experience-description"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full" 
                disabled={createMutation.isPending || updateMutation.isPending}
                data-testid="button-save-experience"
              >
                {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Experience</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experiences?.map((exp) => (
                <TableRow key={exp.id}>
                  <TableCell data-testid={`experience-title-${exp.id}`}>{exp.title}</TableCell>
                  <TableCell data-testid={`experience-company-${exp.id}`}>{exp.company}</TableCell>
                  <TableCell data-testid={`experience-duration-${exp.id}`}>{exp.duration}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleEdit(exp)}
                      data-testid={`button-edit-experience-${exp.id}`}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => deleteMutation.mutate(exp.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-experience-${exp.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
