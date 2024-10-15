import { ITrackModel } from "../../../types/ITrackModel";

interface Props {
    track: ITrackModel,
    children?: React.ReactNode;
}

function Track({ track, children }: Props) {
    return (
        <>
            <span className="track">{track.name}</span>
            <span className='dark'> - </span>
            <span className='artist'>{track.artistName}</span>
            {children}
        </>
    );
}

export default Track;
