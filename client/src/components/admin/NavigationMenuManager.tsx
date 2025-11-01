import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Plus, Pencil, Trash2, GripVertical } from "lucide-react";
import type { NavMenuItem } from "@shared/schema";

export default function NavigationMenuManager() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<NavMenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    href: "",
    order: 0,
  });
  const { toast } = useToast();

  const { data: navItems = [], isLoading } = useQuery<NavMenuItem[]>({
    queryKey: ["/api/nav-menu"],
  });

  const createMutation = useMutation({
    mutationFn: (data: { name: string; href: string; order: number }) =>
      apiRequest("POST", "/api/nav-menu", data, {
        Authorization: `Bearer ${localStorage.getItem("adminSessionId")}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/nav-menu"] });
      toast({
        title: "Success",
        description: "Navigation menu item created successfully",
      });
      setIsAddDialogOpen(false);
      setFormData({ name: "", href: "", order: 0 });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create navigation menu item",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NavMenuItem> }) =>
      apiRequest("PUT", `/api/nav-menu/${id}`, data, {
        Authorization: `Bearer ${localStorage.getItem("adminSessionId")}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/nav-menu"] });
      toast({
        title: "Success",
        description: "Navigation menu item updated successfully",
      });
      setEditingItem(null);
      setFormData({ name: "", href: "", order: 0 });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update navigation menu item",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/nav-menu/${id}`, undefined, {
        Authorization: `Bearer ${localStorage.getItem("adminSessionId")}`,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/nav-menu"] });
      toast({
        title: "Success",
        description: "Navigation menu item deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete navigation menu item",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      href: formData.href,
      order: Number(formData.order),
    };
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleEdit = (item: NavMenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      href: item.href,
      order: item.order,
    });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this navigation menu item?")) {
      deleteMutation.mutate(id);
    }
  };

  if (isLoading) {
    return <div className="p-8">Loading navigation menu items...</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Navigation Menu Manager</h1>
          <p className="text-muted-foreground">Manage your website's navigation menu items</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-nav-item">
              <Plus className="mr-2 h-4 w-4" /> Add Menu Item
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Navigation Menu Item</DialogTitle>
              <DialogDescription>
                Add a new item to your navigation menu
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  data-testid="input-nav-name"
                />
              </div>
              <div>
                <Label htmlFor="href">Link (e.g., #about)</Label>
                <Input
                  id="href"
                  value={formData.href}
                  onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                  required
                  data-testid="input-nav-href"
                />
              </div>
              <div>
                <Label htmlFor="order">Order</Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  required
                  data-testid="input-nav-order"
                />
              </div>
              <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-nav">
                {createMutation.isPending ? "Adding..." : "Add Menu Item"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {navItems.map((item) => (
          <Card key={item.id} className="p-4" data-testid={`card-nav-item-${item.id}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <GripVertical className="h-5 w-5 text-muted-foreground" />
                <div>
                  <h3 className="font-semibold" data-testid={`text-nav-name-${item.id}`}>
                    {item.name}
                  </h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-nav-href-${item.id}`}>
                    {item.href} (Order: {item.order})
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Dialog
                  open={editingItem?.id === item.id}
                  onOpenChange={(open) => {
                    if (!open) {
                      setEditingItem(null);
                      setFormData({ name: "", href: "", order: 0 });
                    }
                  }}
                >
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(item)}
                      data-testid={`button-edit-nav-${item.id}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Navigation Menu Item</DialogTitle>
                      <DialogDescription>
                        Update the navigation menu item details
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="edit-name">Name</Label>
                        <Input
                          id="edit-name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          data-testid="input-edit-nav-name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-href">Link (e.g., #about)</Label>
                        <Input
                          id="edit-href"
                          value={formData.href}
                          onChange={(e) => setFormData({ ...formData, href: e.target.value })}
                          required
                          data-testid="input-edit-nav-href"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-order">Order</Label>
                        <Input
                          id="edit-order"
                          type="number"
                          value={formData.order}
                          onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                          required
                          data-testid="input-edit-nav-order"
                        />
                      </div>
                      <Button type="submit" disabled={updateMutation.isPending} data-testid="button-update-nav">
                        {updateMutation.isPending ? "Updating..." : "Update Menu Item"}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(item.id)}
                  disabled={deleteMutation.isPending}
                  data-testid={`button-delete-nav-${item.id}`}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
