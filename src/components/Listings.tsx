import { useState, useMemo } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Bed, Bath, Square, Search } from "lucide-react";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const properties = [
  {
    id: 1,
    image: property1,
    title: "Modern 3-Bedroom Apartment",
    location: "Lekki Phase 1, Lagos",
    price: "₦2,500,000",
    period: "/year",
    bedrooms: 3,
    bathrooms: 2,
    area: "120 sqm",
    featured: true,
  },
  {
    id: 2,
    image: property2,
    title: "Spacious 2-Bedroom Duplex",
    location: "Maitama, Abuja",
    price: "₦3,200,000",
    period: "/year",
    bedrooms: 2,
    bathrooms: 2,
    area: "150 sqm",
    featured: false,
  },
  {
    id: 3,
    image: property3,
    title: "Luxury 4-Bedroom House",
    location: "GRA Phase 2, Port Harcourt",
    price: "₦4,800,000",
    period: "/year",
    bedrooms: 4,
    bathrooms: 3,
    area: "200 sqm",
    featured: true,
  },
];

export const Listings = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("all");
  const [bedroomFilter, setBedroomFilter] = useState("all");

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           property.location.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesLocation = locationFilter === "all" || property.location.includes(locationFilter);
      const matchesBedrooms = bedroomFilter === "all" || property.bedrooms.toString() === bedroomFilter;
      
      return matchesSearch && matchesLocation && matchesBedrooms;
    });
  }, [searchQuery, locationFilter, bedroomFilter]);

  return (
    <section id="listings" className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Properties</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover verified rental properties across Nigeria. Connect directly with landlords and secure your next home.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="max-w-5xl mx-auto mb-12 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by property name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12"
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Abuja">Abuja</SelectItem>
                <SelectItem value="Port Harcourt">Port Harcourt</SelectItem>
              </SelectContent>
            </Select>

            <Select value={bedroomFilter} onValueChange={setBedroomFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Bedrooms</SelectItem>
                <SelectItem value="2">2 Bedrooms</SelectItem>
                <SelectItem value="3">3 Bedrooms</SelectItem>
                <SelectItem value="4">4+ Bedrooms</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchQuery("");
                setLocationFilter("all");
                setBedroomFilter("all");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-6 text-muted-foreground">
          Showing {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <Card key={property.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
              <div className="relative overflow-hidden">
                <img
                  src={property.image}
                  alt={property.title}
                  className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                {property.featured && (
                  <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground">
                    Featured
                  </Badge>
                )}
              </div>
              
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-semibold text-xl line-clamp-1">{property.title}</h3>
                </div>
                <div className="flex items-center text-muted-foreground text-sm">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="line-clamp-1">{property.location}</span>
                </div>
              </CardHeader>

              <CardContent className="pb-3">
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-bold text-primary">{property.price}</span>
                  <span className="text-muted-foreground text-sm">{property.period}</span>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bed className="h-4 w-4" />
                    <span>{property.bedrooms} Beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="h-4 w-4" />
                    <span>{property.bathrooms} Baths</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Square className="h-4 w-4" />
                    <span>{property.area}</span>
                  </div>
                </div>
              </CardContent>

              <CardFooter>
                <Button className="w-full" variant="outline">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" className="shadow-lg">
            Browse All Properties
          </Button>
        </div>
      </div>
    </section>
  );
};
