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
    {
        id: "01",
        title: "Mindanao State University at Naawan 51st Founding Anniversary",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/51st.webp",
        year: "2024",
        size: "large"
    },
    {
        id: "02",
        title: "A Christmas Struggle",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/christmas_art.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "03",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐋𝐨𝐯𝐢𝐧𝐠 𝐒𝐨𝐦𝐞𝐨𝐧𝐞 𝐇𝐚𝐬 𝐂𝐨𝐬𝐭 𝐌𝐞 𝐄𝐯𝐞𝐫𝐲𝐭𝐡𝐢𝐧𝐠",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/Vanity.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "04",
        title: "GAMING BANNER: S1MPLE",
        category: "Layout",
        image: "/assets/artworks/layouts/s1mple_yt.webp",
        year: "2024",
        size: "wide"
    },
    {
        id: "05",
        title: "GAMING BANNER: STELLAR DYNASTY",
        category: "Layout",
        image: "/assets/artworks/layouts/stellar_dynasty.webp",
        year: "2024",
        size: "wide"
    },
    {
        id: "06",
        title: "𝐎𝐏𝐈𝐍𝐈𝐎𝐍 | 𝐓𝐡𝐞 𝐂𝐨𝐮𝐥𝐝’𝐯𝐞, 𝐒𝐡𝐨𝐮𝐥𝐝’𝐯𝐞, 𝐖𝐨𝐮𝐥𝐝’𝐯𝐞 𝐁𝐞𝐞𝐧 𝐏𝐀𝐋𝐀𝐊𝐀𝐒𝐀𝐍 𝟐𝟎𝟐𝟓",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/opinion.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "07",
        title: "𝐎𝐏𝐈𝐍𝐈𝐎𝐍 | 𝐁𝐞𝐲𝐨𝐧𝐝 𝐆𝐫𝐚𝐝𝐞𝐬: 𝐖𝐡𝐲 𝐓𝐞𝐚𝐜𝐡𝐞𝐫𝐬 𝐂𝐚𝐧'𝐭 𝐅𝐢𝐱 𝐖𝐡𝐚𝐭 𝐏𝐚𝐫𝐞𝐧𝐭𝐬 𝐃𝐨𝐧'𝐭 𝐓𝐞𝐚𝐜𝐡",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/opinion2.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "08",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐆𝐀𝐀𝐍𝐎 𝐊𝐀𝐑𝐀𝐌𝐈𝐍𝐆 𝐓𝐀𝐎 𝐀𝐍𝐆 𝐊𝐀𝐈𝐋𝐀𝐍𝐆𝐀𝐍 𝐁𝐈𝐋𝐀𝐍𝐆 𝐒𝐀𝐍𝐆𝐊𝐀𝐏 𝐍𝐆 𝐃𝐈𝐍𝐔𝐆𝐔𝐀𝐍? [Cover page]",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/horror_p1.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "09",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐆𝐀𝐀𝐍𝐎 𝐊𝐀𝐑𝐀𝐌𝐈𝐍𝐆 𝐓𝐀𝐎 𝐀𝐍𝐆 𝐊𝐀𝐈𝐋𝐀𝐍𝐆𝐀𝐍 𝐁𝐈𝐋𝐀𝐍𝐆 𝐒𝐀𝐍𝐆𝐊𝐀𝐏 𝐍𝐆 𝐃𝐈𝐍𝐔𝐆𝐔𝐀𝐍? [Page 2]",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/horror_p2.webp",
        year: "2024",
        size: "medium"
    },

    {
        id: "10",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐆𝐀𝐀𝐍𝐎 𝐊𝐀𝐑𝐀𝐌𝐈𝐍𝐆 𝐓𝐀𝐎 𝐀𝐍𝐆 𝐊𝐀𝐈𝐋𝐀𝐍𝐆𝐀𝐍 𝐁𝐈𝐋𝐀𝐍𝐆 𝐒𝐀𝐍𝐆𝐊𝐀𝐏 𝐍𝐆 𝐃𝐈𝐍𝐔𝐆𝐔𝐀𝐍? [Page 3]",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/horror_p3.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "11",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐆𝐀𝐀𝐍𝐎 𝐊𝐀𝐑𝐀𝐌𝐈𝐍𝐆 𝐓𝐀𝐎 𝐀𝐍𝐆 𝐊𝐀𝐈𝐋𝐀𝐍𝐆𝐀𝐍 𝐁𝐈𝐋𝐀𝐍𝐆 𝐒𝐀𝐍𝐆𝐊𝐀𝐏 𝐍𝐆 𝐃𝐈𝐍𝐔𝐆𝐔𝐀𝐍? [Page 4]",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/horror_p4.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "12",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐆𝐀𝐀𝐍𝐎 𝐊𝐀𝐑𝐀𝐌𝐈𝐍𝐆 𝐓𝐀𝐎 𝐀𝐍𝐆 𝐊𝐀𝐈𝐋𝐀𝐍𝐆𝐀𝐍 𝐁𝐈𝐋𝐀𝐍𝐆 𝐒𝐀𝐍𝐆𝐊𝐀𝐏 𝐍𝐆 𝐃𝐈𝐍𝐔𝐆𝐔𝐀𝐍? [Page 5]",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/horror_p5.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "13",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐆𝐀𝐀𝐍𝐎 𝐊𝐀𝐑𝐀𝐌𝐈𝐍𝐆 𝐓𝐀𝐎 𝐀𝐍𝐆 𝐊𝐀𝐈𝐋𝐀𝐍𝐆𝐀𝐍 𝐁𝐈𝐋𝐀𝐍𝐆 𝐒𝐀𝐍𝐆𝐊𝐀𝐏 𝐍𝐆 𝐃𝐈𝐍𝐔𝐆𝐔𝐀𝐍? [Page 6]",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/horror_p6.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "14",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐅𝐢𝐠𝐡𝐭𝐢𝐧𝐠 𝐭𝐡𝐞 𝐏𝐚𝐫𝐚𝐝𝐨𝐱𝐢𝐜𝐚𝐥 𝐔𝐫𝐠𝐞",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/hns.webp",
        year: "2024",
        size: "large"
    },
    {
        id: "15",
        title: "𝐅𝐄𝐀𝐓𝐔𝐑𝐄 | 𝐏𝐚𝐫𝐞𝐧𝐭𝐥𝐞𝐬𝐬, 𝐁𝐮𝐭 𝐍𝐨𝐭 𝐀𝐥𝐨𝐧𝐞",
        category: "Concept Art",
        image: "/assets/artworks/conceptArt/notAlone.webp",
        year: "2024",
        size: "large"
    },
    {
        id: "16",
        title: "Mother's Day",
        category: "Line Art",
        image: "/assets/artworks/lineArt/mother's_day.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "17",
        title: "Green Dragon Border",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/cafes champ.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "18",
        title: "Red Dragon Border",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/cmas champ.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "19",
        title: "Yellow Dragon Border",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/cbaa champ.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "20",
        title: "Green Dragon Border",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/cess champ.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "21",
        title: "Fire Banner Design ",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/banner team1.webp",
        year: "2024",
        size: "tall"
    },
    {
        id: "22",
        title: "Poison Banner Design ",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/banner team2.webp",
        year: "2024",
        size: "tall"
    },
    {
        id: "23",
        title: "Electric Banner Design ",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/banner team3-1.webp",
        year: "2024",
        size: "tall"
    },
    {
        id: "24",
        title: "Nature Banner Design ",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/banner team4.webp",
        year: "2024",
        size: "tall"
    },
    {
        id: "25",
        title: "Banner Design ",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/banner.webp",
        year: "2024",
        size: "tall"
    },
    {
        id: "26",
        title: "Palakasan Banner",
        category: "Graphic Element",
        image: "/assets/artworks/layouts/Palakasan_Banner.webp",
        year: "2024",
        size: "wide"
    },
    {
        id: "27",
        title: "Palakasan Banner",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/map_design.webp",
        year: "2024",
        size: "large"
    },
    {
        id: "28",
        title: "Palakasan Banner",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/map_design2.webp",
        year: "2024",
        size: "large"
    },
    {
        id: "29",
        title: "Palakasan Avatar Earth Banner",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/EarthBannerAvatar.webp",
        year: "2024",
        size: "tall"
    },
    {
        id: "30",
        title: "Palakasan Avatar Fire Banner",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/FireBannerAvatar.webp",
        year: "2024",
        size: "tall"
    },
    {
        id: "31",
        title: "Palakasan Avatar Water Banner",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/WaterBannerAvatar.webp",
        year: "2024",
        size: "tall"
    },
    {
        id: "32",
        title: "Palakasan Avatar Wind Banner",
        category: "Graphic Element",
        image: "/assets/artworks/graphicElements/WindBannerAvatar.webp",
        year: "2024",
        size: "tall"
    },
    {
        id: "33",
        title: "Coffee Sticker",
        category: "Stickers",
        image: "/assets/artworks/stickers/coffee.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "34",
        title: "Hero Eraser Sticker",
        category: "Stickers",
        image: "/assets/artworks/stickers/eraser.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "35",
        title: "Literary Book Sticker",
        category: "Stickers",
        image: "/assets/artworks/stickers/literary1.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "36",
        title: "Happy Pen Sticker",
        category: "Stickers",
        image: "/assets/artworks/stickers/pen happy.webp",
        year: "2024",
        size: "medium"
    },
    {
        id: "37",
        title: "The Plot Twist Expert Sticker",
        category: "Stickers",
        image: "/assets/artworks/stickers/plottwist.webp",
        year: "2024",
        size: "medium"
    },





];

// Auto-generate categories from artPieces (excludes text cards)
const uniqueCategories = [...new Set(
    artPieces
        .filter(piece => piece.category)
        .map(piece => piece.category as string)
)];

export const artCategories = ['All', ...uniqueCategories];
