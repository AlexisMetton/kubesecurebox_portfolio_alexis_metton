import Head from 'next/head'
import Link from 'next/link'
import { Header, BackgroundImages } from '@/components'
import { mainData } from '@/lib/data'

export default function Custom404() {
    return (
        <>
            <Head>
                <title>404 - Page non trouvée - {mainData.websiteTitle}</title>
                <meta name="description" content="La page que vous recherchez n'existe pas ou a été déplacée." />
                <meta name="robots" content="noindex, nofollow" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                
                {/* Canonical URL vers la page d'accueil */}
                <link rel="canonical" href={mainData.canonical} />
                
                {/* Open Graph */}
                <meta property="og:type" content="website" />
                <meta property="og:title" content={`404 - Page non trouvée - ${mainData.websiteTitle}`} />
                <meta property="og:description" content="La page que vous recherchez n'existe pas ou a été déplacée." />
                <meta property="og:image" content={mainData.ogImage} />
                <meta property="og:url" content={mainData.canonical} />
                
                {/* Twitter Card */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`404 - Page non trouvée - ${mainData.websiteTitle}`} />
                <meta name="twitter:description" content="La page que vous recherchez n'existe pas ou a été déplacée." />
            </Head>
            <div className="container">
                {/* Header */}
                <Header />
                {/* Main row */}
                <div className="row g-4 g-lg-5">
                    <div className="col-12">
                        <div className="sections-wrapper">
                            {/* 404 Section */}
                            <section id="404" className="section" style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="text-center">
                                    <div className="mb-4">
                                        <i className="bi bi-exclamation-triangle" style={{ fontSize: '5rem', color: '#dc3545' }}></i>
                                    </div>
                                    <h1 className="display-1 fw-bold mb-3">404</h1>
                                    <h2 className="h3 mb-4">Page non trouvée</h2>
                                    <p className="lead mb-4">
                                        Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
                                    </p>
                                    <Link href="/" className="button button-dark">
                                        <i className="bi bi-house-door me-2"></i>
                                        Retour à l'accueil
                                    </Link>
                                </div>
                            </section>
                        </div>
                    </div>
                </div> {/* end main row */}
                {/*Background Vertical lines  */}
                <BackgroundImages />
            </div>
        </>
    )
}
