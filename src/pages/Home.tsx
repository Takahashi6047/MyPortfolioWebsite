import { Layout } from '../components/Layout';
import { Hero } from '../sections/Hero';
import { Services } from '../sections/Services';
import { Works } from '../sections/Works';
import { DigitalArtistry } from '../sections/DigitalArtistry';
import { Contact } from '../sections/Contact';
import { TransitionMarquee } from '../sections/TransitionMarquee';
import { Statement } from '../sections/Statement';
import { useRipple } from '../global/overlay/themeOverlay/RippleContext';

interface HomeProps {
    isLoadingComplete: boolean;
}

export function Home({ isLoadingComplete }: HomeProps) {
    const { theme } = useRipple();

    return (
        <Layout>
            <Hero isLoadingComplete={isLoadingComplete} />
            <Statement />
            <Services />
            {theme === 'light' ? <Works /> : <DigitalArtistry />}
            <TransitionMarquee />
            <Contact />
        </Layout>
    );
}
