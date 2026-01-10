export interface ArtPiece {
    id: string;
    title?: string;
    category?: string;
    image?: string;
    year?: string;
    size: 'small' | 'medium' | 'large' | 'wide' | 'tall';
    type?: 'text';
    content?: string;
    sub?: string;
}

export const artPieces: ArtPiece[] = [
    // Large items first (anchor the layout)
    {
        id: "01",
        title: "Project: NEON_VOID",
        category: "3D Render",
        image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=2552&auto=format&fit=crop",
        year: "2024",
        size: "large"
    },
    // Wide items (fill horizontal space)
    {
        id: "04",
        title: "Synth_Dreams.exe",
        category: "Illustration",
        image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2670&auto=format&fit=crop",
        year: "2024",
        size: "wide"
    },
    // Medium items (flexible fillers)
    {
        id: "02",
        title: "Subroutine: CHROMATIC",
        category: "Data Vis",
        image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=2574&auto=format&fit=crop",
        year: "2024",
        size: "medium"
    },
    {
        id: "03",
        title: "Flow_State_v9",
        category: "Generative",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop",
        year: "2023",
        size: "medium"
    },
    {
        id: "06",
        title: "Sector_7_Metropolis",
        category: "Concept Art",
        image: "https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=2698&auto=format&fit=crop",
        year: "2024",
        size: "medium"
    },
    // Small items last (fill gaps)
    {
        id: "05",
        title: "Neural_Net__Training",
        category: "AI Model",
        image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2565&auto=format&fit=crop",
        year: "2023",
        size: "small"
    },
];

// Auto-generate categories from artPieces (excludes text cards)
const uniqueCategories = [...new Set(
    artPieces
        .filter(piece => piece.category)
        .map(piece => piece.category as string)
)];

export const artCategories = ['All', ...uniqueCategories];
