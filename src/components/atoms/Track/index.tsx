import { ITrackModel } from "../../../types/ITrackModel";

interface Props {
    track: ITrackModel,
    children?: React.ReactNode;
}

function Track({ track, children }: Props) {
    return (
        <>
            <span className='artist'>{track.artistName}</span>
            <span className='dark'> - </span>
            <span className="track">{track.name}</span>
            {children}
        </>
    );
}

export default Track;
