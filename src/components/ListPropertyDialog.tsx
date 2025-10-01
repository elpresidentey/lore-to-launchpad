import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const propertySchema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters").max(100, "Title is too long"),
  location: z.string().trim().min(5, "Location must be at least 5 characters").max(200, "Location is too long"),
  city: z.string().trim().min(2, "City is required").max(50, "City name is too long"),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Price must be a positive number"),
  bedrooms: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Bedrooms must be a positive number"),
  bathrooms: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, "Bathrooms must be a positive number"),
  area: z.string().trim().min(2, "Area is required"),
  description: z.string().trim().min(20, "Description must be at least 20 characters").max(1000, "Description is too long"),
  landlord_email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  landlord_phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
});

type PropertyForm = z.infer<typeof propertySchema>;

interface ListPropertyDialogProps {
  trigger?: React.ReactNode;
  onPropertyAdded?: () => void;
}

export const ListPropertyDialog = ({ trigger, onPropertyAdded }: ListPropertyDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PropertyForm>({
    resolver: zodResolver(propertySchema),
  });

  const onSubmit = async (data: PropertyForm) => {
    try {
      const { error } = await supabase
        .from('properties')
        .insert([{
          title: data.title,
          location: data.location,
          city: data.city,
          price: Number(data.price),
          bedrooms: Number(data.bedrooms),
          bathrooms: Number(data.bathrooms),
          area: data.area,
          description: data.description,
          landlord_email: data.landlord_email,
          landlord_phone: data.landlord_phone,
        }]);

      if (error) throw error;

      toast({
        title: "Property listed successfully!",
        description: "Your property is now visible to potential tenants.",
      });
      setOpen(false);
      reset();
      onPropertyAdded?.();
    } catch (error: any) {
      toast({
        title: "Failed to list property",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="text-lg px-10 py-6">
            <Home className="mr-2 h-5 w-5" />
            List Your Property
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">List Your Property</DialogTitle>
          <DialogDescription>
            Add your property details to connect with potential tenants.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="title">Property Title</Label>
            <Input
              id="title"
              placeholder="e.g. Modern 3-Bedroom Apartment"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Full Address</Label>
              <Input
                id="location"
                placeholder="e.g. Lekki Phase 1"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-sm text-destructive">{errors.location.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                placeholder="e.g. Lagos"
                {...register("city")}
              />
              {errors.city && (
                <p className="text-sm text-destructive">{errors.city.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Annual Rent (₦)</Label>
              <Input
                id="price"
                type="number"
                placeholder="2500000"
                {...register("price")}
              />
              {errors.price && (
                <p className="text-sm text-destructive">{errors.price.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="area">Area</Label>
              <Input
                id="area"
                placeholder="e.g. 120 sqm"
                {...register("area")}
              />
              {errors.area && (
                <p className="text-sm text-destructive">{errors.area.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                placeholder="3"
                {...register("bedrooms")}
              />
              {errors.bedrooms && (
                <p className="text-sm text-destructive">{errors.bedrooms.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                placeholder="2"
                {...register("bathrooms")}
              />
              {errors.bathrooms && (
                <p className="text-sm text-destructive">{errors.bathrooms.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your property..."
              rows={4}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="landlord_email">Contact Email</Label>
            <Input
              id="landlord_email"
              type="email"
              placeholder="landlord@example.com"
              {...register("landlord_email")}
            />
            {errors.landlord_email && (
              <p className="text-sm text-destructive">{errors.landlord_email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="landlord_phone">Contact Phone</Label>
            <Input
              id="landlord_phone"
              type="tel"
              placeholder="+234 800 000 0000"
              {...register("landlord_phone")}
            />
            {errors.landlord_phone && (
              <p className="text-sm text-destructive">{errors.landlord_phone.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg">
            List Property
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
