import { Scenario, render, tad } from "@famiprog-foundation/tests-are-demo";
import moment from "moment";
import { rightClick } from "./testUtils";
import { contextMenuTestIds } from "../../../src/components/ContextMenu/ContextMenu";
import { zoomStoriesTestIds } from "../stories/zoom/Zoom.stories";
import Timeline, { ZOOM_PERCENT, timelineTestids as testids } from "../../../src/timeline";
import { Main } from "../stories/zoom/Zoom.stories";

export class ZoomTestsAreDemo {

    timeline: Timeline;

    async before() {
        render(<Main />);
        this.timeline = tad.getObjectViaCheat(Timeline, "2");
    }

    private openContextMenu() {
        const firstRow = tad.screenCapturing.getByTestId("2_" + testids.row + "_0");
        const clickPosition = { clientX: Math.round(firstRow.getBoundingClientRect().x) + 40, clientY: Math.round(firstRow.getBoundingClientRect().y) + 40 };
        rightClick(firstRow, clickPosition);
    }

    private focusOnTimebar() {
        // focus screenCapturing on timeBar
        tad.screenCapturing.getByTestId("2_" + testids.timeBar);
    }

    private calculateExpetedStartEndDate(start: number | moment.Moment, end: number | moment.Moment, zoomIn: boolean) {
        const interval = moment(end).valueOf() - moment(start).valueOf();
        const delta = (Math.floor((this.timeline._gridDomNode as Element).getBoundingClientRect().x + this.timeline._grid.props.width / 2) - this.timeline.getGanttLeftOffset()) / this.timeline._grid.props.width;
        let deltaInterval = interval * ZOOM_PERCENT;
        if (zoomIn) {
            deltaInterval *= -1;
        }
        let startDate = moment(Math.max((this.timeline.getMinDate() as unknown as moment.Moment).valueOf(), moment(start).valueOf() + delta * deltaInterval));
        let endDate = moment(Math.min((this.timeline.getMaxDate() as unknown as moment.Moment).valueOf(), moment(end).valueOf() - (1 - delta) * deltaInterval));
        return { expetedStartDate: startDate, expetedEndDate: endDate };
    }

    @Scenario("WHEN the gantt was maxim zoom out AND click on zoom out, THEN the startDate and endDate not changed")
    async whenMaxZoomOutClickZoomOut() {
        // When initially opened, the gantt has a small horizontal scroll to be able to see what is behind the vertical scroll
        // That's why you can zoom out once
        this.openContextMenu();
        const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        await tad.userEventWaitable.click(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_1"));
        
        // Here the gantt is maximum zoomed out
        const initialStartDate = this.timeline.state.startDate;
        const initialEndDate = this.timeline.state.endDate;
        
        this.openContextMenu();
        await tad.userEventWaitable.click(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_1"));
        this.focusOnTimebar();
        await tad.assertWaitable.equal(moment(initialStartDate).valueOf(), moment(this.timeline.state.startDate).valueOf());
        await tad.assertWaitable.equal(moment(initialEndDate).valueOf(), moment(this.timeline.state.endDate).valueOf());
    }

    @Scenario("When click zoomIn from context menu, THEN zoomed in AND show the message `Zoomed in` with fade effect.")
    async whenClickZoomIn() {
        this.openContextMenu();
        const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        const { expetedStartDate, expetedEndDate } = this.calculateExpetedStartEndDate(this.timeline.state.startDate, this.timeline.state.endDate, false);
        await tad.userEventWaitable.click(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_0"));
        // need to extract the startDate, endDate after zoom, because the scroll update this values
        const { startDate, endDate } = this.timeline.state;
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId("2_" + testids.fadeEffect));
        this.focusOnTimebar();
        await tad.assertWaitable.equal(moment(expetedStartDate).valueOf(), moment(startDate).valueOf());
        await tad.assertWaitable.equal(moment(expetedEndDate).valueOf(), moment(endDate).valueOf());
    }

    @Scenario("When click zoomOut from context menu, THEN zoomed in AND show the message `Zoomed out` with fade effect.")
    async whenClickZoomOut() {
        this.openContextMenu();
        const popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        const { expetedStartDate, expetedEndDate } = this.calculateExpetedStartEndDate(this.timeline.state.startDate, this.timeline.state.endDate, true);
        await tad.userEventWaitable.click(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_1"));
        // need to extract the startDate, endDate after zoom, because the scroll update this values
        const { startDate, endDate } = this.timeline.state;
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId("2_" + testids.fadeEffect));
        this.focusOnTimebar();
        await tad.assertWaitable.equal(moment(expetedStartDate).valueOf(), moment(startDate).valueOf());
        await tad.assertWaitable.equal(moment(expetedEndDate).valueOf(), moment(endDate).valueOf());
    }

    @Scenario("When `Zoom enabled` is checked/unchecked AND we click zoomIn/zoomOut from context menu, THEN the gantt zooms/ doesn't zoom in accordingly")
    async whenClickZoomEnabled() {
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(zoomStoriesTestIds.zoomEnabledCheckbox));
        this.openContextMenu();
        let popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        let expetedStartDate = this.timeline.state.startDate;
        let expetedEndDate = this.timeline.state.endDate;
        await tad.userEventWaitable.click(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_1"));
        // need to extract the startDate, endDate after zoom, because the scroll update this values
        let { startDate, endDate } = this.timeline.state;
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId("2_" + testids.fadeEffect));
        this.focusOnTimebar();
        await tad.assertWaitable.equal(moment(expetedStartDate).valueOf(), moment(startDate).valueOf());
        await tad.assertWaitable.equal(moment(expetedEndDate).valueOf(), moment(endDate).valueOf());


        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(zoomStoriesTestIds.zoomEnabledCheckbox));
        this.openContextMenu();
        popup = tad.screenCapturing.getByTestId(contextMenuTestIds.popup);
        ({ expetedStartDate, expetedEndDate } = this.calculateExpetedStartEndDate(this.timeline.state.startDate, this.timeline.state.endDate, true));
        await tad.userEventWaitable.click(tad.withinCapturing(popup).getByTestId(contextMenuTestIds.menuItem + "_1"));
        // need to extract the startDate, endDate after zoom, because the scroll update this values
        ({ startDate, endDate } = this.timeline.state);
        await tad.assertWaitable.exists(tad.screenCapturing.getByTestId("2_" + testids.fadeEffect));
        this.focusOnTimebar();
        await tad.assertWaitable.equal(moment(expetedStartDate).valueOf(), moment(startDate).valueOf());
        await tad.assertWaitable.equal(moment(expetedEndDate).valueOf(), moment(endDate).valueOf());
    }
}