import { Clock, Mail, MapPin, Phone } from "lucide-react";

interface ContactItemData {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const data: ContactItemData[] = [
  {
    title: "Visit Us",
    description: "Sao Paulo, Brazil",
    icon: (
      <MapPin className="h-6 w-6 text-text-muted group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Call Us",
    description: "+55 11 99999-9999",
    icon: (
      <Phone className="h-6 w-6 text-text-muted group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Working Hours",
    description: "Mon - Fri: 9:00 AM - 6:00 PM",
    icon: (
      <Clock className="h-6 w-6 text-text-muted group-hover:text-primary transition-colors" />
    ),
  },
  {
    title: "Email Us",
    description: "contact@onlineshopping.com",
    icon: (
      <Mail className="h-6 w-6 text-text-muted group-hover:text-primary transition-colors" />
    ),
  },
];

const FooterTop = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 border-b border-border py-2">
      {data?.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-3 group hover:bg-bg-secondary p-4 rounded-xl transition-colors duration-300"
        >
          {item?.icon}
          <div>
            <h3 className="font-semibold text-text-primary text-sm group-hover:text-primary transition-colors duration-300 font-poppins">
              {item?.title}
            </h3>
            <p className="text-text-muted text-xs mt-0.5 font-poppins">
              {item?.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FooterTop;
