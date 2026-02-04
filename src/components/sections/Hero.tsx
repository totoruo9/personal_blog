import { Button } from "@/components/design-system/Button";
import { Badge } from "@/components/design-system/Badge";

export function Hero() {
    return (
        <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden bg-stone-900"> {/* Dark background fallback */}
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
                style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2070&auto=format&fit=crop")' }}
            >
                {/* Darker overlay for better text contrast/visibility */}
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10 container mx-auto px-4 text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center">
                    <Badge variant="stone" className="bg-white/90 backdrop-blur text-stone-900 border-none shadow-sm px-4 py-1 text-sm tracking-widest">
                        FEATURED STORY
                    </Badge>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-medium text-white italic drop-shadow-xl max-w-5xl mx-auto leading-tight">
                    "Finding Silence in the Chaos of Modern Life"
                </h1>

                <p className="text-lg md:text-xl text-white/90 font-body max-w-2xl mx-auto drop-shadow-md font-light leading-relaxed">
                    How to reconnect with nature and yourself in an increasingly digital world.
                </p>

                <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-earth hover:bg-stone-100 border-none shadow-lg font-bold min-w-[200px]">
                        Read Article
                    </Button>
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 hover:text-white backdrop-blur-sm min-w-[200px]">
                        Explore More
                    </Button>
                </div>
            </div>
        </section>
    );
}
