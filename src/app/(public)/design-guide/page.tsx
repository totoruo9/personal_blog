"use client";

import React, { useState } from "react";
import { Button } from "@/components/design-system/Button";
import { Input } from "@/components/design-system/Input";
import { Badge } from "@/components/design-system/Badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/design-system/Alert";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/design-system/Card";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Modal } from "@/components/design-system/Modal";
import { Feather, Info, CheckCircle, Layout, Type, Palette, MousePointer, Grid, Circle, AlertTriangle, XCircle, BoxSelect, Globe, Languages, Search, ChevronDown, Check, ToggleLeft, ToggleRight, Bookmark, Share2, Home, User, Bell } from "lucide-react";

// --- Translations ---
type Language = 'ko' | 'en';

const content = {
    en: {
        hero: {
            version: "Design System v1.4",
            title: "TheManageGram UI",
            description: "A unified design language inspired by nature. Built with organic textures, earthy tones, and refined typography to create timeless digital experiences.",
            philosophyTitle: "Design Philosophy",
            philosophyDesc: "Our core philosophy is \"Organic Precision\". We merge the irregularity and warmth of natural textures (stone, linen, wood) with the mathematical rigor of a 4px grid system. Every element breathes within a structured chaotic harmony, providing a grounded yet modern digital experience.",
            naturalTitle: "Natural",
            naturalDesc: "Colors and tones drawn directly from earth and nature.",
            tactileTitle: "Tactile",
            tactileDesc: "Elevated surfaces and subtle organic shadows.",
            structuredTitle: "Structured",
            structuredDesc: "Strict 4px grid alignment for rhythm.",
            legibleTitle: "Legible",
            legibleDesc: "High contrast and refined typography.",
        },
        foundations: {
            title: "Foundations",
            desc: "Core visual elements that define the brand identity.",
            gridTitle: "4px Grid System",
            spacingScale: "Spacing Scale",
            gridDesc: "All spacing, sizing, height, margins, and padding are multiples of 4px (0.25rem).",
            colorPalette: "Color Palette",
            neutralOrganic: "Neutral & Organic",
            grayScale: "Gray Scale (50-900)",
            cornerRadius: "Corner Radius",
            typography: "Typography & Letter Spacing",
            displayTracking: "Display • Tracking Tight (-0.025em)",
            displayFontName: "Cormorant Garamond",
            headingTracking: "Heading • Tracking Normal",
            headingFontName: "Libre Baskerville",
            bodyTracking: "Body • Tracking Wide (0.025em)",
            bodyDesc: "Lato – Designed for legibility. Letter spacing is slightly increased for body text to improve readability on digital screens.",
        },
        alerts: {
            title: "Alerts & Feedback",
            desc: "Communicate status and important messages to the user.",
            defaultTitle: "Default Alert",
            defaultDesc: "This is a general information alert for neutral messages.",
            successTitle: "Success",
            successDesc: "Your changes have been saved successfully to the server.",
            warningTitle: "Warning",
            warningDesc: "Your account subscription is about to expire in 3 days.",
            errorTitle: "Error",
            errorDesc: "Failed to connect to the database. Please try again later.",
            usageTitle: "Alert Usage",
            dos: [
                "Use icons to reinforce the severity of the message.",
                "Keep titles concise and action-oriented.",
                "Place alerts at the top of the context they apply to."
            ],
            donts: [
                "Don't use alerts for permanent static content.",
                "Don't override semantic colors (e.g., green for error).",
                "Don't stack more than 2 alerts at once."
            ]
        },
        interactive: {
            title: "Form Inputs",
            desc: "Form elements for user input.",
            textInput: "Text Input",
            placeholder: "Enter text...",
            successState: "Success State",
            validEmail: "valid@email.com",
            validMessage: "Email format is valid",
            errorState: "Error State",
            invalidEmail: "invalid-email",
            errorMessage: "Invalid email format",
            warningState: "Warning State",
            weakPassword: "weakpassword",
            warningMessage: "Password strength is weak",
            disabledState: "Disabled State",
            disabledInput: "Disabled input",
            searchInput: "Search Input",
            searchPlaceholder: "Search...",
            select: "Select",
            textarea: "Textarea",
            textareaPlaceholder: "Enter multiple lines of text",
            checkboxOptions: "Checkbox Options",
            switch: "Switch",
            buttons: "Buttons", // Keep for button section
            buttonsDemo: ["Primary Action", "Secondary Action", "Outline Style", "Ghost Button", "Link Action"]
        },
        badgeMenu: {
            title: "Badge Menu",
            desc: "Badge-style menu UI.",
            tabMenu: "Tab Menu",
            filterMenu: "Filter Menu",
            badgeWithCount: "Badge Menu with Count",
            pillMenu: "Pill Menu",
            badgeWithIcons: "Badge Menu with Icons",
            tabs: ["All", "In Progress", "Completed", "Archived"],
            filters: ["Design", "Dev", "Marketing", "Business", "Support"],
            counts: { all: 124, unread: 23, important: 8, starred: 42 },
            pills: ["Daily", "Weekly", "Monthly", "Yearly"],
            icons: ["Home", "Search", "Notifications", "Profile"]
        },
        layout: {
            title: "Layout Patterns",
            desc: "Structural components for page composition.",
            headerTitle: "Global Header",
            headerBadge: "Sticky • Responsive",
            pageContentArea: "Page Content Area",
            heroTitle: "Hero Section",
            heroBadge: "Full Width • Immersive",
            footerTitle: "Global Footer",
        },
        contentCards: {
            title: "Content Cards",
            desc: "Containers for organizing information.",
            card1Title: "Organic Design",
            card1Desc: "Inspired by nature",
            card1Content: "Our design system uses natural colors and textures to create a calming...",
            card1Action: "Learn principles",
            card2Title: "Documentation",
            card2Desc: "Comprehensive guides",
            card2Content: "Every component is fully documented with props, variants...",
            card2Action: "View Docs",
            card3Title: "Article Layout",
            card3Desc: "Blog post preview",
            card3Content: "Standard layout for displaying blog posts...",
            horizontalTitle: "Horizontal Image Card",
            hCard1Badge: "Featured",
            hCard1Title: "Main Content Title",
            hCard1Desc: "Horizontal cards are suitable for displaying more text content. You can place the image side-by-side with a detailed description.",
            hCard1Action: "Read More",
            hCard1Share: "Share",
            hCard2Badge: "Tutorial",
            hCard2Title: "Tutorial: Getting Started",
            hCard2Desc: "Step-by-step tutorial for beginners. Learn from basic concepts to advanced features.",
            hCard2Action: "Start",
            hCard2Bookmark: "Bookmark"
        },
        popups: {
            title: "Pop-ups",
            desc: "Tooltips and small popup messages.",
            tooltipLabel: "Hover for tooltip",
            tooltipContent: "This is a helpful tooltip.",
            toastSuccess: "Success!",
            toastSuccessDesc: "Your changes have been saved.",
            toastUpdate: "New update available",
            toastUpdateDesc: "Version 2.0 is now available.",
            toastWarning: "Warning",
            toastWarningDesc: "You have unsaved changes.",
        },
        modals: {
            title: "Modals",
            desc: "Dialogs that require user action or attention.",
            basicTitle: "Basic Modal",
            basicModalTitle: "Modal Title",
            basicModalContent: "This is a basic modal dialog. It can contain any content you need, such as forms, images, or text. The modal has a backdrop that dims the background and focuses attention on the modal content.",
            confirmTitle: "Confirm Modal",
            deleteItem: "Delete item?",
            deleteDesc: "This action cannot be undone. Are you sure you want to delete this item permanently?",
            cancel: "Cancel",
            confirm: "Confirm",
            delete: "Delete",
            formTitle: "Form Modal",
            addNewItem: "Add New Item",
            itemTitleLabel: "Title",
            itemDescLabel: "Description",
            save: "Save",
        },
        icons: {
            title: "System Icons",
            desc: "Iconography used throughout the system.",
            viewAll: "View All Icons"
        }
    },
    ko: {
        hero: {
            version: "디자인 시스템 v1.4",
            title: "TheManageGram UI",
            description: "자연에서 영감을 받은 통합 디자인 언어입니다. 유기적인 텍스처, 흙내음 나는 톤, 정제된 타이포그래피로 시대를 초월한 디지털 경험을 선사합니다.",
            philosophyTitle: "디자인 철학",
            philosophyDesc: "우리의 핵심 철학은 \"유기적 정밀함(Organic Precision)\"입니다. 자연 질감(돌, 린넨, 나무)의 불규칙한 따스함과 4px 그리드 시스템의 수학적 엄밀함을 결합했습니다. 모든 요소는 구조화된 혼돈 속 조화 안에서 숨 쉬며, 안정감 있으면서도 현대적인 디지털 경험을 제공합니다.",
            naturalTitle: "자연스러움 (Natural)",
            naturalDesc: "대지와 자연에서 직접 추출한 색조와 톤.",
            tactileTitle: "촉각적 (Tactile)",
            tactileDesc: "입체적인 표면과 은은하고 유기적인 그림자.",
            structuredTitle: "구조적 (Structured)",
            structuredDesc: "리듬감을 부여하는 엄격한 4px 그리드 정렬.",
            legibleTitle: "가독성 (Legible)",
            legibleDesc: "높은 대비와 세련된 타이포그래피.",
        },
        foundations: {
            title: "파운데이션 (Foundations)",
            desc: "브랜드 아이덴티티를 정의하는 핵심 시각 요소입니다.",
            gridTitle: "4px 그리드 시스템",
            spacingScale: "간격 스케일 (Spacing Scale)",
            gridDesc: "모든 간격, 크기, 높이, 여백, 패딩은 4px(0.25rem)의 배수입니다.",
            colorPalette: "컬러 팔레트",
            neutralOrganic: "뉴트럴 & 오가닉",
            grayScale: "그레이 스케일 (50-900)",
            cornerRadius: "코너 라운드 (Corner Radius)",
            typography: "타이포그래피 & 자간",
            displayTracking: "Display • 자간 좁게 (-0.025em)",
            displayFontName: "송명 (Song Myung)",
            headingTracking: "Heading • 자간 보통",
            headingFontName: "나눔명조 (Nanum Myeongjo)",
            bodyTracking: "Body • 자간 넓게 (0.025em)",
            bodyDesc: "나눔고딕 (Nanum Gothic) – 디지털 가독성을 최우선으로 고려한 폰트입니다. 본문의 자간을 미세하게 넓혀 긴 글도 편안하게 읽을 수 있습니다.",
        },
        alerts: {
            title: "알림 & 피드백 (Alerts)",
            desc: "사용자에게 상태 및 중요 메시지를 전달합니다.",
            defaultTitle: "기본 알림",
            defaultDesc: "중립적인 메시지를 위한 일반 정보 알림입니다.",
            successTitle: "성공",
            successDesc: "변경 사항이 서버에 성공적으로 저장되었습니다.",
            warningTitle: "주의",
            warningDesc: "계정 구독이 3일 내에 만료됩니다.",
            errorTitle: "오류",
            errorDesc: "데이터베이스 연결에 실패했습니다. 나중에 다시 시도해 주세요.",
            usageTitle: "알림 사용 가이드",
            dos: [
                "아이콘을 사용하여 메시지의 중요도를 강조하세요.",
                "제목은 간결하고 행동 지향적으로 작성하세요.",
                "알림은 해당 문맥의 최상단에 배치하세요."
            ],
            donts: [
                "영구적인 정적 콘텐츠에 알림을 사용하지 마세요.",
                "의미론적 색상을 덮어쓰지 마세요 (예: 오류에 초록색 사용).",
                "한 번에 2개 이상의 알림을 쌓지 마세요."
            ]
        },
        interactive: {
            title: "Form Inputs",
            desc: "사용자 입력을 받는 폼 요소들",
            textInput: "Text Input",
            placeholder: "텍스트를 입력하세요",
            successState: "Success State",
            validEmail: "valid@email.com",
            validMessage: "이메일이 올바른 형식입니다",
            errorState: "Error State",
            invalidEmail: "invalid-email",
            errorMessage: "올바른 이메일 형식이 아닙니다",
            warningState: "Warning State",
            weakPassword: "weakpassword",
            warningMessage: "비밀번호 강도가 약합니다",
            disabledState: "Disabled State",
            disabledInput: "Disabled input",
            searchInput: "Search Input",
            searchPlaceholder: "검색...",
            select: "Select",
            textarea: "Textarea",
            textareaPlaceholder: "여러 줄의 텍스트를 입력하세요",
            checkboxOptions: "체크박스 옵션",
            switch: "스위치",
            buttons: "버튼 (Buttons)",
            buttonsDemo: ["주요 동작", "보조 동작", "아웃라인 스타일", "고스트 버튼", "링크 동작"]
        },
        badgeMenu: {
            title: "Badge Menu",
            desc: "배지 형태의 메뉴 UI",
            tabMenu: "Tab Menu",
            filterMenu: "Filter Menu",
            badgeWithCount: "Badge Menu with Count",
            pillMenu: "Pill Menu",
            badgeWithIcons: "Badge Menu with Icons",
            tabs: ["전체", "진행중", "완료", "보관됨"],
            filters: ["디자인", "개발", "마케팅", "비즈니스", "지원"],
            counts: { all: 124, unread: 23, important: 8, starred: 42 },
            pills: ["일간", "주간", "월간", "연간"],
            icons: ["홈", "검색", "알림", "프로필"]
        },
        layout: {
            title: "레이아웃 패턴",
            desc: "페이지 구성을 위한 구조적 컴포넌트입니다.",
            headerTitle: "글로벌 헤더",
            headerBadge: "스티키 • 반응형",
            pageContentArea: "페이지 콘텐츠 영역",
            heroTitle: "히어로 섹션",
            heroBadge: "전체 너비 • 몰입형",
            footerTitle: "글로벌 푸터",
        },
        contentCards: {
            title: "콘텐츠 카드",
            desc: "정보를 구조화하여 보여주는 컨테이너입니다.",
            card1Title: "유기적 디자인",
            card1Desc: "자연에서 영감받음",
            card1Content: "우리의 디자인 시스템은 자연의 색상과 질감을 사용하여 차분하고...",
            card1Action: "원칙 알아보기",
            card2Title: "문서화",
            card2Desc: "포괄적인 가이드",
            card2Content: "모든 컴포넌트는 개발자를 위해 속성(props), 변형(variants)...",
            card2Action: "문서 보기",
            card3Title: "아티클 레이아웃",
            card3Desc: "블로그 포스트 미리보기",
            card3Content: "이미지와 함께 블로그 포스트, 뉴스, 피드 항목을 표시하는 표준 레이아웃입니다.",
            horizontalTitle: "Horizontal Image Card",
            hCard1Badge: "Featured",
            hCard1Title: "주요 콘텐츠 제목",
            hCard1Desc: "가로형 이미지 카드는 더 많은 텍스트 콘텐츠를 표시하기에 적합합니다. 상세한 설명과 함께 이미지를 나란히 배치할 수 있습니다.",
            hCard1Action: "자세히 보기",
            hCard1Share: "공유",
            hCard2Badge: "Tutorial",
            hCard2Title: "튜토리얼: 시작하기",
            hCard2Desc: "초보자를 위한 단계별 튜토리얼입니다. 기본 개념부터 고급 기능까지 차근차근 배워보세요.",
            hCard2Action: "시작하기",
            hCard2Bookmark: "북마크"
        },
        popups: {
            title: "팝업 (Pop-ups)",
            desc: "툴팁 및 작은 팝업 메시지입니다.",
            tooltipLabel: "툴팁 확인 (Hover)",
            tooltipContent: "도움말 툴팁입니다.",
            toastSuccess: "성공!",
            toastSuccessDesc: "변경 사항이 저장되었습니다.",
            toastUpdate: "새 업데이트 가능",
            toastUpdateDesc: "버전 2.0을 지금 사용할 수 있습니다.",
            toastWarning: "주의",
            toastWarningDesc: "저장되지 않은 변경 사항이 있습니다.",
        },
        modals: {
            title: "모달 (Modals)",
            desc: "사용자의 행동이나 주의가 필요한 대화 상자입니다.",
            basicTitle: "기본 모달 (Basic Modal)",
            basicModalTitle: "모달 제목",
            basicModalContent: "기본 모달 대화 상자입니다. 폼, 이미지, 텍스트 등 필요한 모든 콘텐츠를 포함할 수 있습니다. 모달은 배경을 어둡게 처리하여 콘텐츠에 집중하게 합니다.",
            confirmTitle: "확인 모달 (Confirm Modal)",
            deleteItem: "아이템 삭제?",
            deleteDesc: "이 작업은 되돌릴 수 없습니다. 정말로 이 아이템을 영구적으로 삭제하시겠습니까?",
            cancel: "취소",
            confirm: "확인",
            delete: "삭제",
            formTitle: "폼 모달 (Form Modal)",
            addNewItem: "새 항목 추가",
            itemTitleLabel: "제목",
            itemDescLabel: "설명",
            save: "저장",
        },
        icons: {
            title: "시스템 아이콘",
            desc: "시스템 전반에 사용되는 아이콘입니다.",
            viewAll: "모든 아이콘 보기"
        }
    }
};

export default function DesignGuidePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [lang, setLang] = useState<Language>('ko'); // Default to Korean as per last request nuance, or 'en' if safer. User asked for ko toggle. Let's start with KO since they asked for it.

    const t = content[lang];

    const toggleLanguage = () => {
        setLang(prev => prev === 'ko' ? 'en' : 'ko');
    };

    return (
        <div className={`min-h-screen bg-background-secondary text-text-primary ${lang === 'ko' ? 'font-sans' : 'font-body'}`}>

            {/* 1. DOCUMENTATION HERO */}
            <div className="bg-stone-900 text-text-onStone py-24 px-6 md:px-12 border-b border-stone-800 relative overflow-hidden">

                {/* Language Toggle - Positioned above Design System text */}
                <div className="max-w-6xl mx-auto mb-8">
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-stone-800 border border-stone-700 text-stone-300 text-xs font-medium hover:bg-stone-700 hover:text-white transition-colors"
                    >
                        <Languages className="w-3.5 h-3.5" />
                        <span>{lang === 'ko' ? 'English' : '한국어'}</span>
                    </button>
                </div>

                <div className="max-w-6xl mx-auto space-y-8 relative z-10">
                    <div className="flex items-center gap-3 text-olive-300 mb-4">
                        <Feather className="w-6 h-6" />
                        <span className="text-sm font-mono tracking-widest uppercase">{t.hero.version}</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-display font-light italic tracking-tight text-white leading-tight">
                        {t.hero.title}
                    </h1>

                    <div className="grid md:grid-cols-2 gap-12 mt-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-heading text-stone-200">{t.hero.philosophyTitle}</h3>
                            <p className="text-lg font-light text-stone-400 leading-relaxed font-body">
                                {t.hero.philosophyDesc}
                            </p>
                        </div>
                        <div className="space-y-6 border-l border-stone-800 pl-8">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-stone-200 font-bold mb-2">{t.hero.naturalTitle}</h4>
                                    <p className="text-stone-500 text-sm">{t.hero.naturalDesc}</p>
                                </div>
                                <div>
                                    <h4 className="text-stone-200 font-bold mb-2">{t.hero.tactileTitle}</h4>
                                    <p className="text-stone-500 text-sm">{t.hero.tactileDesc}</p>
                                </div>
                                <div>
                                    <h4 className="text-stone-200 font-bold mb-2">{t.hero.structuredTitle}</h4>
                                    <p className="text-stone-500 text-sm">{t.hero.structuredDesc}</p>
                                </div>
                                <div>
                                    <h4 className="text-stone-200 font-bold mb-2">{t.hero.legibleTitle}</h4>
                                    <p className="text-stone-500 text-sm">{t.hero.legibleDesc}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 space-y-32">

                {/* 2. FOUNDATIONS */}
                <section id="foundations" className="space-y-16">
                    <SectionHeader icon={Palette} title={t.foundations.title} description={t.foundations.desc} />

                    {/* 4px Grid System */}
                    <div className="space-y-8">
                        <div className="flex items-center gap-3 mb-6">
                            <Grid className="w-5 h-5 text-text-tertiary" />
                            <h3 className="text-xl font-heading font-semibold">{t.foundations.gridTitle}</h3>
                        </div>
                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="bg-white border boundary-border-light rounded-lg p-8 relative overflow-hidden">
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                                <div className="relative space-y-4 z-10">
                                    <div className="flex gap-4">
                                        <div className="h-16 w-16 bg-olive/20 border border-olive flex items-center justify-center text-xs font-mono text-olive font-bold">64px</div>
                                        <div className="h-16 w-32 bg-stone/20 border border-stone flex items-center justify-center text-xs font-mono text-stone font-bold">128px</div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="h-4 w-4 bg-earth/50"></div>
                                        <div className="h-4 w-4 bg-earth/50"></div>
                                        <div className="h-4 w-4 bg-earth/50"></div>
                                        <div className="h-4 w-4 bg-earth/50"></div>
                                        <span className="text-xs font-mono text-text-tertiary ml-2">16px (4 units)</span>
                                    </div>
                                    <p className="text-sm text-text-secondary mt-4">
                                        {t.foundations.gridDesc}
                                    </p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <h4 className="font-bold text-sm">{t.foundations.spacingScale}</h4>
                                <div className="space-y-2 font-mono text-xs">
                                    <div className="flex items-center gap-4"><span className="w-12">0.25rem</span> <div className="h-1 w-1 bg-black"></div> <span>4px</span></div>
                                    <div className="flex items-center gap-4"><span className="w-12">0.5rem</span> <div className="h-2 w-2 bg-black"></div> <span>8px</span></div>
                                    <div className="flex items-center gap-4"><span className="w-12">1rem</span> <div className="h-4 w-4 bg-black"></div> <span>16px</span></div>
                                    <div className="flex items-center gap-4"><span className="w-12">1.5rem</span> <div className="h-6 w-6 bg-black"></div> <span>24px</span></div>
                                    <div className="flex items-center gap-4"><span className="w-12">2rem</span> <div className="h-8 w-8 bg-black"></div> <span>32px</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Colors */}
                        <div className="space-y-8">
                            <h3 className="text-xl font-heading font-semibold">{t.foundations.colorPalette}</h3>

                            <h4 className="font-bold text-sm text-text-tertiary uppercase tracking-wider mb-2">{t.foundations.neutralOrganic}</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                                <ColorSwatch name="Stone" hex="#B9B0A3" bg="bg-stone" text="text-text-onStone" />
                                <ColorSwatch name="Earth" hex="#563B29" bg="bg-earth" text="text-white" />
                                <ColorSwatch name="Olive" hex="#696B54" bg="bg-olive" text="text-white" />
                                <ColorSwatch name="Marble" hex="#B6B5AF" bg="bg-marble" text="text-text-primary" />
                                <ColorSwatch name="Linen" hex="#C5C3BD" bg="bg-linen" text="text-text-primary" />
                                <ColorSwatch name="White" hex="#FFFFFF" bg="bg-white" text="text-black" border />
                            </div>

                            <h4 className="font-bold text-sm text-text-tertiary uppercase tracking-wider mb-2">{t.foundations.grayScale}</h4>
                            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                                {[
                                    { level: 50, class: "bg-gray-50" },
                                    { level: 100, class: "bg-gray-100" },
                                    { level: 200, class: "bg-gray-200" },
                                    { level: 300, class: "bg-gray-300" },
                                    { level: 400, class: "bg-gray-400" },
                                    { level: 500, class: "bg-gray-500" },
                                    { level: 600, class: "bg-gray-600" },
                                    { level: 700, class: "bg-gray-700" },
                                    { level: 800, class: "bg-gray-800" },
                                    { level: 900, class: "bg-gray-900" },
                                ].map((item) => (
                                    <div key={item.level} className={`h-8 w-full ${item.class} border border-gray-200`} title={`Gray ${item.level}`}></div>
                                ))}
                            </div>
                        </div>

                        {/* Typography & Radius */}
                        <div className="space-y-12">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <Circle className="w-5 h-5 text-text-tertiary" />
                                    <h3 className="text-xl font-heading font-semibold">{t.foundations.cornerRadius}</h3>
                                </div>
                                <div className="flex gap-8 items-center bg-white p-8 rounded-lg border border-border-light">
                                    <div className="text-center space-y-2">
                                        <div className="w-16 h-16 bg-stone-200 border border-stone-400 rounded-sm mx-auto"></div>
                                        <span className="text-xs font-mono">sm (4px)</span>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <div className="w-16 h-16 bg-stone-200 border border-stone-400 rounded-md mx-auto"></div>
                                        <span className="text-xs font-mono">md (8px)</span>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <div className="w-16 h-16 bg-stone-200 border border-stone-400 rounded-lg mx-auto"></div>
                                        <span className="text-xs font-mono">lg (12px)</span>
                                    </div>
                                    <div className="text-center space-y-2">
                                        <div className="w-16 h-16 bg-stone-200 border border-stone-400 rounded-full mx-auto"></div>
                                        <span className="text-xs font-mono">full</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-xl font-heading font-semibold flex items-center gap-2">
                                    <Type className="w-5 h-5" /> {t.foundations.typography}
                                </h3>
                                <div className="space-y-8 bg-white p-8 rounded-lg border border-border-light shadow-sm">
                                    <div>
                                        <span className="text-xs text-text-tertiary uppercase tracking-widest mb-1 block">{t.foundations.displayTracking}</span>
                                        <p className="text-4xl font-display italic tracking-tight">{t.foundations.displayFontName}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-text-tertiary uppercase tracking-widest mb-1 block">{t.foundations.headingTracking}</span>
                                        <p className="text-3xl font-heading font-bold tracking-normal">{t.foundations.headingFontName}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs text-text-tertiary uppercase tracking-widest mb-1 block">{t.foundations.bodyTracking}</span>
                                        <p className="text-base font-body text-text-secondary leading-relaxed tracking-wide">
                                            {t.foundations.bodyDesc}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. ALERTS */}
                <section id="alerts" className="space-y-12">
                    <SectionHeader icon={AlertTriangle} title={t.alerts.title} description={t.alerts.desc} />

                    <div className="grid lg:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <Alert variant="default">
                                <Info className="h-4 w-4" />
                                <AlertTitle>{t.alerts.defaultTitle}</AlertTitle>
                                <AlertDescription>{t.alerts.defaultDesc}</AlertDescription>
                            </Alert>

                            <Alert variant="success">
                                <CheckCircle className="h-4 w-4" />
                                <AlertTitle>{t.alerts.successTitle}</AlertTitle>
                                <AlertDescription>{t.alerts.successDesc}</AlertDescription>
                            </Alert>

                            <Alert variant="warning">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>{t.alerts.warningTitle}</AlertTitle>
                                <AlertDescription>{t.alerts.warningDesc}</AlertDescription>
                            </Alert>

                            <Alert variant="destructive">
                                <XCircle className="h-4 w-4" />
                                <AlertTitle>{t.alerts.errorTitle}</AlertTitle>
                                <AlertDescription>{t.alerts.errorDesc}</AlertDescription>
                            </Alert>
                        </div>

                        <UsageGuideline
                            title={t.alerts.usageTitle}
                            dos={t.alerts.dos}
                            donts={t.alerts.donts}
                        />
                    </div>
                </section>

                {/* 4. FORM INPUTS */}
                <section id="components" className="space-y-12">
                    <SectionHeader icon={MousePointer} title={t.interactive.title} description={t.interactive.desc} />

                    <div className="bg-white p-8 md:p-12 rounded-lg border border-border-light shadow-sm space-y-12">
                        {/* Text Input */}
                        <div className="space-y-2 max-w-xl">
                            <label className="text-sm font-bold text-text-secondary">{t.interactive.textInput}</label>
                            <Input placeholder={t.interactive.placeholder} />
                        </div>

                        {/* Success State */}
                        <div className="space-y-2 max-w-xl">
                            <label className="text-sm font-bold text-text-secondary">{t.interactive.successState}</label>
                            <div className="relative">
                                <Input value={t.interactive.validEmail} className="border-semantic-success text-semantic-success focus-visible:ring-semantic-success bg-semantic-success/5 pr-10" readOnly />
                                <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-semantic-success" />
                            </div>
                            <p className="text-xs text-semantic-success flex items-center gap-1"><Check className="w-3 h-3" /> {t.interactive.validMessage}</p>
                        </div>

                        {/* Error State */}
                        <div className="space-y-2 max-w-xl">
                            <label className="text-sm font-bold text-text-secondary">{t.interactive.errorState}</label>
                            <div className="relative">
                                <Input value={t.interactive.invalidEmail} className="border-semantic-error text-semantic-error focus-visible:ring-semantic-error bg-semantic-error/5 pr-10" readOnly />
                                <AlertTriangle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-semantic-error" />
                            </div>
                            <p className="text-xs text-semantic-error flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {t.interactive.errorMessage}</p>
                        </div>

                        {/* Warning State */}
                        <div className="space-y-2 max-w-xl">
                            <label className="text-sm font-bold text-text-secondary">{t.interactive.warningState}</label>
                            <div className="relative">
                                <Input value={t.interactive.weakPassword} className="border-semantic-warning text-semantic-warning focus-visible:ring-semantic-warning bg-semantic-warning/5 pr-10" readOnly />
                                <Info className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-semantic-warning" />
                            </div>
                            <p className="text-xs text-semantic-warning flex items-center gap-1"><Info className="w-3 h-3" /> {t.interactive.warningMessage}</p>
                        </div>

                        {/* Disabled State */}
                        <div className="space-y-2 max-w-xl">
                            <label className="text-sm font-bold text-text-secondary">{t.interactive.disabledState}</label>
                            <Input value={t.interactive.disabledInput} disabled className="bg-background-tertiary" />
                        </div>

                        {/* Search Input */}
                        <div className="space-y-2 max-w-xl">
                            <label className="text-sm font-bold text-text-secondary">{t.interactive.searchInput}</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary" />
                                <Input className="pl-10 rounded-full" placeholder={t.interactive.searchPlaceholder} />
                            </div>
                        </div>

                        {/* Select */}
                        <div className="space-y-2 max-w-xl">
                            <label className="text-sm font-bold text-text-secondary">{t.interactive.select}</label>
                            <div className="relative">
                                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-earth focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none">
                                    <option>{t.interactive.placeholder}</option>
                                    <option>Option 1</option>
                                    <option>Option 2</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
                            </div>
                        </div>

                        {/* Textarea */}
                        <div className="space-y-2 max-w-xl">
                            <label className="text-sm font-bold text-text-secondary">{t.interactive.textarea}</label>
                            <textarea className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder={t.interactive.textareaPlaceholder}></textarea>
                        </div>

                        {/* Checkbox & Switch */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-text-secondary block">{t.interactive.checkboxOptions}</label>
                                <div className="flex gap-6">
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded border border-earth bg-earth text-white flex items-center justify-center"><Check className="w-3 h-3" /></div>
                                        <span className="text-sm font-bold">Checked</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-4 h-4 rounded border border-border-medium bg-white"></div>
                                        <span className="text-sm text-text-secondary">Unchecked</span>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-sm font-bold text-text-secondary block">{t.interactive.switch}</label>
                                <ToggleRight className="w-10 h-10 text-earth" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. BADGE MENU */}
                <section id="badge-menu" className="space-y-12">
                    <SectionHeader icon={Grid} title={t.badgeMenu.title} description={t.badgeMenu.desc} />

                    <div className="bg-white p-8 md:p-12 rounded-lg border border-border-light shadow-sm space-y-16">
                        {/* Tab Menu */}
                        <div className="space-y-4">
                            <h4 className="font-heading font-bold text-sm text-text-secondary uppercase tracking-wider">{t.badgeMenu.tabMenu}</h4>
                            <div className="flex flex-wrap gap-2 p-1 bg-background-tertiary w-fit rounded-lg">
                                {t.badgeMenu.tabs.map((tab: string, i: number) => (
                                    <button key={i} className={`px-4 py-2 text-sm font-bold rounded-md transition-all ${i === 0 ? 'bg-white shadow-sm text-text-primary' : 'text-text-tertiary hover:text-text-primary'}`}>
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Filter Menu */}
                        <div className="space-y-4">
                            <h4 className="font-heading font-bold text-sm text-text-secondary uppercase tracking-wider">{t.badgeMenu.filterMenu}</h4>
                            <div className="flex flex-wrap gap-3">
                                {['bg-indigo-100 text-indigo-700 border-indigo-200', 'bg-emerald-100 text-emerald-700 border-emerald-200', 'bg-amber-100 text-amber-700 border-amber-200', 'bg-rose-100 text-rose-700 border-rose-200', 'bg-sky-100 text-sky-700 border-sky-200'].map((colorClass, i) => (
                                    <span key={i} className={`px-4 py-1.5 rounded-full border text-xs font-bold ${colorClass}`}>
                                        {t.badgeMenu.filters[i]}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Badge Menu with Count */}
                        <div className="space-y-4">
                            <h4 className="font-heading font-bold text-sm text-text-secondary uppercase tracking-wider">{t.badgeMenu.badgeWithCount}</h4>
                            <div className="flex flex-wrap gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-bold">
                                    {t.badgeMenu.tabs[0]} <span className="bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">{t.badgeMenu.counts.all}</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light text-text-secondary rounded-full text-sm font-bold hover:bg-stone-50">
                                    {t.badgeMenu.tabs[1]} <span className="bg-semantic-error text-white px-1.5 py-0.5 rounded-full text-[10px]">{t.badgeMenu.counts.unread}</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light text-text-secondary rounded-full text-sm font-bold hover:bg-stone-50">
                                    {t.badgeMenu.tabs[2]} <span className="bg-semantic-warning text-white px-1.5 py-0.5 rounded-full text-[10px]">{t.badgeMenu.counts.important}</span>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light text-text-secondary rounded-full text-sm font-bold hover:bg-stone-50">
                                    {t.badgeMenu.tabs[3]} <span className="bg-border-medium text-text-primary px-1.5 py-0.5 rounded-full text-[10px]">{t.badgeMenu.counts.starred}</span>
                                </button>
                            </div>
                        </div>

                        {/* Pill Menu */}
                        <div className="space-y-4">
                            <h4 className="font-heading font-bold text-sm text-text-secondary uppercase tracking-wider">{t.badgeMenu.pillMenu}</h4>
                            <div className="inline-flex rounded-full border border-border-medium p-1 bg-white shadow-sm">
                                {t.badgeMenu.pills.map((pill: string, i: number) => (
                                    <button key={i} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${i === 0 ? 'bg-stone-900 text-white' : 'text-text-secondary hover:bg-stone-50'}`}>
                                        {pill}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Badge Menu with Icons */}
                        <div className="space-y-4">
                            <h4 className="font-heading font-bold text-sm text-text-secondary uppercase tracking-wider">{t.badgeMenu.badgeWithIcons}</h4>
                            <div className="flex flex-wrap gap-3">
                                <button className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white rounded-full text-sm font-bold shadow-md">
                                    <Home className="w-4 h-4" /> {t.badgeMenu.icons[0]}
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light text-text-primary rounded-full text-sm font-bold hover:bg-stone-50">
                                    <Search className="w-4 h-4" /> {t.badgeMenu.icons[1]}
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light text-text-primary rounded-full text-sm font-bold hover:bg-stone-50">
                                    <Bell className="w-4 h-4" /> {t.badgeMenu.icons[2]} <div className="w-2 h-2 bg-semantic-error rounded-full"></div>
                                </button>
                                <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border-light text-text-primary rounded-full text-sm font-bold hover:bg-stone-50">
                                    <User className="w-4 h-4" /> {t.badgeMenu.icons[3]}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 5. LAYOUT */}
                <section id="layout" className="space-y-12">
                    <SectionHeader icon={Layout} title={t.layout.title} description={t.layout.desc} />

                    <div className="space-y-12">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold">{t.layout.headerTitle}</h3>
                                <Badge variant="outline" className="text-xs">{t.layout.headerBadge}</Badge>
                            </div>
                            <div className="border border-border-medium rounded-lg overflow-hidden shadow-sm">
                                <Header />
                                <div className="bg-background-tertiary h-32 flex items-center justify-center text-text-quaternary font-mono text-sm">
                                    {t.layout.pageContentArea}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-bold">{t.layout.heroTitle}</h3>
                                <Badge variant="outline" className="text-xs">{t.layout.heroBadge}</Badge>
                            </div>
                            <div className="rounded-lg overflow-hidden shadow-md">
                                <Hero />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-bold">{t.layout.footerTitle}</h3>
                            <div className="border border-border-medium rounded-lg overflow-hidden">
                                <div className="bg-background-tertiary h-12"></div>
                                <Footer />
                            </div>
                        </div>
                    </div>
                </section>

                {/* 6. CONTENT CARDS */}
                <section id="content" className="space-y-12">
                    <SectionHeader icon={BoxSelect} title={t.contentCards.title} description={t.contentCards.desc} />

                    {/* Standard Cards */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <Card className="overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer">
                            <div className="aspect-[4/3] bg-stone-200 relative">
                                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-stone-900/0 transition-colors" />
                            </div>
                            <CardHeader>
                                <div className="text-xs font-bold text-earth uppercase tracking-widest mb-2">Philosophy</div>
                                <h3 className="font-heading font-bold text-xl">{t.contentCards.card1Title}</h3>
                                <p className="text-text-tertiary text-sm">{t.contentCards.card1Desc}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-text-secondary leading-relaxed">
                                    {t.contentCards.card1Content}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="link" className="px-0 group-hover:text-earth transition-colors">
                                    {t.contentCards.card1Action} &rarr;
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Card 2 */}
                        <Card className="overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer border-l-4 border-l-earth">
                            <CardHeader>
                                <Feather className="w-8 h-8 text-earth mb-4" />
                                <h3 className="font-heading font-bold text-xl">{t.contentCards.card2Title}</h3>
                                <p className="text-text-tertiary text-sm">{t.contentCards.card2Desc}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-text-secondary leading-relaxed">
                                    {t.contentCards.card2Content}
                                </p>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full group-hover:bg-earth group-hover:text-white group-hover:border-earth transition-all">
                                    {t.contentCards.card2Action}
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Card 3 */}
                        <Card className="overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer">
                            <div className="aspect-video bg-stone-100 flex items-center justify-center text-text-tertiary">
                                <span className="font-heading italic">Image Area</span>
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline">News</Badge>
                                    <span className="text-xs text-text-tertiary">2 min read</span>
                                </div>
                                <h3 className="font-heading font-bold text-lg">{t.contentCards.card3Title}</h3>
                            </CardHeader>
                            <CardContent>
                                <p className="text-text-secondary text-sm line-clamp-2">
                                    {t.contentCards.card3Content}
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Horizontal Cards */}
                    <div className="space-y-6 pt-8 border-t border-border-light">
                        <h4 className="font-heading font-bold text-xl text-text-primary border-b border-border-medium pb-2 inline-block pr-8">{t.contentCards.horizontalTitle}</h4>

                        {/* Horizontal Card 1 (Large) */}
                        <Card className="overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer bg-white">
                            <div className="flex flex-col md:flex-row h-full">
                                <div className="md:w-2/5 min-h-[240px] bg-stone-200 relative">
                                    <div className="absolute inset-0 flex items-center justify-center text-text-tertiary bg-stone-300/50">
                                        <span className="font-heading italic">Image Area (4:3)</span>
                                    </div>
                                </div>
                                <div className="md:w-3/5 p-6 md:p-8 flex flex-col justify-center">
                                    <div className="flex items-center justify-between mb-4">
                                        <Badge className="bg-earth text-white hover:bg-earth-dark">{t.contentCards.hCard1Badge}</Badge>
                                        <div className="flex gap-2">
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-text-tertiary hover:text-earth"><Bookmark className="w-4 h-4" /></Button>
                                            <Button size="icon" variant="ghost" className="h-8 w-8 text-text-tertiary hover:text-earth"><Share2 className="w-4 h-4" /></Button>
                                        </div>
                                    </div>
                                    <h3 className="font-heading font-bold text-2xl md:text-3xl mb-3 group-hover:text-earth transition-colors">{t.contentCards.hCard1Title}</h3>
                                    <p className="text-text-secondary leading-relaxed mb-6">
                                        {t.contentCards.hCard1Desc}
                                    </p>
                                    <div className="flex items-center gap-4 mt-auto">
                                        <div className="flex items-center gap-2 text-xs text-text-tertiary">
                                            <div className="w-8 h-8 rounded-full bg-stone-200"></div>
                                            <span>Author Name</span>
                                            <span>•</span>
                                            <span>Feb 24, 2024</span>
                                        </div>
                                        <Button variant="link" className="ml-auto px-0 text-earth font-bold">
                                            {t.contentCards.hCard1Action} &rarr;
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Card>

                        {/* Horizontal Card 2 (Compact) */}
                        <Card className="overflow-hidden hover:shadow-md transition-all duration-300 group cursor-pointer bg-background-tertiary border-none">
                            <div className="flex flex-col sm:flex-row h-full">
                                <div className="sm:w-32 sm:min-w-[128px] min-h-[128px] bg-white rounded-lg m-4 shadow-sm flex items-center justify-center text-earth">
                                    <Grid className="w-8 h-8" />
                                </div>
                                <div className="flex-1 p-4 sm:py-6 sm:pr-6 flex flex-col justify-center">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-xs font-bold text-earth uppercase tracking-wider">{t.contentCards.hCard2Badge}</span>
                                    </div>
                                    <h3 className="font-heading font-bold text-lg mb-2">{t.contentCards.hCard2Title}</h3>
                                    <p className="text-text-secondary text-sm mb-0">
                                        {t.contentCards.hCard2Desc}
                                    </p>
                                </div>
                                <div className="p-4 sm:py-6 sm:pr-6 flex items-center justify-end sm:justify-center">
                                    <Button variant="secondary" size="sm" className="rounded-full">{t.contentCards.hCard2Action}</Button>
                                </div>
                            </div>
                        </Card>
                    </div>
                </section>

                {/* 7. ICONS */}
                <section id="icons" className="space-y-12">
                    <SectionHeader icon={Grid} title={t.icons.title} description={t.icons.desc} />
                    <div className="bg-white p-12 rounded-lg border border-border-light shadow-sm">
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                            {[
                                { icon: Home, label: "Home" },
                                { icon: Search, label: "Search" },
                                { icon: Bell, label: "Notifications" },
                                { icon: User, label: "User" },
                                { icon: CheckCircle, label: "Success" },
                                { icon: AlertTriangle, label: "Warning" },
                                { icon: XCircle, label: "Error" },
                                { icon: Info, label: "Info" },
                                { icon: Feather, label: "Feather" },
                                { icon: Layout, label: "Layout" },
                                { icon: Type, label: "Typography" },
                                { icon: Palette, label: "Colors" },
                                { icon: MousePointer, label: "Interaction" },
                                { icon: Grid, label: "Grid" },
                                { icon: Bookmark, label: "Bookmark" },
                                { icon: Share2, label: "Share" },
                                { icon: ToggleRight, label: "Switch" },
                                { icon: Globe, label: "Web" },
                            ].map(({ icon: Icon, label }, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
                                    <div className="w-12 h-12 rounded-xl bg-background-tertiary flex items-center justify-center text-text-tertiary group-hover:bg-earth group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-md group-hover:-translate-y-1">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-xs font-medium text-text-tertiary group-hover:text-text-secondary">{label}</span>
                                </div>
                            ))}
                        </div>
                        <div className="mt-12 text-center">
                            <Button variant="outline" className="gap-2">
                                <Grid className="w-4 h-4" /> {t.icons.viewAll}
                            </Button>
                        </div>
                    </div>
                </section>

                {/* 7. POPUPS */}
                <section id="popups" className="space-y-12">
                    <SectionHeader icon={AlertTriangle} title={t.popups.title} description={t.popups.desc} />

                    <div className="bg-white p-12 rounded-lg border border-border-light shadow-sm">
                        <div className="grid lg:grid-cols-2 gap-12">
                            {/* Tooltips & Small Popups */}
                            <div className="space-y-8">
                                <h4 className="font-heading font-bold text-sm text-text-secondary uppercase tracking-wider">Tooltips</h4>
                                <div className="flex items-center gap-4">
                                    <div className="relative group">
                                        <Button variant="primary" size="sm" className="bg-stone-900 rounded-full px-6">{t.popups.tooltipLabel}</Button>
                                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-text-primary text-white text-xs rounded shadow-lg whitespace-nowrap opacity-100 transition-opacity">
                                            {t.popups.tooltipContent}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-text-primary"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Toast Notifications */}
                            <div className="space-y-6">
                                <h4 className="font-heading font-bold text-sm text-text-secondary uppercase tracking-wider">Toast Notifications</h4>

                                <div className="flex items-start gap-4 p-4 bg-semantic-success/10 border border-semantic-success/20 rounded-lg shadow-sm w-full max-w-md">
                                    <div className="p-1 bg-semantic-success rounded-full text-white mt-0.5"><CheckCircle className="w-3 h-3" /></div>
                                    <div className="flex-1">
                                        <h5 className="text-sm font-bold text-semantic-success">{t.popups.toastSuccess}</h5>
                                        <p className="text-xs text-text-secondary mt-0.5">{t.popups.toastSuccessDesc}</p>
                                    </div>
                                    <button className="text-text-tertiary hover:text-text-primary"><XCircle className="w-4 h-4" /></button>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-white border border-border-light rounded-lg shadow-md w-full max-w-md border-l-4 border-l-semantic-info">
                                    <div className="text-semantic-info mt-0.5"><Info className="w-5 h-5" /></div>
                                    <div className="flex-1">
                                        <h5 className="text-sm font-bold text-text-primary">{t.popups.toastUpdate}</h5>
                                        <p className="text-xs text-text-secondary mt-0.5">{t.popups.toastUpdateDesc}</p>
                                    </div>
                                    <button className="text-text-tertiary hover:text-text-primary"><XCircle className="w-4 h-4" /></button>
                                </div>

                                <div className="flex items-start gap-4 p-4 bg-semantic-warning/5 border border-semantic-warning/20 rounded-lg shadow-sm w-full max-w-md">
                                    <div className="text-semantic-warning mt-0.5"><AlertTriangle className="w-5 h-5" /></div>
                                    <div className="flex-1">
                                        <h5 className="text-sm font-bold text-text-primary">{t.popups.toastWarning}</h5>
                                        <p className="text-xs text-text-secondary mt-0.5">{t.popups.toastWarningDesc}</p>
                                    </div>
                                    <button className="text-text-tertiary hover:text-text-primary"><XCircle className="w-4 h-4" /></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 8. MODALS */}
                <section id="modals" className="space-y-12 pb-24">
                    <SectionHeader icon={Layout} title={t.modals.title} description={t.modals.desc} />

                    <div className="space-y-16">
                        {/* Basic Modal */}
                        <div className="space-y-4">
                            <h4 className="font-heading font-bold text-lg">{t.modals.basicTitle}</h4>
                            <div className="bg-stone-50 border border-stone-100 rounded-xl p-8 flex justify-center">
                                <div className="w-full max-w-md bg-white rounded-lg shadow-2xl border border-border-light overflow-hidden">
                                    <div className="p-4 border-b border-border-light flex justify-between items-center bg-background-secondary/30">
                                        <h3 className="font-heading font-bold text-lg">{t.modals.basicModalTitle}</h3>
                                        <XCircle className="w-4 h-4 text-text-tertiary cursor-pointer hover:text-text-primary" />
                                    </div>
                                    <div className="p-6 text-text-secondary text-sm leading-relaxed">
                                        {t.modals.basicModalContent}
                                    </div>
                                    <div className="p-4 bg-background-secondary/30 flex justify-end gap-2 border-t border-border-light">
                                        <Button variant="ghost" size="sm">{t.modals.cancel}</Button>
                                        <Button variant="primary" size="sm" className="bg-stone-900">{t.modals.confirm}</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Confirm Modal */}
                        <div className="space-y-4">
                            <h4 className="font-heading font-bold text-lg">{t.modals.confirmTitle}</h4>
                            <div className="bg-stone-50 border border-stone-100 rounded-xl p-8 flex justify-center">
                                <div className="w-full max-w-sm bg-white rounded-lg shadow-2xl border border-border-light overflow-hidden text-center p-6">
                                    <div className="w-12 h-12 bg-semantic-error/10 rounded-full flex items-center justify-center mx-auto mb-4 text-semantic-error">
                                        <AlertTriangle className="w-6 h-6" />
                                    </div>
                                    <h3 className="font-heading font-bold text-lg mb-2">{t.modals.deleteItem}</h3>
                                    <p className="text-text-secondary text-sm mb-6">
                                        {t.modals.deleteDesc}
                                    </p>
                                    <div className="flex gap-3 justify-center">
                                        <Button variant="outline" size="sm" className="w-full">{t.modals.cancel}</Button>
                                        <Button size="sm" className="w-full bg-semantic-error hover:bg-red-600 text-white border-transparent">{t.modals.delete}</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form Modal */}
                        <div className="space-y-4">
                            <h4 className="font-heading font-bold text-lg">{t.modals.formTitle}</h4>
                            <div className="bg-stone-50 border border-stone-100 rounded-xl p-8 flex justify-center">
                                <div className="w-full max-w-md bg-white rounded-lg shadow-2xl border border-border-light overflow-hidden">
                                    <div className="p-4 border-b border-border-light flex justify-between items-center">
                                        <h3 className="font-heading font-bold text-lg">{t.modals.addNewItem}</h3>
                                        <XCircle className="w-4 h-4 text-text-tertiary cursor-pointer hover:text-text-primary" />
                                    </div>
                                    <div className="p-6 space-y-4">
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-text-secondary">{t.modals.itemTitleLabel}</label>
                                            <Input placeholder={t.modals.itemTitleLabel} />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-sm font-bold text-text-secondary">{t.modals.itemDescLabel}</label>
                                            <textarea className="flex w-full rounded-sm border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[80px]" placeholder={t.modals.itemDescLabel}></textarea>
                                        </div>
                                    </div>
                                    <div className="p-4 flex justify-end gap-2 border-t border-border-light">
                                        <Button variant="ghost" size="sm">{t.modals.cancel}</Button>
                                        <Button variant="primary" size="sm" className="bg-stone-900">{t.modals.save}</Button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>

            </div>
            <Footer />
        </div>
    );
}

// ---------------- Helper Components ----------------
// ... (Keep existing helpers)

function SectionHeader({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="flex items-end justify-between border-b border-border-medium pb-6">
            <div>
                <h2 className="text-3xl font-heading font-bold flex items-center gap-3">
                    <Icon className="w-6 h-6 text-earth" /> {title}
                </h2>
                <p className="text-text-secondary mt-2">{description}</p>
            </div>
        </div>
    );
}

function ColorSwatch({ name, hex, bg, text, border = false }: { name: string, hex: string, bg: string, text: string, border?: boolean }) {
    return (
        <div className="space-y-2 group cursor-pointer">
            <div className={`aspect-square w-full rounded-xl shadow-sm ${bg} flex items-end p-4 transition-transform group-hover:scale-[1.02] ${border ? 'border border-gray-200' : ''}`}>
                <span className={`${text} font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity bg-black/10 backdrop-blur-sm px-2 py-1 rounded`}>
                    {hex}
                </span>
            </div>
            <div>
                <h4 className="font-heading font-bold text-sm">{name}</h4>
                <p className="text-xs text-text-tertiary font-mono">{hex}</p>
            </div>
        </div>
    );
}

function UsageGuideline({ title, dos, donts }: { title: string, dos: string[], donts: string[] }) {
    return (
        <div className="space-y-4 bg-stone-50 p-6 rounded-lg border border-stone-100">
            <h4 className="font-bold text-lg border-b border-stone-200 pb-2">{title} Guidelines</h4>
            <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-3">
                    <span className="text-semantic-success font-bold text-sm flex items-center gap-2"><CheckCircle className="w-4 h-4" /> DO</span>
                    <ul className="space-y-2">
                        {dos.map((item, i) => (
                            <li key={i} className="text-sm text-text-secondary flex gap-2 items-start text-left">
                                <span className="text-semantic-success block mt-1">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-3">
                    <span className="text-semantic-error font-bold text-sm flex items-center gap-2"><XCircle className="w-4 h-4" /> DON'T</span>
                    <ul className="space-y-2">
                        {donts.map((item, i) => (
                            <li key={i} className="text-sm text-text-secondary flex gap-2 items-start text-left">
                                <span className="text-semantic-error block mt-1">•</span> {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
