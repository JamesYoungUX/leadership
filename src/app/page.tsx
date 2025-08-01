import Navbar from "@/components/Navbar";
import ParallaxHero from "@/components/ParallaxHero";
import ScrollingLogoBar from "@/components/ScrollingLogoBar";
import InteractiveButtons from "@/components/InteractiveButtons";

export default function Home() {
  return (
    <div>
      <Navbar colorMode="dark" />
      <ParallaxHero />
      <ScrollingLogoBar />
      <InteractiveButtons />
      <section style={{ height: '150vh', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 32 }}>
        Scroll to see the parallax effect!
      </section>
    </div>
  );
}
