import { keyframes, Keyframes } from 'styled-components';
import { Property } from 'csstype';

export const AnimationDuration = 700;
export const AnimationEasing = "cubic-bezier(.6,0,.4,1)";

interface Animation {
    keyframes: Keyframes;
    duration: number;
    timing: string;
    fill: Property.Fill;
    delay?: Property.AnimationDelay;
    origin?: Property.TransformOrigin;
    onTop?: boolean;
}

const animationDuration = 1000;
const animationTiming = "cubic-bezier(.6,0,.4,1)";

const animations = {
    rotateRoomLeftOut: {
        keyframes: keyframes`
          from { }
          to { opacity: 0.3; transform: translateX(-100%) rotateY(90deg); }
        `,
        duration: animationDuration,
        timing: animationTiming,
        fill: 'both',
        origin: '100% 50%'
    },
    rotateRoomLeftIn: {
        keyframes: keyframes`
          from { opacity: 0.3; transform: translateX(100%) rotateY(-90deg); }
        `,
        duration: animationDuration,
        timing: animationTiming,
        fill: 'both',
        origin: '0% 50%'
    },
    rotateRoomRightOut: {
        keyframes: keyframes`
          from { }
          to { opacity: 0.3; transform: translateX(100%) rotateY(-90deg); }
        `,
        duration: animationDuration,
        timing: animationTiming,
        fill: 'both',
        origin: '0% 50%'
    },
    rotateRoomRightIn: {
        keyframes: keyframes`
          from { opacity: 0.3; transform: translateX(-100%) rotateY(90deg); }
        `,
        duration: animationDuration,
        timing: animationTiming,
        fill: 'both',
        origin: '100% 50%'
    },
    rotateRoomTopOut: {
        keyframes: keyframes`
          from { }
          to { opacity: 0.3; transform: translateY(-100%) rotateX(-90deg); }
        `,
        duration: animationDuration,
        timing: animationTiming,
        fill: 'both',
        origin: '50% 100%'
    },
    rotateRoomTopIn: {
        keyframes: keyframes`
          from { opacity: 0.3; transform: translateY(100%) rotateX(90deg); }
        `,
        duration: animationDuration,
        timing: animationTiming,
        fill: 'both',
        origin: '50% 0%'
    },
    rotateRoomBottomOut: {
        keyframes: keyframes`
          from { }
          to { opacity: 0.3; transform: translateY(100%) rotateX(90deg); }
        `,
        duration: animationDuration,
        timing: animationTiming,
        fill: 'both',
        origin: '50% 0%'
    },
    rotateRoomBottomIn: {
        keyframes: keyframes`
          from { opacity: 0.3; transform: translateY(-100%) rotateX(-90deg); }
        `,
        duration: animationDuration,
        timing: animationTiming,
        fill: 'both',
        origin: '50% 100%'
    },
};

export { animations, Animation };