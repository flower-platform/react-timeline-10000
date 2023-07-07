import { Only, Scenario, ScenarioOptions, render, tad } from "@famiprog-foundation/tests-are-demo";
import { Main, tasksCount } from "../stories/basic/Basic.stories";
import Timeline, { timelineTestids as testids } from "../timeline";
import AnchorLink from "antd/lib/anchor/AnchorLink";

/**
* @author Daniela Buzatu
*/
export class SelectedItemsTestsAreDemo {
    async before() {
        render(<Main />);
    }

    @Only()
    @Scenario("WHEN click on a segment, THEN only that segment is selected")
    @ScenarioOptions({linkWithNextScenario: true}) 
    async whenClickOnASegment() {
        // WHEN left click, THEN element is selected
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_2"));
        await this.assertOnlyExpectedSegmentsAreSelected([2]);
        
        //=======HIDDEN TESTS (Not interesting for the user)==========
        tad.demoForEndUserHide();

        // WHEN left click again on same element, THEN the same element is selected
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_2"));
        await this.assertOnlyExpectedSegmentsAreSelected([2], true);
        
        // ==Right click can be used also for selecting segments. It works the same as left click (except that right click on a selected segment doesn't change the selection)== 
        // GIVEN nothing is selected
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"));

        // WHEN right click, THEN element is selected
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_4"));
        await this.assertOnlyExpectedSegmentsAreSelected([4], true);

        // WHEN right click again on another element, THEN the new element is selected
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_5"));
        await this.assertOnlyExpectedSegmentsAreSelected([5], true);

        // WHEN right click again on same element, THEN the same element is selected
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_5"));
        await this.assertOnlyExpectedSegmentsAreSelected([5], true);

        // GIVEN many segments are selected, WHEN right click one of them THEN the selection doesn't change
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_1"));
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_2"), { ctrlKey: true });
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_1"));
        await this.assertOnlyExpectedSegmentsAreSelected([1, 2], true);
        
        // restore selection for the next scenario
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_2"));
        tad.demoForEndUserShow();
    }

    @Scenario("WHEN click on another segment, THEN only that segment is selected (so the previously selected segment is no more selected)")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenClickAnotherSegment() {
        tad.cc(undefined);
         // WHEN left click again on another element, THEN the new element is selected
         await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_3"));
         await this.assertOnlyExpectedSegmentsAreSelected([3]);
    }

    @Scenario("WHEN CTRL + click on a segment, THEN that segment is ADDED to the selection, AND both are now selected")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenCTRLClickOnASegment() {
        // left click + CTRL on another element, THEN the new element is added to selection
        tad.cc("With CTRL Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_0"), { ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3]);
        
        //=======HIDDEN TESTS (Not interesting for the user)==========
        tad.demoForEndUserHide();

        // WHEN left click + SHIFT on another element, THEN the new element is added to selection
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_4"), { shiftKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3, 4], true);

        // WHEN left click + SHIFT on same element, THEN the element is removed from selection
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_4"), { shiftKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3], true);

        // WHEN right click + CTRL on another element, THEN the new element is added to selection
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_4"), { ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3, 4], true);

        // WHEN right click + CTRL on same element, THEN the selection doesn't change
        tad.cc("Right click With CTRL Key pressed");
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_4"), { ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3, 4], true);

        // WHEN right click + SHIFT on another element, THEN the new element is added to selection
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_5"), { shiftKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3, 4, 5], true);

        // WHEN right click + SHIFT on same element, THEN the selection doesn't change
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_5"), { shiftKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3, 4, 5], true);

        // restore selection for the next scenario
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_0"));
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_3"), { ctrlKey: true });
        tad.demoForEndUserShow();
    }

    @Scenario("WHEN CTRL + click on a selected segment, THEN that segment is REMOVED from the selection, AND only one is now selected")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenCTRLClickOnASelectedSegment() {
        // WHEN left click + CTRL on same element, THEN the element is removed from selection
        tad.cc("With CTRL Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_3"), { ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0]);
    }

    @Scenario("WHEN CTRL + click outside segments, THEN the selection doesn't change")
    @ScenarioOptions({linkWithNextScenario: true}) 
    async whenCTRLClickOutside() {
        // When I click outside + Ctrl key, THEN selection doesn't change
        tad.cc("Click outside with CTRL Key pressed");
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"), { ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0]);

        //=======HIDDEN TESTS (Not interesting for the user)==========
        // Same as CLICK + CTRL outside any segment works: CLICK + SHIFT, RIGHT CLICK + CTRL, RIGHT CLICK + SHIFT outside any segment
        await tad.demoForEndUserHide()
        // WHEN I click outside + Shift key, THEN selection doesn't change
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"), { shiftKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0], true);

        // WHEN I right click outside + Ctrl key, THEN selection doesn't change
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.row + "_1"), { ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0], true);

        // WHEN I click outside + Shift key, THEN selection doesn't change
        await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.row + "_1"), { shiftKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0], true);
        tad.demoForEndUserShow();
    }

    @Scenario("WHEN click outside segments, THEN the selection becomes empty")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenClickOutside() {
         // WHEN left click on row, THEN no segment is selected
         tad.cc("Left click outside any segment");
         await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"));
         await tad.showSpotlight({ message: "No segment is selected", focusOnLastElementCaptured: false });
         await this.assertOnlyExpectedSegmentsAreSelected([]);
 
         //=======HIDDEN TESTS (Not interesting for the user)==========
         // GIVEN a segment is selected
         tad.demoForEndUserHide();
         await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.item + "_2"));
         // WHEN right click on row, THEN no segment is selected
         await tad.fireEventWaitable.contextMenu(tad.screenCapturing.getByTestId(testids.row + "_1"));
         await tad.showSpotlight({ message: "No segment is selected", focusOnLastElementCaptured: false });
         await this.assertOnlyExpectedSegmentsAreSelected([], true);
         tad.demoForEndUserShow();
    }

    @Scenario("WHEN drag a selection rectangle over 2 segments, THEN only those 2 segments are selected")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenDragASelectionRectangleOverTwoSegments() {
        await tad.showSpotlight({ message: "I drag to select segment 0 and 3 with left mouse button", focusOnLastElementCaptured: false });
        await this.dragToSelect(0, 1, 3, 3);
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3]);
    }
    
    @Scenario("WHEN drag a selection rectangle over another segment, THEN only that segment is selected (so the previous 2 segments are not selected any more")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenDragASelectionRectangleOverAnotherSegment() {
        await tad.showSpotlight({ message: "I drag to select segment 3 with left mouse button", focusOnLastElementCaptured: false });
        await this.dragToSelect(1, 1, 3, 3);
        await this.assertOnlyExpectedSegmentsAreSelected([3]);
        
        //=======HIDDEN TESTS (Not interesting for the user)==========
        // Using right mouse button works the same
        tad.demoForEndUserHide();
        // GIVEN nothing selected
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"));

        await this.dragToSelect(0, 1, 3, 3, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3], true);

        await this.dragToSelect(1, 1, 3, 3, true);
        await this.assertOnlyExpectedSegmentsAreSelected([3], true);
        tad.demoForEndUserShow();
    }

    @Scenario("WHEN hold CTRL + drag a selection rectangle over another segment, THEN that segment is ADDED to the selection, AND both are now selected")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenCTRLDragASelectionRectangleOverAnotherSegment() {
        tad.cc(undefined);
        await tad.showSpotlight({ message: "I draw a rectangle containing segment 0", focusOnLastElementCaptured: false });
        await this.dragToSelect(0, 0, 0, 0, false, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3]);
    }

    @Scenario("WHEN hold CTRL + drag a selection rectangle over an already selected segment, THEN that segment is REMOVED from the selection, AND only one is selected")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenCTRLDragASelectionRectangleOverAlreadySelectedSegment() {
        await tad.showSpotlight({ message: "I draw a rectangle containing segment 0 with LEFT mouse button and CTRL pressed", focusOnLastElementCaptured: false });
        await this.dragToSelect(1, 1, 3, 3, false, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0]);

        //=======HIDDEN TESTS (Not interesting for the user)==========
        // Same as LEFT button + CTRL works: LEFT + SHIFT, RIGHT + CTRL, RIGHT + SHIFT
        tad.demoForEndUserHide();
        // GIVEN segments 0,3 are selected
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_3"), { ctrlKey: true });
        // WHEN I draw a rectangle containing segments 3, 6, 9  with RIGHT mouse button and CTRL pressed, THEN segment 3 is unselected and 6, 9 are added to selection
        await this.dragToSelect(1, 2, 9, 3, true, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0, 6, 9], true);

        // unselect everything
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"));
        // WHEN I draw a rectangle containing segments 0, 3 with LEFT mouse button and SHIFT pressed, THEN segments 0, 3 are selected
        await this.dragToSelect(0, 1, 3, 3, false, false, true);
        // WHEN I draw a rectangle containing segments 3, 6, 9  with LEFT mouse button and SHIFT pressed, THEN segment 3 is unselected and 6, 9 are added to selection
        await this.dragToSelect(1, 2, 9, 3, false, false, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0, 6, 9], true);

        // unselect everything
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"));
        // WHEN I draw a rectangle containing segments 0, 3 with RIGHT mouse button and SHIFT pressed, THEN segments 0, 3 are selected
        await this.dragToSelect(0, 1, 3, 3, true, false, true);
        // WHEN I draw a rectangle containing segments 3, 6, 9  with RIGHT mouse button and SHIFT pressed, , THEN segment 3 is unselected and 6, 9 are added to selection
        await this.dragToSelect(1, 2, 9, 3, true, false, true);
        await this.assertOnlyExpectedSegmentsAreSelected([0, 6, 9], true);

        // Select again the segments 0,3
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.row + "_1"));
        await this.dragToSelect(0, 1, 3, 3, false, true);

        tad.demoForEndUserShow();
    }

    @Scenario("WHEN hold CTRL + drag a selection rectangle over an empty area, THEN the selection doesn't change")
    @ScenarioOptions({linkWithNextScenario: true})
    async whenCTRLDragASelectionRectangleOverAnEmptyArea() {
        tad.cc(undefined);
        await tad.showSpotlight({ message: "WHEN hold CTRL + drag a selection rectangle over an empty area, THEN the selection doesn't change", focusOnLastElementCaptured: false });
        let startingRow = tad.screenCapturing.getByTestId(testids.row + "_0");
        tad.getObjectViaCheat(Timeline).dragStart(startingRow, 5);
        await tad.getObjectViaCheat(Timeline).dragMove(10, 10, 5);
        tad.getObjectViaCheat(Timeline).dragEnd({ctrlKey: true});
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3]);
        
        //=======HIDDEN TESTS (Not interesting for the user)==========
        // Using right mouse button + CTRL works the same
        tad.demoForEndUserHide();
        let row = tad.screenCapturing.getByTestId(testids.row + "_0");
        await tad.fireEventWaitable.mouseDown(row, { clientX: row.getBoundingClientRect().x + 5, clientY: row.getBoundingClientRect().y + 5, button: 2, ctrlKey: true });
        await tad.fireEventWaitable.mouseMove(row, { clientX: 10, clientY: 10, pageX: 10, ctrlKey: true });
        await tad.fireEventWaitable.mouseUp(row, { button: 2, ctrlKey: true });
        await this.assertOnlyExpectedSegmentsAreSelected([0, 3], true);
        tad.demoForEndUserShow();
    }

    @Scenario("WHEN drag a selection rectangle over an empty area, THEN the selection becomes empty") 
    @ScenarioOptions({linkWithNextScenario: true}) 
    async whenDragASelectionRectangleOverAnEmptyArea() {
        tad.cc(undefined);
        await tad.showSpotlight({ message: "I drag to select outside any segments (using left mouse button)", focusOnLastElementCaptured: false });
        let startingRow = tad.screenCapturing.getByTestId(testids.row + "_0");
        tad.getObjectViaCheat(Timeline).dragStart(startingRow, 5);
        await tad.getObjectViaCheat(Timeline).dragMove(10, 10, 5);
        tad.getObjectViaCheat(Timeline).dragEnd();
        tad.showSpotlight({ message: "No segment is selected", focusOnLastElementCaptured: false });
        await this.assertOnlyExpectedSegmentsAreSelected([]);
        
        //=======HIDDEN TESTS (Not interesting for the user)==========
        // Using right mouse button works the same
        tad.demoForEndUserHide();
        // given a selected segment
        await tad.userEventWaitable.click(tad.screenCapturing.getByTestId(testids.item + "_3"));

        let row = tad.screenCapturing.getByTestId(testids.row + "_0");
        await tad.fireEventWaitable.mouseDown(row, { clientX: row.getBoundingClientRect().x + 5, clientY: row.getBoundingClientRect().y + 5, button: 2 });
        await tad.fireEventWaitable.mouseMove(row, { clientX: 10, clientY: 10, pageX: 10 });
        await tad.fireEventWaitable.mouseUp(row, { button: 2 });
        await this.assertOnlyExpectedSegmentsAreSelected([], true);
        tad.demoForEndUserShow();
    }

    ////////////////////////////////////////////////////////////////////////////////////////
    ////// Helper methods
    ////////////////////////////////////////////////////////////////////////////////////////

    async dragToSelect(startingRowIndex, endingRowIndex, startingSegmentIndex, endingSegmentIndex, rightClick?, ctrlKey = false, shiftKey = false) {
        let startingRow = tad.screenCapturing.getByTestId(testids.row + "_" + startingRowIndex);
        let startingRowRect = startingRow.getBoundingClientRect();
        let endingRow = tad.screenCapturing.getByTestId(testids.row + "_" + endingRowIndex);
        let endingRowRect = endingRow.getBoundingClientRect();
        const startingSegmentRect = tad.screenCapturing.getByTestId(testids.item + "_" + startingSegmentIndex).getBoundingClientRect();
        const endingSegmentRect = tad.screenCapturing.getByTestId(testids.item + "_" + endingSegmentIndex).getBoundingClientRect();
        const deltaX = endingSegmentRect.x + endingSegmentRect.width - startingSegmentRect.x;
        const deltaY = endingRowRect.y + endingRowRect.height - startingRowRect.y;

        // The drag to select with right click is not a nativelly supported type of drag. So the timeline uses two implementations for supporting
        // 1. Drag to select on left click: based on interact js library triggered by native events dragStart, dragMove, dragEnd. 
        // These events can not be tested using testing-library (we have tried using fireEvent.mouseDown, mouseOver, and mouseUp, but with no success). That's why the "cheat" was needed
        // 2. Drag to select on right click: triggered by mouseDown, mouseMove, mouseUp events
        if (rightClick) {
            tad.demoForEndUserHide();
            await tad.fireEventWaitable.mouseDown(startingRow, { clientX: startingSegmentRect.x, clientY: startingRowRect.y, button: 2, ctrlKey: ctrlKey, shiftKey: shiftKey });
            // inspired from timeline#dragMove
            // Triggers each 5 ms a mouse move of 5 px on x axes
            let delta;
            for (let i = 0; i < deltaX; i += 5) {
                delta = Math.min(i + 5, deltaX);
                await new Promise(resolve => setTimeout(resolve, 5));
                // we needed to subtract -5 because else the the selection rectangle (that snapps to row) will get till the endingRow + 1, instead endingRow
                await tad.fireEventWaitable.mouseMove(endingRow, { clientX: startingSegmentRect.x + deltaX, clientY: startingRowRect.y + deltaY - 5, pageX: startingSegmentRect.x + deltaX });
            }

            await tad.fireEventWaitable.mouseUp(tad.screenCapturing.getByTestId(testids.row + "_1"), { button: 2, ctrlKey: ctrlKey, shiftKey: shiftKey });
            tad.demoForEndUserHide();
        } else {
            // 150 is the group offset
            // we needed to subtract -5 because else the the selection rectangle (that snapps to row) will get till the endingRow + 1, instead endingRow
            tad.getObjectViaCheat(Timeline).dragStart(startingRow, startingSegmentRect.x - 150);
            await tad.getObjectViaCheat(Timeline).dragMove(deltaX, deltaY - 5, 5);
            tad.getObjectViaCheat(Timeline).dragEnd({ ctrlKey: ctrlKey, shiftKey: shiftKey });
        }
    }

    async assertOnlyExpectedSegmentsAreSelected(expectedSelectedSegments: number[], demoForEndUserHide?) {
        for (var i = 0; i < tasksCount; i++) {
            const segment = tad.screenCapturing.getByTestId(testids.item + "_" + i);
            const innerSegment = segment.getElementsByClassName("rct9k-items-inner")[0];
            if (expectedSelectedSegments.indexOf(i) >= 0) {
                tad.cc("Segment " + i + " is selected (has resize anchors, brighter color and shadow effect)");
                await tad.assertWaitable.include(Array.from(segment.classList), "rct9k-items-outer-selected");
                tad.demoForEndUserHide();
                await tad.assertWaitable.include(Array.from(innerSegment.classList), "rct9k-items-selected");
                tad.cc("And it has a brighter color and a shadow effect");
                await tad.assertWaitable.include(innerSegment.getAttribute('style').split(";"), " filter: drop-shadow(black 0px 0px 0.5rem) brightness(1.25)");
                !demoForEndUserHide && tad.demoForEndUserShow();
            } else {
                tad.demoForEndUserHide();
                await tad.assertWaitable.notInclude(Array.from(segment.classList), "rct9k-items-outer-selected");
                await tad.assertWaitable.notInclude(Array.from(innerSegment.classList), "rct9k-items-selected");
                await tad.assertWaitable.notInclude(innerSegment.getAttribute('style').split(";"), " filter: drop-shadow(black 0px 0px 0.5rem) brightness(1.25)");
                !demoForEndUserHide && tad.demoForEndUserShow();
            }
        }
    }
}