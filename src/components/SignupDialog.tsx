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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const signupSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Invalid email address").max(255, "Email is too long"),
  phone: z.string().trim().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
  userType: z.enum(["tenant", "landlord"], { required_error: "Please select your role" }),
});

type SignupForm = z.infer<typeof signupSchema>;

interface SignupDialogProps {
  trigger?: React.ReactNode;
}

export const SignupDialog = ({ trigger }: SignupDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
  });

  const userType = watch("userType");

  const onSubmit = async (data: SignupForm) => {
    try {
      const { error } = await supabase
        .from('user_signups')
        .insert([{
          name: data.name,
          email: data.email,
          phone: data.phone,
          user_type: data.userType,
        }]);

      if (error) throw error;

      toast({
        title: "Welcome to House Matters!",
        description: `We'll contact you soon at ${data.email}`,
      });
      setOpen(false);
      reset();
    } catch (error: any) {
      toast({
        title: "Signup failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button size="lg" className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 shadow-large transition-all duration-300 hover:scale-105">
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Join House Matters</DialogTitle>
          <DialogDescription>
            Sign up to start your journey. No fees, no hassle.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+234 800 000 0000"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label>I am a</Label>
            <RadioGroup
              value={userType}
              onValueChange={(value) => setValue("userType", value as "tenant" | "landlord")}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="tenant" id="tenant" />
                <Label htmlFor="tenant" className="font-normal cursor-pointer">
                  Tenant (Looking for a home)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="landlord" id="landlord" />
                <Label htmlFor="landlord" className="font-normal cursor-pointer">
                  Landlord (Have property to rent)
                </Label>
              </div>
            </RadioGroup>
            {errors.userType && (
              <p className="text-sm text-destructive">{errors.userType.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg">
            Sign Up
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};