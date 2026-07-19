# Hero video

Drop an `hero-bg.mp4` file in this folder (`public/videos/hero-bg.mp4`) and the
landing page hero at [src/components/site/hero-section.tsx](../../src/components/site/hero-section.tsx)
will play it automatically as the background video.

Recommended: a short (10-20s), silent, looping clip of an abstract blockchain
network / data / particle animation, 1920x1080, under ~8MB, H.264 mp4.

If no file is present (or it fails to load), the hero gracefully falls back to
the animated particle-network canvas background, so the page still looks
complete without it.
