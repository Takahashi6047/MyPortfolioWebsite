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
        title: "MSUN 51st Founding Anniversary",
        category: "Concept Art",
        image: "/artworks/conceptArt/51st.png",
        year: "2024",
        size: "large"
    },
    {
        id: "02",
        title: "Subroutine: CHROMATIC",
        category: "Concept Art",
        image: "/artworks/conceptArt/christmas_art.png",
        year: "2024",
        size: "medium"
    },
    {
        id: "03",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐋𝐨𝐯𝐢𝐧𝐠 𝐒𝐨𝐦𝐞𝐨𝐧𝐞 𝐇𝐚𝐬 𝐂𝐨𝐬𝐭 𝐌𝐞 𝐄𝐯𝐞𝐫𝐲𝐭𝐡𝐢𝐧𝐠",
        category: "Concept Art",
        image: "/artworks/conceptArt/Vanity.png",
        year: "2024",
        size: "medium"
    },
    {
        id: "04",
        title: "GAMING BANNER: S1MPLE",
        category: "Layout",
        image: "/artworks/layouts/s1mple_yt.png",
        year: "2024",
        size: "wide"
    },
    {
        id: "05",
        title: "GAMING BANNER: STELLAR DYNASTY",
        category: "Layout",
        image: "/artworks/layouts/stellar_dynasty.png",
        year: "2024",
        size: "wide"
    },
    {
        id: "06",
        title: "𝐎𝐏𝐈𝐍𝐈𝐎𝐍 | 𝐓𝐡𝐞 𝐂𝐨𝐮𝐥𝐝’𝐯𝐞, 𝐒𝐡𝐨𝐮𝐥𝐝’𝐯𝐞, 𝐖𝐨𝐮𝐥𝐝’𝐯𝐞 𝐁𝐞𝐞𝐧 𝐏𝐀𝐋𝐀𝐊𝐀𝐒𝐀𝐍 𝟐𝟎𝟐𝟓",
        category: "Concept Art",
        image: "/artworks/conceptArt/opinion.png",
        year: "2024",
        size: "medium"
    },
    {
        id: "07",
        title: "𝐎𝐏𝐈𝐍𝐈𝐎𝐍 | 𝐁𝐞𝐲𝐨𝐧𝐝 𝐆𝐫𝐚𝐝𝐞𝐬: 𝐖𝐡𝐲 𝐓𝐞𝐚𝐜𝐡𝐞𝐫𝐬 𝐂𝐚𝐧'𝐭 𝐅𝐢𝐱 𝐖𝐡𝐚𝐭 𝐏𝐚𝐫𝐞𝐧𝐭𝐬 𝐃𝐨𝐧'𝐭 𝐓𝐞𝐚𝐜𝐡",
        category: "Concept Art",
        image: "/artworks/conceptArt/opinion2.png",
        year: "2024",
        size: "medium"
    },
    {
        id: "08",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐆𝐀𝐀𝐍𝐎 𝐊𝐀𝐑𝐀𝐌𝐈𝐍𝐆 𝐓𝐀𝐎 𝐀𝐍𝐆 𝐊𝐀𝐈𝐋𝐀𝐍𝐆𝐀𝐍 𝐁𝐈𝐋𝐀𝐍𝐆 𝐒𝐀𝐍𝐆𝐊𝐀𝐏 𝐍𝐆 𝐃𝐈𝐍𝐔𝐆𝐔𝐀𝐍? [Cover page]",
        category: "Concept Art",
        image: "/artworks/conceptArt/horror_p1.png",
        year: "2024",
        size: "medium"
    },
    {
        id: "09",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐆𝐀𝐀𝐍𝐎 𝐊𝐀𝐑𝐀𝐌𝐈𝐍𝐆 𝐓𝐀𝐎 𝐀𝐍𝐆 𝐊𝐀𝐈𝐋𝐀𝐍𝐆𝐀𝐍 𝐁𝐈𝐋𝐀𝐍𝐆 𝐒𝐀𝐍𝐆𝐊𝐀𝐏 𝐍𝐆 𝐃𝐈𝐍𝐔𝐆𝐔𝐀𝐍? [Page 2]",
        category: "Concept Art",
        image: "/artworks/conceptArt/horror_p2.png",
        year: "2024",
        size: "medium"
    },

    {
        id: "10",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐆𝐀𝐀𝐍𝐎 𝐊𝐀𝐑𝐀𝐌𝐈𝐍𝐆 𝐓𝐀𝐎 𝐀𝐍𝐆 𝐊𝐀𝐈𝐋𝐀𝐍𝐆𝐀𝐍 𝐁𝐈𝐋𝐀𝐍𝐆 𝐒𝐀𝐍𝐆𝐊𝐀𝐏 𝐍𝐆 𝐃𝐈𝐍𝐔𝐆𝐔𝐀𝐍? [Page 3]",
        category: "Concept Art",
        image: "/artworks/conceptArt/horror_p3.png",
        year: "2024",
        size: "medium"
    },
    {
        id: "11",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐆𝐀𝐀𝐍𝐎 𝐊𝐀𝐑𝐀𝐌𝐈𝐍𝐆 𝐓𝐀𝐎 𝐀𝐍𝐆 𝐊𝐀𝐈𝐋𝐀𝐍𝐆𝐀𝐍 𝐁𝐈𝐋𝐀𝐍𝐆 𝐒𝐀𝐍𝐆𝐊𝐀𝐏 𝐍𝐆 𝐃𝐈𝐍𝐔𝐆𝐔𝐀𝐍? [Page 4]",
        category: "Concept Art",
        image: "/artworks/conceptArt/horror_p4.png",
        year: "2024",
        size: "medium"
    },
    {
        id: "12",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐆𝐀𝐀𝐍𝐎 𝐊𝐀𝐑𝐀𝐌𝐈𝐍𝐆 𝐓𝐀𝐎 𝐀𝐍𝐆 𝐊𝐀𝐈𝐋𝐀𝐍𝐆𝐀𝐍 𝐁𝐈𝐋𝐀𝐍𝐆 𝐒𝐀𝐍𝐆𝐊𝐀𝐏 𝐍𝐆 𝐃𝐈𝐍𝐔𝐆𝐔𝐀𝐍? [Page 5]",
        category: "Concept Art",
        image: "/artworks/conceptArt/horror_p5.png",
        year: "2024",
        size: "medium"
    },
    {
        id: "13",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐆𝐀𝐀𝐍𝐎 𝐊𝐀𝐑𝐀𝐌𝐈𝐍𝐆 𝐓𝐀𝐎 𝐀𝐍𝐆 𝐊𝐀𝐈𝐋𝐀𝐍𝐆𝐀𝐍 𝐁𝐈𝐋𝐀𝐍𝐆 𝐒𝐀𝐍𝐆𝐊𝐀𝐏 𝐍𝐆 𝐃𝐈𝐍𝐔𝐆𝐔𝐀𝐍? [Page 6]",
        category: "Concept Art",
        image: "/artworks/conceptArt/horror_p6.png",
        year: "2024",
        size: "medium"
    },
    {
        id: "14",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐅𝐢𝐠𝐡𝐭𝐢𝐧𝐠 𝐭𝐡𝐞 𝐏𝐚𝐫𝐚𝐝𝐨𝐱𝐢𝐜𝐚𝐥 𝐔𝐫𝐠𝐞",
        category: "Concept Art",
        image: "/artworks/conceptArt/hns.png",
        year: "2024",
        size: "large"
    },
    {
        id: "15",
        title: "𝐋𝐈𝐓𝐄𝐑𝐀𝐑𝐘 | 𝐅𝐢𝐠𝐡𝐭𝐢𝐧𝐠 𝐭𝐡𝐞 𝐏𝐚𝐫𝐚𝐝𝐨𝐱𝐢𝐜𝐚𝐥 𝐔𝐫𝐠𝐞",
        category: "Concept Art",
        image: "/artworks/conceptArt/hns.png",
        year: "2024",
        size: "large"
    },
    {
        id: "16",
        title: "Mother's Day",
        category: "Line Art",
        image: "/artworks/lineArt/mother's_day.png",
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
