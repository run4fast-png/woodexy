import { Product } from "@/types";

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Premium Oak Planks",
    species: "Oak",
    grade: "A",
    country: "USA",
    price: 120,
    unit: "m3",
    certifications: ["FSC", "PEFC"],
    specifications: {
      thickness: "25mm",
      width: "150mm",
      length: "3000mm",
      moisture: "10-12%"
    },
    description: "High-quality American Oak planks suitable for furniture and flooring. Kiln-dried and ready for immediate use.",
    images: ["/placeholder-wood-1.jpg"],
    inStock: true,
    supplier: {
        id: "sup-1",
        name: "American Timber Co.",
        isVerified: true
    }
  },
  {
    id: "2",
    name: "Siberian Larch Decking",
    species: "Larch",
    grade: "AB",
    country: "Russia",
    price: 85,
    unit: "m2",
    certifications: ["FSC"],
    specifications: {
      thickness: "28mm",
      width: "145mm",
      length: "4000mm",
      moisture: "16-18%"
    },
    description: "Durable Siberian Larch perfect for outdoor decking. Naturally resistant to decay.",
    images: ["/placeholder-wood-2.jpg"],
    inStock: true,
    supplier: {
        id: "sup-2",
        name: "Siberian Wood Exports",
        isVerified: false
    }
  },
  {
    id: "3",
    name: "Canadian Maple Lumber",
    species: "Maple",
    grade: "Prime",
    country: "Canada",
    price: 150,
    unit: "m3",
    certifications: ["SFI"],
    specifications: {
      thickness: "50mm",
      width: "200mm",
      length: "2500mm",
      moisture: "8-10%"
    },
    description: "Hard Maple lumber with excellent strength and minimal defects. Ideal for high-end cabinetry.",
    images: ["/placeholder-wood-3.jpg"],
    inStock: true,
    supplier: {
        id: "sup-3",
        name: "Maple Leaf Lumber",
        isVerified: true
    }
  },
  {
    id: "4",
    name: "Brazilian Walnut (Ipe)",
    species: "Walnut",
    grade: "Clear",
    country: "Brazil",
    price: 220,
    unit: "m2",
    certifications: ["FSC"],
    specifications: {
      thickness: "20mm",
      width: "120mm",
      length: "2000mm",
      moisture: "12%"
    },
    description: "Extremely hard and dense Brazilian Walnut, also known as Ipe. Best for exterior structures.",
    images: ["/placeholder-wood-4.jpg"],
    inStock: false,
    supplier: {
        id: "sup-4",
        name: "Amazon Hardwoods",
        isVerified: true
    }
  },
  {
    id: "5",
    name: "European Beech Boards",
    species: "Beech",
    grade: "B",
    country: "Germany",
    price: 95,
    unit: "m3",
    certifications: ["PEFC"],
    specifications: {
      thickness: "32mm",
      width: "180mm",
      length: "3500mm",
      moisture: "12-14%"
    },
    description: "Steam-treated European Beech. Great workability and uniform color.",
    images: ["/placeholder-wood-5.jpg"],
    inStock: true,
    supplier: {
        id: "sup-5",
        name: "Deutsche Holzwerke",
        isVerified: false
    }
  }
];

export const MOCK_FILTERS = {
  species: ["Oak", "Larch", "Maple", "Walnut", "Beech", "Pine", "Mahogany"],
  countries: ["USA", "Russia", "Canada", "Brazil", "Germany", "Sweden", "Finland"]
};
