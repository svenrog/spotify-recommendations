interface Props {
    trackId: string;
    height?: number;
}

function Embed({ trackId, height = 233 }: Props) {
    return (
        <iframe
            src={`https://open.spotify.com/embed/track/${trackId}`}
            width="100%"
            height={height}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
        ></iframe>
    );
}

export default Embed;
