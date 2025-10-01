import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square, Mail, Phone } from "lucide-react";
import property1 from "@/assets/property-1.jpg";

type Property = {
  id: string;
  image_url: string | null;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: string;
  description: string | null;
  featured: boolean;
  landlord_email: string;
  landlord_phone: string;
};

interface PropertyDetailDialogProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PropertyDetailDialog = ({ property, open, onOpenChange }: PropertyDetailDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl">{property.title}</DialogTitle>
          <DialogDescription className="flex items-center text-base">
            <MapPin className="h-4 w-4 mr-1" />
            {property.location}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <img
            src={property.image_url || property1}
            alt={property.title}
            className="w-full h-80 object-cover rounded-lg"
          />

          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-primary">₦{property.price.toLocaleString()}</span>
            <span className="text-muted-foreground text-lg">/year</span>
          </div>

          <div className="flex items-center gap-6 text-lg">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5" />
              <span>{property.bedrooms} Bedrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-5 w-5" />
              <span>{property.bathrooms} Bathrooms</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-5 w-5" />
              <span>{property.area}</span>
            </div>
          </div>

          {property.description && (
            <div>
              <h3 className="font-semibold text-xl mb-2">Description</h3>
              <p className="text-muted-foreground leading-relaxed">{property.description}</p>
            </div>
          )}

          <div className="border-t pt-6">
            <h3 className="font-semibold text-xl mb-4">Contact Landlord</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <a href={`mailto:${property.landlord_email}`} className="text-primary hover:underline">
                  {property.landlord_email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <a href={`tel:${property.landlord_phone}`} className="text-primary hover:underline">
                  {property.landlord_phone}
                </a>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <Button size="lg" className="flex-1" asChild>
              <a href={`mailto:${property.landlord_email}`}>Contact via Email</a>
            </Button>
            <Button size="lg" variant="outline" className="flex-1" asChild>
              <a href={`tel:${property.landlord_phone}`}>Call Now</a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
