interface TrackSteps {
    id: number;
    track_id: number;
    step_type: string;
    step_id: number;
    position: number;
    is_published: boolean;
    step: Steps;
}

interface Steps {
    id: number;
    title: string;
    duration: number;
    video_url: string;
    image_url: string;
}

interface Tracks {
    id: number;
    course_id: number;
    title: string;
    position: number;
    track_steps: TrackSteps[];
}
