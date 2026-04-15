import { Timeline, getPixelAtTime, getTimeAtPixel, timebarTestIds } from "@famiprog-foundation/react-gantt";
import { Scenario, render, tad } from "@famiprog-foundation/tests-are-demo";
import moment from "moment";
import { markerTestIds } from "../../../src/components/Marker";
import { Main, backgroundLayerStoriesTestIds, month } from "../stories/backgroundLayer/BackgroundLayer.stories";

const TIME1 = month.clone().add(2, 'day');
const TIME2 = month.clone().add(4, 'day');

export class NowMarkerTestsAreDemo {

    private realDateNow = Date.now;

    async before() {
        console.log("before");
        this.nowMockUp(moment(TIME1));
        render(<Main />);
    }

    async after() {
        this.resetNowMockUp();
    }

    /**
     * @img now_marker.png
     */
    @Scenario()
    _quickInstructions() {
    }

    /**
     * * GIVEN a BackgroundLayer.nowMarker = true 
     * * THEN now marker is visible
     */
    @Scenario()
    async featureNowMarker() {
        this.nowMockUp(moment(TIME1));
        tad.ref('GIVEN');
        const timeline: Timeline = tad.getObjectViaCheat(Timeline, 'r9k1');
        const ganttLeftOffset = timeline.getGanttLeftOffset();
        const nowMarker = tad.screenCapturing.getByTestId('r9k1_' + markerTestIds.marker + '_-1');

        // We choose to use .showSpotlight instead of cc because we want to avoid focusing on now marker 
        // because the message is displayed below the now marker and is hidden because of the scroll
        await tad.showSpotlight({ message: "Given BackgroundLayer.nowMarker = true", focusOnLastElementCaptured: false });

        tad.ref('THEN');
        await tad.showSpotlight({ message: "Now marker is visible and indicates the current time", focusOnLastElementCaptured: false });
        await tad.assertWaitable.exists(nowMarker);
        const expectedLeft = getPixelAtTime(
            moment(Date.now()),
            timeline.getStartDate(),
            timeline.getEndDate(),
            timeline.getTimelineWidth(undefined)
        );
        await tad.assertWaitable.equal(Math.round(nowMarker.getBoundingClientRect().x - ganttLeftOffset), Math.round(expectedLeft));
    }

    /**
     * * GIVEN BackgroundLayer.nowMarker = true and BackgroundLayer.nowMarkerLiveUpdate = true
     * * WHEN some time is passing by
     * * THEN the now marker is updating
     * * AND the timeline is scrolling so the now marker stays in the display interval
     */
    @Scenario()
    async featureNowMarkerLiveUpdate() {
        try {
            this.nowMockUp(moment(TIME1));
            // Wait for gantt to reset to TIME1
            await new Promise(r => setTimeout(r, 1100));

            const timeline: Timeline = tad.getObjectViaCheat(Timeline, 'r9k1');
            const ganttLeftOffset = timeline.getGanttLeftOffset();
            const nowMarker = tad.screenCapturing.getByTestId('r9k1_' + markerTestIds.marker + '_-1') as HTMLElement | null;
            const initialNowMarkerPosition = Math.round(nowMarker.getBoundingClientRect().x - ganttLeftOffset);

            tad.ref('GIVEN');
            await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(backgroundLayerStoriesTestIds.liveUpdateCheckbox));
            await new Promise(r => setTimeout(r, 1000));

            tad.ref('WHEN');
            this.nowMockUp(moment(TIME2));
            await new Promise(r => setTimeout(r, 1100));

            tad.ref('THEN');
            await tad.showSpotlight({ message: "As time passes by, the now marker updates in real time", focusOnLastElementCaptured: false });

            const time2Px = Math.round(this.getPixelsAtTime(TIME2));
            // If we put the focus on the now marker, the popup from the tad library appears below the now indicator
            // A extra scrollbar to appears causing a 9px difference from the expected
            tad.screenCapturing.getByTestId("r9k1_" + timebarTestIds.timebarItem + "_12") as HTMLElement | null;
            await tad.assertWaitable.equal(Math.round(nowMarker.getBoundingClientRect().x - ganttLeftOffset), time2Px);

            tad.ref('AND');
            await tad.showSpotlight({ message: "AND the timeline is scrolling so the now marker stays in the display interval", focusOnLastElementCaptured: false });
            // don't know why sometimes there is a small difference of some pixels
            await tad.assertWaitable.include([initialNowMarkerPosition - 1, initialNowMarkerPosition, initialNowMarkerPosition + 1], Math.round(nowMarker.getBoundingClientRect().x - ganttLeftOffset));
        } finally {
            // Rest the time back to Time1
            this.nowMockUp(moment(TIME1));
            await tad.cc("Reset the live update checkbox");
            await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(backgroundLayerStoriesTestIds.liveUpdateCheckbox));
        }
    }

    /**
     * * GIVEN BackgroundLayer.nowMarkerLiveUpdate = true and nowMarkerLiveUpdateInterval = 1000ms
     * * WHEN1 we wait less than 1000ms after jumping in time
     * * THEN1 the now marker did not yet move
     * * WHEN2 we wait more than 1000ms
     * * THEN2 the now marker has moved to the new time position
     */
    @Scenario()
    async featureNowMarkerLiveUpdateInterval() {
        this.nowMockUp(moment(TIME1));
        const timeline: Timeline = tad.getObjectViaCheat(Timeline, 'r9k1');
        const ganttLeftOffset = timeline.getGanttLeftOffset();
        const nowMarker = tad.screenCapturing.getByTestId('r9k1_' + markerTestIds.marker + '_-1') as HTMLElement | null;

        const getNowMarkerX = () => (tad.screenCapturing.getByTestId('r9k1_' + markerTestIds.marker + '_-1') as HTMLElement).getBoundingClientRect().x - ganttLeftOffset;
        const initialX = getNowMarkerX();

        tad.ref('GIVEN');
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(backgroundLayerStoriesTestIds.liveUpdateCheckbox));
        await new Promise(r => setTimeout(r, 1000));

        tad.ref('WHEN1');
        await tad.showSpotlight({ message: "The now marker updates but not instantly (only after nowMarkerLiveUpdateInterval i.e. 1 second)", focusOnLastElementCaptured: false });
        this.nowMockUp(moment(TIME2));
        await new Promise(r => setTimeout(r, 200)); // < 1000ms
        tad.screenCapturing.getByTestId("r9k1_" + timebarTestIds.timebarItem + "_12") as HTMLElement | null;
        
        tad.ref('THEN1');
        await tad.assertWaitable.equal(Math.round(nowMarker.getBoundingClientRect().x - ganttLeftOffset), Math.round(initialX));

        tad.ref('WHEN2');
        await new Promise(r => setTimeout(r, 900)); // total 1100ms > 1000ms

        await tad.showSpotlight({ message: "the now marker has moved to the new time position", focusOnLastElementCaptured: false });
        tad.ref('THEN2');
        const expectedLeft = this.getPixelsAtTime(TIME2);
        await tad.assertWaitable.equal(Math.round(getNowMarkerX()), Math.round(expectedLeft));

        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(backgroundLayerStoriesTestIds.liveUpdateCheckbox));
    }

    getPixelsAtTime(date) {
        const timeline = tad.getObjectViaCheat(Timeline, 'r9k1');
        return getPixelAtTime(moment(date), timeline.getStartDate(), timeline.getEndDate(), timeline.getTimelineWidth(undefined));
    }

    getTimeAtPixel(pixels) {
        const timeline = tad.getObjectViaCheat(Timeline, 'r9k1');
        return getTimeAtPixel(pixels, timeline.getStartDate(), timeline.getEndDate(), timeline.getTimelineWidth(undefined));
    }

    nowMockUp(date) {
        const fixedNow = moment(date);
        Date.now = () => fixedNow.valueOf();
    }

    resetNowMockUp() {
        Date.now = this.realDateNow;
    }
}