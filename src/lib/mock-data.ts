export interface BlogPost {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    content: string; // HTML or Markdown
    coverImage: string;
    date: string;
    author: string;
    category: string;
    tags: string[];
    views: number;
    comments: number;
    rank?: number; // For ranked posts
}

export const CATEGORIES = [
    "전체",
    "여행·맛집",
    "리빙·스타일",
    "가족·연애",
    "직장·자기계발",
    "시사·지식",
    "머니스토리", // From Ranked
];

export const MOCK_POSTS: BlogPost[] = [
    // 1. Ranked Posts
    {
        id: "ranked-1",
        slug: "stock-doosan",
        title: "두산에너빌리티 주가 전망: SMR과 AI 데이터센터 수혜주?",
        excerpt: "SMR(소형모듈원전) 시장이 뜨거워지면서 두산에너빌리티의 입지가 재조명받고 있습니다. AI 데이터센터의 전력 수요 급증과 맞물려 미래 주가 향방을 분석해봅니다.",
        content: `
      <p>두산에너빌리티가 SMR 시장의 핵심 플레이어로 떠오르고 있습니다.</p>
      <h2>SMR이란 무엇인가?</h2>
      <p>소형모듈원전(Small Modular Reactor)은 기존 대형 원전 대비 안전성과 효율성을 획기적으로 높인 차세대 원전 기술입니다.</p>
      <h2>AI 데이터센터와의 시너지</h2>
      <p>AI 산업의 발전으로 막대한 전력이 필요해진 시점, SMR은 안정적인 무탄소 전력원으로 주목받고 있습니다.</p>
    `,
        coverImage: "https://images.unsplash.com/photo-1611974765270-ca1258634369?q=80&w=1000&auto=format&fit=crop",
        date: "2024.03.20",
        author: "머니스토리",
        category: "머니스토리",
        tags: ["주식", "두산에너빌리티", "SMR", "AI수혜주"],
        views: 15420,
        comments: 42,
        rank: 1,
    },
    {
        id: "ranked-2",
        slug: "food-review",
        title: "메뉴 3개에 만 원도 안 되는 칼국수집 (★★☆)",
        excerpt: "요즘 물가에 믿기지 않는 가격, 하지만 맛은? 솔직한 방문 후기를 남깁니다.",
        content: "<p>가성비 맛집을 찾아서...</p>",
        coverImage: "https://images.unsplash.com/photo-1555126634-323283e090fa?q=80&w=1000&auto=format&fit=crop",
        date: "2024.03.18",
        author: "뚱방",
        category: "뚱방의 이로이로",
        tags: ["맛집", "칼국수", "가성비"],
        views: 8900,
        comments: 156,
        rank: 2,
    },

    // 2. Feed Grid Posts
    {
        id: "feed-grid-1",
        slug: "busan-sashimi",
        title: "부산 현지인은 광안리 안 갑니다, 참돔 유비끼의 성지 '창현수산'",
        excerpt: "관광객만 가는 광안리 횟집은 이제 그만. 부산 토박이가 20년째 다니는 찐 단골집을 공개합니다.",
        content: `
      <p>부산에 오면 다들 광안리, 해운대 횟집을 찾으시죠?</p>
      <p>하지만 진짜 맛집은 숨어있는 법입니다. 오늘은 제 20년 단골집 '창현수산'을 소개합니다.</p>
      <h2>참돔 유비끼의 진수</h2>
      <p>뜨거운 물로 껍질을 살짝 익혀 쫄깃함을 살린 유비끼, 이곳보다 잘하는 곳은 못 봤습니다.</p>
    `,
        coverImage: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1000&auto=format&fit=crop",
        date: "1일 전",
        author: "부산토박이",
        category: "부산 토박이 아저씨의 맛집 에세이",
        tags: ["부산최고횟집", "부산토박이횟집", "참돔유비끼", "창현수산"],
        views: 1209,
        comments: 10,
    },
    {
        id: "feed-grid-2",
        slug: "gangneung-pork",
        title: "[강릉 출장 기록] 아내와 함께한 소박하지만 든든한 한 끼, '민영식당' 제육볶음 리뷰",
        excerpt: "화려한 오션뷰는 없지만, 정겨운 할머니의 손맛이 있는 곳. 강릉 현지인들이 찾는 백반집.",
        content: "<p>강릉 출장 중 우연히 들른 곳입니다...</p>",
        coverImage: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=1000&auto=format&fit=crop",
        date: "4일 전",
        author: "디노새",
        category: "디노새",
        tags: ["강릉맛집", "제육볶음", "출장기록", "부부여행"],
        views: 342,
        comments: 1,
    },

    // 3. Feed List Posts (Generated)
    {
        id: "feed-list-1",
        slug: "gondre-rice",
        title: "곤드레밥 맛집, 마루곳간",
        excerpt: "지난번에 산 TV가 오늘 오후 2시에 설치하러 올 거라는 연락을 받고 재활운동을 끝내고 나니 12시다. 집에 가서 점심 먹고 집안 음식냄새를 없애려면...",
        content: "<p>곤드레 향이 가득한 밥상...</p>",
        coverImage: "https://images.unsplash.com/photo-1626804475297-411db1426433?q=80&w=1000&auto=format&fit=crop",
        date: "5일 전",
        author: "데레사의 꿈꾸는 세상",
        category: "여행·맛집",
        tags: ["곤드레밥", "한식"],
        views: 54,
        comments: 86,
    },
    {
        id: "feed-list-2",
        slug: "sydney-bistro",
        title: "40도 한여름! 가장 뜨거운 시드니 바다뷰 맛집 Bathers' Bistro에서 점심 코스 먹은 후기",
        excerpt: "시드니의 여름은 뜨겁다. 하지만 그만큼 바다는 더 푸르고 아름답다. 발모랄 비치 근처에서 즐긴 완벽한 점심 식사.",
        content: "<p>시드니의 여름...</p>",
        coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop",
        date: "6일 전",
        author: "룰루제이 호주 라이프",
        category: "여행·맛집",
        tags: ["시드니", "호주여행", "맛집"],
        views: 42,
        comments: 12,
    },
    {
        id: "feed-list-3",
        slug: "plant-care",
        title: "겨울철 실내 관엽식물 관리하는 방법 (물주기, 습도조절)",
        excerpt: "건조한 겨울철, 식물들이 시들지 않게 관리하는 나만의 노하우. 가습기가 없다면 이렇게 해보세요.",
        content: "<p>식물 집사의 겨울 나기...</p>",
        coverImage: "https://images.unsplash.com/photo-1459156212016-c812468e2115?q=80&w=1000&auto=format&fit=crop",
        date: "1주일 전",
        author: "초록손가락",
        category: "리빙·스타일",
        tags: ["식물관리", "가드닝", "겨울"],
        views: 128,
        comments: 34,
    },
];

// Helper to get more posts
export const getMockPosts = (count: number = 10) => {
    // Return existing + generated
    const generated = Array.from({ length: Math.max(0, count - MOCK_POSTS.length) }).map((_, i) => ({
        ...MOCK_POSTS[i % MOCK_POSTS.length],
        id: `gen-${i}`,
        slug: `post-gen-${i}`,
        title: `[예시 포스트 ${i + 1}] 더 많은 콘텐츠 보기`,
        date: `${i + 2}일 전`,
    }));
    return [...MOCK_POSTS, ...generated].slice(0, count);
}
