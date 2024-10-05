interface Props {
  trackId: string;
  height?: number;
}

function Embed({ trackId, height }: Props) {
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

Embed.defaultProps = {
  height: 312,
};

export default Embed;
